//@ts-ignore
import CanvasJSReact from "@canvasjs/react-charts";
// @ts-ignore
import { saveAs } from "file-saver";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import { useEffect, useState } from "react";
import { vacationsService } from "../../../Services/VacationsService";
import { notify } from "../../../Utils/Notify";
import "./Charts.css";
import { useNavigate } from "react-router-dom";
import { UserModel } from "../../../Models/UserModel";
import { VacationModel } from "../../../Models/VacationModel";
import { appStore } from "../../../Redux/Store";
import { Button } from "@mui/material";
import { RoleModel } from "../../../Models/RoleModel";

const CanvasJSChart =
  CanvasJSReact.CanvasJSChart as React.ComponentType<CanvasJSReact.CanvasJSChartOptions>;

function Charts(): JSX.Element {
  // Array of colors for chart
  const colors = ["#477352", "#62B371", "#5DA884"];
  const user = useSelector<AppState, UserModel>((appState) => appState.user);
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const navigate = useNavigate();

  //   Checking user role to only let admins through
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token || user.roleId === RoleModel.User) {
      navigate("/login");
      return;
    }

    vacationsService
      .getVacations(user.id)
      .then((v) => setVacations(v))
      .catch((err) => notify.error(err));
  }, []);

  // Configuration options for CanvasJSChart
  const options: CanvasJSReact.CanvasJSChartOptions = {
    title: {
      text: "Likes Chart",
    },
    data: [
      {
        type: "column",
        dataPoints: vacations.map((vacation, i) => ({
          label: vacation.destination,
          y: vacation.likesCount,
          color: colors[i % colors.length], // Different color for each bar
        })),
      },
    ],
  };

  async function downloadCSV() {
    let file = "Destination , Likes\n"; // CSV file header
    vacations.map(
      (v) =>
        (file +=
          v.destination.replaceAll(",", ":") + " , " + v.likesCount + "\n") // Generating CSV content
    );
    const blob = new Blob([file], { type: "text/plain" }); // Creating blob with CSV content
    saveAs(blob, "vacations_likesCount.csv"); // Downloading CSV file
  }

  return (
    <div className="Charts">
      <div className="charts-container">
        <CanvasJSChart options={options} />
      </div>
      <Button onClick={downloadCSV} variant="contained" color="secondary">
        Download CSV
      </Button>
    </div>
  );
}

export default Charts;
