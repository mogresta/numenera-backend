import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { MySqlDriver, Options } from "@mikro-orm/mysql";
import { config } from "./config";

const ormConfig: Options = {
  driver: MySqlDriver,
  entities: ["build/**/*.entity.js"],
  entitiesTs: ["src/**/*.entity.ts"],
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
  dbName: config.database.dbName,
  host: config.database.dbHost,
  port: config.database.dbPort,
  user: config.database.dbUser,
  password: config.database.dbPass,
};

export default ormConfig;
