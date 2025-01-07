import { THTTPStatus } from "@/src/types/http.status";
import { Response } from "express";

export const sendResponse = (
  res: Response,
  status: THTTPStatus,
  data: any = null,
  message: string = ""
) => {
  if (status.code >= 400) {
    return res
      .status(status.code)
      .json({ statusCode: status.code, error: status.message, message });
  } else {
    return res
      .status(status.code)
      .json({ statusCode: status.code, message, data });
  }
};
