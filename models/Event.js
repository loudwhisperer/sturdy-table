const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Event extends Model {}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    time_start: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        is: "^(1[0-2]|0?[1-9]):([0-5]?[0-9])(●?[AP]M)?$", //12 hour format
        is: "^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$", //24 hour format
      },
    },
    est_length: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    is_virtual: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    max_users: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumber: true,
        len: [2],
      },
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    attending_id: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: "user",
        key: "id",
        unique: true,
      },
    },
    host_id: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: "user",
        key: "id",
        unique: true,
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    game_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "event",
  }
);

module.exports = Event;