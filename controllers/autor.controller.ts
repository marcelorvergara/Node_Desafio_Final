import { NextFunction, Request, Response } from "express";
import { IAutor } from "../interfaces/IAutor";
import AutorService from "../services/autor.service";

async function insertAutor(req: Request, res: Response, next: NextFunction) {
  try {
    let autor: IAutor = req.body;
    if (!autor.nome || !autor.email || !autor.telefone) {
      throw new Error("Nome, email e telefone são obrigatórios!");
    }
    autor = await AutorService.insertAutor(autor);
    res.status(201).send(autor);
    logger.info(`POST /autor - ${JSON.stringify(autor)}`);
  } catch (err) {
    next(err);
  }
}

async function updateAutor(req: Request, res: Response, next: NextFunction) {
  try {
    let autor: IAutor = req.body;
    if (!autor.autor_id || !autor.nome || !autor.email || !autor.telefone) {
      throw new Error("Id do autor, nome, email e telefone são obrigatórios!");
    }
    autor = await AutorService.updateAutor(autor);
    res.send(autor);
    logger.info(`PUT /autor - ${JSON.stringify(autor)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteAutor(req: Request, res: Response, next: NextFunction) {
  try {
    await AutorService.deleteAutor(parseInt(req.params.id));
    res.end();
    logger.info(`DELETE /autor - id ${req.params.id}`);
  } catch (err) {
    next(err);
  }
}

async function consultarAutores(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const autors = await AutorService.consultarAutores();
    res.send(autors);
    logger.info(`GET /autor`);
  } catch (err) {
    next(err);
  }
}

async function consultarAutor(req: Request, res: Response, next: NextFunction) {
  try {
    const autor = await AutorService.consultarAutor(parseInt(req.params.id));
    res.send(autor);
    logger.info(`GET /autor/${autor.autor_id}`);
  } catch (err) {
    next(err);
  }
}

export default {
  insertAutor,
  updateAutor,
  deleteAutor,
  consultarAutores,
  consultarAutor,
};
