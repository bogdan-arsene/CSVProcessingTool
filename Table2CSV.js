$(document).ready(function() {

    function exportTableToCSV($table, filename) {
  
      var $rows = $table.find('tr:has(td)'),
  
        
        // Avoid accidentally splitting the actual contents
        tmpColDelim = String.fromCharCode(11), // vertical tab character
        tmpRowDelim = String.fromCharCode(0), // null character
  
        // actual delimiter characters for CSV format
        colDelim = '","',
        rowDelim = '"\r\n"',
  
        // Grabing text from table into CSV formatted string
        csv = '"' + $rows.map(function(i, row) {
          var $row = $(row),
            $cols = $row.find('td');
  
          return $cols.map(function(j, col) {
            var $col = $(col),
              text = $col.text();
  
            return text.replace(/"/g, '""'); // escape double quotes
  
          }).get().join(tmpColDelim);
  
        }).get().join(tmpRowDelim)
        .split(tmpRowDelim).join(rowDelim)
        .split(tmpColDelim).join(colDelim) + '"';
  
    
      if (window.Blob && window.URL) {
        // Creating an HTML5 Blob        
        var blob = new Blob([csv], {
          type: 'text/csv;charset=utf-8'
        });
        var csvUrl = URL.createObjectURL(blob);
  
        $(this)
          .attr({
            'download': filename,
            'href': csvUrl
          });
      } else {
        // Data URI
        var csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);
  
        $(this)
          .attr({
            'download': filename,
            'href': csvData,
            'target': '_blank'
          });
      }
    }
  
    // Downloading the csv upon clicking export
    $(".export").on('click', function(event) {
      // CSV
      var args = [$('table'), 'export.csv'];
  
      exportTableToCSV.apply(this, args);

    });
  });