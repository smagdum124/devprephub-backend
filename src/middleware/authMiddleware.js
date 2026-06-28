import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  try {

    console.log("HEADERS:", req.headers);

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      console.log("TOKEN:", token);

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req.user = decoded;

      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

  } catch (error) {
    console.log("JWT ERROR:", error);

    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export default protect;