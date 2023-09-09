import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ThrowError } from "../utils/ErrorUtil";

export const tokenMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const secretKey: string | undefined = process.env.JWT_SECRET_KET;
    const token: string[] | undefined | string =
      request.headers["x-auth-token"];
    if (secretKey && token) {
      const decode: any = await jwt.verify(token.toString(), secretKey);
      if (decode) {
        request.headers["user-data"] = decode.user;
        next();
      } else {
        return ThrowError(response, 401, "Unauthorized, Invalid token!");
      }
    } else {
      return ThrowError(response, 401, "No token Provided!");
    }
  } catch (error: any) {
    return ThrowError(response, 500, error.message);
  }
};
