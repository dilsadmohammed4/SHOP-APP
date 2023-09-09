import { Response } from "express";
import { APP_STATUS } from "../constants";

export const ThrowError = (
  response: Response,
  statusCode?: number,
  error?: any
) => {
  return response.status(statusCode ? statusCode : 500).json({
    status: APP_STATUS.FAILED,
    data: null,
    error: error ? error : "Server error!",
  });
};
