import { Request, Response } from "express";
import { ThrowError } from "../utils/ErrorUtil";

export const createCart = async (request: Request, response: Response) => {
  try {
  } catch (error: any) {
    return ThrowError(response, error);
  }
};

export const getCartInfo = async (request: Request, response: Response) => {
  try {
  } catch (error: any) {
    return ThrowError(response, error);
  }
};
