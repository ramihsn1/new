import { body } from 'express-validator';

export const nameValidation = body('name').notEmpty().withMessage('Name is required');
export const emailValidation = body('email').isEmail().withMessage('Valid email is required');
export const passwordValidation = body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters');

export const contactValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('message').notEmpty().withMessage('Message is required'),
];

export const newsletterValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
];

export const localizedContentValidation = [
  body('title.en').notEmpty().withMessage('English title is required'),
  body('title.ar').notEmpty().withMessage('Arabic title is required'),
  body('title.tr').notEmpty().withMessage('Turkish title is required'),
  body('slug.en').notEmpty().withMessage('English slug is required'),
  body('slug.ar').notEmpty().withMessage('Arabic slug is required'),
  body('slug.tr').notEmpty().withMessage('Turkish slug is required'),
];
