const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: process.env.DB_SSL === 'true'
  }
});

// import models
const User = require('./User')(sequelize, DataTypes);
const Board = require('./Board')(sequelize, DataTypes);
const Column = require('./Column')(sequelize, DataTypes);
const Card = require('./Card')(sequelize, DataTypes);
const AuditLog = require('./AuditLog')(sequelize, DataTypes);

// associations
Board.hasMany(Column, { as: 'columns', onDelete: 'CASCADE' });
Column.belongsTo(Board);

Column.hasMany(Card, { as: 'cards', onDelete: 'CASCADE' });
Card.belongsTo(Column);

Card.belongsTo(User, { as: 'assignee', foreignKey: 'assigneeId' });

module.exports = {
  sequelize,
  Sequelize,
  User,
  Board,
  Column,
  Card,
  AuditLog,
  initDB: async () => {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true }); // for dev; use migrations for prod
    console.log('DB synced');
  }
};
