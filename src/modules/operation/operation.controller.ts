import {
  created,
  success,
  serverError,
  badRequest,
} from '../../common/helpers/http.helper';
import { Request, Response } from 'express';
import { Logger } from '../../infra/logger';
import { IValidator } from 'common/interfaces/validator.interface';
import { IOperationService } from './interfaces/operation-service.interface';
import { ServerError } from '../../common/errors/server-error.error';

export class OperationController {
  logger = new Logger(OperationController.name);

  constructor(
    private readonly service: IOperationService,
    private readonly validator: IValidator,
  ) {}

  async getOperations(req: Request, res: Response) {
    try {
      const operations = await this.service.getOperations();
      return success(res, operations);
    } catch (err) {
      this.logger.error(JSON.stringify(err));
      return serverError(res, new ServerError(err));
    }
  }

  async createOperation(req: Request, res: Response) {
    try {
      const { body } = req;

      const errorValidation = await this.validator.validate(body);
      if (errorValidation) {
        return badRequest(res, errorValidation);
      }

      await this.service.createOperation(body);

      return created(res);
    } catch (err) {
      this.logger.error(JSON.stringify(err));
      return serverError(res, new ServerError(err));
    }
  }
}
