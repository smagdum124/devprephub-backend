import Blog from "../models/Blog.js";

export const createBlog = async (
  req,
  res
) => {
  try {
    const {
      title,
      slug,
      description,
      content,
    } = req.body;

    const existingBlog =
      await Blog.findOne({
        $or: [
          { title },
          { slug },
        ],
      });

    if (existingBlog) {
      return res.status(400).json({
        success: false,
        message:
          "Blog already exists",
      });
    }

    const blog =
      await Blog.create({
        title,
        slug,
        description,
        content,
      });

    res.status(201).json({
      success: true,
      message:
        "Blog added successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getBlogs = async (
  req,
  res
) => {
  try {
    const blogs = await Blog.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBlogBySlug = async (
  req,
  res
) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBlog = async (
  req,
  res
) => {
  try {
    const blog =
      await Blog.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBlog = async (
  req,
  res
) => {
  try {
    const blog = await Blog.findById(
      req.params.id
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    await blog.deleteOne();

    res.json({
      success: true,
      message:
        "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};