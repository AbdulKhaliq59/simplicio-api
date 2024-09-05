import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const isAdmin = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  if (!authorizationHeader) {
    return res.status(401).json({
      error: "Unauthorized.",
    });
  }
  const token = authorizationHeader.replace("Bearer ", "");
  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userRole = decodedToken.role;
    if (userRole === "admin") {
      next();
    } else {
      res.status(403).json({
        error: "Access denied. ",
      });
    }
  } catch (error) {
    res.status(401).json({
      error: "Unauthorized. Invalid token",
    });
  }
};

export const isAdminOrManager = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  if (!authorizationHeader) {
    console.log("No authorization header found.");
    return res.status(401).json({
      error: "Unauthorized.",
    });
  }

  const token = authorizationHeader.replace("Bearer ", "");
  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userRole = decodedToken.role;
    if (userRole === "admin" || userRole === "manager") {
      req.userId = decodedToken.userId;
      next();
    } else {
      res.status(403).json({
        error: "Access denied.",
      });
    }
  } catch (error) {
    console.log("Token verification failed:", error);
    res.status(401).json({
      error: "Unauthorized. Invalid token.",
    });
  }
};

export const isAuthenticated = (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];

  // If token exists, verify and attach user info to the request
  if (authorizationHeader) {
    const token = authorizationHeader.replace('Bearer ', '');
    try {
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = decodedToken; // Attach decoded token data to the request
      console.log("Authenticated user:", req.user);
    } catch (error) {
      return res.status(401).json({
        error: 'Unauthorized. Invalid token.',
      });
    }
  }
  next(); // Proceed regardless of token presence
};

