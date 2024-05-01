import { useEffect } from "react";
import "./page404.css";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserModel } from "../../../Models/UserModel";
import { AppState } from "../../../Redux/AppState";

function Page404(): JSX.Element {
  const navigate = useNavigate();

  //   get user from global state
  const user = useSelector<AppState, UserModel>((AppState) => AppState.user);
  //   navigate to login if !user
  useEffect(() => {
    if (!user) {
      navigate("/list");
      return;
    }
  }, []);

  return (
    <div className="page404">
      <p className="return">The page you are looking for doesn't exist.</p>

      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/t3otBjVZzT0?autoplay=true"
        allow="autoplay"
        title="Page not Found"
      ></iframe>
      <br />
      <br />
      <br />

      <NavLink to={"/list"} className="return">
        Return Home
      </NavLink>
    </div>
  );
}

export default Page404;
