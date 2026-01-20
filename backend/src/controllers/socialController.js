const SocialLink = require('../models/SocialLink');

const getAllLinks = async (req, res, next) => {
  try {
    const links = await SocialLink.getActiveLinks();

    const linksObject = links.reduce((acc, link) => {
      acc[link.platform] = {
        url: link.url,
        order: link.order
      };
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      links: linksObject
    });
  } catch (error) {
    next(error);
  }
};

const updateLinks = async (req, res, next) => {
  try {
    const updates = req.body;

    const updatePromises = Object.keys(updates).map(async (platform) => {
      const linkData = updates[platform];
      
      return SocialLink.findOneAndUpdate(
        { platform },
        {
          platform,
          url: linkData.url || linkData,
          order: linkData.order || 0,
          isActive: linkData.isActive !== undefined ? linkData.isActive : true
        },
        { upsert: true, new: true, runValidators: true }
      );
    });

    await Promise.all(updatePromises);

    const updatedLinks = await SocialLink.getActiveLinks();

    res.status(200).json({
      success: true,
      message: 'Social links updated successfully',
      links: updatedLinks
    });
  } catch (error) {
    next(error);
  }
};

const deleteLink = async (req, res, next) => {
  try {
    const { platform } = req.params;

    const link = await SocialLink.findOne({ platform });

    if (!link) {
      return res.status(404).json({
        success: false,
        message: 'Social link not found'
      });
    }

    await link.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Social link deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

const toggleLinkStatus = async (req, res, next) => {
  try {
    const { platform } = req.params;

    const link = await SocialLink.findOne({ platform });

    if (!link) {
      return res.status(404).json({
        success: false,
        message: 'Social link not found'
      });
    }

    link.isActive = !link.isActive;
    await link.save();

    res.status(200).json({
      success: true,
      message: `Social link ${link.isActive ? 'activated' : 'deactivated'} successfully`,
      link
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllLinks,
  updateLinks,
  deleteLink,
  toggleLinkStatus
};
