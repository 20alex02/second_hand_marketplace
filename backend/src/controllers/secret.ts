import { loginUser } from "../services/authService";
import MissingRequiredField from "../exceptions/MissingRequiredField";
import type { ApiResponse } from "./types";
import type { Request, Response } from "express";
import { createErrorResponse, getRequiredField, handleMissingField } from "./common";
import WrongPassword from "../exceptions/WrongPassword";

export const actionCreateSecret = async (req: Request, res: Response, secretKey: string) => {
  try {
    const data = req.body;
    const email = getRequiredField(data, "email");
    const password = getRequiredField(data, "password");
    const bearer = await loginUser(email, password, secretKey as string);
    const response: ApiResponse<object> = {
      status: 'success',
      data: {
        token: bearer
      },
      message: 'Token created successfully.',
    };
    return res.status(201).send(response);
  } catch (error) {
    if (error instanceof MissingRequiredField) {
      return res.status(400).send(handleMissingField(error.field));
    }
    if (error instanceof WrongPassword) {
      return res.status(400).send(createErrorResponse(error.message));
    }
    return res.status(500).send(createErrorResponse('Error occurred.'));
  }
}
