var checkedId=[];
   $(document).ready(
			function() {
                var columnNo=[
					{ "width": "1%", "targets": 0},
					{ "width": "2%", "targets": 1},
                    { "width": "4%", "targets": 2},
                    { "width": "2%", "targets": 3},
                    { "width": "5%", "targets": 4},
                    { "width": "2%", "targets": 5},
                    { "width": "2%", "targets": 6},
					{ "width": "2%", "targets": 7},
					{ "width": "1%", "targets": 8},
					{ "width": "1%", "targets": 9}

       ];
       var tableId="tblData";
       var pdfWidth=[20,'*','*','*','*','*','*','*','*','*'];
       getDataTableJson(tableId,columnNo,pdfWidth);
				$('.mobileDiv').hide();
			
				// var msg="${saveMsg}";
				// // alert(msg);
				//  if(msg!='' && msg!=undefined)
				//  {
				// 	 $('#addeditmsg').find("#modalType").addClass("success");
				// 	 $('#addeditmsg').find(".modal-action").removeClass("red lighten-2 teal").addClass("teal lighten-2");
				//      $('#addeditmsg').modal('open');
				//     // $('#msgHead').text("Product Message");
				//      $('#msg').text(msg);
				//  }
				 
});
    
