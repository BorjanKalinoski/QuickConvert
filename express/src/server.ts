import express, { Application } from "express";
import routes from "./routes";
import cors from 'cors';
export default function createServer() {
  const app: Application = express();

  app.use(express.json());
  app.use(cors({
    credentials: true,
    exposedHeaders: [
      'Content-Disposition',
      'Content-Length'
    ]
  }));
  app.use(routes);


  return app;
}
