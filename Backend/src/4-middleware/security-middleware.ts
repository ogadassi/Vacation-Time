import { NextFunction, Request, Response } from "express";
import { cyber } from "../2-utils/cyber";
import { UnauthorizedError } from "../3-models/client-errors";

class SecurityMiddleware {
  public verifyLoggedIn(
    request: Request,
    response: Response,
    next: NextFunction
  ): void {
    const authorizationHeader = request.header("authorization");

    const token = authorizationHeader?.substring(7); // 7 --> token index

    // If token not valid:
    if (!cyber.isTokenValid(token)) {
      const err = new UnauthorizedError("You are not logged in.");
      next(err);
    } else {
      next();
    }
  }

  // Verify admin:
  public verifyAdmin(
    request: Request,
    response: Response,
    next: NextFunction
  ): void {
    // Get authorization header:
    const authorizationHeader = request.header("authorization");

    const token = authorizationHeader?.substring(7); // 7 --> token index

    // If user is not admin:
    if (!cyber.isAdmin(token)) {
      const err = new UnauthorizedError("You are not authorized.");
      next(err);
    } else {
      next();
    }
  }
}

export const securityMiddleware = new SecurityMiddleware();
