import "./Routing.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Page404 from "../page404/page404";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import List from "../../VacationArea/List/List";
import Add from "../../VacationArea/Add/Add";
import EditVacation from "../../VacationArea/EditVacation/EditVacation";
import Charts from "../../VacationArea/Charts/Charts";

function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        {/* Charts: */}
        <Route path={"/charts"} element={<Charts />} />

        {/* List: */}
        <Route path="/list" element={<List />} />

        {/* Vacation Edit: */}
        <Route path="/vacations/edit/:id" element={<EditVacation />} />

        {/* Add: */}
        <Route path="/add" element={<Add />} />

        {/* Register: */}
        <Route path="/register" element={<Register />} />

        {/* Login: */}
        <Route path="/login" element={<Login />} />

        {/* Default Route: */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Page not found route: */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default Routing;
