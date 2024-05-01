import { ChangeEvent, useEffect, useRef, useState } from "react";
import "./List.css";
import { vacationsService } from "../../../Services/VacationsService";
import { notify } from "../../../Utils/Notify";
import VacationCard from "../VacationCard/VacationCard";
import { useNavigate } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import { appStore } from "../../../Redux/Store";
import { FormGroup } from "@mui/material";
import { VacationModel } from "../../../Models/VacationModel";
import { RoleModel } from "../../../Models/RoleModel";

function List(): JSX.Element {
  const navigate = useNavigate();
  const vacations = useSelector((appState: AppState) => appState.vacations);
  const [currentPage, setCurrentPage] = useState(1);
  const token = sessionStorage.getItem("token");
  const [currentVacation, setCurrentVacations] = useState<VacationModel[]>([]);
  const listRef = useRef<HTMLDivElement>();
  const [filteredVacations, setFilteredVacations] = useState<VacationModel[]>(
    []
  );

  //   checking for token and retrieving vacations for valid users
  useEffect(() => {
    try {
      if (!token) {
        navigate("/login");
        return;
      }
      vacationsService
        .getVacations(appStore.getState().user.id)
        .then((v) => {
          setFilteredVacations(v);
          setCurrentVacations(v.slice(0, 9));
        })
        .catch((err) => notify.error(err));
    } catch (err: any) {
      notify.error(err);
    }
  }, []);

  //   Handling each button press to apply requested filter
  const [liked, setLiked] = useState<boolean>(false);
  function handleLikedChange(event: ChangeEvent<HTMLInputElement>): void {
    setLiked(event.target.checked);
  }

  const [current, setCurrent] = useState<boolean>(false);
  function handleCurrentChange(event: ChangeEvent<HTMLInputElement>): void {
    setCurrent(event.target.checked);
  }

  const [upcoming, setUpcoming] = useState<boolean>(false);
  function handleUpcomingChange(event: ChangeEvent<HTMLInputElement>): void {
    setUpcoming(event.target.checked);
  }

  //   Using tempArr by adding to it the appropriate vacations (by filter)
  useEffect(() => {
    let tempArr: VacationModel[] = [];

    if (liked)
      tempArr = tempArr.concat(vacations.filter((v) => v.isLiked === 1));

    if (current)
      tempArr = tempArr.concat(
        vacations.filter(
          (v) =>
            new Date(v.startDate).getTime() <= new Date().getTime() &&
            new Date(v.endDate).getTime() >= new Date().getTime()
        )
      );

    if (upcoming)
      tempArr = tempArr.concat(
        vacations.filter(
          (v) => new Date(v.startDate).getTime() > new Date().getTime()
        )
      );

    // If no filters applied, set all vacations
    if (!upcoming && !current && !liked) tempArr = vacations;
    setFilteredVacations(Array.from(new Set(tempArr)));
  }, [liked, current, upcoming, vacations]);

  // Updating current vacations based on pagination
  useEffect(() => {
    if (filteredVacations.length <= 9) {
      setCurrentPage(1);
      setCurrentVacations(filteredVacations.slice(0, 9));
    } else {
      setCurrentVacations(
        filteredVacations.slice((currentPage - 1) * 9, currentPage * 9)
      );
    }
  }, [filteredVacations]);

  //   Pagination
  const totalPages = Math.ceil(filteredVacations.length / 9); // Calculating total pages
  const startIndex = (currentPage - 1) * 9; // Start index for current page
  const endIndex = startIndex + 9; // End index for current page
  const currentVacations = filteredVacations.slice(startIndex, endIndex); // Creating an array of current vacations for the current page

  //   Rendering user's UI
  if (appStore.getState().user?.roleId === RoleModel.User)
    return (
      <div ref={listRef} className="List">
        <FormGroup className="checkboxes">
          <FormControlLabel
            control={<Checkbox checked={liked} onChange={handleLikedChange} />}
            label="Liked"
          />
          <FormControlLabel
            control={
              <Checkbox checked={current} onChange={handleCurrentChange} />
            }
            label="Current"
          />
          <FormControlLabel
            control={
              <Checkbox checked={upcoming} onChange={handleUpcomingChange} />
            }
            label="Upcoming"
          />
        </FormGroup>
        {/* User's UI rendered in smaller screens */}
        <div className="tablet-checkboxes">
          <FormControlLabel
            className="tablet-checkboxes-label"
            control={<Checkbox checked={liked} onChange={handleLikedChange} />}
            label="Liked"
          />
          <FormControlLabel
            className="tablet-checkboxes-label"
            control={
              <Checkbox checked={current} onChange={handleCurrentChange} />
            }
            label="Current"
          />
          <FormControlLabel
            className="tablet-checkboxes-label"
            control={
              <Checkbox checked={upcoming} onChange={handleUpcomingChange} />
            }
            label="Upcoming"
          />
        </div>
        {/* Displaying vacation cards (after filtration)*/}
        <div className="card-container">
          {currentVacations.length === 0 ? (
            <>
              <h1 className="none-found">{"No vacations available..."}</h1>
            </>
          ) : (
            currentVacations.map((v) => (
              <VacationCard key={v.id} vacation={v} />
            ))
          )}
        </div>

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentPage(i + 1);
                listRef.current.scrollIntoView();
              }}
              disabled={currentPage === i + 1}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    );
  //   Rendering admin's UI
  return (
    <div ref={listRef} className="List">
      <FormGroup className="checkboxes">
        <FormControlLabel
          control={
            <Checkbox checked={current} onChange={handleCurrentChange} />
          }
          label="Current"
        />
        <FormControlLabel
          control={
            <Checkbox checked={upcoming} onChange={handleUpcomingChange} />
          }
          label="Upcoming"
        />
      </FormGroup>
      {/* Admin's UI rendered in smaller screens */}
      <div className="tablet-checkboxes">
        <FormControlLabel
          className="tablet-checkboxes-label"
          control={
            <Checkbox checked={current} onChange={handleCurrentChange} />
          }
          label="Current"
        />
        <FormControlLabel
          className="tablet-checkboxes-label"
          control={
            <Checkbox checked={upcoming} onChange={handleUpcomingChange} />
          }
          label="Upcoming"
        />
      </div>
      {/* Displaying vacation cards (after filtration)*/}
      <div className="card-container">
        {currentVacations.length === 0 ? (
          <h1 className="none-found">{"No vacations available..."}</h1>
        ) : (
          currentVacations.map((v) => <VacationCard key={v.id} vacation={v} />)
        )}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrentPage(i + 1);
              listRef.current.scrollIntoView();
            }}
            disabled={currentPage === i + 1}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default List;
