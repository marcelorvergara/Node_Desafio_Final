import { ICliente } from "../interfaces/ICliente";
import { connect } from "./db";

async function insertCliente(cliente: ICliente) {
  const conn = await connect();
  try {
    const sql =
      "INSERT INTO clientes (nome, email, senha, telefone, endereco) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [
      cliente.nome,
      cliente.email,
      cliente.senha,
      cliente.telefone,
      cliente.endereco,
    ];
    const res = await conn.query(sql, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function updateCliente(cliente: ICliente) {
  const conn = await connect();
  try {
    const sql =
      "UPDATE clientes SET nome = $1, email = $2, senha = $3, telefone = $4, endereco = $5 where cliente_id = $6 RETURNING *";
    const values = [
      cliente.nome,
      cliente.email,
      cliente.senha,
      cliente.telefone,
      cliente.endereco,
      cliente.cliente_id,
    ];
    const res = await conn.query(sql, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function deleteCliente(id: number) {
  const conn = await connect();
  try {
    await conn.query("DELETE FROM clientes WHERE cliente_id = $1", [id]);
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function consultarClientes() {
  const conn = await connect();
  try {
    const clientes = await conn.query("SELECT * FROM clientes");
    return clientes.rows;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function consultarCliente(id: number) {
  const conn = await connect();
  try {
    const cliente = await conn.query(
      "SELECT cliente_id, nome, email, telefone, endereco FROM clientes WHERE cliente_id = $1",
      [id]
    );
    return cliente.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

export default {
  insertCliente,
  updateCliente,
  deleteCliente,
  consultarClientes,
  consultarCliente,
};
