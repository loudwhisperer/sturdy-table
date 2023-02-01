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
    attending_id: {
      type: DataTypes.INTEGER,
    },
    host_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "eventgroup",
  }
);
  Eventgroup.associate = () => {
    Eventgroup.belongsTo(User, {
      foreignKey: 'id'
    });
    Eventgroup.belongsTo(Event, {
      foreignKey: 'id'
    });
  }
  return Eventgroup;

  module.export = Eventgroup;

