import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { config } from "../config/config";
import nodemailerConfig from "../config/nodemailer.config";
import UserInterface from "../interfaces/User.interface";

function getExpirationTimeInSeconds(timeInSeconds?: number): number {
  const epochTime = new Date().getTime();
  const arbitraryInterval = timeInSeconds ?? Number(config.server.expiryTime);
  const expiryTime = epochTime + arbitraryInterval * 100000;

  return Math.floor(expiryTime / 1000);
}

export const JWTService = (
  user: UserInterface,
  callback: (error: Error | null, token: string | null) => void,
): void => {
  const expirationTimeInSeconds: number = getExpirationTimeInSeconds();

  try {
    jwt.sign(
      {
        username: user.username,
        email: user.email,
        id: user._id,
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

export async function passwordRecoveryEmail(user: UserInterface) {
  const expirationTimeInSeconds: number = getExpirationTimeInSeconds(900);
  const token = jwt.sign(
    {
      email: user.email,
    },
    config.server.secret,
    {
      issuer: config.server.issuer,
      algorithm: "HS256",
      expiresIn: expirationTimeInSeconds,
    },
  );

  const link = `${config.server.domain}/reset-password?token=${token}`;

  const message = `Dear ${user.username},
      To reset your password, please click on the following link: ${link}
      
      For security reasons, this link will expire in  2min.
      Thank you.
    `;

  const transporter = nodemailer.createTransport(nodemailerConfig.transport);

  const mailOptions = {
    from: nodemailerConfig.mailOptions.sender,
    to: user.email,
    subject: "Password Recovery",
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
