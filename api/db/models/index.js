const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');

function setupModels(sequelize){
  User.init(UserSchema, User.config(sequelize)); // inicializa el modelo User
  Customer.init(CustomerSchema, Customer.config(sequelize)); // inicializa el modelo Customer

  Customer.associate(sequelize.models);  // asocia el modelo Customer con el modelo User
  User.associate(sequelize.models); // asocia el modelo User con el modelo Customer
}

module.exports = { setupModels };
