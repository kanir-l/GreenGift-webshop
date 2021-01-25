$(function () {
    paymentSubmit()
})

function paymentSubmit () {
    document.getElementById('submit')
    let paymentSubmit = $('#submit')
    $(paymentSubmit).on('click', function() {
        location.href = "thankyou.html"
        console.log("hej")
    }) 
}
