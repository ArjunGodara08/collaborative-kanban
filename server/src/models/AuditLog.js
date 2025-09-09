module.exports = (sequelize, DataTypes) => {
  return sequelize.define('AuditLog', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    boardId: { type: DataTypes.UUID, allowNull: false },
    eventType: { type: DataTypes.STRING, allowNull: false },
    payload: { type: DataTypes.JSONB, allowNull: false }
  }, { timestamps: true });
};
