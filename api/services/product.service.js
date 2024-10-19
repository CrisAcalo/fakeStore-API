const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductService {

  constructor() {
    this.products = [];
    this.generate();
  }

  async generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.string.uuid(),
        categoryId: faker.number.int({ min: 1, max: 5 }).toString(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(body) {
    const newProduct = {
      id: faker.string.uuid(),
      ...body,
      isBlock: faker.datatype.boolean(),
    };
    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 1000);
    })
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('Product is block');
    }
    return product;

  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    } else {
      this.products[index] = {
        ...this.products[index],
        ...changes
      };
      return this.products[index];
    }
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    } else {
      this.products.splice(index, 1);
      return { id };
    }
  }

}


module.exports = new ProductService(); // para que exista una sola instancia
