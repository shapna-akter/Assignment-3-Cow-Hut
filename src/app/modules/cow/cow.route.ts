import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { cowController } from './cow.controller';
import { CowValidation } from './cow.validation';

const router = express.Router();

router.get('/', cowController.getAllCows);
router.get('/:id', cowController.getSingleCow);

router.post(
  '/',
  validateRequest(CowValidation.createCowZodSchema),
  cowController.createCow
);

router.patch(
  '/:id',
  validateRequest(CowValidation.updateCowZodSchema),
  cowController.updateCow
);

router.delete('/:id', cowController.deleteCow);

export const CowRoutes = router;
