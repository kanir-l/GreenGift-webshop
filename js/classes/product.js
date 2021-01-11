let id = 1;

export default class Product {
    constructor(image, price, name, description) {
      this.id = id++;
      this.image = image;
      this.price = price;
      this.name = name;
      this.description = description;
    }
}