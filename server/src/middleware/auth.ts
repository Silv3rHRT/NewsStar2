import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  username: string;
}

interface RequestWithUser extends Request {
  user: JwtPayload;
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  console.log(req.headers);
  // Check if the authorization header is present
  if (!authHeader) {
    res.status(500).json({
      message: "No authorisation header present in request",
    });
    return;
  }

  // Extract the token from the authorization header
  const token = authHeader.split(" ")[1];

  // Get the secret key from the environment variables
  const secretKey = process.env.JWT_SECRET_KEY || "";

  // Verify the JWT token
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.log("failed to verify token", err);
      return res.sendStatus(403); // Send forbidden status if the token is invalid
    }

    // Attach the user information to the request object
    (req as RequestWithUser).user = user as JwtPayload;
    return next(); // Call the next middleware function
  });

  return;
};
