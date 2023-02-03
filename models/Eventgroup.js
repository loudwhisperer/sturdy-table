const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Eventgroup extends Model {}

Eventgroup.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    approved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: "id",
      },
    },
    eventId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'event',
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    //underscored: true,
    modelName: "eventgroup",
  }
);

module.exports = Eventgroup;
