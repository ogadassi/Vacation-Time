import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { VacationModel } from "../Models/VacationModel";

function initAll(
  currentState: VacationModel[],
  action: PayloadAction<VacationModel[]>
): VacationModel[] {
  const newState = action.payload;
  return newState;
}

function addOne(
  currentState: VacationModel[],
  action: PayloadAction<VacationModel>
): VacationModel[] {
  const newState = [...currentState, action.payload];
  return newState;
}

function updateOne(
  currentState: VacationModel[],
  action: PayloadAction<VacationModel>
): VacationModel[] {
  const newState = [...currentState];
  const index = newState.findIndex((v) => v.id === action.payload.id);
  if (index >= 0) newState[index] = action.payload;
  return newState;
}

function deleteOne(
  currentState: VacationModel[],
  action: PayloadAction<number>
): VacationModel[] {
  const newState = [...currentState];
  const index = newState.findIndex((v) => v.id === action.payload);
  if (index >= 0) newState.splice(index, 1);
  return newState;
}

const vacationSlice = createSlice({
  name: "vacations",
  initialState: [],
  reducers: { initAll, addOne, updateOne, deleteOne },
});

export const vacationActionsCreator = vacationSlice.actions;
export const vacationReducerContainer = vacationSlice.reducer;
