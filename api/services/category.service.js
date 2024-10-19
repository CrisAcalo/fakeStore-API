const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const ProductService = require('./product.service');

class CategoryService {

  constructor() {
    this.categories = [];
    this.generate();
  }

  async generate() {
    const limit = 5;
    for (let i = 1; i <= limit; i++) {
      this.categories.push({
        id: i.toString(),
        name: faker.commerce.department(),
        image: faker.image.url(),
        description: faker.lorem.sentence({ min: 10, max: 20 }),
      });
    }
  }

  // async create(body) {
  //   const newCategory = {
  //     ...body
  //   };
  //   this.categories.push(newCategory);
  //   return newCategory;
  // }

  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.categories);
      }, 1000);
    })
  }

  async findOne(id) {
    const category = this.categories.find(item => item.id === id);
    if (!category) {
      throw boom.notFound(`Category ::${id}:: not found`);
    }
    return category;
  }

  async update(id, changes) {
    const index = this.categories.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Category not found');
    } else {
      this.categories[index] = {
        ...this.categories[index],
        ...changes
      };
      return this.categories[index];
    }
  }

  async delete(id) {
    if (ProductService.products.some(product => product.categoryId === id.toString()) ) {
      throw boom.conflict('Category has products');
    }
    const index = this.categories.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Category not found');
    } else {
      this.categories.splice(index, 1);
      return { id };
    }
  }

  async findProducts(id) {
    const products = ProductService.products.filter(product => product.categoryId === id.toString());
    return products;
  }
}

module.exports = CategoryService;
