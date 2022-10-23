import { NextFunction, Request, Response } from "express";
import { ILivro } from "../interfaces/ILivro";
import LivroService from "../services/livro.service";

async function insertLivro(req: Request, res: Response, next: NextFunction) {
  try {
    let livro: ILivro = req.body;
    if (!livro.nome || !livro.valor || !livro.estoque || !livro.autor_id) {
      throw new Error("Nome, valor, estoque e id do autor são obrigatórios!");
    }
    livro = await LivroService.insertLivro(livro);
    res.status(201).send(livro);
    logger.info(`POST /livro - ${JSON.stringify(livro)}`);
  } catch (err) {
    next(err);
  }
}

async function updateLivro(req: Request, res: Response, next: NextFunction) {
  try {
    let livro: ILivro = req.body;
    if (!livro.livro_id || !livro.valor || !livro.estoque) {
      throw new Error("Id do livro, valor e estoque são obrigatórios!");
    }
    if (livro.nome || livro.autor_id) {
      throw new Error("Nome e autor não podem ser alterados!");
    }
    livro = await LivroService.updateLivro(livro);
    res.send(livro);
    logger.info(`PUT /livro - ${JSON.stringify(livro)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteLivro(req: Request, res: Response, next: NextFunction) {
  try {
    await LivroService.deleteLivro(parseInt(req.params.id));
    res.end();
    logger.info(`DELETE /livro - id ${req.params.id}`);
  } catch (err) {
    next(err);
  }
}

async function consultarLivros(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const livros = await LivroService.consultarLivros();
    res.send(livros);
    logger.info(`GET /livro`);
  } catch (err) {
    next(err);
  }
}

async function consultarLivro(req: Request, res: Response, next: NextFunction) {
  try {
    const livro = await LivroService.consultarLivro(parseInt(req.params.id));
    res.send(livro);
    logger.info(`GET /livro/${livro.livro_id}`);
  } catch (err) {
    next(err);
  }
}

export default {
  insertLivro,
  updateLivro,
  deleteLivro,
  consultarLivros,
  consultarLivro,
};
