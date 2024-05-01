import axios from "axios";
import appConfig  from "../Utils/AppConfig";
import { jwtDecode } from "jwt-decode";
import { appStore } from "../Redux/Store";
import { authActionCreators } from "../Redux/AuthSlice";
import { CredentialsModel } from "../Models/CredentialsModel";
import { UserModel } from "../Models/UserModel";
import { notify } from "../Utils/Notify";


class AuthService {

  private timerId: any;
  
  public constructor() {
    const token = sessionStorage.getItem("token");
    if (token) {
      const loggedInUser = jwtDecode<{ user: UserModel }>(token).user;
      appStore.dispatch(authActionCreators.login(loggedInUser));
    }
  }

  public async register(user: UserModel): Promise<void> {
    const response = await axios.post<string>(appConfig.registerUrl, user);
    const token = response.data;
    const registeredUser = jwtDecode<{ user: UserModel }>(token).user;
    appStore.dispatch(authActionCreators.register(registeredUser));
    sessionStorage.setItem("token", token);

    this.timerId = setTimeout(() => {
      notify.error("Session timed out");
      this.logout();
    }, 18000000);
  }

  public async login(credentials: CredentialsModel): Promise<void> {
    const response = await axios.post<string>(appConfig.loginUrl, credentials);
    const token = response.data;
    const loggedInUser = jwtDecode<{ user: UserModel }>(token).user;
    appStore.dispatch(authActionCreators.login(loggedInUser));
    sessionStorage.setItem("token", token);

    this.timerId = setTimeout(() => {
      notify.error("Session timed out");
      this.logout();
    }, 18000000);
  }

  public logout(): void {
    appStore.dispatch(authActionCreators.logout());
    sessionStorage.removeItem("token");
    clearTimeout(this.timerId);

  }
}

export const authService = new AuthService();
