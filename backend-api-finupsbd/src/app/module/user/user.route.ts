import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middleware/auth';
import multer from 'multer';

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() }); // keeps files in memory

router.get('/get-all-new-loans/:id', auth('USER'), UserController.getAllNewLoans);
router.get('/get-all-existing-loan/:id', auth('USER'), UserController.getAllExistingLoans);
router.get('/get-all-rejects-loan/:id', auth('USER'), UserController.getAllRejectsLoans);

router.get('/', auth('USER', 'ADMIN', 'SUPER_ADMIN'), UserController.getAllUsers);
router.get('/my-profile', auth('USER', 'ADMIN', 'SUPER_ADMIN'), UserController.meProfile);
router.get('/:id', auth('USER', 'ADMIN', 'SUPER_ADMIN'), UserController.getSingleUser);

router.get('/get-application/:id', auth('USER'), UserController.getApplication);
router.post(
  '/create-addi-doc/:id',
  upload.array('files', 10),
  auth('USER'),
  UserController.createAddiDoc,
);

router.get('/agreement-doc/:id', UserController.getAgreementDoc);

export const UserRouter = router;
