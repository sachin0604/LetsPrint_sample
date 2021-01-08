$(document).ready(function () {

        //$(".select2-selection--multiple").find("ul li .select2-search__field").attr('placeholder','choose option');
       
        // $(".clearDiv").click(function(){
        //     $(this).remove();
        // });
        $('#addMrpForImg').click(function () {
                mrpImageColumn();
        });
        mrpImageColumn();
});

function mrpImageColumn() {
        if ($('#addMrpForImg').is(':checked')) {
                $(".hideColumn").show();
        } else {
                $(".hideColumn").hide();
        }
}