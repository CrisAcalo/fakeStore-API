const boom = require('@hapi/boom');

const { sequelize } = require('../libs/sequelize');
const ProductService = require('./product.service');

class OrderService {
  constructor() {
    this.Order = sequelize.models.Order;
    this.OrderProduct = sequelize.models.OrderProduct;
  }

  async create(data) {
    const order = await this.Order.create(data);
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
