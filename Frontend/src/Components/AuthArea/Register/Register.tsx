import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { authService } from "../../../Services/AuthService";
import "./Register.css";
import { notify } from "../../../Utils/Notify";
import { UserModel } from "../../../Models/UserModel";
import logoImg from "../../../Assets/Images/logo.png";
import mobileLogoImg from "../../../Assets/Images/Untitled (3).png";
import { Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";

function Register(): JSX.Element {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<UserModel>();

  // Retrieving user information from Redux state
  const user = useSelector<AppState, UserModel>((AppState) => AppState.user);
  // Redirecting if user is already logged in
  useEffect(() => {
    if (user) navigate("/list");
  }, []);
  // Function to handle form submission and user registration
  async function send(user: UserModel) {
    try {
      await authService.register(user);
      const fullName = `${user.firstName} ${user.lastName}`;
      notify.success(`Welcome ${fullName}!`);
    } catch (err: any) {
      notify.error(err);
    }
  }

  return (
    <div className="Register">
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
        <br />
        <TextField
          required
          inputProps={{ minLength: 2, maxLength: 30 }}
          label="First Name"
          type="text"
          className="text-box"
          {...register("firstName")}
        />
        <TextField
          required
          inputProps={{ minLength: 2, maxLength: 45 }}
          label="Last Name"
          type="text"
          className="text-box"
          {...register("lastName")}
        />

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

        <Button type="submit" variant="contained">
          Register
        </Button>
        <br />
        <span className="login">
          Already an insider?{" "}
          <NavLink to={"/login"}>
            <strong>Log In</strong>
          </NavLink>
        </span>
      </form>
    </div>
  );
}

export default Register;
