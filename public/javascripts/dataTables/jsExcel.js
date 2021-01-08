var array1 = new Array();
var array2 = new Array();
var n = 2; //Total table
for (var x = 1; x <= n; x++) {
    array1[x - 1] = x;
    array2[x - 1] = x + 'th';
}

var tablesToExcel = (function() {
    var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>',
        templateend = '</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>',
        body = '<body><h4 style="text-align:center;"><b>M. M. Sagar Dairy</b><br><span style="text-align:center;">Shop No.5, Anand Sagar Building, Plot no. 121, Charkop, Sector No. 1, Kandivali (West), Mumbai - 400067.<br>Email: vaisansar.scm@gmail.com<br></span></h4>',
        tablevar = '<br><table style="text-align:right;">{table',
        tablevarend = '}</table>',
        bodyend = '</body></html>',
        worksheet = '<x:ExcelWorksheet><x:Name>',
        worksheetend = '</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>',
        worksheetvar = '{worksheet',
        worksheetvarend = '}',
        base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
        format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) },
        wstemplate = '',
        tabletemplate = '';

    return function(table, name, filename) {
        var tables = table;
        for (var i = 0; i < tables.length; ++i) {
            wstemplate += worksheet + worksheetvar + i + worksheetvarend + worksheetend;
            tabletemplate += tablevar + i + tablevarend;
        }
        var allTemplate = template + wstemplate + templateend;
        var allWorksheet = body + tabletemplate + bodyend;
        var allOfIt = allTemplate + allWorksheet;

        var ctx = {};
        for (var j = 0; j < tables.length; ++j) {
            ctx['worksheet' + j] = name[j];
        }

       /* for (var k = 0; k < tables.length; ++k) {
            var exceltable;
            if (!tables[k].nodeType) exceltable = document.getElementById(tables[k]);
            ctx['table' + k] = exceltable.innerHTML;
        }*/
        
        for (var k = 0; k < tables.length; ++k) {
            var exceltable;
            if (!tables[k].nodeType) exceltable = document.getElementById(tables[k]);
            ctx['table' + k] = exceltable.innerHTML;
        }
        
        //document.getElementById("dlink").href = uri + base64(format(template, ctx));
        document.getElementById("dlink").shiv = filename;
        //document.getElementById("dlink").click();
        window.location.href = uri + base64(format(allOfIt, ctx));

    }
})();