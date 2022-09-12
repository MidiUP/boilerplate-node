import { CreateOperationDto } from '../dtos/create-operation.dto';
import { OperationDto } from '../dtos/operation.dto';

export interface IOperationService {
  getOperations: () => Promise<OperationDto[]>;
  createOperation: (createOperationDto: CreateOperationDto) => Promise<void>;
}
