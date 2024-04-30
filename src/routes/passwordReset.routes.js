import express from 'express';
import { sendPasswordResetEmail, resetPassword } from '../controllers/passwordReset.controller.js';

const router = express.Router();

router.post('/reset/send-email', sendPasswordResetEmail);
router.post('/reset', resetPassword);

export default router;
