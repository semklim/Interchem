import Bill from "../models/bill.model.js";
import { createDateBeforeToday } from "../utils/createDateBeforeToday.js";

export const createBill = async (req, res, next) => {
  if (!req.body.userId || !req.body.items || !req.body.items[0] || !req.body.totalPrice) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }

  const createdAt = new Date(req.body.items[0].food.createdAt).setHours(8, 20, 0, 0);

  const newBill = new Bill({
    ...req.body,
    createdAt: new Date(createdAt).toISOString(),
    orderedAt: new Date().toISOString(),
  });

  try {
    const savedPost = await newBill.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const getAllBills = async (req, res, next) => {
  const startIndex = parseInt(req.query.startIndex) || 0;
  const sortDirection = req.query.sort === 'asc' ? 1 : -1;
  const limit = parseInt(req.query.limit) || 9;
  try {
    const totalBills = await Bill.countDocuments({ userId: req.user.id });
    const totalLastMonthBills = await Bill.countDocuments({
      createdAt: { $gte: createDateBeforeToday({ month: 1 }) },
      userId: req.user.id
    }).exec();


    const allBills = await Bill.find({ userId: req.user.id })
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    res.status(201).json({ allBills, totalBills, totalLastMonthBills });
  } catch (error) {
    next(error);
  }
};

export const getLatestBills = async (req, res, next) => {
  try {
    const latestBills = await Bill.find({
      userId: req.user.id,
      createdAt: { $gte: createDateBeforeToday({ day: 1 }) },
    })
      .sort({ createdAt: -1 })
      .exec();

    res.status(201).json({ latestBills });
  } catch (error) {
    next(error);
  }
};

export const deleteBill = async (req, res, next) => {
  try {
    const bill = await Bill.findById(req.params.billId);
    if (!bill) {
      return next(errorHandler(404, 'Bill not found'));
    }
    if (bill.userId !== req.user.id) {
      return next(
        errorHandler(403, 'You are not allowed to delete this bill')
      );
    }
    await Bill.findByIdAndDelete(req.params.billId);
    res.status(200).json('Bill has been deleted');
  } catch (error) {
    next(error);
  }
};