import express, { Request, Response } from 'express';
import { body, param, query } from 'express-validator';
import { protect, authorize } from '../middleware/auth';
import { validate } from '../middleware/validator';
import { AuthRequest } from '../middleware/auth';
import News from '../models/News';

const router = express.Router();

const newsValidation = [
  body('title.en').notEmpty().withMessage('English title is required'),
  body('title.ar').notEmpty().withMessage('Arabic title is required'),
  body('title.tr').notEmpty().withMessage('Turkish title is required'),
  body('slug.en').notEmpty().withMessage('English slug is required'),
  body('category.en').notEmpty().withMessage('English category is required'),
];

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const lang = (req.query.lang as string) || 'en';
    const category = req.query.category as string;
    const tag = req.query.tag as string;

    const filter: any = { status: 'published' };
    if (category) filter['category.en'] = category;
    if (tag) filter.tags = tag;

    const [news, total] = await Promise.all([
      News.find(filter)
        .sort('-publishedAt')
        .skip(skip)
        .limit(limit)
        .populate('author', 'name avatar')
        .select(`title.${lang} slug.${lang} excerpt.${lang} featuredImage category.${lang} tags publishedAt isBreaking readTime`),
      News.countDocuments(filter),
    ]);

    res.json({ success: true, count: news.length, total, totalPages: Math.ceil(total / limit), currentPage: page, data: news });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/admin', protect, authorize('super_admin', 'admin', 'editor'), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;
    const status = req.query.status as string;

    const filter: any = {};
    if (status) filter.status = status;

    const [news, total] = await Promise.all([
      News.find(filter).sort('-createdAt').skip(skip).limit(limit).populate('author', 'name'),
      News.countDocuments(filter),
    ]);

    res.json({ success: true, count: news.length, total, totalPages: Math.ceil(total / limit), currentPage: page, data: news });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/:slug', async (req: Request, res: Response): Promise<void> => {
  try {
    const news = await News.findOne({ 'slug.en': req.params.slug, status: 'published' }).populate('author', 'name avatar');
    if (!news) {
      res.status(404).json({ success: false, error: 'News not found' });
      return;
    }
    res.json({ success: true, data: news });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/', protect, authorize('super_admin', 'admin', 'editor'), newsValidation, validate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const news = await News.create({ ...req.body, author: req.user._id, publishedAt: req.body.status === 'published' ? new Date() : undefined });
    res.status(201).json({ success: true, data: news });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/:id', protect, authorize('super_admin', 'admin', 'editor'), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const updateData = { ...req.body };
    if (req.body.status === 'published' && !updateData.publishedAt) {
      updateData.publishedAt = new Date();
    }
    const news = await News.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!news) {
      res.status(404).json({ success: false, error: 'News not found' });
      return;
    }
    res.json({ success: true, data: news });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/:id', protect, authorize('super_admin', 'admin'), async (req: Request, res: Response): Promise<void> => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) {
      res.status(404).json({ success: false, error: 'News not found' });
      return;
    }
    res.json({ success: true, data: {} });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
