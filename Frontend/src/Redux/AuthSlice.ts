import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserModel } from "../Models/UserModel";

function register(
  currentState: UserModel,
  action: PayloadAction<UserModel>
): UserModel {
  const registeredUser = action.payload;
  const newState = registeredUser;
  return newState;
}

function login(
  currentState: UserModel,
  action: PayloadAction<UserModel>
): UserModel {
  const loggedInUser = action.payload;
  const newState = loggedInUser;
  return newState;
}

function logout(currentState: UserModel, action: PayloadAction): UserModel {
  return null;
}

const authSlice = createSlice({
  name: "auth",
  initialState: null,
  reducers: { register, login, logout },
});

export const authActionCreators = authSlice.actions;
export const authReducersContainer = authSlice.reducer;
