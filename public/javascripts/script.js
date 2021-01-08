window.setInterval(function () {
    var online = navigator.onLine;
    if (!online) {
        //  Materialize.Toast.removeAll();
        Materialize.toast("No internet connection. There might be problem while fetching data.", 5000, 'toastInternetConnectionError');
    } else {
        //  Materialize.Toast.removeAll();
    }
}, 30000);

function getDataTableJson(tableId, columnNo, pdfWidth, lengthMenu) {
    if (lengthMenu != undefined) {
        lengthMenu = lengthMenu
    } else {
        lengthMenu = [
            [10, 25, 50, -1],
            ['10 ', '25 ', '50 ', 'All']
        ]
    }
    $('#' + tableId).DataTable({
        "oLanguage": {
            "sLengthMenu": "Show:  _MENU_",
            "sSearch": "_INPUT_" //search
        },
        "bDestroy": true,
        autoWidth: false,
        columnDefs: columnNo,
        lengthMenu: lengthMenu,

        dom: '<"row noBottomMargin"<"col s4 l2 m2 left noPadding"l><"col s8 l3 m3 right  noPadding"f><"col s12 l7 m7 center center-align"B>>r<"scrollDivTable"t>ip',
        buttons: {
            buttons: [
                //      {
                //      extend: 'pageLength',
                //      className: 'pageLengthButton waves-effect waves-light   white-text blue-grey lighten-1'
                //  }, 
                {
                    extend: 'pdf',
                    className: 'pdfButton  waves-effect waves-light  grey lighten-3 light-blue-text text-darken-4 z-depth-2',
                    text: '<i class="fa fa-file-pdf-o"></i>&nbsp;<span style="font-size:15px;">PDF<span>',
                    //title of the page
                    title: function () {
                        var name = $(".heading").text().trim();
                        return name
                    },
                    //file name 
                    filename: function () {
                        var d = new Date();
                        var date = d.getDate();
                        var month = d.getMonth();
                        var year = d.getFullYear();
                        var name = $(".heading").text().trim();
                        return name + date + '-' + month + '-' + year;
                    },
                    //  exports only dataColumn
                    exportOptions: {
                        columns: ':visible.print-col'
                    },
                    customize: function (doc, config) {
                        doc.content.forEach(function (item) {
                            if (item.table) {
                                item.table.widths = pdfWidth;
                            }
                        })
                        var tableNode;
                        for (i = 0; i < doc.content.length; ++i) {
                            if (doc.content[i].table !== undefined) {
                                tableNode = doc.content[i];
                                break;
                            }
                        }

                        var rowIndex = 0;
                        var tableColumnCount = tableNode.table.body[rowIndex].length;

                        if (tableColumnCount > 6) {
                            doc.pageOrientation = 'landscape';
                        }
                        /*for customize the pdf content*/
                        doc.content[1].table.alignment = 'center';
                        doc.pageMargins = [5, 20, 10, 5];

                        doc.defaultStyle.fontSize = 8;
                        doc.styles.title.fontSize = 12;
                        doc.styles.tableHeader.fontSize = 11;
                        doc.styles.tableFooter.fontSize = 11;
                        doc.styles.tableHeader.alignment = 'center';
                        doc.styles.tableBodyEven.alignment = 'center';
                        doc.styles.tableBodyOdd.alignment = 'center';

                    },


                },
                {
                    extend: 'excel',
                    className: 'excelButton waves-effect waves-light grey lighten-3 light-blue-text text-darken-4 z-depth-2',
                    text: '<i class="fa fa-file-excel-o fa-fw"></i><span style="font-size:15px;">EXCEL<span>',
                    //title of the page
                    title: function () {
                        var name = $(".heading").text().trim();;
                        return name
                    },
                    //file name 
                    filename: function () {
                        var d = new Date();
                        var date = d.getDate();
                        var month = d.getMonth();
                        var year = d.getFullYear();
                        var name = $(".heading").text().trim();
                        return name + date + '-' + month + '-' + year;
                    },
                    //  exports only dataColumn
                    exportOptions: {
                        columns: ':visible.print-col'
                    },
                },
                {
                    extend: 'print',
                    className: ' printButton waves-effect waves-light grey lighten-3 light-blue-text text-darken-4 z-depth-2',
                    text: '<i class="fa fa-print fa-fw"></i><span>PRINT<span>',
                    //title of the page
                    title: function () {
                        var name = $(".heading").text().trim();
                        return name
                    },
                    //file name 
                    filename: function () {
                        var d = new Date();
                        var date = d.getDate();
                        var month = d.getMonth();
                        var year = d.getFullYear();
                        var name = $(".heading").text().trim();
                        return name + date + '-' + month + '-' + year;
                    },
                    //  exports only dataColumn
                    exportOptions: {
                        columns: ':visible.print-col'
                    },
                    customize: function (win) {
                        $(win.document.body).css({
                            'text-align': 'center',
                            'font-size': '10px'
                        });
                        //border-collapse css for preventing the double border in print table
                        $(win.document.body).find('table').css('border-collapse', ' collapse');
                        $(win.document.body).find('table td,table th').addClass('compact').css({
                            'border': '1px solid #9e9e9e',
                            'text-align': 'center'
                        });
                    }
                },
                {
                    extend: 'colvis',
                    className: 'center-align colvisButton waves-effect waves-light grey lighten-3 light-blue-text text-darken-4 z-depth-2',
                    text: '<span style="font-size:15px;">COLUMN VISISBILITY<span>&nbsp;&nbsp;<i class="fa fa-caret-down fa-fw"></i> ',
                    collectionLayout: 'fixed two-column',
                    align: 'left'
                },
            ]
        }

    });
    $('select').material_select();
    $("select")
        .change(function () {
            var t = this;
            var content = $(this).siblings('ul').detach();
            setTimeout(function () {
                $(t).parent().append(content);
                $("select").material_select();
            }, 200);
        });
    $('.dataTables_filter input').attr("placeholder", "Search");
}

