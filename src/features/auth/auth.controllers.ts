import { Request, Response } from "express";
import { ErrorTypes, generateNonce, SiweMessage } from "siwe";

export const handleCheckAuthentication = (req: Request, res: Response) => {
  try {
    if (!req.session.siwe) {
      res.status(200).send({
        isAuthenticated: false,
        address: req.params.address,
      });
      return;
    }

    const isAuthenticated = (req.session.siwe?.addresses || []).includes(
      req.params.address
    );

    return res.status(200).send({
      isAuthenticated: isAuthenticated,
      address: req.params.address,
    });
  } catch (e) {
    if (e instanceof Error) console.log(`handleCheckAuthentication():: ${e}`);
    res.status(500).send({
      isAuthenticated: false,
      address: req.params.address,
    });
  }
};

export const handleGenerateNonce = async function (
  req: Request,
  res: Response
) {
  req.session.nonce = generateNonce();
  res.setHeader("Content-Type", "text/plain");
  res.status(200).send(req.session.nonce);
};

export const handleSignIn = async function (req: Request, res: Response) {
  try {
    if (!req.body.message) {
      res
        .status(422)
        .json({ message: "Expected prepareMessage object as body." });
      return;
    }

    const message = new SiweMessage(req.body.message);

    const fields = await message.validate(req.body.signature);

    if (fields.nonce !== req.session.nonce) {
      console.log(req.session);
      res.status(422).json({
        message: `Invalid nonce.`,
      });
      return;
    }

    req.session.siwe = {
      addresses: [...(req.session.siwe?.addresses || []), fields.address],
    };
    req.session.save(() => res.status(200).end());
  } catch (e: any) {
    req.session.siwe = null;
    req.session.nonce = null;
    console.error(e);
    switch (e) {
      case ErrorTypes.EXPIRED_MESSAGE: {
        req.session.save(() => res.status(440).json({ message: e.message }));
        break;
      }
      case ErrorTypes.INVALID_SIGNATURE: {
        req.session.save(() => res.status(422).json({ message: e.message }));
        break;
      }
      default: {
        req.session.save(() => res.status(500).json({ message: e.message }));
        break;
      }
    }
  }
};
