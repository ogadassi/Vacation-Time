import express, { NextFunction, Request, Response } from "express";
import { vacationsService } from "../5-services/vacations-service";
import { VacationModel } from "../3-models/vacation-model";
import { StatusCode } from "../3-models/error-enum";
import { fileSaver } from "uploaded-file-saver";
import { securityMiddleware } from "../4-middleware/security-middleware";

// Data controller:
class VacationController {
  // Create a router object for listening to HTTP requests:
  public readonly router = express.Router();

  // Register routes once:
  public constructor() {
    this.registerRoutes();
  }

  // Register routes:
  private registerRoutes(): void {
    this.router.get(
      "/all-vacations/:userId(\\d+)",
      securityMiddleware.verifyLoggedIn,
      this.getVacations
    );
    this.router.get(
      "/vacation/:id(\\d+)",
      securityMiddleware.verifyLoggedIn,
      this.getOneVacation
    );
    this.router.post(
      "/vacation",
      securityMiddleware.verifyLoggedIn,
      securityMiddleware.verifyAdmin,
      this.addVacation
    );
    this.router.put(
      "/vacation/:id(\\d+)",
      securityMiddleware.verifyLoggedIn,
      securityMiddleware.verifyAdmin,
      this.updateVacation
    );
    this.router.delete(
      "/vacation/:id(\\d+)",
      securityMiddleware.verifyLoggedIn,
      securityMiddleware.verifyAdmin,
      this.deleteVacation
    );
    this.router.get("/vacations/images/:imageName", this.getImageFile);
  }

  private async getVacations(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = +request.params.userId;
      const vacations = await vacationsService.getVacations(userId);
      response.json(vacations);
    } catch (err: any) {
      next(err);
    }
  }

  private async getOneVacation(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = +request.params.id;
      const vacation = await vacationsService.getOneVacation(id);
      response.json(vacation);
    } catch (err: any) {
      next(err);
    }
  }
  private async addVacation(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      request.body.image = request.files?.image;
      const vacation = new VacationModel(request.body);
      const addedVacation = await vacationsService.addVacation(vacation);
      response.status(StatusCode.Created).json(addedVacation);
    } catch (err: any) {
      next(err);
    }
  }
  private async updateVacation(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {   
      request.body.id = +request.params.id;
      request.body.image = request.files?.image;
      const vacation = new VacationModel(request.body);
      const updatedVacation = await vacationsService.updateVacation(vacation);
      response.json(updatedVacation);
    } catch (err: any) {
      next(err);
    }
  }
  private async deleteVacation(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = +request.params.id;
      await vacationsService.deleteVacation(id);
      response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
      next(err);
    }
  }
  private async getImageFile(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const imageName = request.params.imageName;
      const imagePath = fileSaver.getFilePath(imageName);
      response.sendFile(imagePath);
    } catch (err: any) {
      next(err);
    }
  }
}

const vacationController = new VacationController();
export const vacationRouter = vacationController.router;
