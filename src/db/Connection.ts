import ormConfig from "../config/mikro-orm.config";
import { MikroORM } from "@mikro-orm/mysql";

export async function Connect() {
  return await MikroORM.init(ormConfig);
}
