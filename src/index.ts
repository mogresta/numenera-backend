import express, { Express } from "express";
import http from "http";
import { Connect } from "./db/Connection";
import { corsHandler } from "./middlewares/CorsHandler";
import { routeNotFound } from "./middlewares/RouteNotFound";
import { config } from "./config/config";
import "reflect-metadata";
import { Routes } from "./modules/Routes";
import { RequestContext } from "@mikro-orm/core";
import { MikroORM } from "@mikro-orm/mysql";
import UserController from "./controllers/User.controller";
import ItemController from "./controllers/Item.controller";
import CharacterController from "./controllers/Character.controller";
import InventoryController from "./controllers/Inventory.controller";
import MainController from "./controllers/Main.controller";
import GroupInventoryController from "./controllers/GroupInventory.controller";
import RandomGeneratorController from "./controllers/RandomGenerator.controller";
import { Container } from "./modules/Container";
import { RandomGeneratorService } from "./services/RandomGenerator.service";
import { CharacterService } from "./services/Character.service";
import { GroupInventoryService } from "./services/GroupInventory.service";
import { InventoryService } from "./services/Inventory.service";
import { ItemService } from "./services/Item.service";
import { UserService } from "./services/User.service";

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

  Container.registerServices([
    CharacterService,
    GroupInventoryService,
    InventoryService,
    ItemService,
    RandomGeneratorService,
    UserService,
  ]);

  Routes.defineRoutes(
    [
      MainController,
      UserController,
      ItemController,
      CharacterController,
      InventoryController,
      GroupInventoryController,
      RandomGeneratorController,
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
