import { describe, it } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import { app } from "../src/app";
import { StatusCode } from "../src/3-models/error-enum";

describe("Testing likes controllers", () => {
  let token: string;

  before(async () => {
    const response = await supertest(app.server)
      .post("/api/login")
      .send({ email: "user@gmail.com", password: "useruser" });
    token = response.body;
  });

  it("Should response with a created status", async () => {
    const response = await supertest(app.server)
      .post("/api/like/user/15/vacation/14")
      .set("Authorization", "Bearer " + token);
    expect(response.status).to.be.equal(StatusCode.Created);
  });

  it("Should response with a no content status", async () => {
    const response = await supertest(app.server)
      .delete("/api/like/user/15/vacation/14")
      .set("Authorization", "Bearer " + token);
    expect(response.status).to.be.equal(StatusCode.NoContent);
  });
});
