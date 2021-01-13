import "dotenv/config";
import express, { Application } from "express";
import routes from "./routes";
import cors from 'cors';
import path from "path";

export default function createServer() {
  const app: Application = express();
  app.use(express.static(path.join(__dirname, '../', '../', 'react/build')));
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

const startServer = () => {
  const app = createServer();
  const port: number = parseInt(<string>process.env.PORT, 10) || 4000;
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
};

startServer();
