import { NextFunction, Request, Response } from "express";

import { RouteNotFoundError } from "../3-models/client-errors";
import { logger } from "../2-utils/logger";
import { appConfig } from "../2-utils/app-config";
import { StatusCode } from "../3-models/error-enum";

class ErrorsMiddleware {
  // Route not found:
  public routeNotFound(
    request: Request,
    response: Response,
    next: NextFunction
  ): void {
    // Create client error:
    const err = new RouteNotFoundError(request.originalUrl);

    // Go to catch-all:
    next(err);
  }

  // Catch all:
  public catchAll(
    err: any,
    request: Request,
    response: Response,
    next: NextFunction
  ): void {
    // Log error to console:
    console.log(err);

    // Log error to file:
    logger.logError(err);

    // Take error status:
    const status = err.status || StatusCode.InternalServerError;

    // Take error message:
    const message =
      status === StatusCode.InternalServerError && appConfig.isProduction
        ? "Some error, please try again later."
        : err.message;

    // Response the error:
    response.status(status).send(message);
  }
}

export const errorsMiddleware = new ErrorsMiddleware();
