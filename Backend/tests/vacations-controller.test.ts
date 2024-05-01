import { describe, it } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import fs from "fs";
import { app } from "../src/app";
import { VacationModel } from "../src/3-models/vacation-model";
import { StatusCode } from "../src/3-models/error-enum";

describe("Testing vacations controllers", () => {
  let image: Buffer;
  let token: string;
  let id: number;

  before(async () => {
    image = fs.readFileSync(__dirname + "\\resources\\5491.jpg");
    const response = await supertest(app.server)
      .post("/api/login")
      .send({ email: "admin@gmail.com", password: "administrator" });
    token = response.body;
  });

  it("Should return vacations array", async () => {
    const response = await supertest(app.server)
      .get("/api/all-vacations/5")
      .set("Authorization", "Bearer " + token);
    const vacations: VacationModel[] = response.body;
    expect(vacations.length).to.be.greaterThanOrEqual(1);
    expect(vacations[0]).to.contain.keys(
      "id",
      "destination",
      "description",
      "startDate",
      "endDate",
      "price",
      "imageName",
      "imageUrl",
      "isLiked",
      "likesCount"
    );
  });

  it("Should return vacation", async () => {
    const response = await supertest(app.server)
      .get("/api/vacation/14")
      .set("Authorization", "Bearer " + token);
    const vacation: VacationModel = response.body;
    expect(vacation).to.not.be.empty;
    expect(vacation).to.contain.keys(
      "id",
      "destination",
      "description",
      "startDate",
      "endDate",
      "price",
      "imageName",
      "imageUrl"
    );
  });

  it("should add a new vacation", async () => {
    const response = await supertest(app.server)
      .post("/api/vacation")
      .set("Authorization", "Bearer " + token)
      .field("destination", "aaa")
      .field(
        "description",
        "jsdofjsoidfjoisdjfoisddsdfsdfsdfsdfsdgdfhdfhdfgdfgdfgdfgdfgjfoisjdoifjsdoifjosidjfoisjdoifjsodifjoisdjfoisjdiofjsoidfjoisd"
      )
      .field("price", 530)
      .field("startDate", "2024-04-01")
      .field("endDate", "2024-04-04")
      .field("image", image);
    const addedVacation = response.body;
    id = addedVacation.id;
    expect(addedVacation).to.contain.keys(
      "id",
      "destination",
      "description",
      "startDate",
      "endDate",
      "price",
      "imageName",
      "imageUrl"
    );
  });

  it("should update a vacation", async () => {
    const response = await supertest(app.server)
      .put(`/api/vacation/${id}`)
      .set("Authorization", "Bearer " + token)
      .field("destination", "aasdaa")
      .field(
        "description",
        "jsdofjsoidfjoisdjfoisddsdfsdfsdfsdfsdgdfhdfhdfgdfgdfgdfgdfgjfoisjdoifjsdoifjosidjfoisjdoifjsodifjoisdjfoisjdiofjsoidfjoisd"
      )
      .field("price", 530)
      .field("startDate", "2024-04-01")
      .field("endDate", "2024-04-04")
      .field("image", image);
    const updatedVacation = response.body;
    expect(updatedVacation).to.contain.keys(
      "id",
      "destination",
      "description",
      "startDate",
      "endDate",
      "price",
      "imageName",
      "imageUrl"
    );
  });

  it("Should delete a vacation", async () => {
    const response = await supertest(app.server)
      .delete(`/api/vacation/${id}`)
      .set("Authorization", "Bearer " + token);
    expect(response.body).to.be.empty;
    expect(response.status).to.be.equal(StatusCode.NoContent);
  });

  it("Should response with a route not found error", async () => {
    const response = await supertest(app.server)
      .get("/api/vacation/aaa")
      .set("Authorization", "Bearer " + token);
    expect(response.status).to.be.equal(StatusCode.NotFound);
  });

  it("Should response with a resource not found error", async () => {
    const response = await supertest(app.server)
      .get("/api/vacation/20000")
      .set("Authorization", "Bearer " + token);
    expect(response.status).to.be.equal(StatusCode.NotFound);
  });

  it("Should response with a resource not found error", async () => {
    const response = await supertest(app.server)
      .delete("/api/vacation/20000")
      .set("Authorization", "Bearer " + token);
    expect(response.status).to.be.equal(StatusCode.NotFound);
  });
});
