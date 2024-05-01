import "./Login.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { appStore } from "../../../Redux/Store";
import { authService } from "../../../Services/AuthService";
import { notify } from "../../../Utils/Notify";
import { CredentialsModel } from "../../../Models/CredentialsModel";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserModel } from "../../../Models/UserModel";
import { AppState } from "../../../Redux/AppState";
import { Button, TextField } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useEffect } from "react";
import logoImg from "../../../Assets/Images/logo.png";
import mobileLogoImg from "../../../Assets/Images/Untitled (3).png";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";

function Login(): JSX.Element {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<CredentialsModel>();

  // Retrieving user information from Redux state
  const user = useSelector<AppState, UserModel>((AppState) => AppState.user);
  // Redirecting if user is already logged in
  useEffect(() => {
    if (user) navigate("/list");
  }, []);

  // Function to handle form submission and login process
  async function send(credentials: CredentialsModel) {
    try {
      await authService.login(credentials);
      const firstName = appStore.getState().user.firstName;
      notify.success(`Welcome back ${firstName}!`);
    } catch (err: any) {
      notify.error(err);
    }
  }

  return (
    <div className="Login">
      <div className="logoContainer">
        <img className="logo-img" src={logoImg} />
        <img className="mobile-logo-img" src={mobileLogoImg} />
        <br />
        <Button href="https://github.com/ogadassi?tab=repositories">
          <GitHubIcon fontSize="large" />
        </Button>
        <Button href="https://www.linkedin.com/in/ohad-gadassi-b488b5133/">
          <LinkedInIcon fontSize="large" />
        </Button>
        <Button href="https://www.youtube.com/channel/UCSGKuANRL1CowGLn8FDElBg">
          <YouTubeIcon fontSize="large" />
        </Button>
      </div>

      <form onSubmit={handleSubmit(send)}>
        <TextField
          required
          inputProps={{ minLength: 8, maxLength: 50 }}
          label="Email"
          type="email"
          className="text-box"
          {...register("email")}
        />
        <TextField
          required
          inputProps={{ minLength: 8, maxLength: 30 }}
          label="Password"
          type="password"
          className="text-box"
          {...register("password")}
        />
        <Button type="submit" variant="contained" endIcon={<LoginIcon />}>
          Login
        </Button>
        <br />
        <span>
          New around here?
          {` `}
          <NavLink to={"/register"}>
            <strong>Join us now!</strong>
          </NavLink>
        </span>
      </form>
    </div>
  );
}

export default Login;
