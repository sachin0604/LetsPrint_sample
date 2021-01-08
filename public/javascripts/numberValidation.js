$.data.mobileAndIpad = /ipad|iphone|ipod|android|blackberry|windows phone/i.test(navigator.userAgent.toLowerCase());
$(document).ready(function () {




    if ($.data.mobileAndIpad) {
        $("#cardNumber").attr("type", "number");
        $(".mobileNo").attr("type", "number");
        $(".num").attr("type", "number");
        $(".pincode").attr("type", "number");
        //for mobile device enter only 15 char
        var input = $('#cardNumber');
        var number = $(".mobileNo");
        var pincode = $(".pincode");
        $('#cardNumber').keyup(function (e) {
            var max = 15;
            if ($('#cardNumber').val().length > max) {
                $('#cardNumber').val($('#cardNumber').val().substr(0, max));
            }
        });
        $('.mobileNo').keyup(function (e) {
            var max = 10;
            if ($('.mobileNo').val().length > max) {
                $('.mobileNo').val($('.mobileNo').val().substr(0, max));
            }
        });
        $('.pincode').keyup(function (e) {
            var max = 6;
            if ($('.pincode').val().length > max) {
                $('.pincode').val($('.pincode').val().substr(0, max));
            }
        });
        $(".myProfileSideNav").removeClass("fixedSideNav sideBar");
        // $(".filterNav").removeClass("fixedSideNav sideBar");

    }
    else {
        if (!$.data.mobileAndIpad) {
            $(".myProfileSideNav").addClass("fixedSideNav sideBar");
            // $(".filterNav").addClass("fixedSideNav sideBar");
            // $(window).on('scroll', function () {
            //     checkoffset();

            // });
            // for number only
            $('.num').keypress(function (event) {
                var key = event.which;
                if (!(key >= 48 && key <= 57 || key === 13 || key === 8))
                    event.preventDefault();
            });
            // for number only
            $('.mobileNo').keypress(function (event) {
                var key = event.which;
                if (!(key >= 48 && key <= 57 || key === 13 || key === 8))
                    event.preventDefault();
            });
        }
    }



});

