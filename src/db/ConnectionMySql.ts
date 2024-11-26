import mysql, { Connection } from "mysql2";
import { config } from "../config/config";

const params = {
  host: config.database.dbHost,
  port: config.database.dbPort,
  database: config.database.dbName,
  user: config.database.dbUser,
  password: config.database.dbPass,
};

const Connect = async () =>
  new Promise<mysql.Connection>((resolve, reject) => {
    const connection: Connection = mysql.createConnection(params);
    connection.connect((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(connection);
    });
  });
