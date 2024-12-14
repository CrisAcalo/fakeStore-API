const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Product, ProductSchema } = require('./product.model');
const { Category, CategorySchema } = require('./category.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize)); // inicializa el modelo User
  Customer.init(CustomerSchema, Customer.config(sequelize)); // inicializa el modelo Customer
  Product.init(ProductSchema, Product.config(sequelize)); // inicializa el modelo Product
  Category.init(CategorySchema, Category.config(sequelize)); // inicializa el modelo Category

  Customer.associate(sequelize.models);  // asocia el modelo Customer con el modelo User
  User.associate(sequelize.models); // asocia el modelo User con el modelo Customer
  Product.associate(sequelize.models); // asocia el modelo Product con el modelo Category
  Category.associate(sequelize.models); // asocia el modelo Category con el modelo Product
}

module.exports = { setupModels };
