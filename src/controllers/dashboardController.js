import User from "../models/User.js";
import Question from "../models/Question.js";
import Blog from "../models/Blog.js";
import ResumeTip from "../models/ResumeTip.js";
import Contact from "../models/Contact.js";

export const getDashboardStats =
  async (req, res) => {
    try {
      const totalUsers =
        await User.countDocuments();

      const totalQuestions =
        await Question.countDocuments();

      const totalBlogs =
        await Blog.countDocuments();

      const totalResumeTips =
        await ResumeTip.countDocuments();
      const totalContacts = 
      await Contact.countDocuments();

      res.json({
        success: true,
        stats: {
          totalUsers,
          totalQuestions,
          totalBlogs,
          totalResumeTips,
          totalContacts
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };