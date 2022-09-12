import { IOperationService } from '../interfaces/operation-service.interface';
import { OperationRepository } from '../operation.repository';
import { OperationService } from '../operation.service';

export const makeOperationService = (): IOperationService => {
  const repository = new OperationRepository();
  return new OperationService(repository);
};
