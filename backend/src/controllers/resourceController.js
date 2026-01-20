const Resource = require('../models/Resource');
const { uploadToS3, deleteFromS3 } = require('../config/storage');
const { calculatePagination } = require('../utils/helpers');

const getAllResources = async (req, res, next) => {
  try {
    const { category, search, page = 1, limit = 10, sort = '-createdAt' } = req.query;

    const query = { isActive: true };

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const { skip, limit: limitNum, page: pageNum } = calculatePagination(page, limit);

    const resources = await Resource.find(query)
      .populate('uploadedBy', 'name avatar')
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    const total = await Resource.countDocuments(query);

    res.status(200).json({
      success: true,
      count: resources.length,
      resources,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
        total
      }
    });
  } catch (error) {
    next(error);
  }
};

const getResourceById = async (req, res, next) => {
  try {
    const resource = await Resource.findById(req.params.id)
      .populate('uploadedBy', 'name avatar');

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    await resource.incrementViews();

    res.status(200).json({
      success: true,
      resource
    });
  } catch (error) {
    next(error);
  }
};

const createResource = async (req, res, next) => {
  try {
    const { title, description, category } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file'
      });
    }

    const uploadResult = await uploadToS3(req.file);

    const resource = await Resource.create({
      title,
      description,
      category,
      fileUrl: uploadResult.url,
      fileKey: uploadResult.key,
      fileName: uploadResult.originalName,
      fileSize: uploadResult.size,
      uploadedBy: req.user.id
    });

    await resource.populate('uploadedBy', 'name avatar');

    res.status(201).json({
      success: true,
      message: 'Resource created successfully',
      resource
    });
  } catch (error) {
    next(error);
  }
};

const updateResource = async (req, res, next) => {
  try {
    const { title, description, category } = req.body;

    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    if (title) resource.title = title;
    if (description) resource.description = description;
    if (category) resource.category = category;

    if (req.file) {
      await deleteFromS3(resource.fileKey);
      
      const uploadResult = await uploadToS3(req.file);
      resource.fileUrl = uploadResult.url;
      resource.fileKey = uploadResult.key;
      resource.fileName = uploadResult.originalName;
      resource.fileSize = uploadResult.size;
    }

    await resource.save();
    await resource.populate('uploadedBy', 'name avatar');

    res.status(200).json({
      success: true,
      message: 'Resource updated successfully',
      resource
    });
  } catch (error) {
    next(error);
  }
};

const deleteResource = async (req, res, next) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    await deleteFromS3(resource.fileKey);
    await resource.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Resource deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

const downloadResource = async (req, res, next) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    await resource.incrementDownloads();

    res.status(200).json({
      success: true,
      downloadUrl: resource.fileUrl,
      fileName: resource.fileName
    });
  } catch (error) {
    next(error);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await Resource.distinct('category', { isActive: true });

    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const count = await Resource.countDocuments({ category, isActive: true });
        return { category, count };
      })
    );

    res.status(200).json({
      success: true,
      categories: categoriesWithCount
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
  downloadResource,
  getCategories
};
