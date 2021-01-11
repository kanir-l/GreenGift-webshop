import Product from './classes/product.js'
import { addToCart, createCartProducts, notice } from './cart.js';

let products = []

let product1 = new Product(
    "<img src='./../img/product1.jpg'>", 
    349, 
    "Cast-Iron Plant", 
    "Cast-iron plants are hardy plants that can withstand a range of light and soil conditions."
)
let product2 = new Product(
    "<img src='./../img/product2.jpg'>", 
    189, 
    "Spider Plant", 
    "These plants have a lot of long, skinny leaves that poke out from their pots."
)
let product3 = new Product(
    "<img src='./../img/product3.jpg'>", 
    269, 
    "Calathea", 
    "Calathea are one of the best houseplants you can have in your home due to their variety of sizes,"
)
let product4 = new Product(
    "<img src='./../img/product4.jpg'>", 
    189, 
    "Echeveria", 
    "The echeveria is one of the most common types of succulents. Little plants like these are more commonly found at office and home desks due to their easy care and small size."
)
let product5 = new Product(
    "<img src='./../img/product5.jpg'>", 
    169, 
    "Jade Plant", 
    "Jade plants are most known for their thick, oval-shaped leaves. Jade plants can live for years as long as they are given the proper care."
)
let product6 = new Product(
    "<img src='./../img/product6.jpg'>", 
    319, 
    "Lemon", 
    "En vacker grön växt som levereras i en trendig terrakottakruka."
)

$(function () {
    listProducts()
    createProducts()
    createCartProducts()
    notice()
})

function listProducts() {
   products.push(product1, product2, product3, product4, product5, product6)
}

function createProducts() {
    let productList = $('#product-list').addClass('p-list')
    
    $.each(products, (i, product) => {
        
        let productID = $('<div>').addClass('p-id').attr('id', product.id).appendTo(productList)

        $('<div>').addClass('p-image').html(product.image).appendTo(productID)
        $('<h3>').addClass('p-name').html(product.name).appendTo(productID)
        $('<h2>').addClass('p-price').html(product.price).appendTo(productID)
        $('<p>').addClass('p-description').html(product.description).appendTo(productID)

        let addToCart = $('<button>').addClass('add-to-cart').html("Add to cart").appendTo(productID)
        addToCart.on('click', {p: products[i]}, clickAddProducts)
       
    })
}

function clickAddProducts(e) {
    addToCart(e);
    createCartProducts()
    notice()
}





