import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';

interface CrudOptions {
  model: Model<any>;
  name: string;
  populateFields?: string[];
  defaultSort?: string;
  publicFilter?: (req: Request) => Record<string, any>;
}

export function createCrudController(options: CrudOptions) {
  const { model: Model, name, populateFields = [], defaultSort = '-createdAt', publicFilter } = options;

  const getPublic = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const filter = publicFilter ? publicFilter(req) : { status: 'published' };

      let query = Model.find(filter).sort(defaultSort).skip(skip).limit(limit).select('-__v');
      for (const field of populateFields) {
        query = query.populate(field);
      }

      const [items, total] = await Promise.all([query, Model.countDocuments(filter)]);

      res.json({
        success: true,
        count: items.length,
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        data: items,
      });
    } catch (error: any) {
      next(error);
    }
  };

  const getAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const skip = (page - 1) * limit;

      const filter: Record<string, any> = {};
      if (req.query.status) filter.status = req.query.status;

      let query = Model.find(filter).sort('-createdAt').skip(skip).limit(limit);
      for (const field of populateFields) {
        query = query.populate(field);
      }

      const [items, total] = await Promise.all([query, Model.countDocuments(filter)]);

      res.json({
        success: true,
        count: items.length,
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        data: items,
      });
    } catch (error: any) {
      next(error);
    }
  };

  const getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) {
        res.status(404).json({ success: false, error: `${name} not found` });
        return;
      }
      res.json({ success: true, data: item });
    } catch (error: any) {
      next(error);
    }
  };

  const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = { ...req.body };
      const creatorModels = ['news', 'service', 'publication', 'project', 'event'];

      if (creatorModels.includes(name)) {
        data.author = (req as any).user._id;
        if (data.status === 'published') data.publishedAt = new Date();
      }

      const item = await Model.create(data);
      res.status(201).json({ success: true, data: item });
    } catch (error: any) {
      next(error);
    }
  };

  const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = { ...req.body };
      if (data.status === 'published' && !data.publishedAt) data.publishedAt = new Date();

      const item = await Model.findByIdAndUpdate(req.params.id, data, {
        new: true,
        runValidators: true,
      });
      if (!item) {
        res.status(404).json({ success: false, error: `${name} not found` });
        return;
      }
      res.json({ success: true, data: item });
    } catch (error: any) {
      next(error);
    }
  };

  const remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) {
        res.status(404).json({ success: false, error: `${name} not found` });
        return;
      }
      res.json({ success: true, data: {} });
    } catch (error: any) {
      next(error);
    }
  };

  return { getPublic, getAdmin, getById, create, update, remove };
}
