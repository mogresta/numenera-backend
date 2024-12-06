import { Express, RequestHandler } from "express";

export type RouteHandler = Map<
  keyof Express,
  Map<string, RequestHandler[]>
>; /* keys are express variables, values are a map of route path and function that handles request */
