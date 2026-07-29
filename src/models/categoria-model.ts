import { DataTypes, Model } from "sequelize";
import sequelize from "@/database";

export class Categorias extends Model {
    id!: number;
    nome!: string;
    descrição!: string;
}

Categorias.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Categoria",
  }
);

export default Categorias;