import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletepost, getfoods, getFoodByShift, updatepost } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create)
router.get('/all-food', getfoods)
router.get('/food-by-shift', getFoodByShift)
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost)
router.put('/updatepost/:postId/:userId', verifyToken, updatepost)


export default router;