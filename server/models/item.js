module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('item', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    select: {
      type: DataTypes.ENUM('Food', 'Beverage', 'Medication', 'Supplement'),
      allowNull: true,
    },
    health_impact: {
      type: DataTypes.ENUM('Beneficial', 'Neutral', 'Avoid'),
      allowNull: true,
    },
  });

  return Item;
}
