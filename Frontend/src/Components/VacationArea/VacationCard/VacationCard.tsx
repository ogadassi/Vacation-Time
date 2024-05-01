import { RoleModel } from "../../../Models/RoleModel";
import { VacationModel } from "../../../Models/VacationModel";
import "./VacationCard.css";
import { NavLink } from "react-router-dom";
import { vacationsService } from "../../../Services/VacationsService";
import { notify } from "../../../Utils/Notify";
import { appStore } from "../../../Redux/Store";

type VacationCardProps = {
  vacation: VacationModel;
};

function VacationCard(props: VacationCardProps): JSX.Element {
  // Function to handle deletion of a vacation
  async function deleteMe(id: number) {
    try {
      const sure = window.confirm("Are you sure?");
      if (!sure) return;

      await vacationsService.deleteVacation(id);
      notify.success(
        `Vacation in ${props.vacation.destination} has been deleted.`
      );
    } catch (err: any) {
      notify.error(err);
    }
  }

  // Function to toggle like on a vacation
  async function toggleLike(): Promise<void> {
    if (props.vacation.isLiked === 0) {
      await vacationsService.addLike(props.vacation);
    } else await vacationsService.removeLike(props.vacation);
  }

  //   Rendering card for users
  if (appStore.getState().user?.roleId === RoleModel.User)
    return (
      <div className="VacationCard">
        <div title="Like" className="heart-container">
          <input
            onChange={toggleLike}
            checked={props.vacation.isLiked === 1}
            className="checkbox"
            type="checkbox"
          />
          <div className="svg-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="svg-outline"
              viewBox="0 0 24 24"
            >
              <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="svg-filled"
              viewBox="0 0 24 24"
            >
              <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="100"
              width="100"
              className="svg-celebrate"
            >
              <polygon points="10,10 20,20"></polygon>
              <polygon points="10,50 20,50"></polygon>
              <polygon points="20,80 30,70"></polygon>
              <polygon points="90,10 80,20"></polygon>
              <polygon points="90,50 80,50"></polygon>
              <polygon points="80,80 70,70"></polygon>
            </svg>
          </div>
          <div className="likeCount">
            {props.vacation.likesCount === 1
              ? "1 Like"
              : props.vacation.likesCount + " Likes"}{" "}
          </div>
        </div>

        <img alt="" className="card-img" src={props.vacation.imageUrl}></img>
        <h2>{props.vacation.destination}</h2>
        <h5 className="dates">
          {new Date(props.vacation.startDate).toLocaleDateString("en-GB")} -{" "}
          {new Date(props.vacation.endDate).toLocaleDateString("en-GB")}
        </h5>
        <h3 className="price">
          {Math.floor(props.vacation.price) === +props.vacation.price
            ? Math.floor(props.vacation.price)
            : props.vacation.price}
          $
        </h3>
        <span className="card-text">{props.vacation.description}</span>
      </div>
    );

  //   Rendering card for admins
  return (
    <div className="VacationCard">
      <div className="adminBtns">
        <div className="edit">
          <NavLink
            className="navLink"
            to={"/vacations/edit/" + props.vacation?.id}
          >
            Edit
          </NavLink>
        </div>
        <div onClick={() => deleteMe(props.vacation.id)} className="del">
          <div>Delete</div>
        </div>
      </div>
      <img className="card-img" alt="" src={props.vacation.imageUrl}></img>
      <h2>{props.vacation.destination}</h2>
      <h5 className="dates">
        {" "}
        {new Date(props.vacation.startDate).toLocaleDateString("en-GB")} -{" "}
        {new Date(props.vacation.endDate).toLocaleDateString("en-GB")}
      </h5>
      <h3 className="price">
        {Math.floor(props.vacation.price) === +props.vacation.price
          ? Math.floor(props.vacation.price)
          : props.vacation.price}
        $
      </h3>
      <span className="card-text">{props.vacation.description}</span>
    </div>
  );
}

export default VacationCard;
