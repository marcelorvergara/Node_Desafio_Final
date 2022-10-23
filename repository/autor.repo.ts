import { IAutor } from "../interfaces/IAutor";
import { connect } from "./db";

async function insertAutor(autor: IAutor) {
  const conn = await connect();
  try {
    const sql =
      "INSERT INTO autores (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *";
    const values = [autor.nome, autor.email, autor.telefone];
    const res = await conn.query(sql, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function updateAutor(autor: IAutor) {
  const conn = await connect();
  try {
    const sql =
      "UPDATE autores SET nome = $1, email = $2, telefone = $3 where autor_id = $4 RETURNING *";
    const values = [autor.nome, autor.email, autor.telefone, autor.autor_id];
    const res = await conn.query(sql, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function deleteAutor(id: number) {
  const conn = await connect();
  try {
    await conn.query("DELETE FROM autores WHERE autor_id = $1", [id]);
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function consultarAutores() {
  const conn = await connect();
  try {
    const autores = await conn.query("SELECT * FROM autores");
    return autores.rows;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function consultarAutor(id: number) {
  const conn = await connect();
  try {
    const autor = await conn.query(
      "SELECT * FROM autores WHERE autor_id = $1",
      [id]
    );
    return autor.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

export default {
  insertAutor,
  updateAutor,
  deleteAutor,
  consultarAutores,
  consultarAutor,
};
