import dotenv from "dotenv";

dotenv.config();

export const DEVELOPMENT = process.env.NODE_ENV === "development";
export const TEST = process.env.NODE_ENV === "test";

const DATABASE_NAME = process.env.DATABASE_NAME || "";
const DATABASE_USER = process.env.DATABASE_USER || "root";
const DATABASE_PASS = process.env.DATABASE_PASS || "";
const DATABASE_HOST = process.env.DATABASE_HOST || "localhost";
const DATABASE_PORT = process.env.DATABASE_PORT
  ? Number(process.env.DATABASE_PORT)
  : 0;

const SERVER_HOST = process.env.SERVER_HOST || "localhost";
const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 0;
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 21600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || "mario";
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || "defaultSecret";
const SERVER_DOMAIN = process.env.SERVER_DOMAIN || "http://localhost:3000";

const SERVER_EMAIL = process.env.EMAIL;
const SERVER_EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

const SERVER = {
  serverport: SERVER_PORT,
  serverHost: SERVER_HOST,
  expiryTime: SERVER_TOKEN_EXPIRETIME,
  issuer: SERVER_TOKEN_ISSUER,
  secret: SERVER_TOKEN_SECRET,
  domain: SERVER_DOMAIN,
};

const DATABASE = {
  dbPort: DATABASE_PORT,
  dbHost: DATABASE_HOST,
  dbName: DATABASE_NAME,
  dbUser: DATABASE_USER,
  dbPass: DATABASE_PASS,
};

export const config = {
  server: SERVER,
  database: DATABASE,
};
