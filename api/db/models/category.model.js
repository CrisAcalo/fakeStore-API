//category.model
//id, name, image, decription

const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORY_TABLE = 'categories';

const CategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.fn('now'),
  },
}

class Category extends Model {
  static associate(models) {
    this.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'categoryId'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false,
    }
  }
}

module.exports = { CATEGORY_TABLE, Category, CategorySchema }
