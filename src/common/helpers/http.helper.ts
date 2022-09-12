import { Response } from 'express';
import { IClientErrorJson } from '../interfaces/client-error-json.interface';

export const success = (res: Response, data: any) => {
  return res.status(200).json(data);
};

export const created = (res: Response) => {
  return res.status(201).send();
};

export const noContent = (res: Response) => {
  return res.status(204).send();
};

export const error = (res: Response, data: IClientErrorJson) => {
  const { status, ...objectError } = data;
  return res.status(status).json(objectError);
};
