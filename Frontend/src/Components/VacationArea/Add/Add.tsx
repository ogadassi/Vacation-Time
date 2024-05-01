import "./Add.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { VacationModel } from "../../../Models/VacationModel";
import { notify } from "../../../Utils/Notify";
import { vacationsService } from "../../../Services/VacationsService";
import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { appStore } from "../../../Redux/Store";
import { RoleModel } from "../../../Models/RoleModel";

function AddVacation(): JSX.Element {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<VacationModel>();
  const [imageUrl, setImageUrl] = useState<string>();

  //   Checking user role to only let admins through.
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

  // Function to handle form submission and add vacation
  async function send(vacation: VacationModel) {
    try {
      vacation.image = (vacation.image as unknown as FileList)[0];
      validateEndDate(vacation.startDate, vacation.endDate);

      await vacationsService.addVacation(vacation);
      notify.success("Vacation has been added.");
      navigate("/list");
    } catch (err: any) {
      notify.error(err);
    }
  }
  return (
    <div className="AddVacation">
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

        <TextField
          required
          inputProps={{ min: 0, max: 9999.99, step: "0.01" }}
          label="Price"
          type="number"
          className="text-box"
          {...register("price")}
          variant="filled"
        />

        <input
          type="date"
          {...register("startDate")}
          required
          min={new Date().toISOString().split("T")[0]}
        />

        <input
          type="date"
          {...register("endDate")}
          required
          min={new Date().toISOString().split("T")[0]}
        />

        <TextField
          id="filled-multiline-static"
          label="Description"
          rows={8}
          required
          inputProps={{ minLength: 100, maxLength: 1000 }}
          multiline
          variant="filled"
          className="text-box"
          {...register("description")}
        />

        <input
          required
          type="file"
          {...register("image")}
          // Setting image URL on change
          onChange={(image: any) => {
            if (image.target.files && image.target.files[0]) {
              setImageUrl(URL.createObjectURL(image.target.files[0]));
            }
          }}
        />
        <img className="thumbnail" src={imageUrl} />
        <Button className="btn" type="submit" variant="contained">
          Add Vacation
        </Button>
      </form>
    </div>
  );
}

export default AddVacation;
