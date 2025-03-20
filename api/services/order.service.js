const boom = require('@hapi/boom');

const { sequelize } = require('../libs/sequelize');
const ProductService = require('./product.service');

class OrderService {
  constructor() {
    this.Order = sequelize.models.Order;
    this.OrderProduct = sequelize.models.OrderProduct;
    this.Customer = sequelize.models.Customer;
  }

  async create(data) {
    const customer = await this.Customer.findOne({
      where: { userId: data.userId }
    })
    const orderData = {
      ...data,
      customerId: customer.id
    }
    const order = await this.Order.create(orderData);
    return order;
  }

  async findAll() {
    const orders = await this.Order.findAll();
    return orders;
  }

  async findOne(id) {
    const order = await this.Order.findByPk(id,
      {
        include: [
          {
            association: 'customer',
            include: ['user'],
          },
          'items',
        ]
      }
    );
    if (!order) {
      throw boom.notFound('Order not found');
    }
    return order;
  }

  async findByUser(userId) {
    const orders = await this.Order.findAll({
      where: { '$customer.user.id$': userId },
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items',
      ]
    });
    return orders;
  }

  async update(id, changes) {
    const order = await this.findOne(id);
    const updatedOrder = await order.update(changes);
    return updatedOrder;
  }

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();
    return { id };
  }

  async addItem(data) {
    const { orderId, productId } = data;
    await this.findOne(orderId);
    await ProductService.findOne(productId);

    const item = await this.OrderProduct.create(data);
    return item;
  }
}

module.exports = OrderService;
