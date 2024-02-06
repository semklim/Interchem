import Food from '../models/food.model.js';
import { errorHandler } from '../utils/error.js';

export const create = async (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }
  const newFood = new Food({
    ...req.body,
  });
  try {
    const savedPost = await newFood.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const getfoods = async (req, res, next) => {
  try {
    const food = await Food.find();
    res.status(200).json({
      food,
    });
  } catch (error) {
    next(error);
  }
};

export const getFoodByShift = async (req, res, next) => {
  if (!req.query.shift) {
    return next(errorHandler(403, 'you are forgot set the shift'));
  }
  const shift = req.query.shift;
  try {
    const food = await Food.find({ shift }).exec();

    res.status(200).json({
      food,
    });
  } catch (error) {
    next(error);
  }
};

export const deletepost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this food'));
  }
  try {
    await Food.findByIdAndDelete(req.params.postId);
    res.status(200).json('The food has been deleted');
  } catch (error) {
    next(error);
  }
};

export const updatepost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this food'));
  }
  try {
    const updatedPost = await Food.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};