$(document).ready(function () {
    var myLazyLoad = new LazyLoad();
    $('.preloader-background').hide();
    $(".button-collapse").sideNav();
    $('.collapsible').collapsible();
    $('select').material_select();

    // for HTML5 "required" attribute
    $("select[required]").css({
        display: "inline",
        height: 0,
        margin: 0,
        padding: 0,
        width: 0
    });

    $('select').material_select('destroy');

    $('select').select2({
        placeholder: "Choose multiple options",
        allowClear: true
    });

    $("select").addClass("select2");

    if ($(".select2").parent().find("i.prefix")) {
        $("select").select2({
            width: '85%',
        });
    } else {
        $("select").select2({
            width: '100%',
        });
    }
    $(".select2_100").select2({
        width: '100%',
    });
    $("select[multiple]").select2({
        width: '90%',
    });
    $(".select2_100[multiple]").select2({
        width: '100%',
    });
    // $('.btnSelect').parent().find('.select2-container').addClass('btnSelect');

    $('.modal').modal();

    /* for sidenav collapse width */
    $('#slide').click(function () {
        $(this).toggleClass("reveal-open");

        //$(this).toggleClass("sidebutton");
        // hides all heading and shows only icons
        $('#logo-collapse').toggle();
        $('#logo-collapse-full').toggle();
        $('.element-sideNav').toggle();

        //hide logo 
        // $('.logo').toggle();
        // half closes side nav
        $('.side-nav').toggleClass("reveal-open");
        // remove left padding of body
        $('main').toggleClass("paddingBody");

        // starts body content after half side nav ends
        $('main').toggleClass("intro");
        /*for setting width to 100% to prevent misaligned of table header and body*/
        //$.fn.dataTable.tables( {visible: true, api: true} ).columns.adjust();
        $($.fn.dataTable.tables({
            visible: true,
            api: true
        })).DataTable().columns.adjust();
        $('.dataTables_scrollHeadInner,.dataTables_scrollHeadInner table').width("100%");
    });
    $('select.browser-default').select2('destroy');
    //  for no of entries and global search


    //  $('.checkAll').on('click', function() {
    //      $(this).closest('table').find('tbody :checkbox')
    //          .prop('checked', this.checked)
    //          .closest('tr').toggleClass('selected', this.checked);
    //  });

    //  $('tbody :checkbox').on('click', function() {
    //      $(this).closest('tr').toggleClass('selected', this.checked);

    //      $(this).closest('table').find('.checkAll').prop('checked', ($(this).closest('table').find('tbody :checkbox:checked').length == $(this).closest('table').find('tbody :checkbox').length)); //Tira / coloca a seleção no .checkAll
    //  });


    //for add placeholder in dataTable search 
    $('.dataTables_filter input').attr("placeholder", "  Search");

    /*for finding yesterday date*/
    var yesterday = new Date((new Date()).valueOf() - 1000 * 60 * 60 * 24);
    $('.disableDate').pickadate({
        container: 'main',
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        today: 'Today',
        clear: 'Clear',
        close: 'Ok',
        format: 'yyyy-mm-dd',
        closeOnSelect: 'true', // Close upon selecting a date,

        // this function closes after date selection Close upon
        // selecting a date,
        onSet: function (ele) {
            if (ele.select) {
                this.close();
            }
        },
        onStart: function () {
            var date = new Date();
            this.set('select', [date.getFullYear(), date.getMonth(), date.getDate()]);

        },
        disable: [{
            from: [0, 0, 0],
            to: yesterday
        }]
    });
    $('.datepicker.disableFutureDate').pickadate({
        container: 'body',
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        today: 'Today',
        clear: '',
        close: 'Ok',
        max: true,
        format: 'yyyy-mm-dd',
        //formatSubmit: 'yyyy-mm-dd',
        closeOnSelect: 'true', // Close upon selecting a date,

        // this function closes after date selection Close upon
        // selecting a date,
        onSet: function (ele) {
            if (ele.select) {
                this.close();
            }
        },
        onStart: function () {
            var date = new Date();
            this.set('select', [date.getFullYear(), date.getMonth(), date.getDate()]);

        }

    });

    // disable past date
    $('.datepicker.disablePastDate').pickadate({
        container: 'body',
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        today: 'Today',
        clear: '',
        close: 'Ok',
        min: true,
        format: 'yyyy-mm-dd',
        //formatSubmit: 'yyyy-mm-dd',
        closeOnSelect: 'true', // Close upon selecting a date,

        // this function closes after date selection Close upon
        // selecting a date,
        onSet: function (ele) {
            if (ele.select) {
                this.close();
            }
        },
        onStart: function () {
            var date = new Date();
            this.set('select', [date.getFullYear(), date.getMonth(), date.getDate()]);

        }

    });
    $('.datepicker').pickadate({
        container: 'body',
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        today: 'Today',
        clear: '',
        close: 'Ok',
        format: 'yyyy-mm-dd',
        //formatSubmit: 'yyyy-mm-dd',
        closeOnSelect: 'true', // Close upon selecting a date,

        // this function closes after date selection Close upon
        // selecting a date,
        onSet: function (ele) {
            if (ele.select) {
                this.close();
            }
        },
        onStart: function () {
            var date = new Date();
            this.set('select', [date.getFullYear(), date.getMonth(), date.getDate()]);

        }
    });
    $('.timepicker').pickatime({
        default: 'now', // Set default time: 'now', '1:30AM', '16:30'
        fromnow: 400, // set default time to * milliseconds from now (using with default = 'now')
        twelvehour: false, // Use AM/PM or 24-hour format
        donetext: 'OK', // text for done-button
        cleartext: undefined, // text for clear-button
        canceltext: 'Cancel', // Text for cancel-button,
        container: 'body', // ex. 'body' will append picker to body
        autoclose: false, // automatic close timepicker
        ampmclickable: true, // make AM PM clickable
        aftershow: function () {}, //Function for after opening timepicker
        onSet: function (ele) {
            if (ele.select) {
                this.close();
            }
        },
        onStart: function () {
            alert();
        }
    });

    /* var yesterday = new Date((new Date()).valueOf()-1000*60*60*24);   
      var dateDisable = $('.datepicker').pickadate({
            container: 'body',
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15, // Creates a dropdown of 15 years to control year,
            today: 'Today',
            clear: 'Clear',
            close: 'Ok',
            format: 'yyyy-mm-dd',
            closeOnSelect: 'true', // Close upon selecting a date,
            
            // this function closes after date selection Close upon
            // selecting a date,
            onSet: function(ele) {
                if (ele.select) {
                    this.close();
                }
            },
            onStart: function() {        	 
                 var date = new Date();
                 this.set('select', [date.getFullYear(), date.getMonth(), date.getDate()]);
                
             },
          disable: [
                      { from: [0,0,0], to: yesterday }

                      
                    ]
          
      });*/
    // show hide Range dates
    $(".showDates").hide();
    $(".rangeSelect").click(function () {

        $(".showDates").show();
    });
    $(".showDates1").hide();
    $(".rangeSelect1").click(function () {

        $(".showDates1").show();
    });

    // avoids space bar at first place in input fields and textareas
    // $("input,textarea").on("keypress", function (e) {
    //     var startPos = e.currentTarget.selectionStart;
    //     if (e.which === 32 && startPos == 0)
    //         e.preventDefault();
    // });

    $('#mobileNoSms').keypress(function (event) {
        var key = event.which;

        if (!(key >= 48 && key <= 57 || key === 13))
            event.preventDefault();
    });

    $("#mobileEditSms").change(function () {
        if (this.checked) {
            $("#mobileNoSms").removeAttr('readonly', 'readonly');
        } else {
            $("#mobileNoSms").attr('readonly', 'readonly');

        }
    });

    /**
     * for trim(before after spaces remove) input value when blur
     */
    // $("input[type=text],input[type=num],textarea").blur(function (event) {
    //     if ($(this).val() != undefined && $(this).val() != '') {
    //         $(this).val($(this).val().trim());
    //     }
    // });
    // $.validator.setDefaults({
    //     ignore: []
    // });
    // $('form.validateForm').validate({
    //     errorElement: "span",
    //     errorClass: "invalid error",
    //     errorPlacement: function (error, element) {
    //         //for placing select error msg after select2 container                   
    //         if ($(element).is('select')) {
    //             var placement = $(element).parent().find('.select2-container')
    //             error.insertAfter(placement);
    //         } else {
    //             error.insertAfter(element);
    //         }

    //     }
    // });
    //  $('select').change(function () {
    //      $(this).valid();
    //      if (!$(this).valid()) {
    //          $(this).parent().find("input").addClass("invalid");
    //      }
    //  });
    // $('form').addClass('validateForm');

    //  $(".status").click(function() {

    //      if (confirm("Are you sure you want to change status?")) {
    //          ($(this).text() === "Active") ? $(this).text("Inactive").css("color", "red"): $(this).text("Active").css("color", "green");
    //      } else {
    //          return false;
    //      }

    //  });
    //  $(".membership").click(function() {
    //      if (confirm("Are you sure you want to change Membership?")) {
    //          ($(this).text() === "General") ? $(this).text("Featured").css("color", "#ff6f00"): $(this).text("General").css("color", "blue");
    //      } else {
    //          return false;
    //      }
    //  });
    //     $('#text1').trigger('autoresize');
    $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrainWidth: true, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: true, // Displays dropdown below the button
        alignment: 'left', // Displays dropdown with edge aligned to the left of button
        stopPropagation: false // Stops event propagation
    });

    // var documentHeight = $(document).height();
    // $(".ajax_loader").height(documentHeight);
});

