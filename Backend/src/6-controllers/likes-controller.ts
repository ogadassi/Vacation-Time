import express, { Request, Response, NextFunction } from "express";
import { likesService } from "../5-services/likes-service";
import { StatusCode } from "../3-models/error-enum";
import { securityMiddleware } from "../4-middleware/security-middleware";

class LikesController {
  public readonly router = express.Router();

  public constructor() {
    this.registerRoutes();
  }

  private registerRoutes(): void {
    this.router.post(
      "/like/user/:userId(\\d+)/vacation/:vacationId(\\d+)",
      securityMiddleware.verifyLoggedIn,
      this.addLike
    );

    this.router.delete(
      "/like/user/:userId(\\d+)/vacation/:vacationId(\\d+)",
      securityMiddleware.verifyLoggedIn,
      this.removeLike
    );
  }

  private async addLike(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = +request.params.userId;
      const vacationId = +request.params.vacationId;
      await likesService.addLike(userId, vacationId);
      response.sendStatus(StatusCode.Created);
    } catch (err: any) {
      next(err);
    }
  }
  private async removeLike(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = +request.params.userId;
      const vacationId = +request.params.vacationId;
      await likesService.removeLike(userId, vacationId);
      response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
      next(err);
    }
  }
}

const likeController = new LikesController();
export const likeRouter = likeController.router;
