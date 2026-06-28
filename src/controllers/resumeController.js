import ResumeTip from "../models/ResumeTip.js";
export const createResumeTip = async (req, res) => {
  try {
    const {
      title,
      slug,
      description,
      content,
    } = req.body;

    const existingTip =
      await ResumeTip.findOne({
        $or: [
          { slug },
          { title },
        ],
      });

    if (existingTip) {
      return res.status(400).json({
        success: false,
        message:
          "Resume Tip already exists",
      });
    }

    const tip =
      await ResumeTip.create({
        title,
        slug,
        description,
        content,
      });

    res.status(201).json({
      success: true,
      message:
        "Resume Tip added successfully",
      tip,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// Get All Resume Tips
// =======================
export const getResumeTips = async (
  req,
  res
) => {
  try {
    const tips =
      await ResumeTip.find().sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      count: tips.length,
      tips,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// Get Resume Tip By Slug
// =======================
export const getResumeTipBySlug =
  async (req, res) => {
    try {
      const tip =
        await ResumeTip.findOne({
          slug: req.params.slug,
        });

      if (!tip) {
        return res.status(404).json({
          success: false,
          message:
            "Resume Tip not found",
        });
      }

      res.json({
        success: true,
        tip,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// =======================
// Update Resume Tip
// =======================
export const updateResumeTip =
  async (req, res) => {
    try {
      const {
        title,
        slug,
      } = req.body;

      const duplicate =
        await ResumeTip.findOne({
          $or: [
            { slug },
            { title },
          ],
          _id: {
            $ne: req.params.id,
          },
        });

      if (duplicate) {
        return res.status(400).json({
          success: false,
          message:
            "Resume Tip already exists",
        });
      }

      const tip =
        await ResumeTip.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );

      if (!tip) {
        return res.status(404).json({
          success: false,
          message:
            "Resume Tip not found",
        });
      }

      res.json({
        success: true,
        message:
          "Resume Tip updated successfully",
        tip,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// =======================
// Delete Resume Tip
// =======================
export const deleteResumeTip =
  async (req, res) => {
    try {
      const tip =
        await ResumeTip.findById(
          req.params.id
        );

      if (!tip) {
        return res.status(404).json({
          success: false,
          message:
            "Resume Tip not found",
        });
      }

      await tip.deleteOne();

      res.json({
        success: true,
        message:
          "Resume Tip deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };