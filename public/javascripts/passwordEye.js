$(document).ready(function () {
    $(".hidePass").hide();
    $(".showPass").click(function () {
        $(this).parent().parent().find(
            "input[type='password']").attr(
                "type", "text");
        $(this).parent().find(".showPass").hide();
        $(this).parent().find(".hidePass").show();
    });
    $(".hidePass").click(function () {
        $(this).parent().parent().find(
            "input[type='text']").attr(
                "type", "password");

        $(this).parent().find(".hidePass").hide();
        $(this).parent().find(".showPass").show();
    });
    $("input:required+label").append("<span class='red-text'>*</span>");
    $("label.required").append("<span class='red-text'>*</span>");
});