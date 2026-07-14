import express, { Request, Response } from 'express';
import { protect, authorize } from '../middleware/auth';
import { validate } from '../middleware/validator';
import { AuthRequest } from '../middleware/auth';
import { body } from 'express-validator';

function createCRUDRoutes(Model: any, name: string, validations: any[] = []) {
  const router = express.Router();

  router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;
      const lang = (req.query.lang as string) || 'en';

      const filter: any = { status: 'published' };
      if (name === 'team' || name === 'partner' || name === 'faq' || name === 'testimonial') {
        filter.isActive = true;
      }

      const sortField = name === 'event' ? 'startDate' : name === 'team' || name === 'partner' ? 'sortOrder' : '-createdAt';

      const [items, total] = await Promise.all([
        Model.find(filter).sort(sortField).skip(skip).limit(limit).select('-__v'),
        Model.countDocuments(filter),
      ]);

      res.json({ success: true, count: items.length, total, totalPages: Math.ceil(total / limit), currentPage: page, data: items });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  router.get('/admin', protect, authorize('super_admin', 'admin', 'editor'), async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const skip = (page - 1) * limit;

      const filter: any = {};
      if (req.query.status) filter.status = req.query.status;

      const [items, total] = await Promise.all([
        Model.find(filter).sort('-createdAt').skip(skip).limit(limit),
        Model.countDocuments(filter),
      ]);

      res.json({ success: true, count: items.length, total, totalPages: Math.ceil(total / limit), currentPage: page, data: items });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) {
        res.status(404).json({ success: false, error: `${name} not found` });
        return;
      }
      res.json({ success: true, data: item });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  router.post('/', protect, authorize('super_admin', 'admin', 'editor'), validations, validate, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const data = { ...req.body };
      if (['news', 'service', 'publication', 'project', 'event'].includes(name)) {
        data.author = req.user._id;
        if (data.status === 'published') data.publishedAt = new Date();
      }
      const item = await Model.create(data);
      res.status(201).json({ success: true, data: item });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  router.put('/:id', protect, authorize('super_admin', 'admin', 'editor'), async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const data = { ...req.body };
      if (data.status === 'published' && !data.publishedAt) data.publishedAt = new Date();
      const item = await Model.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
      if (!item) {
        res.status(404).json({ success: false, error: `${name} not found` });
        return;
      }
      res.json({ success: true, data: item });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  router.delete('/:id', protect, authorize('super_admin', 'admin'), async (req: Request, res: Response): Promise<void> => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) {
        res.status(404).json({ success: false, error: `${name} not found` });
        return;
      }
      res.json({ success: true, data: {} });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  return router;
}

export default createCRUDRoutes;
