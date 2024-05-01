import "./Menu.css";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import ReorderIcon from "@mui/icons-material/Reorder";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserModel } from "../../../Models/UserModel";
import { AppState } from "../../../Redux/AppState";
import { RoleModel } from "../../../Models/RoleModel";
import BarChartIcon from "@mui/icons-material/BarChart";

function Menu(): JSX.Element {
  const [value, setValue] = useState(0);
  const user = useSelector<AppState, UserModel>((appState) => appState.user);

  // If user is not logged in, return nothing
  if (!user) return;
  // If user is a regular user, show limited navigation
  else if (user.roleId === RoleModel.User)
    return (
      <div className="Menu">
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Vacations"
            icon={<ReorderIcon />}
            component={Link}
            to="/list"
          />
        </BottomNavigation>
      </div>
    );

  // If user is an admin, show full navigation
  return (
    <div className="Menu">
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Vacations"
          icon={<ReorderIcon />}
          component={Link}
          to="/list"
        />

        <BottomNavigationAction
          label="Charts"
          icon={<BarChartIcon />}
          component={Link}
          to="/charts"
        />

        <BottomNavigationAction
          label="Add"
          icon={<AddIcon />}
          component={Link}
          to="/add"
        />
      </BottomNavigation>
    </div>
  );
}

export default Menu;
