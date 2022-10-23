import app from "../app";
import request from "supertest";
import * as pg from "pg";
import dotenv from "dotenv";
import { connect } from "../repository/db";

dotenv.config();

describe("Testes que geram erro", () => {
  it("cadastrar autor com erro", async () => {
    const res = await request(app).post("/autor").send({ nome: "Teste" });
    expect(res.statusCode).toEqual(400);
  });
  it("atualizar autor com erro", async () => {
    const res = await request(app)
      .post("/autor")
      .send({ autor_id: "1", nome: "Teste" });
    expect(res.statusCode).toEqual(400);
  });
  it("deletar autor com erro - id inexistente", async () => {
    const res = await request(app).del("/autor/800000000000");
    expect(res.statusCode).toEqual(400);
  });
  it("consultar autor com erro - id inexistente", async () => {
    const res = await request(app).del("/autor/800000000000");
    expect(res.statusCode).toEqual(400);
  });
});

describe("Testes com a entidade autor", () => {
  let client: pg.PoolClient;
  const autor = {
    nome: "Marcelo Vergara",
    email: "marcelo@vergara.com",
    telefone: "21988943334",
  };
  beforeAll(async () => {
    client = await connect();
  });
  afterAll(async () => {
    await client.query(`DELETE FROM autores WHERE nome = \'${autor.nome}\'`);
    client.release(true);
  });

  it("cadastrar um autor", async () => {
    const res = await request(app).post("/autor").send(autor);

    const { rows } = await client.query(
      "SELECT * FROM autores WHERE nome = $1",
      [autor.nome]
    );

    expect(res.body).toBeDefined();
    expect(rows.length).toBe(1);
  });

  it("atualizar um autor", async () => {
    const { body } = await request(app).post("/autor").send(autor);
    body.email = "joao@vergara.net";
    const res = await request(app).put("/autor").send(body);

    const { rows } = await client.query(
      "SELECT * FROM autores WHERE email = $1",
      [body.email]
    );

    expect(res.body).toBeDefined();
    expect(rows[0].email).toBe(body.email);
  });

  it("deletar um autor", async () => {
    const { body } = await request(app).post("/autor").send(autor);
    const res = await request(app).del(`/autor/${body.autor_id}`);
    expect(res.statusCode).toEqual(200);
  });

  it("consultar todos os autores", async () => {
    const res = await request(app).get("/autor");
    expect(res.statusCode).toEqual(200);
  });

  it("consultar um autor específico", async () => {
    const { body } = await request(app).post("/autor").send(autor);
    const res = await request(app).get(`/autor/${body.autor_id}`);
    expect(res.statusCode).toEqual(200);
  });
});
