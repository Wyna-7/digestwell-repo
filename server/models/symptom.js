module.exports = (sequelize, DataTypes) => {
  const Symptom = sequelize.define('symptom', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    stool_type: {
      type: DataTypes.ENUM(
        'Type 1',
        'Type 2',
        'Type 3',
        'Type 4',
        'Type 5',
        'Type 6',
        'Type 7'
      ),
      allowNull: true,
    },
    is_bleeding: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    other_symptoms: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
  return Symptom;
};
