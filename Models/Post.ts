import { DataTypes, Sequelize } from 'sequelize';
import { Users } from '../index';

// Esta función define el modelo Post
// Incluye los atributos post_id como clave primaria, user_id como clave foranea, title, text e image


const Post = (sequelize: Sequelize) => {
  return sequelize.define('Post', {
    post_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: 'user_id',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: 'https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png',
    },
  }, {
    tableName: 'posts',
  });
};

export default Post;