import CartProduct from './classes/cartProduct.js'

let id = 1;
let products = []
export let cartProducts = []

/*Get local storage for cart products*/
let savedProducts = JSON.parse(localStorage.getItem("savedProducts"));

if (savedProducts) {
    cartProducts = savedProducts
} 

$(function () {
    cart()
    cartActive()
    createCartProducts()
    notice()
})

export function cart() {
    let cartContainer = $('#cart-container').addClass('cart-container')

    $('<h3>').addClass('total-price').html("Total Price:" + " " + totalPrice() ).appendTo(cartContainer)

    $('<button>').addClass('purchase-button').html("Continue to Payment").appendTo(cartContainer).on('click', function() {
        location.href = "checkout.html";
    })
}


export function cartActive() {
    $('#basket').on('click', function() {
        if($('#cart-container').hasClass('cart-container')) {
            $('#cart-container').removeClass('cart-container').addClass('cart-container-active').fadeIn(1000)
        }
        else {
            $('#cart-container').removeClass('cart-container-active').addClass('cart-container')
        }
    })
}

export function createCartProducts() {
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

export function addToCart(e) {
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
}

export function clickDeleteCartProducts(e) {
    cartProducts.splice(e.data.c, 1)
    console.log(cartProducts)

    localStorage.setItem("savedProducts", JSON.stringify(cartProducts));

    createCartProducts()
    notice()
}

export function plusAmount(e) {
    e.data.plus.amount++;

    localStorage.setItem("savedProducts", JSON.stringify(cartProducts));
    
    createCartProducts()
    notice()
}

export function minusAmount(e) {
     e.data.minus.amount--;
    if (e.data.minus.amount === 0) {
        cartProducts.splice(e.data.cartIndex, 1)
    } 

    localStorage.setItem("savedProducts", JSON.stringify(cartProducts));

    createCartProducts()
    notice()
}

export function totalPrice() {
    let sum = 0
    cartProducts.forEach((item, i) => {
        sum += item.price * item.amount
    })

    return sum
}

export function notice() {
    //console.log('cartProducts', cartProducts);
    let set = cartProducts.reduce(function (a, b){
        return a + b.amount}, 0) 
      
    $('.notice').html(set)
}
