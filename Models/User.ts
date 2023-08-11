import { DataTypes, Sequelize, Model } from 'sequelize';

// Esta función define el modelo User, con user_id como clave primaria, user y password
// El propio modelo valida que el usuario sea unico y no se pueda repetir

const User = (sequelize: Sequelize)  => {
  return sequelize.define('User', {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'users',
  });
};

export default User;