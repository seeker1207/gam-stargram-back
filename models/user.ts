import { Sequelize } from 'sequelize';

interface UserType {
    id: string;
    email: string;
    nickname: string;
    password: string;
}
export default (sequelize: Sequelize, DataTypes: any) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(30),
      allowNull: true,
      unique: true,
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });

  return User;
  // User.association = (db) => {
  //
  //
  // }
};
