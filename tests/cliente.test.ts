import app from "../app";
import request from "supertest";
import * as pg from "pg";
import dotenv from "dotenv";
import { connect } from "../repository/db";

dotenv.config();

describe("Testes que geram erro", () => {
  it("cadastrar cliente com erro", async () => {
    const res = await request(app).post("/cliente").send({ nome: "Teste" });
    expect(res.statusCode).toEqual(400);
  });
  it("atualizar cliente com erro", async () => {
    const res = await request(app)
      .post("/cliente")
      .send({ cliente_id: "1", nome: "Teste" });
    expect(res.statusCode).toEqual(400);
  });
  it("deletar cliente com erro - id inexistente", async () => {
    const res = await request(app).del("/cliente/800000000000");
    expect(res.statusCode).toEqual(400);
  });
  it("consultar cliente com erro - id inexistente", async () => {
    const res = await request(app).del("/cliente/800000000000");
    expect(res.statusCode).toEqual(400);
  });
});

describe("Testes com a entidade cliente", () => {
  let client: pg.PoolClient;
  const cliente = {
    nome: "Marcelo Vergara",
    email: "marcelo@vergara.com",
    senha: "12341234",
    telefone: "21988943334",
    endereco: "R. Laércio Gomes, 123",
  };
  beforeAll(async () => {
    client = await connect();
  });
  afterAll(async () => {
    await client.query(`DELETE FROM clientes WHERE nome = \'${cliente.nome}\'`);
    client.release(true);
  });

  it("cadastrar um cliente", async () => {
    const res = await request(app).post("/cliente").send(cliente);

    const { rows } = await client.query(
      "SELECT * FROM clientes WHERE nome = $1",
      [cliente.nome]
    );

    expect(res.body).toBeDefined();
    expect(rows.length).toBe(1);
  });

  it("atualizar um cliente", async () => {
    const { body } = await request(app).post("/cliente").send(cliente);
    body.email = "joao@vergara.net";
    const res = await request(app).put("/cliente").send(body);

    const { rows } = await client.query(
      "SELECT * FROM clientes WHERE email = $1",
      [body.email]
    );

    expect(res.body).toBeDefined();
    expect(rows[0].email).toBe(body.email);
  });

  it("deletar um cliente", async () => {
    const { body } = await request(app).post("/cliente").send(cliente);
    const res = await request(app).del(`/cliente/${body.cliente_id}`);
    expect(res.statusCode).toEqual(200);
  });

  it("consultar todos os clientes", async () => {
    const res = await request(app).get("/cliente");
    expect(res.statusCode).toEqual(200);
  });

  it("consultar um cliente específico", async () => {
    const { body } = await request(app).post("/cliente").send(cliente);
    const res = await request(app).get(`/cliente/${body.cliente_id}`);
    expect(res.statusCode).toEqual(200);
  });

  it("consultar um cliente específico sem retornar a senha", async () => {
    const { body } = await request(app).post("/cliente").send(cliente);
    const res = await request(app).get(`/cliente/${body.cliente_id}`);
    expect(res.body.senha).not.toBeDefined();
  });
});
