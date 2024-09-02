'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class expenses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  expenses.init({
    initialamount:{
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    description:{
      allowNull: false,
      type: DataTypes.STRING,
    },
    amount:{
      allowNull: false,
      type: DataTypes.FLOAT,
    }
  }, {
    sequelize,
    modelName: 'expenses',
  });
  return expenses;
};