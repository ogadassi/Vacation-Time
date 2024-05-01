import "./EditVacation.css";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { notify } from "../../../Utils/Notify";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationsService } from "../../../Services/VacationsService";
import { Button, TextField } from "@mui/material";
import { appStore } from "../../../Redux/Store";
import { RoleModel } from "../../../Models/RoleModel";

function EditVacation(): JSX.Element {
  const { register, handleSubmit, setValue } = useForm<VacationModel>();
  const navigate = useNavigate();
  const params = useParams();

  const [imageUrl, setImageUrl] = useState<string>();

  //   Checking user role to only let admins through
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token || appStore.getState().user.roleId === RoleModel.User) {
      navigate("/login");
      return;
    }
  }, []);

  //   make sure endDate is after startDate
  function validateEndDate(startDate: string, endDate: string) {
    if (new Date(endDate) < new Date(startDate))
      throw new Error("End date cannot be before the start date.");
  }

  // Fetching vacation data to populate form fields
  useEffect(() => {
    vacationsService
      .getOneVacation(+params.id) // Fetching vacation data by id
      .then((vacation) => {
        const startDate = new Date(vacation.startDate);
        const endDate = new Date(vacation.endDate);

        // Fixing dates and turning them to strings
        startDate.setDate(startDate.getDate() + 1);
        endDate.setDate(endDate.getDate() + 1);

        const startDateString = startDate.toISOString().substring(0, 10);
        const endDateString = endDate.toISOString().substring(0, 10);

        // Setting form field values
        setValue("destination", vacation.destination);
        setValue("description", vacation.description);
        setValue("startDate", startDateString);
        setValue("endDate", endDateString);
        setValue("price", vacation.price);
        setImageUrl(vacation.imageUrl);
      })
      .catch((err) => {
        navigate("/list");
        notify.error(err);
      });
  }, []);

  async function send(vacation: VacationModel) {
    try {
      vacation.image = (vacation.image as unknown as FileList)[0];
      validateEndDate(vacation.startDate, vacation.endDate);
      vacation.id = +params.id;

      
      await vacationsService.updateVacation(vacation);
      notify.success("Vacation has been updated.");
      navigate("/list");
    } catch (err: any) {
      notify.error(err);
    }
  }

  return (
    <div className="EditVacation">
      <form onSubmit={handleSubmit(send)}>
        <TextField
          required
          inputProps={{ minLength: 2, maxLength: 45 }}
          label="Destination"
          type="text"
          className="text-box"
          {...register("destination")}
          variant="filled"
        />

        <input type="date" {...register("startDate")} required />

        <TextField
          required
          inputProps={{ min: 0, max: 9999.99, step: "0.01" }}
          label="Price"
          type="number"
          className="text-box"
          {...register("price")}
          variant="filled"
        />
        <input type="date" {...register("endDate")} required />

        <TextField
          id="filled-multiline-static"
          label="Description"
          required
          inputProps={{ minLength: 100, maxLength: 1000 }}
          multiline
          variant="filled"
          rows={8}
          className="text-box"
          {...register("description")}
        />

        <input
          type="file"
          {...register("image")}
          onChange={(image: any) => {
            if (image.target.files && image.target.files[0]) {
              setImageUrl(URL.createObjectURL(image.target.files[0]));
            }
          }}
        />
        <img className="thumbnail" src={imageUrl} />

        <Button className="btn" type="submit" variant="contained">
          Update Vacation
        </Button>
      </form>
    </div>
  );
}

export default EditVacation;
