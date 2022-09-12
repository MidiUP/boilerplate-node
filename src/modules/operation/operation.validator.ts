import { BadRequestError } from '../../common/errors/bad-request.error';
import yup from '../../infra/validator';
import { IValidator } from '../../common/interfaces/validator.interface';

export class CreateOperationValidator implements IValidator {
  private readonly schema = yup.object({
    name: yup.string().required('name is required'),
  });

  async validate(input: any): Promise<BadRequestError> {
    return new Promise((resolve) => {
      this.schema
        .validate(input)
        .then(() => {
          resolve(null);
        })
        .catch((err) => {
          resolve(new BadRequestError(err.errors));
        });
    });
  }
}
