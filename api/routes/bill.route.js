import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createBill, deleteBill, getAllBills, getLatestBills } from '../controllers/bill.controller.js';
const router = express.Router();

router.post('/create', verifyToken, createBill);
router.get('/all', verifyToken, getAllBills);
router.get('/latest', verifyToken, getLatestBills);
router.delete('/delete/:billId', verifyToken, deleteBill)

export default router;