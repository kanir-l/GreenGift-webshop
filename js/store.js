class Product {
    constructor(image, price, name, description) {
      this.id = id++;
      this.image = image;
      this.price = price;
      this.name = name;
      this.description = description;
    }
}

class CartProduct extends Product {
    constructor(product) {
        super(product.image, product.price, product.name, product.description)
        this.product_id = product.id;
        this.amount = 1;
    }
}

let id = 1;
let products = []
let cartProducts = []

/*Get local storage for cart products*/
let savedProducts = JSON.parse(localStorage.getItem("savedProducts"));

if (savedProducts) {
    cartProducts = savedProducts
} 



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
    cart()
    createCartProducts()
    cartActive()
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
    let existingCartProduct = cartProducts.filter((item) => {
        return item.product_id === e.data.p.id;
    });
    
    if(
        existingCartProduct.length === 0
    ) {
        let theCartProduct = new CartProduct(e.data.p);
        cartProducts.push(theCartProduct)
        localStorage.setItem("savedProducts", JSON.stringify(cartProducts));
    } else {
        existingCartProduct[0].amount++;
        localStorage.setItem("savedProducts", JSON.stringify(cartProducts));
    }

    createCartProducts()
    notice()
}

function cart() {
    let cartContainer = $('#cart-container').addClass('cart-container')

    $('<h3>').addClass('total-price').html("Total Price:" + " " + totalPrice() ).appendTo(cartContainer)

    $('<button>').addClass('purchase-button').html("Continue to Payment").appendTo(cartContainer)
}

function createCartProducts() {
    
    let cartList = $('#cart-list').addClass('c-list')

    cartList.html("")

    $.each(cartProducts, (i, cartProduct) => {

        let cartID = $('<div>').addClass('c-id').attr('id', cartProduct.id).appendTo(cartList)

        $('<div>').addClass('c-image').html(cartProduct.image).appendTo(cartID)
        $('<h3>').addClass('c-name').html(cartProduct.name).appendTo(cartID)
        $('<h2>').addClass('c-price').html(cartProduct.price).appendTo(cartID)

        $('<h2>').addClass('c-amount').html(cartProduct.amount).appendTo(cartID)

        let amountPlus = $('<button>').addClass('c-plus').html("+").appendTo(cartID)
        amountPlus.on('click', {plus: cartProduct}, plusAmount)

        let amountMinus = $('<button>').addClass('c-minus').html("-").appendTo(cartID)
        amountMinus.on('click', {minus: cartProduct, cartIndex: i}, minusAmount)    

        let deleteFromCart = $('<button>').addClass('delete-from-cart').html("Delete").appendTo(cartID)
        deleteFromCart.on('click', {c: i}, clickDeleteCartProducts) 
        // sending 'i' as the index of the array. cannot sending in the whole thing as cartProduct[i] 
        // because that contains a whole thing as an object in an array. Splice works with array, means just the index
    })
    
    $('.total-price').html("Total Price:" + " " + totalPrice() )
}

function cartActive() {
    $('#basket').on('click', function() {
        if($('#cart-container').hasClass('cart-container')) {
            $('#cart-container').removeClass('cart-container').addClass('cart-container-active').fadeIn(1000)
        }
        else {
            $('#cart-container').removeClass('cart-container-active').addClass('cart-container')
        }
    })
}

function clickDeleteCartProducts(e) {
    cartProducts.splice(e.data.c, 1)
    console.log(cartProducts)

    localStorage.setItem("savedProducts", JSON.stringify(cartProducts));

    createCartProducts()
    notice()
}

function plusAmount(e) {
    e.data.plus.amount++;

    localStorage.setItem("savedProducts", JSON.stringify(cartProducts));
    
    createCartProducts()
    notice()
}

function minusAmount(e) {
     e.data.minus.amount--;
    if (e.data.minus.amount === 0) {
        cartProducts.splice(e.data.cartIndex, 1)
    } 

    localStorage.setItem("savedProducts", JSON.stringify(cartProducts));

    createCartProducts()
    notice()
}

function totalPrice() {
    let sum = 0
    cartProducts.forEach((item, i) => {
        sum += item.price * item.amount
    })

    return sum
}

function notice() {
    let set = cartProducts.reduce(function (a, b){
        return a + b.amount}, 0) 
      
    $('.notice').html(set)
}



