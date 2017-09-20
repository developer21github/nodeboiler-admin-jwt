import express from 'express';
import portfolioCtrl from '../../controllers/portfolio.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/portfolio - Get list of portfolio */
  .get(portfolioCtrl.list)

  /** POST /api/portfolio - Create new portfolio */
  .post(portfolioCtrl.create)

router.route('/:id')

/** GET /api/portfolio/:id - Get list of portfolio by id */
  .delete(portfolioCtrl.remove)

export default router;


