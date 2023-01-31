const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Friend extends Model {}

Friend.init(
    {
    user_id: {
        type: DataTypes.BIGINT,     
        references: {
            model: "user",
            key: "id",
    }}, 
    friend_id: {
        type: DataTypes.BIGINT,     
        references: {
            model: "user",
            key: "id",
    }}
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "friend",
}
);

module.exports = Friend;