import Newsletter from "../models/Newsletter.js";

export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const existing = await Newsletter.findOne({
      email,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email already subscribed",
      });
    }

    const subscriber =
      await Newsletter.create({
        email,
      });

    res.status(201).json({
      success: true,
      message: "Subscribed successfully",
      subscriber,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSubscribers = async (req, res) => {
  try {
    const subscribers =
      await Newsletter.find().sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      subscribers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteSubscriber = async (
  req,
  res
) => {
  try {
    await Newsletter.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Subscriber deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};