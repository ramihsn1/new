import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { config } from './config';
import { connectDB } from './config/database';
import { notFound, errorHandler } from './middleware/errorHandler';

import authRoutes from './routes/auth';
import newsRoutes from './routes/news';
import publicRoutes from './routes/public';
import commonRoutes from './routes/common';
import createCRUDRoutes from './routes/crudFactory';

import Service from './models/Service';
import Publication from './models/Publication';
import Event from './models/Event';
import Project from './models/Project';
import Team from './models/Team';
import Partner from './models/Partner';
import FAQ from './models/FAQ';
import Testimonial from './models/Testimonial';
import PageContent from './models/PageContent';

const app = express();

app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
app.use(cors({ origin: config.cors.origin, credentials: true }));
app.use(compression());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

app.use((req, _res, next) => {
  const sanitize = (obj: any): any => {
    if (!obj || typeof obj !== 'object') return obj;
    for (const key of Object.keys(obj)) {
      if (key.startsWith('$') || key.includes('.')) {
        delete obj[key];
      } else if (typeof obj[key] === 'object') {
        sanitize(obj[key]);
      }
    }
    return obj;
  };
  if (req.body) sanitize(req.body);
  next();
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests, please try again later' },
});
app.use('/api/', limiter);

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'API is running', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/public', publicRoutes);
app.use('/api', commonRoutes);

app.use('/api/services', createCRUDRoutes(Service, 'service'));
app.use('/api/publications', createCRUDRoutes(Publication, 'publication'));
app.use('/api/events', createCRUDRoutes(Event, 'event'));
app.use('/api/projects', createCRUDRoutes(Project, 'project'));
app.use('/api/team', createCRUDRoutes(Team, 'team'));
app.use('/api/partners', createCRUDRoutes(Partner, 'partner'));
app.use('/api/faq', createCRUDRoutes(FAQ, 'faq'));
app.use('/api/testimonials', createCRUDRoutes(Testimonial, 'testimonial'));
app.use('/api/pages', createCRUDRoutes(PageContent, 'page'));

app.get('/api/sitemap', async (_req, res) => {
  try {
    const baseUrl = config.cors.origin;
    const News = require('./models/News').default;
    const Event = require('./models/Event').default;
    const Service = require('./models/Service').default;
    const Publication = require('./models/Publication').default;

    const locales = ['en', 'ar', 'tr'];
    const urls: { url: string; lastmod: string; changefreq: string; priority: number }[] = [];

    const staticPages = ['', '/about', '/services', '/publications', '/news', '/events', '/projects', '/team', '/partners', '/media-center', '/faq', '/contact', '/privacy', '/terms'];

    for (const locale of locales) {
      for (const page of staticPages) {
        urls.push({ url: `${baseUrl}/${locale}${page}`, lastmod: new Date().toISOString(), changefreq: 'weekly', priority: page === '' ? 1 : 0.8 });
      }
    }

    const [news, events, services, publications] = await Promise.all([
      News.find({ status: 'published' }).select('slug.en'),
      Event.find({ status: 'published' }).select('slug.en'),
      Service.find({ status: 'published' }).select('slug.en'),
      Publication.find({ status: 'published' }).select('slug.en'),
    ]);

    for (const locale of locales) {
      for (const item of news) urls.push({ url: `${baseUrl}/${locale}/news/${item.slug.en}`, lastmod: (item as any).updatedAt?.toISOString() || new Date().toISOString(), changefreq: 'daily', priority: 0.7 });
      for (const item of events) urls.push({ url: `${baseUrl}/${locale}/events/${item.slug.en}`, lastmod: (item as any).updatedAt?.toISOString() || new Date().toISOString(), changefreq: 'daily', priority: 0.7 });
      for (const item of services) urls.push({ url: `${baseUrl}/${locale}/services/${item.slug.en}`, lastmod: (item as any).updatedAt?.toISOString() || new Date().toISOString(), changefreq: 'monthly', priority: 0.7 });
      for (const item of publications) urls.push({ url: `${baseUrl}/${locale}/publications/${item.slug.en}`, lastmod: (item as any).updatedAt?.toISOString() || new Date().toISOString(), changefreq: 'monthly', priority: 0.7 });
    }

    res.setHeader('Content-Type', 'application/xml');
    const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(u => `<url><loc>${u.url}</loc><lastmod>${u.lastmod}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`).join('')}</urlset>`;
    res.send(xml);
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  await connectDB();
  app.listen(config.port, () => {
    console.log(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
  });
};

startServer();

export default app;
