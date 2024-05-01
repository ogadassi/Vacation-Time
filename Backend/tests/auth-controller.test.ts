import { describe, it } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import { app } from "../src/app";
import { StatusCode } from "../src/3-models/error-enum";
import { RoleModel } from "../src/3-models/role-model";

function getRandomEmail() {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let email = "";
  for (let i = 0; i < 10; i++) {
    email += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  email += "@hotmail.com";
  return email;
}

describe("Testing auth controllers", () => {
  it("registration- should return the created token (string)", async () => {
    const response = await supertest(app.server)
      .post("/api/register")
      .field("firstName", "test")
      .field("lastName", "lastTest")
      .field("email", getRandomEmail())
      .field("password", "testsdts")
      .field("roleId", RoleModel.User);

    expect(typeof response.body).to.be.equal("string");
    expect(response.status).to.be.equal(StatusCode.Created);
  });

  it("login- should return the user's token (string)", async () => {
    const response = await supertest(app.server)
      .post("/api/login")
      .field("email", "user@gmail.com")
      .field("password", "useruser");
    expect(typeof response.body).to.be.equal("string");
  });
});
