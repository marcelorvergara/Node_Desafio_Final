import express, { Request, Response, Application, NextFunction } from "express";
import clienteRouter from "./routes/cliente.route";
import autorRouter from "./routes/autor.route";
import livroRouter from "./routes/livro.route";
import winston from "winston";

const app: Application = express();
app.use(express.json());

// routes
app.use("/cliente", clienteRouter);
app.use("/autor", autorRouter);
app.use("/livro", livroRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Desafio final comExpress + Typescript Server");
});

// winston
const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level} ${message}`;
});
global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "livraria-api.log" }),
  ],
  format: combine(label({ label: "livraria-api" }), timestamp(), myFormat),
});

// log do erro
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.message) {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ error: err.message });
  } else {
    logger.error(`${req.method} ${req.baseUrl} - ${err}`);
    res.status(400).send({ error: err });
  }
});

export default app;
