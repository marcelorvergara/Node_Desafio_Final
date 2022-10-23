import express, { NextFunction, Request, Response } from "express";
import ClienteController from "../controllers/cliente.controller";

const router = express.Router();

router.post("/", ClienteController.insertCliente);
router.put("/", ClienteController.updateCliente);
router.delete("/:id", ClienteController.deleteCliente);
router.get("/", ClienteController.consultarClientes);
router.get("/:id", ClienteController.consultarCliente);

router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const errorStr = `Method ${req.method}; URL ${req.baseUrl}; Error msg: ${err.message}`;
  next(errorStr);
});

export default router;
