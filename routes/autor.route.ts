import express, { NextFunction, Request, Response } from "express";
import AutorController from "../controllers/autor.controller";

const router = express.Router();

router.post("/", AutorController.insertAutor);
router.put("/", AutorController.updateAutor);
router.delete("/:id", AutorController.deleteAutor);
router.get("/", AutorController.consultarAutores);
router.get("/:id", AutorController.consultarAutor);

router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const errorStr = `Method ${req.method}; URL ${req.baseUrl}; Error msg: ${err.message}`;
  next(errorStr);
});

export default router;
