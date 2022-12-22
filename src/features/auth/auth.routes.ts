import express, { Request, Response } from "express";
import { ErrorTypes, generateNonce, SiweMessage } from "siwe";
import {
  handleCheckAuthentication,
  handleGenerateNonce,
  handleSignIn,
} from "./auth.controllers";

const router = express.Router();

declare module "express-session" {
  export interface SessionData {
    nonce: string | null;
    siwe: { addresses: string[] } | null;
  }
}

router.get("/nonce", handleGenerateNonce);

router.post("/sign-in", handleSignIn);

router.get("/isAuthenticated/:address", handleCheckAuthentication);

export default router;