// $(window).on("load", function () {
//     var documentHeight = $(document).height();
//     $(".ajax_loader").height(documentHeight);
// });

function formatDateTime(dateData) {
    return moment(dateData).format("DD-MM-YYYY HH:mm:ss")
}

function numberValidationForInputFields() {
    // avoids space bar at first place in input fields and textareas
    $("input,textarea").on("keypress", function (e) {
        var startPos = e.currentTarget.selectionStart;
        if (e.which === 32 && startPos == 0)
            e.preventDefault();
    });
    $('.num').keypress(function (event) {
        var key = event.which;
        if (!(key >= 48 && key <= 57 || key === 13 || key === 8))
            event.preventDefault();
    });
}

Number.prototype.toFixedVSS = function (places) {
    try {
        var value = this;
        var stringValue = value + "";
        var strInfo = stringValue.split(".");
        if (strInfo.length == 1)
            return value + "";
        if (places < 0) throw new Error('Invalid Argument for places');
        if (places == 0) {
            return parseFloat(value).toFixed(0) + "";
        } else {
            var length = parseInt(strInfo[1].length);
            for (var i = length; i > places; i--) {
                var roundOffPlaces = parseInt(i - 1);
                value = roundFromFloatMain(value, roundOffPlaces);
                stringValue = value + "";
                strInfo = stringValue.split(".");
                if (strInfo.length == 1)
                    return value + "";
                var newLength = parseInt(strInfo[1].length);
                if (newLength <= places) {
                    return value + "";
                } else {
                    var diff = roundOffPlaces - newLength;
                    if (diff != 0)
                        i = i - diff;
                }
            }
            return value + "";
        }
    } catch (err) {
        return value.toFixed(places);
    }
};

