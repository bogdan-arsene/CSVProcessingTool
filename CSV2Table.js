$( document ).ready(function() {

    // Clicking the 'Input' button
    $('#viewfile').click(function () {

        //Showing a loading text while the csv file parses to give some feedback for the user
        $('#loading').show().delay(5000).fadeOut();

        // Reading the csv file with the FileReader API
        var rdr = new FileReader();
        rdr.onload = function (e) {
            var csvData = e.target.result;
            
            // Using Papa Parse for parsing the csv file to JSON format
            var parsedData = Papa.parse(csvData, {header : false}); 

            var lines = [],output = [],i;

            // lines is an array of data and each of its elements is a row of data from the csv
            lines = parsedData.data;

            //loop through the rows and creating the table
            for (i = 0; i < lines.length; i++)
                // Adds data to each cell in the row
                output.push("<tr><td contenteditable='true'>" + lines[i].join("</td><td contenteditable='true'>") + "</td></tr>"); 
            output = "<table>" + output.join("") + "</table>";

            // Adds table to html body
            $("body").append(output);	

            // Shows div after creating table
            $("#aftertable").show()


            // Adds new record based on user text input 
            $("#add").click(function() {
              var newRecord = $('#inputrecord').val() // takes the data from the text area
              var row = Papa.parse(newRecord, {header : false}); // parses it accordingly
              var markup = "<tr><td contenteditable='true'>" + row.data[0].join("</td><td contenteditable='true'>") + "</td></tr>";
   
              $("table tbody").append(markup);

              //Scrolls to the position of the added row
              $("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
            });

        }
        rdr.readAsText($("#inputfile")[0].files[0]);
        
    });

    // Takes the user back to the top of the page
    $("#back").click(function() {
        $("html, body").animate({scrollTop: 0}, 1000);
      });
  });