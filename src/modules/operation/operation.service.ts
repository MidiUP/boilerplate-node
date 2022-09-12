import { Logger } from '../../infra/logger';
import { CreateOperationDto } from './dtos/create-operation.dto';
import { OperationDto } from './dtos/operation.dto';
import { IOperationRepository } from './interfaces/operation-repository.interface';
import { IOperationService } from './interfaces/operation-service.interface';

export class OperationService implements IOperationService {
  private readonly logger = new Logger(OperationService.name);

  constructor(private readonly repository: IOperationRepository) {}

  async getOperations(): Promise<OperationDto[]> {
    try {
      return this.repository.getOperations();
    } catch (err) {
      this.logger.error(JSON.stringify(err));
      throw err;
    }
  }

  async createOperation(createOperationDto: CreateOperationDto): Promise<void> {
    try {
      await this.repository.createOperation(createOperationDto);
    } catch (err) {
      this.logger.error(JSON.stringify(err));
      throw err;
    }
  }
}
