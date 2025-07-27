import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

//Protected Routes token base
export const authMiddleware = (req, res, next) => {
  
  // Get the token from the 'Authorization' header in the request
  // Expected format: 'Bearer <token>', so we split it to get the token part
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).send({
      message: "Unauthorized Token",
      success: false
    });
  }

  try {
    // Verify the token using the secret key
    // If the token is valid, it will decode and return the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = decoded; // Attach user info to request

    // If you want to attach specific user info to the request object, you can do so
    // req.user = {
    //   userId: decoded.userId,
    //   email: decoded.email
    // };

    next();
  } catch (error) {
    return res.status(401).send({
      message: "Invalid token",
      success: false
    });
  }
};