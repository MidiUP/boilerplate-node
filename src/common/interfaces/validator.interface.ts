import { BadRequestError } from '../errors/bad-request.error';

export interface IValidator {
  validate: (body: any) => Promise<BadRequestError>;
}
