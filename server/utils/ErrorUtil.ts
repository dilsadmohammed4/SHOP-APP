import { Response } from "express";
import { APP_STATUS } from "../constants";

export const ThrowError = (response: Response, error: any) => {
  return response.status(500).json({
    status: APP_STATUS.FAILED,
    data: null,
    error: error.message,
  });
};

export const ThrowCustomMsgError = (response: Response, error: string) => {
  return response.status(500).json({
    status: APP_STATUS.FAILED,
    data: null,
    error: error,
  });
};
