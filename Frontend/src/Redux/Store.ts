import { configureStore } from "@reduxjs/toolkit";
import { AppState } from "./AppState";
import { vacationReducerContainer } from "./VacationSlice";
import { authReducersContainer } from "./AuthSlice";

export const appStore = configureStore<AppState>({
  reducer: {
    vacations: vacationReducerContainer,
    user: authReducersContainer,
  },
});
