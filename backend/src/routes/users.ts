import express from 'express';
import { registerUser, loginUser } from '../controllers/usersController';

const router = express.Router();

// User registration endpoint
router.post('/register', registerUser);

// User login endpoint
router.post('/login', loginUser);

export default router;
