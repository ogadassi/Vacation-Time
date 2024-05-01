import Joi from "joi";
import { ValidationError } from "./client-errors";

export class CredentialsModel {
  public email: string;
  public password: string;

  public constructor(user: CredentialsModel) {
    this.email = user.email;
    this.password = user.password;
  }

  public static validationSchema = Joi.object({
    email: Joi.string().email().required().min(8).max(50),
    password: Joi.string().required().min(8).max(30),
  });

  public validate(): void {
    const result = CredentialsModel.validationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }
}
