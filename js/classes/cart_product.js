import Product from './product.js';

export default class CartProduct extends Product {
    constructor(product) {
        super(product.image, product.price, product.name, product.description)
        this.product_id = product.id;
        this.amount = 1;
    }
}