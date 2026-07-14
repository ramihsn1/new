import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User';
import { config } from '../config';
import { protect, authorize } from '../middleware/auth';
import { validate } from '../middleware/validator';
import { AuthRequest } from '../middleware/auth';

const router = express.Router();

const generateTokens = (id: string, role: string) => {
  const accessToken = jwt.sign({ id, role }, config.jwt.secret, {
    expiresIn: config.jwt.expire as any,
  });
  const refreshToken = jwt.sign({ id }, config.jwt.secret, {
    expiresIn: config.jwt.refreshExpire as any,
  });
  return { accessToken, refreshToken };
};

router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('role').optional().isIn(['super_admin', 'admin', 'editor']),
  ],
  validate,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password, role } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ success: false, error: 'User already exists' });
        return;
      }

      const user = await User.create({
        name,
        email,
        password,
        role: role || 'editor',
      });

      const tokens = generateTokens(String(user._id), user.role);

      user.refreshToken = tokens.refreshToken;
      user.lastLogin = new Date();
      await user.save({ validateBeforeSave: false });

      res.cookie('token', tokens.accessToken, {
        httpOnly: true,
        secure: config.nodeEnv === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.status(201).json({
        success: true,
        data: {
          user: user.toJSON(),
          ...tokens,
        },
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validate,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email, isActive: true }).select('+password +refreshToken');
      if (!user) {
        res.status(401).json({ success: false, error: 'Invalid credentials' });
        return;
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        res.status(401).json({ success: false, error: 'Invalid credentials' });
        return;
      }

      const tokens = generateTokens(String(user._id), user.role);

      user.refreshToken = tokens.refreshToken;
      user.lastLogin = new Date();
      await user.save({ validateBeforeSave: false });

      res.cookie('token', tokens.accessToken, {
        httpOnly: true,
        secure: config.nodeEnv === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.json({
        success: true,
        data: {
          user: user.toJSON(),
          ...tokens,
        },
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

router.post('/logout', protect, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user._id).select('+refreshToken');
    if (user) {
      user.refreshToken = undefined;
      await user.save({ validateBeforeSave: false });
    }
    res.clearCookie('token');
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/me', protect, async (req: AuthRequest, res: Response): Promise<void> => {
  res.json({ success: true, data: { user: req.user } });
});

router.get('/users', protect, authorize('super_admin', 'admin'), async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().sort('-createdAt');
    res.json({ success: true, count: users.length, data: users });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put(
  '/users/:id',
  protect,
  authorize('super_admin', 'admin'),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, role, isActive, password } = req.body;
      const updateData: any = {};
      if (name) updateData.name = name;
      if (email) updateData.email = email;
      if (role) updateData.role = role;
      if (typeof isActive === 'boolean') updateData.isActive = isActive;

      const user = await User.findById(req.params.id);
      if (!user) {
        res.status(404).json({ success: false, error: 'User not found' });
        return;
      }

      if (password) {
        user.password = password;
      }

      Object.assign(user, updateData);
      await user.save();

      res.json({ success: true, data: user.toJSON() });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

export default router;
