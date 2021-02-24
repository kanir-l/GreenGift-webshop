$(function () {
    paymentSubmit()
})

function paymentSubmit() {
    document.getElementById('submit')
    let paymentSubmit = $('#submit')
    $(paymentSubmit).on('click', function() {
        localStorage.removeItem('savedProducts');  
        location.href = "thankyou.html"
    }) 
}
