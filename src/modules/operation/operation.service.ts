import { IDbCache } from '../../infra/interfaces/db-cache.interface';
import { Logger } from '../../infra/logger';
import { CreateOperationDto } from './dtos/create-operation.dto';
import { OperationDto } from './dtos/operation.dto';
import { IOperationRepository } from './interfaces/operation-repository.interface';
import { IOperationService } from './interfaces/operation-service.interface';

export class OperationService implements IOperationService {
  private readonly logger = new Logger(OperationService.name);

  constructor(
    private readonly repository: IOperationRepository,
    private readonly cache: IDbCache,
  ) {}

  async getOperations(): Promise<OperationDto[]> {
    try {
      const OPERATIONS_KEY_CACHE = 'operations';
      const EXPIRATION_CACHE_SECONDS = 60;
      const operationsCached = await this.cache.getDataByKey(
        OPERATIONS_KEY_CACHE,
      );

      if (operationsCached) {
        return operationsCached;
      }

      const operations = await this.repository.getOperations();
      await this.cache.setData(
        OPERATIONS_KEY_CACHE,
        operations,
        EXPIRATION_CACHE_SECONDS,
      );

      return operations;
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
