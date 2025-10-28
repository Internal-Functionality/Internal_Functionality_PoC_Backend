import { Router } from 'express';
import * as ActivityController from './bookings.controller';

const router = Router();

router.get('/fixer-activity', ActivityController.getFixerActivity);
router.patch('/fixer-activity/:id/accept', ActivityController.acceptBooking);
router.patch('/fixer-activity/:id/cancel', ActivityController.cancelBooking);
router.get('/activity/by-range', ActivityController.getBookingsByDateRange);
router.get('/activity/accepted', ActivityController.getAcceptedBookings);
router.get('/activity/cancelled', ActivityController.getCancelledBookings);
export default router;
