var checkedId=[];
   $(document).ready(
			function() {
                var columnNo=[
					{ "width": "1%", "targets": 0},
					{ "width": "2%", "targets": 1},
                    { "width": "5%", "targets": 2},
                    { "width": "1%", "targets": 3},
                    { "width": "3%", "targets": 4},
                    { "width": "9%", "targets": 5},
                    { "width": "3%", "targets": 6},
					{ "width": "2%", "targets": 7},
					{ "width": "2%", "targets": 8},
					{ "width": "1%", "targets": 9},	
                    { "width": "1%", "targets": 10}		

       ];
       var tableId="tblData";
       var pdfWidth=[20,'*','*','*','*','*','*','*','*','*','*'];
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
				 
				
				 $("#checkAll").click(function () {
						var colcount=$('#tblData').DataTable().columns().header().length;
					    var cells = $('#tblData').DataTable().column(colcount-1).nodes(), // Cells from 1st column
					        state = this.checked;
							//alert(state);
					    for (var i = 0; i < cells.length; i += 1) {
					        cells[i].querySelector("input[type='checkbox']").checked = state;
					    }		                
					    
					});
					
					 $("input:checkbox").change(function(a){
						 
						 var colcount=$('#tblData').DataTable().columns().header().length;
					     var cells = $('#tblData').DataTable().column(colcount-1).nodes(), // Cells from 1st column
					         
					      state = false; 				
					     var ch=false;
					     
					     for (var i = 0; i < cells.length; i += 1) {
					    	 //alert(cells[i].querySelector("input[type='checkbox']").checked);
					    	
					         if(cells[i].querySelector("input[type='checkbox']").checked == state)
					         { 
					        	 $("#checkAll").prop('checked', false);
					        	 ch=true;
					         }                      
					     }
					     if(ch==false)
					     {
					    	 $("#checkAll").prop('checked', true);
					     }
					    	
					    //alert($('#tblData').DataTable().rows().count());
					});
					
				 $('#sendsmsid').click(function(){
					 
					 $('#mobileEditSms').prop('checked', false);
					 	$("#mobileEditSms").change();
					 	mobileNumberCollection='';
					 
						var count=parseInt('${count}')
						checkedId=[];
						//chb
						 var idarray = $("#employeeTblData")
			          .find("input[type=checkbox]") 
			          .map(function() { return this.id; }) 
			          .get();
						 var j=0;
						 var mobileNumberCollection="";
						 for(var i=0; i<idarray.length; i++)
						 {								  
							 idarray[i]=idarray[i].replace('chb','');
							 if($('#chb'+idarray[i]).is(':checked'))
							 {
								 checkedId[j]=idarray[i].split("_")[0];
								 mobileNumberCollection=mobileNumberCollection+idarray[i].split("_")[1]+",";
								 j++;
							 }
						 }
						
						 mobileNumberCollection=mobileNumberCollection.substring(0,mobileNumberCollection.length-1);
						 $('#mobileNoSms').val(mobileNumberCollection);
						 $('#mobileNoSms').change();
						 
						//  if(checkedId.length==0)
						//  {
						// 	 $('#addeditmsg').find("#modalType").addClass("warning");
						// 	 $('#addeditmsg').find(".modal-action").removeClass("red lighten-2 teal").addClass("red lighten-2");
						// 	 $('#addeditmsg').modal('open');
						//      //$('#msgHead').text("Message : ");
						//      $('#msg').text("Select Supplier For Send Message");
						//  }
						 
						//  else
						//  {
						// 	 if(checkedId.length==1)
						// 	 {
						// 		 $('#smsText').val('');
						// 		 $('#smsSendMesssage').html('');
						// 		 $('.mobileDiv').show();
						// 		 $('#sendMsg').modal('open');
						// 	 }
						// 	 else
						// 	 {
						// 		 $('#smsText').val('');
						// 		 $('#smsSendMesssage').html('');
						// 		 $('.mobileDiv').hide();
						// 		 $('#sendMsg').modal('open');
						// 	 }
						//  }
					});
					
					$('#sendMessageId').click(function(){
						
						
						 $('#smsSendMesssage').html('');
						
						 var smsText=$("#smsText").val();
							if(checkedId.length==0)
							{
								$('#smsSendMesssage').html("<font color='red'>Select Employee For Send Message</font>");
								return false;
							}
							if(smsText==="")
							{
								$('#smsSendMesssage').html("<font color='red'>Enter Message Text</font>");
								return false;
							}
						
						var form = $('#sendSMSForm');
						//alert(form.serialize()+"&employeeDetailsId="+checkedId);
						
						$.ajax({
								type : form.attr('method'),
								url : form.attr('action'),
								data : form.serialize()+"&supplierIds="+checkedId+"&mobileNumber="+$('#mobileNoSms').val(),
								//async: false,
								success : function(data) {
									if(data==="Success")
									{
										$('#smsSendMesssage').html("<font color='green'>Message send SuccessFully</font>");
										$('#smsText').val('');
									}
									else
									{
										$('#smsSendMesssage').html("<font color='red'>Message sending Failed</font>");
									}
								}
						});
					});
					/* $("input#mobileEditSms:checkbox").change(function(a){
					if($('input#mobileEditSms[type=checkbox]').prop('checked')){
						alert();
					}
					}); */
			});
   
			
    function viewProducts(url)
    {
    	var table = $('#modalTable').DataTable();
		table.destroy();
    	   $.ajax({
    			url : url,
    			dataType : "json",
    			success : function(data) {
    			//alert(data);
    				
    				var supplier = data[0].supplier;
    				$("#suplierName").text(supplier.name);
    				$("#mobNo").text(supplier.contact.mobileNumber);
    				$("#address").text(supplier.address);
    				$("#gstno").text(supplier.gstinNo);
    			
    			    $("#tbproductlist").empty();
    				var srno=1;
    				for (var i = 0, len = data.length; i < len; ++i) {
    					var supplierproduct = data[i];
    					$("#tbproductlist").append("<tr>"+
                            "<td>"+srno+"</td>"+
                            "<td>"+supplierproduct.product.productName+"</td>"+
                            "<td>"+supplierproduct.product.categories.categoryName+"</td>"+
                            "<td>"+supplierproduct.product.brand.name+"</td>"+
                            "<td>"+supplierproduct.supplierRate+"</td>"+
                        "</tr>"); 
    					srno++;
    				}
    					    
    				$('#modalTable').DataTable({
    					 "bSort" : false,
    					 "bPaginate": false,
    					 "autoWidth":false,
    					 "columnDefs": [
    									{ "width": "2%", "targets": 0},
    									{ "width": "20%", "targets": 1},
    									{ "width": "8%", "targets": 2},
    									{ "width": "8%", "targets": 3},
    									{ "width": "3%", "targets": 4}
    					                
    					              ],
    				      dom: 'B',
    				      buttons: {
    				             buttons: [
    				              
    				                 {
    				                     extend: 'pdf',
    				                     className: 'pdfButton waves-effect waves-light  grey lighten-3 light-blue-text text-darken-4 z-depth-2',
    				                     text: '<i class="fa fa-file-pdf-o"></i> &nbsp;<span style="font-size:15px;">PDF<span>',
    				                     //title of the page
    				                     title: 'Product Details',
    				                     //file name 
    				                     filename: function() {
    				                         var d = new Date();
    				                         var date = d.getDate();
    				                         var month = d.getMonth();
    				                         var year = d.getFullYear();
    				                         var name = 'Product Details(Supplier)';
    				                         return name + date + '-' + month + '-' + year;
    				                     },
    				                    
    				                     //  exports only dataColumn
    				                     exportOptions: {
    				                         columns: '.print-col',
    				                         
    				                     },
    				                     customize: function(doc, config) {
    				                    	 doc.content.forEach(function(item) {
    				                    		  if (item.table) {
    				                    		  item.table.widths = [10,100,50,60,30] 
    				                    		 } 
    				                    		    });
    				                    		    doc.styles.tableHeader.alignment = 'center';
    				                         doc.styles.tableBodyEven.alignment = 'center';
    				                         doc.styles.tableBodyOdd.alignment = 'center';
    				                     	doc.content.splice(0,1);
    				                        	/* doc['header']=(function() {
    				 							return {
    				 								columns:[ 
    				 								          [
    				 									
    				 									{
    				 										alignment: 'left',
    				 										italics: true,
    				 										text: 'dataTablesTable',
    				 										fontSize: 18,
    				 										margin: [10,0]
    				 									},
    				 									{
    				 										alignment: 'right',
    				 										fontSize: 14,
    				 										text: 'Custom PDF export with dataTables'
    				 									}
    				 								],
    				 								[
 				 									
 				 									{
 				 										alignment: 'left',
 				 										italics: true,
 				 										text: 'dataTablesTable',
 				 										fontSize: 18,
 				 										margin: [10,0]
 				 									},
 				 									{
 				 										alignment: 'right',
 				 										fontSize: 14,
 				 										text: 'Custom PDF export with dataTables'
 				 									}
 				 								],
    				 								],
    				 								margin: 20
    				 							}
    				 						}); */
    				                     },
    				                     messageTop: function () {                 
    				                    	 return 'Name:'+supplier.name+'      '+'Mobile No:'+supplier.contact.mobileNumber+'       '+'Gst No:'+supplier.gstinNo+'      '+'Address:'+supplier.address;
				                         },
				                          /* customize: function ( doc,config ) {
				                        	  doc.content.forEach(function(item) {
					                    		  if (item.table) {
					                    		  item.table.widths = [40,'*','*','*',40] 
					                    		 } 
					                    		    })
					                    		    doc.styles.tableHeader.alignment = 'center';
						                         doc.styles.tableBodyEven.alignment = 'center';
						                         doc.styles.tableBodyOdd.alignment = 'center';
				                         } */
    				                
    				                 },
    				                 {
    				                     extend: 'excel',
    				                     className: 'excelButton waves-effect waves-light grey lighten-3 light-blue-text text-darken-4 z-depth-2',
    				                     text: '<i class="fa fa-file-excel-o  fa-fw"></i> &nbsp;<span style="font-size:15px;">EXCEL<span>',
    				                     //title of the page
    				                     title: 'Product Details',
    				                     //file name 
    				                     filename: function() {
    				                         var d = new Date();
    				                         var date = d.getDate();
    				                         var month = d.getMonth();
    				                         var year = d.getFullYear();
    				                         var name = 'Product Details(Supplier)';
    				                         return name + date + '-' + month + '-' + year;
    				                     },
    				                      messageTop: function () {                 
				                             return 'Name:'+supplier.name+'      '+'Mobile No:'+supplier.contact.mobileNumber+'       '+'Gst No:'+supplier.gstinNo+'      '+'Address:'+supplier.address;
				                         }, 
				                         /* customize: function ( win ) {
    				                         $(win.document.body)
    				                             .css( 'font-size', '10pt' )
    				                             .prepend(
    				                                 '<h6 style="position:absolute; top:0; left:0;">Name:'+supplier.name+'</h6>'+
    				                                 
    				                                 '<h6 style="position:absolute; top:0; right:10%;">Name:'+supplier.name+'</h6>'+
    				                                 '<br/>'+
													 '<h6 style="position:absolute; top:5%; left:0;bottom:5%">Name:'+supplier.name+'</h6>'+    				                                 
    				                                 '<h6 style="position:absolute; top:5%; right:10%;bottom:5%;">Name:'+supplier.name+'</h6>'
    				                             );
				                         }, */
    				                    
    				                     //  exports only dataColumn
    				                     exportOptions: {
    				                         columns: ':visible.print-col'
    				                     },
    				                 },
    				                 {
    				                     extend: 'print',
    				                     className: 'printButton waves-effect waves-light grey lighten-3 light-blue-text text-darken-4 z-depth-2',
    				                     text: '<i class="fa fa-print fa-fw"></i> &nbsp;<span style="font-size:15px;">PRINT<span>',
    				                     //title of the page
    				                    title: '',
    				                     //file name 
    				                     filename: function() {
    				                         var d = new Date();
    				                         var date = d.getDate();
    				                         var month = d.getMonth();
    				                         var year = d.getFullYear();
    				                         var name = 'Product Details(Supplier)';
    				                         return name + date + '-' + month + '-' + year;
    				                     },
    				                    
    				                     customize: function (win) {
    				                         $(win.document.body)
    				                             .css( 'font-size', '10pt' )
    				                             .prepend(
    				                                 '<h6 style="position:absolute; top:0; left:0;">Name:'+supplier.name+'</h6>'+
    				                                 
    				                                 '<h6 style="position:absolute; top:0; right:10%;">Mobile No:'+supplier.contact.mobileNumber+'</h6>'+
    				                                 '<br/>'+
													 '<h6 style="position:absolute; top:5%; left:0;">Gst No:'+supplier.gstinNo+'</h6>'+    				                                 
    				                                 '<h6 style="position:absolute; top:5%; right:10%;">Address:'+supplier.address+'</h6>'+'<br/>'
    				                             );
    				     				                     } ,
				                       
    				                     
    				                     //  exports only dataColumn
    				                     exportOptions: {
    				                         columns: ':visible.print-col'
    				                     },
    				                 }
    				                 ]
    				         }
    				  });
    				 
    				$('.modal').modal();
    				$('#viewDetails').modal('open');
    				//alert("data came");
    			/* 	var table = $('#modalTable').DataTable();
    				table.destroy(); */
    				return false;
    				/* for (index = 0; index < options.length; ++index) {
    				  option = options[index];
    				  select.options.add(new Option(option.name, option.cityId));
    				} */
    				
    			},
    			error: function(xhr, status, error) {
    				  //var err = eval("(" + xhr.responseText + ")");
    				  //alert(error +"---"+ xhr+"---"+status);
    				  	$('#addeditmsg').find("#modalType").addClass("warning");
    					 $('#addeditmsg').find(".modal-action").removeClass("red lighten-2 teal").addClass("red lighten-2");
    				  	 //$('#addeditmsg').modal('open');
    				     $('#msgHead').text("Manage Supplier Message");
    				     $('#msg').text("Not Have Product List");
    				}
    		});
    }
