import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { protect, authorize } from '../middleware/auth';
import { AuthRequest } from '../middleware/auth';
import Media from '../models/Media';
import Setting from '../models/Setting';
import ContactMessage from '../models/ContactMessage';
import { config } from '../config';
import { body } from 'express-validator';
import { validate } from '../middleware/validator';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  },
});

const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'video/mp4', 'video/webm'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 },
});

router.post('/upload', protect, authorize('super_admin', 'admin', 'editor'), upload.single('file'), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, error: 'No file uploaded' });
      return;
    }

    const media = await Media.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      url: `/uploads/${req.file.filename}`,
      folder: req.body.folder || 'general',
      alt: { en: req.body.alt || '', ar: req.body.alt || '', tr: req.body.alt || '' },
      uploadedBy: req.user._id,
    });

    res.status(201).json({ success: true, data: media });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/media', protect, authorize('super_admin', 'admin', 'editor'), async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const skip = (page - 1) * limit;
    const folder = req.query.folder as string;

    const filter: any = {};
    if (folder) filter.folder = folder;

    const [media, total] = await Promise.all([
      Media.find(filter).sort('-createdAt').skip(skip).limit(limit),
      Media.countDocuments(filter),
    ]);

    res.json({ success: true, count: media.length, total, totalPages: Math.ceil(total / limit), currentPage: page, data: media });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/media/:id', protect, authorize('super_admin', 'admin'), async (req: Request, res: Response): Promise<void> => {
  try {
    const media = await Media.findByIdAndDelete(req.params.id);
    if (!media) {
      res.status(404).json({ success: false, error: 'Media not found' });
      return;
    }
    res.json({ success: true, data: {} });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/settings', async (_req: Request, res: Response): Promise<void> => {
  try {
    const settings = await Setting.find();
    const settingsObj: Record<string, any> = {};
    settings.forEach((s) => { settingsObj[s.key] = s.value; });
    res.json({ success: true, data: settingsObj });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/settings', protect, authorize('super_admin', 'admin'), async (req: Request, res: Response): Promise<void> => {
  try {
    const updates = req.body;
    for (const [key, value] of Object.entries(updates)) {
      await Setting.findOneAndUpdate(
        { key },
        { key, value, group: (value as any).group || 'general' },
        { upsert: true, new: true }
      );
    }
    res.json({ success: true, message: 'Settings updated' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/dashboard/stats', protect, authorize('super_admin', 'admin'), async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const models = {
      News: require('../models/News').default,
      Event: require('../models/Event').default,
      Service: require('../models/Service').default,
      Publication: require('../models/Publication').default,
      Project: require('../models/Project').default,
      Team: require('../models/Team').default,
      Partner: require('../models/Partner').default,
      ContactMessage: require('../models/ContactMessage').default,
      NewsletterSubscriber: require('../models/NewsletterSubscriber').default,
      Media: require('../models/Media').default,
    };

    const stats: Record<string, any> = {};

    for (const [key, Model] of Object.entries(models)) {
      const total = await Model.countDocuments();
      const published = await Model.countDocuments({ status: 'published' });
      stats[key.toLowerCase()] = { total, published };
    }

    const recentMessages = await ContactMessage.find({ isRead: false }).countDocuments();
    stats.unreadMessages = recentMessages;

    res.json({ success: true, data: stats });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
