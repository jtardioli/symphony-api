import { Request, Response } from "express";
import { ErrorTypes, generateNonce, SiweMessage } from "siwe";
import { prisma } from "../../config/prisma.config";

export const handleCheckAuthentication = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.session.siwe) {
      res.status(200).send({
        isVerified: false,
        address: req.params.address,
      });
      return;
    }

    const isVerified = (req.session.siwe?.addresses || []).includes(
      req.params.address
    );

    if (isVerified) {
      const user = await prisma.user.findUnique({
        where: { address: req.params.address },
      });
      console.log("User", user);
      return res.status(200).send({
        isVerified: isVerified,
        address: req.params.address,
        user,
      });
    }

    return res.status(200).send({
      isVerified: isVerified,
      address: req.params.address,
      user: null,
    });
  } catch (e) {
    if (e instanceof Error) console.log(`handleCheckAuthentication():: ${e}`);
    res.status(500).send({
      isVerified: false,
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

export const handleVerification = async function (req: Request, res: Response) {
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
