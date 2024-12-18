import express, { Express } from "express";
import http from "http";
import { Connect } from "./db/Connection";
import { corsHandler } from "./middlewares/CorsHandler";
import { routeNotFound } from "./middlewares/RouteNotFound";
import { config } from "./config/config";
import "reflect-metadata";
import { defineRoutes } from "./modules/Routes";
import { RequestContext } from "@mikro-orm/core";
import { MikroORM } from "@mikro-orm/mysql";
import UserController from "./controllers/User.controller";
import ArtefactController from "./controllers/Artefact.controller";
import AutomatonController from "./controllers/Automaton.controller";
import CharacterController from "./controllers/Character.controller";
import CypherController from "./controllers/Cypher.controller";
import InstallationController from "./controllers/Installation.controller";
import InventoryController from "./controllers/Inventory.controller";
import InventoryItemController from "./controllers/InventoryItem.controller";
import OddityController from "./controllers/Oddity.controller";
import PlanController from "./controllers/Plan.controller";
import VehicleController from "./controllers/Vehicle.controller";
import MainController from "./controllers/Main.controller";

export const app: Express = express();
export let httpServer: ReturnType<typeof http.createServer>;
export let db: MikroORM;

export const Main = async () => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  try {
    db = await Connect();

    app.use((req, res, next) => {
      RequestContext.create(db.em, next);
    });
  } catch (error) {
    console.error(error);
    await Shutdown();
  }

  app.use(corsHandler);

  defineRoutes(
    [
      MainController,
      UserController,
      ArtefactController,
      AutomatonController,
      CharacterController,
      CypherController,
      InstallationController,
      InventoryController,
      InventoryItemController,
      OddityController,
      PlanController,
      VehicleController,
    ],
    app,
  );

  app.use(routeNotFound);

  httpServer = http.createServer(app);
  httpServer.listen(config.server.serverport, () => {
    console.log(`Server is running on port ${config.server.serverport}`);
  });
};

export const Shutdown = async (callback?: any) => {
  if (httpServer) {
    httpServer.close(callback);
  }

  if (db) {
    await db.close();
  }
};

Main();
