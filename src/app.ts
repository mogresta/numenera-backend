import express, { Express, Request, Response } from "express";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.set("Content-Type", "application/json");
  res.send(
    JSON.stringify({
      data: "Hello World!",
    }),
  );
});

export default app;
