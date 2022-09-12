import { CreateOperationValidator } from '../operation.validator';
import { OperationController } from '../operation.controller';
import { makeOperationService } from './operation-service.factory';

export const makeOperationController = () => {
  const service = makeOperationService();
  const validator = new CreateOperationValidator();
  return new OperationController(service, validator);
};
