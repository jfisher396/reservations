console.log('public/script.js is working');
$(document).ready(function() {

    $.get("/api/tables").then((data) => {
        const tableDiv = $("#tables");

        data.forEach((table) => {
          let tableCard = $("<div>");
          tableCard.addClass("card");
          tableCard.addClass("table-card");
          tableCard.html(
            `<h4>Name: ${table.name}</h4><p>Party Size: ${table.partySize}</p><p>Phone: ${table.phone}</p>`
          );
          tableDiv.append(tableCard);
        });

        // console.log("table data:", data)
      });
      $.get("/api/waitlist").then((data) => {

        const waitDiv = $("#waiting");

        data.forEach((table) => {
          let waitCard = $("<div>");
          waitCard.addClass("card");
          waitCard.addClass("waitlist-card");
          waitCard.html(
            `<h4>Name: ${table.name}</h4><p>Party Size: ${table.partySize}</p><p>Phone: ${table.phone}</p>`
          );
          waitDiv.append(waitCard);
        });
      });


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

            $('#res-name').val("");
            $('#party-size').val("1");
            $('#phone').val("");
        })

    })






})
