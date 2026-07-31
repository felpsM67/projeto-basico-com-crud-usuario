import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "@/database";

interface EntregadorAttributes {
  id: number;
  nome: string;
  telefone: string;
  documento: string;
  disponivel: boolean;
  ativo: boolean;
  userId: number;
}

interface EntregadorCreationAttributes
  extends Optional<
    EntregadorAttributes,
    "id" | "disponivel" | "ativo" 
  > {}

export class Entregador
  extends Model<EntregadorAttributes, EntregadorCreationAttributes>
  implements EntregadorAttributes
{
  declare id: number;
  declare nome: string;
  declare telefone: string;
  declare documento: string;
  declare disponivel: boolean;
  declare ativo: boolean;
  declare userId: number;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Entregador.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    documento: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    disponivel: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "Users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Entregador",
    tableName: "Entregadores",
    timestamps: true,
  }
);

export default Entregador;