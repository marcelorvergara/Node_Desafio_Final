import app from "../app";
import request from "supertest";
import * as pg from "pg";
import dotenv from "dotenv";
import { connect } from "../repository/db";
import { ILivro } from "../interfaces/ILivro";

dotenv.config();

describe("Testes que geram erro", () => {
  it("cadastrar livro com erro", async () => {
    const res = await request(app).post("/livro").send({ nome: "Teste" });
    expect(res.statusCode).toEqual(400);
  });
  it("atualizar livro com erro", async () => {
    const res = await request(app)
      .post("/livro")
      .send({ livro_id: "1", nome: "Teste" });
    expect(res.statusCode).toEqual(400);
  });
  it("deletar livro com erro - id inexistente", async () => {
    const res = await request(app).del("/livro/800000000000");
    expect(res.statusCode).toEqual(400);
  });
  it("consultar livro com erro - id inexistente", async () => {
    const res = await request(app).del("/livro/800000000000");
    expect(res.statusCode).toEqual(400);
  });
});

describe("Testes com a entidade livro", () => {
  let client: pg.PoolClient;
  const livro = {
    nome: "Node.js com TS",
    valor: 230,
    estoque: 12,
    autor_id: 1,
  };
  beforeAll(async () => {
    client = await connect();
  });
  afterAll(async () => {
    await client.query(`DELETE FROM livros WHERE nome = \'${livro.nome}\'`);
    client.release(true);
  });

  it("cadastrar um livro", async () => {
    const res = await request(app).post("/livro").send(livro);

    const { rows } = await client.query(
      "SELECT * FROM livros WHERE nome = $1",
      [livro.nome]
    );

    expect(res.body).toBeDefined();
    expect(rows.length).toBe(1);
  });

  it("atualizar um livro", async () => {
    const { body } = await request(app).post("/livro").send(livro);
    body.estoque = 101010;
    delete body.nome;
    delete body.autor_id;
    const res = await request(app).put("/livro").send(body);

    const { rows } = await client.query(
      "SELECT * FROM livros WHERE estoque = $1",
      [body.estoque]
    );

    console.log("rows", rows[0]);
    expect(res.body).toBeDefined();
    expect(rows[0].estoque).toBe(body.estoque);
  });

  it("deletar um livro", async () => {
    const { body } = await request(app).post("/livro").send(livro);
    const res = await request(app).del(`/livro/${body.livro_id}`);
    expect(res.statusCode).toEqual(200);
  });

  it("consultar todos os livros", async () => {
    const res = await request(app).get("/livro");
    expect(res.statusCode).toEqual(200);
  });

  it("consultar um livro específico", async () => {
    const { body } = await request(app).post("/livro").send(livro);
    const res = await request(app).get(`/livro/${body.livro_id}`);
    expect(res.statusCode).toEqual(200);
  });

  it("nome e autor do livro não podem ser alterados", async () => {
    const { body } = await request(app).post("/livro").send(livro);
    const livroObj: ILivro = body;
    livroObj.autor_id = 3;
    livroObj.nome = "Node.js com JS";
    console.log("livro", livroObj);
    const res = await request(app).put("/livro").send(livroObj);

    expect(res.statusCode).toEqual(400);
  });
});
