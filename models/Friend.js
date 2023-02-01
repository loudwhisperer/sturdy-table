// const { Model, DataTypes } = require("sequelize");
// const sequelize = require("../config/connection");

// class Friend extends Model {}

// Friend.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     user_id: {
//       type: DataTypes.BIGINT,
//       references: {
//         model: "user",
//         key: "id",
//       },
//     },
//     friend_id: {
//       type: DataTypes.BIGINT,
//       references: {
//         model: "user",
//         key: "id",
//       },
//     },
//   },
//   {
//     sequelize,
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: "friend",
//   }
// );

// module.exports = Friend;