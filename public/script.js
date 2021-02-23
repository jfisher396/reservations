$(document).ready(function () {

  const $tableDiv = $(".tables-div"); 

  const deleteTable = (id) => {
    return $.ajax({
      url: "api/tables/" + id,
      method: "DELETE",
    })
  }
  //retrieves table data from the API and creates a card for each party
  $.get("/api/tables").then((data) => {
    const tableDiv = $("#tables");

    data.forEach((table) => {
      let tableCard = $("<div>");
      let deleteButton = $("<button>");
      deleteButton.addClass("btn btn-danger table-remove-btn");
      deleteButton.text("Remove");
      tableCard.addClass("card");
      tableCard.addClass("table-card");
      tableCard.html(
        `<h4>Name: ${table.name}</h4><p>Party Size: ${table.partySize}</p><p>Phone: ${table.phone}</p>`
      );
      tableDiv.append(tableCard);
      tableCard.append(deleteButton);
    });
  });
  // retrieves waitlist data from API and creates a card for each party
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

  // creates a new reservation based on user input and either adds it to the table list or waitlist depending on how many tables are left
  $("#add-res").on("click", function (event) {
    console.log("add button clicked");
    event.preventDefault();
    const randomId = () => Math.random().toString(36).substr(2, 9);

    const newReservation = {
      name: $("#res-name").val().trim(),
      partySize: $("#party-size").val().trim(),
      phone: $("#phone").val().trim(),
      id: randomId(),
    };

    $.post("api/tables", newReservation).then(function (data) {
      if (data.hasTable) {
        alert(
          `A table for ${data.name} has been reserved for ${data.partySize}.`
        );
      } else {
        alert(`${data.name} has been put onto the waitlist.`);
      }
      // clears out the form upon submit
      $("#res-name").val("");
      $("#party-size").val("1");
      $("#phone").val("");

      window.location.href = "/tables";
    });
  });

  $tableDiv.on("click", ".table-remove-btn", function (event) {
    console.log("remove button clicked");
    event.stopPropagation();

    $.post("api/tables/:id", "2bs1ontna").then(function(data) {
      console.log(data)
    })
  });
});
