import jwt from "jsonwebtoken";
import { config } from "../config/config";
import IUser from "../interfaces/user";

export const signJWT = (
  user: IUser,
  callback: (error: Error | null, token: string | null) => void,
): void => {
  const epochTime = new Date().getTime();
  const expiryTime = epochTime + Number(config.server.expiryTime) * 100000;

  const expirationTimeInSeconds = Math.floor(expiryTime / 1000);

  try {
    jwt.sign(
      {
        username: user.username,
      },
      config.server.secret,
      {
        issuer: config.server.issuer,
        algorithm: "HS256",
        expiresIn: expirationTimeInSeconds,
      },
      (error, token) => {
        if (error) {
          callback(error, null);
        } else if (token) {
          callback(null, token);
        }
      },
    );
  } catch (error) {
    console.log(error);
  }
};
