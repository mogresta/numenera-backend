import express, { Express } from "express";
import http from "http";
import { Connect } from "./db/Connection";
import { corsHandler } from "./middlewares/CorsHandler";
import { routeNotFound } from "./middlewares/RouteNotFound";
import { config } from "./config/config";
import "reflect-metadata";
import { defineRoutes } from "./modules/Routes";
import MainController from "./controllers/Main.controller";
import { RequestContext } from "@mikro-orm/core";
import { MikroORM } from "@mikro-orm/mysql";

export const app: Express = express();
export let httpServer: ReturnType<typeof http.createServer>;
export let orm: MikroORM;

export const Main = async () => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  try {
    orm = await Connect();

    app.use((req, res, next) => {
      RequestContext.create(orm.em, next);
    });
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

export const Shutdown = async (callback: any) => {
  if (httpServer) {
    httpServer.close(callback);
  }

  if (orm) {
    await orm.close();
  }
};

Main();
