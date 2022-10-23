import express, { NextFunction, Request, Response } from "express";
import LivroController from "../controllers/livro.controller";

const router = express.Router();

router.post("/", LivroController.insertLivro);
router.put("/", LivroController.updateLivro);
router.delete("/:id", LivroController.deleteLivro);
router.get("/", LivroController.consultarLivros);
router.get("/:id", LivroController.consultarLivro);

router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const errorStr = `Method ${req.method}; URL ${req.baseUrl}; Error msg: ${err.message}`;
  next(errorStr);
});

export default router;
