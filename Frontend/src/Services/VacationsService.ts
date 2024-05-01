import axios from "axios";
import { VacationModel } from "../Models/VacationModel";
import appConfig  from "../Utils/AppConfig";
import { appStore } from "../Redux/Store";
import { vacationActionsCreator } from "../Redux/VacationSlice";

class VacationsService {
    public async getVacations(userId: number): Promise<VacationModel[]> {
        const response = await axios.get<VacationModel[]>(
            appConfig.vacationsPerUserUrl + userId
        );
        const vacations = response.data;
        appStore.dispatch(vacationActionsCreator.initAll(vacations));
        return vacations;
    }
    public async getOneVacation(id: number): Promise<VacationModel> {
        let vacations = appStore.getState().vacations;
        let vacation = vacations.find((v) => v.id === id);
        if (vacation) return vacation;

        const response = await axios.get<VacationModel>(appConfig.vacation + id);
        vacation = response.data;
        return vacation;
    }

    public async addVacation(vacation: VacationModel): Promise<void> {
        const response = await axios.post<VacationModel>(
            appConfig.vacation,
            vacation,
            appConfig.axiosOptions
        );
        const addedVacation = response.data;
        const action = vacationActionsCreator.addOne(addedVacation);
        appStore.dispatch(action);
    }

    public async updateVacation(vacation: VacationModel): Promise<void> {
        const response = await axios.put<VacationModel>(
            appConfig.vacation + vacation.id,
            vacation,
            appConfig.axiosOptions
        );
        const updatedVacation = response.data;
        const action = vacationActionsCreator.updateOne(updatedVacation);
        appStore.dispatch(action);
    }

    public async deleteVacation(id: number): Promise<void> {
        await axios.delete(appConfig.vacation + id);
        const action = vacationActionsCreator.deleteOne(id);
        appStore.dispatch(action);
    }

    public async addLike(vacation: VacationModel): Promise<void> {
        await axios.post(appConfig.likeUrl + 'user/' + appStore.getState().user.id + '/vacation/' + vacation.id)
        await this.getVacations(appStore.getState().user.id);
    }

    public async removeLike(vacation: VacationModel): Promise<void> {
        await axios.delete(appConfig.likeUrl + 'user/' + appStore.getState().user.id + '/vacation/' + vacation.id)
        await this.getVacations(appStore.getState().user.id);
    }
}

export const vacationsService = new VacationsService();
