import { IAutor } from "../interfaces/IAutor";
import AutorRepository from "../repository/autor.repo";

async function insertAutor(autor: IAutor) {
  return await AutorRepository.insertAutor(autor);
}

async function updateAutor(autor: IAutor) {
  return await AutorRepository.updateAutor(autor);
}

async function deleteAutor(id: number) {
  return await AutorRepository.deleteAutor(id);
}

async function consultarAutores() {
  return await AutorRepository.consultarAutores();
}

async function consultarAutor(id: number) {
  return await AutorRepository.consultarAutor(id);
}

export default {
  insertAutor,
  updateAutor,
  deleteAutor,
  consultarAutores,
  consultarAutor,
};
