const { sequelize } = require(".");

module.exports = (sequelize,DataTypes) => {
    const User = sequelize.define("User",{
        uID:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING,
        },
        email:{
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate:{
                isEmail: true
            }
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        phone:{
            type: DataTypes.STRING,
            validate: {
                len: 10,
              },
        }
    })
    return User;
}