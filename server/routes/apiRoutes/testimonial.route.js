import express from 'express';
import testimonialCtrl from '../../controllers/testimonial.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/users - Get list of testimonial */
  .get(testimonialCtrl.list)

  /** POST /api/users - Create new testimonial */
  .post(testimonialCtrl.create)

router.route('/:id')

   /** DELETE /api/users/:id - Delete testimonial */
  .delete(testimonialCtrl.remove)

  /** GET /api/users/:id - get testimonial */
  .get(testimonialCtrl.getById)

  /** PUT /api/users/:id - Update testimonial */
  .put(testimonialCtrl.update);

export default router;