var roundFromFloatMain = function (value, places) {
    if (places < 0) throw new IllegalArgumentException();
    var info = (value + "").split(".");

    var integralPartStr = info[0];
    var fractionalPartStr = info[1];

    var valueAfterRoundingPlace = parseInt(fractionalPartStr.substring(places));
    if (valueAfterRoundingPlace >= 5) {
        var valueToBeAdded = "0.";
        for (var i = 0; i < places - 1; i++) {
            valueToBeAdded += "0";
        }
        valueToBeAdded += "1";
        fractionalPartStr = fractionalPartStr.substring(0, places);
        var oldValue = parseFloat(integralPartStr + "." + fractionalPartStr);
        var floatAddition = parseFloat(valueToBeAdded);
        var newValue = oldValue + floatAddition;
        newValue = parseFloat(newValue.toFixed(places));
        return newValue;
    } else {
        var valueToBeAdded = "0.";
        for (var i = 0; i < places - 1; i++) {
            valueToBeAdded += "0";
        }
        valueToBeAdded += "0";
        fractionalPartStr = fractionalPartStr.substring(0, places);
        var oldValue = parseFloat(integralPartStr + "." + fractionalPartStr);
        var floatAddition = parseFloat(valueToBeAdded);
        var newValue = oldValue + floatAddition;
        newValue = parseFloat(newValue.toFixed(places));
        return newValue;
    }
}
//for generating camelcase
function toCamelCase(str) {
    /* 
       \w for finding word character
       g for globally search of word
       \s find whitespace character
       | any of before this or after this
       ? any character
       ^ not in character
       replace("first string", with function string);
     */
    if (str != "" || str != undefined) {
        var str = str.toLowerCase();
        return str.replace(/(?:^|\s)\w/g, function (match) {
            return match.toUpperCase();
        });
    }

}