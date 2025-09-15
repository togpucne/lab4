let url = location.host;//so it works locally and online

$("table").rtResponsiveTables();//for the responsive tables plugin

$("#add_drug").submit(function(event){//on a submit event on the element with id add_drug
    alert($("#name").val() + " sent successfully!");//alert this in the browser
})



$("#update_drug").submit(function(event){// on clicking submit
    event.preventDefault();//prevent default submit behaviour

    //var unindexed_array = $("#update_drug");
    var unindexed_array = $(this).serializeArray();//grab data from form
    var data = {}

    $.map(unindexed_array, function(n, i){//assign keys and values from form data
        data[n['name']] = n['value']
    })


    var request = {//use a put API request to use data from above to replace what's on database
    "url" : `/api/drugs/${data.id}`,
    "method" : "PUT",
    "data" : data
}

$.ajax(request).done(function(response){
    alert(data.name + " Updated Successfully!");
		window.location.href = "/manage";//redirects to index after alert is closed
    })

})

if(window.location.pathname == "/manage"){//since items are listed on manage
    $ondelete = $("table tbody td a.delete"); //select the anchor with class delete
    $ondelete.click(function(){//add click event listener
        let id = $(this).attr("data-id") // pick the value from the data-id

        let request = {//save API request in variable
            "url" : `/api/drugs/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this drug?")){// bring out confirm box
            $.ajax(request).done(function(response){// if confirmed, send API request
                alert("Drug deleted Successfully!");//show an alert that it's done
                location.reload();//reload the page
            })
        }

    })
}



if (window.location.pathname == "/purchase") {
  $("#drug_days").submit(function (event) {
    event.preventDefault();

    let days = +$("#days").val();

    // giữ nguyên value trong ô input (không xóa)
    $("#days").val(days);

    // gọi API để lấy danh sách thuốc
    $.get("/api/drugs", function (drugs) {
      let tbody = $("#purchase_table tbody");
      tbody.empty();

      drugs.forEach((drug, index) => {
        let pills = days * drug.perDay;
        let cardsToBuy = Math.ceil(pills / drug.card);
        let packsToBuy = Math.ceil(pills / drug.pack);
        let cardPerPack = (drug.pack / drug.card).toFixed(2);
        let cardLabel = cardPerPack < 2 ? "card" : "cards";

        tbody.append(`
          <tr>
            <td>${index + 1}</td>
            <td>${drug.name}</td>
            <td>${cardsToBuy} (${cardPerPack} ${cardLabel} per pack)</td>
            <td>${packsToBuy}</td>
          </tr>
        `);
      });

      $("#purchase_table").show();
    });
  });
}
