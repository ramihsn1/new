import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { protect, authorize } from '../middleware/auth';
import { validate } from '../middleware/validator';
import ContactMessage from '../models/ContactMessage';
import NewsletterSubscriber from '../models/NewsletterSubscriber';

const router = express.Router();

router.post('/contact',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('subject').notEmpty().withMessage('Subject is required'),
    body('message').notEmpty().withMessage('Message is required'),
  ],
  validate,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const message = await ContactMessage.create(req.body);
      res.status(201).json({ success: true, data: message, message: 'Message sent successfully' });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

router.get('/contacts', protect, authorize('super_admin', 'admin'), async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;
    const isRead = req.query.isRead;

    const filter: any = {};
    if (isRead !== undefined) filter.isRead = isRead === 'true';

    const [messages, total] = await Promise.all([
      ContactMessage.find(filter).sort('-createdAt').skip(skip).limit(limit),
      ContactMessage.countDocuments(filter),
    ]);

    res.json({ success: true, count: messages.length, total, totalPages: Math.ceil(total / limit), currentPage: page, data: messages });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/contacts/:id/read', protect, authorize('super_admin', 'admin'), async (req: Request, res: Response): Promise<void> => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    if (!message) {
      res.status(404).json({ success: false, error: 'Message not found' });
      return;
    }
    res.json({ success: true, data: message });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/newsletter',
  [body('email').isEmail().withMessage('Valid email is required')],
  validate,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const existing = await NewsletterSubscriber.findOne({ email: req.body.email });
      if (existing) {
        if (!existing.isActive) {
          existing.isActive = true;
          existing.subscribedAt = new Date();
          await existing.save();
              res.json({ success: true, message: 'Resubscribed successfully' });
              return;
        }
        res.json({ success: true, message: 'Already subscribed' });
        return;
      }
      await NewsletterSubscriber.create({ email: req.body.email });
      res.status(201).json({ success: true, message: 'Subscribed successfully' });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

router.get('/subscribers', protect, authorize('super_admin', 'admin'), async (req: Request, res: Response): Promise<void> => {
  try {
    const subscribers = await NewsletterSubscriber.find({ isActive: true }).sort('-subscribedAt');
    res.json({ success: true, count: subscribers.length, data: subscribers });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
