import { config } from "./config";

const transport = {
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
};

const mailOptions = {
  sender: process.env.EMAIL,
};

const nodemailerConfig = {
  mailOptions: mailOptions,
  transport: transport,
};

export default nodemailerConfig;
