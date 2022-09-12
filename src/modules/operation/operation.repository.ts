import { Logger } from '../../infra/logger';
import db from '../../infra/db/sql-server';
import { OperationModel } from './operation.model';
import { OperationDto } from './dtos/operation.dto';
import { IOperationRepository } from './interfaces/operation-repository.interface';
import { CreateOperationDto } from './dtos/create-operation.dto';

export class OperationRepository implements IOperationRepository {
  private readonly repository = db.getRepository(OperationModel);
  private readonly logger = new Logger(OperationRepository.name);

  async getOperations(): Promise<OperationDto[]> {
    try {
      return await this.repository.find();
    } catch (err) {
      this.logger.error(JSON.stringify(err));
      throw err;
    }
  }

  async createOperation(createOperationDto: CreateOperationDto): Promise<void> {
    try {
      await this.repository.insert(createOperationDto);
    } catch (err) {
      this.logger.error(JSON.stringify(err));
      throw err;
    }
  }
}
