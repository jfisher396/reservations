console.log('public/script.js is working');
$(document).ready(function() {

    $('#add-res').on("click", function(event) {

        event.preventDefault();

        const newReservation = {
            name: $('#res-name').val().trim(),
            partySize: $('#party-size').val().trim(),
            phone: $('#phone').val().trim()
        }
        
        // console.log(newReservation)

        $.post("api/tables", newReservation, function(data) {
            
            if (data.hasTable) {
                alert(`A table for ${data.name} has been reserved for ${data.partySize}.`)
            } else {
                alert(`${data.name} has been put onto the waitlist.`)
            }
        })

    })






})
