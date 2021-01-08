var sizeArray = [];
var colorArray = [];
var isImage = false;
$(document).ready(function () {
    HexOrImage();
    customAttributeType();

    $("#btnSize").click(function () {
        var sizeval = $("#txtSize").val();
        var attrCode = $("#txtAttrCodeSize").val();
        if (sizeval == '' || sizeval == undefined) {
            Materialize.Toast.removeAll();
            Materialize.toast('Enter Size', 2000);
            return false;
        } else if (attrCode == '' || attrCode == undefined) {
            Materialize.Toast.removeAll();
            Materialize.toast('Enter Attribute code for size', 2000);
            return false;
        }

        for (i = 0; i < sizeArray.length; i++) {
            var sizeData = sizeArray[i];
            if (sizeData[0] === sizeval) {
                Materialize.Toast.removeAll();
                Materialize.toast('Size is already exist', 2000);
                return false
            }
        }

        var elements = {
            name: sizeval,
            code: attrCode,
            isImage: false,
            details: "",
            customAttrTypeId: 2
        }
        sizeArray.push([elements]);
        SizeChip();

    });
    $("#btnColor").click(function () {
        var colorName = $("#txtColorName").val();
        var attrCodeColor = $("#txtAttrCodeColor").val();
        var hexCode = $("#txtHexCode").val();
        var colorImg = $("#imgString").val();

        if (colorName == '' || colorName == undefined) {
            Materialize.Toast.removeAll();
            Materialize.toast('Enter Color Name', 2000);
            return false;
        } else if (attrCodeColor == '' || attrCodeColor == undefined) {
            Materialize.Toast.removeAll();
            Materialize.toast('Enter Attribute code for Color', 2000);
            return false;
        } else if ($('#hexCode').is(':checked')) {
            if (hexCode == '' || hexCode == undefined) {
                Materialize.Toast.removeAll();
                Materialize.toast('Enter hex code for Color', 2000);
                return false;
            } else {
                isImage = false;
                colorImg = '';
                details = hexCode;
            }
        } else if ($('#colorImage').is(':checked')) {
            if (colorImg == '' || colorImg == undefined) {
                Materialize.Toast.removeAll();
                Materialize.toast('Please upload color image', 2000);
                return false;
            } else {
                isImage = true;
                hexCode = '';
                details = colorImg;
            }
        }

        for (i = 0; i < colorArray.length; i++) {
            var colorData = colorArray[i];
            if (colorData[0] === colorName) {
                Materialize.Toast.removeAll();
                Materialize.toast('Color is already exist', 2000);
                return false
            }
        }
        
        //for sending color array

        var elements = {
            name: colorName,
            code: attrCodeColor,
            isImage: isImage,
            details: details,
            customAttrTypeId: 1
        }

        colorArray.push([elements]);
        //console.log(colorArray);  
        colorChip();

    });
    $("#txtColor").change();

    $("#addMoreSize").click(function () {
        $("#addMoreSizeSection").show();
    });
    $("#addMoreColor").click(function () {
        $("#addMoreColorSection").show();
    });
    $('#hexCode').click(function () {
        HexOrImage();
    });
    $('#colorImage').click(function () {
        HexOrImage();
    });
    $('#colorRadio').click(function () {
        customAttributeType();
    });
    $('#sizeRadio').click(function () {
        customAttributeType();
    });
    $('.chips').on('chip.delete', function (e, chip) {
        // you have the deleted chip here                    
        //alert(chip.id);
        sizeArray.splice(chip.id, 1);
        //console.log(sizeArray);
    });
    $('.chips1').on('chip.delete', function (e, chip) {
        // you have the deleted chip here                    

        colorArray.splice(chip.id, 1);
        //console.log(colorArray);
    });

    //color image selection
    $('#txtColorimage').change(function (evt) {

        var filename = $("#txtColorimage").val();
        $(this).parent().find(".file-path").val(filename);
        // Use a regular expression to trim everything before final dot
        var extension = filename.replace(/^.*\./, '');

        // Iff there is no dot anywhere in filename, we would have extension == filename,
        // so we account for this possibility now
        if (extension == filename) {
            extension = '';
        } else {
            // if there is an extension, we convert to lower case
            // (N.B. this conversion will not effect the value of the extension
            // on the file upload.)
            extension = extension.toLowerCase();
        }

        switch (extension) {
            case 'jpg':
            case 'jpeg':
            case 'png':
                {
                    // for checking image is actually image not only name
                    var tgt = evt.target || window.event.srcElement,
                        files = tgt.files;

                    var fileSize = files[0].size;
                    var kb = fileSize / 1024;
                    if (kb > 10) {
                        Materialize.Toast.removeAll();
                        Materialize.toast('Please upload less than 10kb sizes image!', '2000', 'red lighten-2');
                        $("#addColorImage").attr('src', '');
                        $("#txtColorimage").val('');
                        $("#imgString").val('');

                        return false;
                    }

                    // $('#imgContentType').val(files[0].type);
                    // FileReader support
                    if (FileReader && files && files.length) {
                        var fr = new FileReader();
                        fr.onload = function () {
                            document.getElementById('addColorImage').src = fr.result;
                            $("#imgString").val(fr.result);
                        }
                        //this convert the image to  base64
                        fr.readAsDataURL(files[0]);
                    }

                    // Not supported
                    else {
                        // fallback -- perhaps submit the input to an iframe and temporarily store
                        // them on the server until the user's session ends.
                    }
                    return false;
                }
                // uncomment the next line to allow the form to submitted in this case:
                // break;

            default:
                Materialize.Toast.removeAll();
                Materialize.toast('Only png and jpeg image is allowed!', '2000', 'red lighten-2');
                $("#addColorImage").attr('src', '');
                $("#imgString").val('');
                $("#txtColorimage").val('');
                /* $('#addeditmsg').modal('open');
                 $('#head').text("Image Upload Error : ");
                 $('#msg').text("Only png and jpeg image allowed"); */
                // Cancel the form submission
                return false;
        }


    });
});

// for seeting hexcode and color value
function gethexCode(a) {

    $("#txtHexCode").val(a);
    $("#txtColor").val(a);
}


// type for custom attr
function customAttributeType() {
    $("#sizeDiv").hide();
    $("#colorDiv").hide();
    if ($('#colorRadio').is(':checked')) {
        $("#colorDiv").show();
    }
    if ($('#sizeRadio').is(':checked')) {
        $("#sizeDiv").show();
    }
}
//for checking hexcode is checked or image is checked
function HexOrImage() {
    $(".colorHexSection").hide();
    $(".colorImageSection").hide();

    if ($('#hexCode').is(':checked')) {
        $(".colorHexSection").show();
    }
    if ($('#colorImage').is(':checked')) {
        $(".colorImageSection").show();
    }

}
// setting size chips
function SizeChip() {
    if (sizeArray.length > 0) {
        var chipData = [];
        for (i = 0; i < sizeArray.length; i++) {

            chipData.push({
                tag: sizeArray[i][0],
                id: i
            });
        }

    }

    $('.chips-initial').material_chip({
        data: chipData
    });
}
// setting color chips
function colorChip() {
    if (colorArray.length > 0) {
        var chipData = [];
        for (i = 0; i < colorArray.length; i++) {

            chipData.push({
                tag: colorArray[i][0],
                id: i
            });
        }

    }

    $('.chips-initial1').material_chip({
        data: chipData
    });
}