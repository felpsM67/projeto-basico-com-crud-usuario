import { Dialect, Sequelize } from "sequelize";
import config from "./config/config.json";
type ConfigKeys = "development";
const env = (process.env.NODE_ENV || "development") as ConfigKeys;
const dbConfig = config[env];

const sequelize = process.env.NODE_ENV !== "test" ? new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect as Dialect,
    port: dbConfig.port,
    logging: false,
  }
) : new Sequelize({ dialect: 'sqlite', storage: ':memory:', logging: false });
export default sequelize;
