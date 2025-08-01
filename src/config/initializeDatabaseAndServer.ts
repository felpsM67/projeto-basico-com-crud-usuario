import path from "path";
import { ENV } from "./env";
import fs from "fs";
import sequelize from "../database";
import { Sequelize } from "sequelize";

export const initializeDatabaseAndServer = async (startServer: (arg0: number) => Promise<void>) => {
    if (ENV.NODE_ENV !== "development") return;
  
    try {
      const modelsPath = path.resolve(__dirname, "./models");
      const modelFiles = fs.readdirSync(modelsPath).filter(file => file.endsWith("-model.ts"));
  
      const db: { [key: string]: any } = {
        sequelize,
        Sequelize,
      };
  
      for (const file of modelFiles) {
        const model = (await import(path.join(modelsPath, file))).default;
        const modelName = file.replace("-model.ts", "");
        db[modelName] = model;
      }
  
      console.log("Modelos carregados:", Object.keys(db).filter(key => key !== "sequelize" && key !== "Sequelize"));
      console.log("Banco de dados sincronizado");
      startServer(Number(ENV.PORT));
    } catch (err: any) {
      console.error("Erro ao sincronizar o banco de dados:", err);
    }
  };