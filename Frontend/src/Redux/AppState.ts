import { UserModel } from "../Models/UserModel";
import { VacationModel } from "../Models/VacationModel";

export type AppState = {
  vacations: VacationModel[];
  user: UserModel;
};
