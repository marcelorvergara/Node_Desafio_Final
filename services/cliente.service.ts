import { ICliente } from "../interfaces/ICliente";
import ClienteRepository from "../repository/cliente.repo";

async function insertCliente(cliente: ICliente) {
  return await ClienteRepository.insertCliente(cliente);
}

async function updateCliente(cliente: ICliente) {
  return await ClienteRepository.updateCliente(cliente);
}

async function deleteCliente(id: number) {
  return await ClienteRepository.deleteCliente(id);
}

async function consultarClientes() {
  return await ClienteRepository.consultarClientes();
}

async function consultarCliente(id: number) {
  return await ClienteRepository.consultarCliente(id);
}

export default {
  insertCliente,
  updateCliente,
  deleteCliente,
  consultarClientes,
  consultarCliente,
};
