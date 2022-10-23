import app from "../app";
import request from "supertest";
import * as pg from "pg";
import dotenv from "dotenv";
import { connect } from "../repository/db";

dotenv.config();

describe("Test inicial de funcionamento", () => {
  it("responder http 200 na raiz", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
  });
});
