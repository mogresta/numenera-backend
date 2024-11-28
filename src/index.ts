import express, { Express } from "express";
import http from "http";
import Connect from "./db/connection";
import { corsHandler } from "./middlewares/corsHandler";
import { routeNotFound } from "./middlewares/routeNotFound";
import { config } from "./config/config";
import "reflect-metadata";
import { defineRoutes } from "./modules/routes";
import MainController from "./controllers/main";

export const app: Express = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = async () => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  try {
    await Connect();
  } catch (error) {
    console.error(error);
  }

  app.use(corsHandler);

  defineRoutes([MainController], app);

  app.use(routeNotFound);

  httpServer = http.createServer(app);
  httpServer.listen(config.server.serverport, () => {
    console.log(`Server is running on port ${config.server.serverport}`);
  });
};

export const Shutdown = (callback: any) =>
  httpServer && httpServer.close(callback);

Main();
