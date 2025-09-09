module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Column', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    position: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
  }, { timestamps: true });
};
