import { IOperationService } from '../interfaces/operation-service.interface';
import { OperationRepository } from '../operation.repository';
import { OperationService } from '../operation.service';
import { Cache } from '../../../infra/cache';

export const makeOperationService = (): IOperationService => {
  const repository = new OperationRepository();
  const cache = new Cache();
  return new OperationService(repository, cache);
};
