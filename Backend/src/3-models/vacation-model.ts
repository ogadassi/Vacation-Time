import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { ValidationError } from "./client-errors";

export class VacationModel {
  public id: number;
  public destination: string;
  public description: string;
  public startDate: Date;
  public endDate: Date;
  public price: number;
  public image: UploadedFile;
  public imageUrl: string;
  public isLiked: number;
  public likesCount: number;

  public constructor(vacation: VacationModel) {
    this.id = vacation.id;
    this.destination = vacation.destination;
    this.description = vacation.description;
    this.startDate = vacation.startDate;
    this.endDate = vacation.endDate;
    this.price = vacation.price;
    this.image = vacation.image;
    this.imageUrl = vacation.imageUrl;
    this.isLiked = vacation.isLiked;
    this.likesCount = vacation.likesCount;
  }

  public static insertValidationSchema = Joi.object({
    id: Joi.number().forbidden(),
    destination: Joi.string().required().max(45).min(2),
    description: Joi.string().required().max(1000).min(100),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    price: Joi.number().required().max(9999.99).min(100),
    image: Joi.object().required(),
    imageUrl: Joi.string().optional().max(200),
    isLiked: Joi.number().forbidden().integer().min(0).max(1),
    likesCount: Joi.number().forbidden().integer(),
  });

  public static updateValidationSchema = Joi.object({
    id: Joi.number().required().min(1).integer(),
    destination: Joi.string().required().max(45).min(2),
    description: Joi.string().required().max(1000).min(100),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    price: Joi.number().required().max(9999.99).min(100),
    image: Joi.object().optional(),
    imageUrl: Joi.string().optional().max(200),
    isLiked: Joi.number().forbidden().integer().min(0).max(1),
    likesCount: Joi.number().forbidden().integer(),
  });

  public validateInsert(): void {
    const result = VacationModel.insertValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }

  public validateUpdate(): void {
    const result = VacationModel.updateValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }
}
