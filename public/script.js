console.log('public/script.js is working');
$(document).ready(function() {

    $('#add-res').on("click", function() {
        
        let resName = $('#res-name').val();
        let partySize = $('#party-size').val();
        let phone = $('#phone').val();
        console.log(resName,partySize,phone)
    })






})
