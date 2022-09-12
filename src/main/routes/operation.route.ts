import { makeOperationController } from '../../modules/operation/factories';
import { Router } from 'express';

export default (route: Router): void => {
  route.get('/operation', (req, res) =>
    makeOperationController().getOperations(req, res),
  );

  route.post('/operation', (req, res) =>
    makeOperationController().createOperation(req, res),
  );
};
