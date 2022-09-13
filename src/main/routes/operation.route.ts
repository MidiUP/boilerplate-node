import { makeOperationController } from '../../modules/operation/factories';
import { Router } from 'express';

const controller = makeOperationController();

export default (route: Router): void => {
  route.get('/operation', (req, res) => controller.getOperations(req, res));

  route.post('/operation', (req, res) => controller.createOperation(req, res));
};
