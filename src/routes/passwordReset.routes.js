import { Router } from 'express';
import {sendEmailRecoveryPassword} from '../controllers/passwordReset.controller.js';

const passwordResetRouter = Router();

passwordResetRouter.post('/send-email',sendEmailRecoveryPassword);
export default passwordResetRouter;
