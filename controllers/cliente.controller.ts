import { NextFunction, Request, Response } from "express";
import { ICliente } from "../interfaces/ICliente";
import ClienteService from "../services/cliente.service";

async function insertCliente(req: Request, res: Response, next: NextFunction) {
  try {
    let cliente: ICliente = req.body;
    if (
      !cliente.nome ||
      !cliente.email ||
      !cliente.senha ||
      !cliente.telefone ||
      !cliente.endereco
    ) {
      throw new Error(
        "Nome, email, senha, telefone e endereço são obrigatórios!"
      );
    }
    cliente = await ClienteService.insertCliente(cliente);
    res.status(201).send(cliente);
    logger.info(`POST /cliente - ${JSON.stringify(cliente)}`);
  } catch (err) {
    next(err);
  }
}

async function updateCliente(req: Request, res: Response, next: NextFunction) {
  try {
    let cliente: ICliente = req.body;
    if (
      !cliente.cliente_id ||
      !cliente.nome ||
      !cliente.email ||
      !cliente.senha ||
      !cliente.telefone ||
      !cliente.endereco
    ) {
      throw new Error(
        "Id do cliente, nome, email, senha, telefone e endereço são obrigatórios!"
      );
    }
    cliente = await ClienteService.updateCliente(cliente);
    res.send(cliente);
    logger.info(`PUT /cliente - ${JSON.stringify(cliente)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteCliente(req: Request, res: Response, next: NextFunction) {
  try {
    await ClienteService.deleteCliente(parseInt(req.params.id));
    res.end();
    logger.info(`DELETE /cliente - id ${req.params.id}`);
  } catch (err) {
    next(err);
  }
}

async function consultarClientes(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const clientes = await ClienteService.consultarClientes();
    res.send(clientes);
    logger.info(`GET /cliente`);
  } catch (err) {
    next(err);
  }
}

async function consultarCliente(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const cliente = await ClienteService.consultarCliente(
      parseInt(req.params.id)
    );
    res.send(cliente);
    logger.info(`GET /cliente/${cliente.cliente_id}`);
  } catch (err) {
    next(err);
  }
}

export default {
  insertCliente,
  updateCliente,
  deleteCliente,
  consultarClientes,
  consultarCliente,
};
