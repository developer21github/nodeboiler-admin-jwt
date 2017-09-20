import express from 'express';
import userRoutes from './user.route';
import adminRoutes from './admin.route';
import testimonialRoutes from './testimonial.route';
import portfolioRoutes from './portfolio.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /api/users
router.use('/api/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', adminRoutes);

router.use('/testimonial',testimonialRoutes);

router.use('/portfolio',portfolioRoutes);

export default router;
