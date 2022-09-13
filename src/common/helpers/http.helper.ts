import { Response } from 'express';
import { StatusHttp } from '../enums/status-http.enum';
import { BadRequestError, ServerError, UnauthorizedError } from '../errors';
import { IClientErrorJson } from '../interfaces/client-error-json.interface';

export const success = (res: Response, data: any) => {
  return res.status(StatusHttp.success).json(data);
};

export const created = (res: Response) => {
  return res.status(StatusHttp.created).send();
};

export const noContent = (res: Response) => {
  return res.status(StatusHttp.noContent).send();
};

export const badRequest = (res: Response, error: BadRequestError) => {
  return res.status(StatusHttp.badRequest).json(error.toJSON());
};

export const unauthorized = (res: Response, error: UnauthorizedError) => {
  return res.status(StatusHttp.unauthorized).json(error.toJSON());
};

export const serverError = (res: Response, error: ServerError) => {
  return res.status(StatusHttp.serverError).json(error.toJSON());
};

export const dynamicError = (
  res: Response,
  status: number,
  data: IClientErrorJson,
) => {
  return res.status(status).json(data);
};
