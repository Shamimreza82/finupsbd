import express from 'express';
import { upload } from '../../utils/sendImageToCloud';
import { CardsController } from './cards.controller';

const router = express.Router();

router.post('/', upload.single('file'), CardsController.createCard);
router.get('/', CardsController.getAllCards);
router.patch('/:id', upload.single('file'), CardsController.updateCard);
router.get('/:id', CardsController.getSingleCard);

export const CardsRouter = router;
