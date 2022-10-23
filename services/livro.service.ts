import { ILivro } from "../interfaces/ILivro";
import LivroRepository from "../repository/livro.repo";

async function insertLivro(livro: ILivro) {
  return await LivroRepository.insertLivro(livro);
}

async function updateLivro(livro: ILivro) {
  return await LivroRepository.updateLivro(livro);
}

async function deleteLivro(id: number) {
  return await LivroRepository.deleteLivro(id);
}

async function consultarLivros() {
  return await LivroRepository.consultarLivros();
}

async function consultarLivro(id: number) {
  return await LivroRepository.consultarLivro(id);
}

export default {
  insertLivro,
  updateLivro,
  deleteLivro,
  consultarLivros,
  consultarLivro,
};
