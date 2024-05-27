import { DataTypes } from "sequelize";
import { sequelize } from "../database/connect.js";

const Pet = sequelize.define("pet", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  porte: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photo: {
    type: DataTypes.TEXT("long"),
    allowNull: false,
  },
  entryDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  characteristics: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  wantToAdopt: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: true, // Set to true if this field is optional
  },
});

Pet.sync().then(() => {
  console.log("table created");
});

export { Pet };
