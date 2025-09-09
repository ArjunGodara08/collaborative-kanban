module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Card', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    labels: { type: DataTypes.JSONB, defaultValue: [] },
    dueDate: { type: DataTypes.DATE, allowNull: true },
    position: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    assigneeId: { type: DataTypes.UUID, allowNull: true }
  }, { timestamps: true });
};
