import { ILivro } from "../interfaces/ILivro";
import { connect } from "./db";

async function insertLivro(livro: ILivro) {
  const conn = await connect();
  try {
    const sql =
      "INSERT INTO livros (nome, valor, estoque, autor_id) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [livro.nome, livro.valor, livro.estoque, livro.autor_id];
    const res = await conn.query(sql, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function updateLivro(livro: ILivro) {
  const conn = await connect();
  try {
    const sql =
      "UPDATE livros SET valor = $1, estoque = $2 where livro_id = $3 RETURNING *";
    const values = [livro.valor, livro.estoque, livro.livro_id];
    const res = await conn.query(sql, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function deleteLivro(id: number) {
  const conn = await connect();
  try {
    await conn.query("DELETE FROM livros WHERE livro_id = $1", [id]);
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function consultarLivros() {
  const conn = await connect();
  try {
    const livros = await conn.query("SELECT * FROM livros");
    return livros.rows;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function consultarLivro(id: number) {
  const conn = await connect();
  try {
    const livro = await conn.query("SELECT * FROM livros WHERE livro_id = $1", [
      id,
    ]);
    return livro.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

export default {
  insertLivro,
  updateLivro,
  deleteLivro,
  consultarLivros,
  consultarLivro,
};
