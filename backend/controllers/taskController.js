import Task from '../models/Task.js';
import ApiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getTaskStats = async (userId) => {
  const [total, pending, completed, highPriority] = await Promise.all([
    Task.countDocuments({ userId }),
    Task.countDocuments({ userId, status: 'pending' }),
    Task.countDocuments({ userId, status: 'completed' }),
    Task.countDocuments({ userId, priority: 'high' })
  ]);

  return { total, pending, completed, highPriority };
};

export const getTasks = asyncHandler(async (req, res) => {
  const validatedQuery = req.validated?.query || req.query;
  const {
    search = '',
    status = 'all',
    priority = 'all',
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = validatedQuery;

  const page = Math.max(Number(validatedQuery.page) || 1, 1);
  const limit = Math.min(Math.max(Number(validatedQuery.limit) || 9, 1), 50);
  const skip = (page - 1) * limit;

  const query = { userId: req.user._id };

  if (status !== 'all') {
    query.status = status;
  }

  if (priority !== 'all') {
    query.priority = priority;
  }

  if (search.trim()) {
    const safeSearch = escapeRegex(search.trim());
    query.$or = [
      { title: { $regex: safeSearch, $options: 'i' } },
      { description: { $regex: safeSearch, $options: 'i' } }
    ];
  }

  const allowedSortFields = ['createdAt', 'updatedAt', 'title', 'priority', 'status'];
  const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';
  const sortDirection = sortOrder === 'asc' ? 1 : -1;

  const [tasks, total, stats] = await Promise.all([
    Task.find(query).sort({ [sortField]: sortDirection }).skip(skip).limit(limit),
    Task.countDocuments(query),
    getTaskStats(req.user._id)
  ]);

  res.json({
    success: true,
    tasks,
    stats,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit) || 1
    }
  });
});

export const createTask = asyncHandler(async (req, res) => {
  const task = await Task.create({
    ...req.body,
    userId: req.user._id
  });

  res.status(201).json({
    success: true,
    task
  });
});

export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!task) {
    throw new ApiError(404, 'Task not found.');
  }

  res.json({
    success: true,
    task
  });
});

export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

  if (!task) {
    throw new ApiError(404, 'Task not found.');
  }

  res.json({
    success: true,
    message: 'Task deleted successfully.'
  });
});

export const updateTaskStatus = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    { status: req.body.status },
    { new: true, runValidators: true }
  );

  if (!task) {
    throw new ApiError(404, 'Task not found.');
  }

  res.json({
    success: true,
    task
  });
});
