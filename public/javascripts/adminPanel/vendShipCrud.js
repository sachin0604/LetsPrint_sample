// var productList = [];
//     var count = 1;
//     var nameValid=false;   
//     var gstinValid=true;
//     var productListForCal={};
//         $(document).ready(function() {
//         	$.validator.setDefaults({
//      	       ignore: []
//      		}); 
//         	jQuery.validator.addMethod("nameCheck", function(value, element){
//         		if(nameValid==false) {
//         	        return false;
//         	    } else {
//         	        return true;
//         	    };
//         	}, "Name Is already in use"); 
//         	jQuery.validator.addMethod("gstCheck", function(value, element){
//         		if(gstinValid==false) {
//         	        return false;
//         	    } else {
//         	        return true;
//         	    };
//         	}, "gst no. Is already in use"); 
//      	//$('select').change(function(){ $('select').valid(); });
//      	$('#saveSupplierForm').validate({
//      		rules: {    		    
//      			name:{
//      				nameCheck:true
//                 },
//                 gstinNo:{
//                 	gstCheck:true
//                 }
//     		  },
    			
     	
//      	    errorElement : "span",
//      	    errorClass : "invalid error",
//      	    errorPlacement : function(error, element) {
//      	      var placement = $(element).data('error');
     	    
//      	      if (placement) {
//      	        $(placement).append(error)
//      	      } else {
//      	        error.insertAfter(element);
//      	      }
//      	      $('select').change(function(){ $('select').valid(); });
//      	    }
//      	  });
//             $('#mobileNo').keypress(function( event ){
// 			    var key = event.which;
			    
// 			    if( ! ( key >= 48 && key <= 57 || key === 13) )
// 			        event.preventDefault();
// 			});

//             $('#rate').keydown(function(e){            	
// 				-1!==$.inArray(e.keyCode,[46,8,9,27,13,110,190])||/65|67|86|88/.test(e.keyCode)&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode&&40>=e.keyCode||(e.shiftKey||48>e.keyCode||57<e.keyCode)&&(96>e.keyCode||105<e.keyCode)&&e.preventDefault()
// 			 });
            
// 			document.getElementById('rate').onkeypress=function(e){
            	
//             	if (e.keyCode === 46 && this.value.split('.').length === 2) {
//               		 return false;
//           		 }

//             }
// 			$('#productlistinput').change(function(){
// 				$('#productlistinput').valid();
// 			});
//             $("#productAddId").click( function() {
            	
//             	var buttonStatus=$('#productAddButton').text();
//             	if(buttonStatus==="Update")
//             	{
//             		updaterow($('#currentUpdateProductId').val());
//             		return false;
//             	}
//             	$("#productAddId").html('<i class="material-icons left">add</i><span id="productAddButton">Add</span>');
//                 var val = $("#productid").val(); 
//                 var rate = $('#rate').val();
//                 var mrp = $('#mrp').val();
              	
//               	//alert(buttonStatus);
//               	if(val==0)
//               	{
//               		Materialize.toast('Select product', '4000', 'teal lighten-2');
//               		return false;
//               	}
//               	if(parseFloat(rate)==0)
//               	{
//               		Materialize.toast('Enter MRP', '4000', 'teal lighten-2');
//               		return false;
//               	}
//               	/* if(jQuery.inArray(val, productidlist) !== -1)
//                 {	
//               		$('#addeditmsg').modal('open');
//            	     	$('#msgHead').text("Product Select Warning");
//            	     	$('#msg').text("This Product is already added");               	     	
//                 } */
//               	else
//            		{
	                
              		
//               		//alert(productList.size());
//               		/* for (let key of productList.keys()) {
//               		    alert(key+"-"+productList[key]);
//               		}*/
//               		//alert(productList.entries());
//               		/* for (let entry of productList.entries()) {
//               			alert(entry[0]+"-"+ entry[1]);
//               		} */
//               		/* for (let [key, value] of productList.entries()) {
//               			alert(key+"-"+value);
//               			productList.remove(key);
//               		} */
// 	             	//alert(productList.key +"-"+ productList.value);
	             	 
//               		for (var i=0; i<productList.length; i++) {  
//               			var value=productList[i];  
//               			if(value[0]===val && buttonStatus==="Add")
//               			{  
//               				Materialize.toast('This Product is already added!', '4000', 'teal lighten-2');
//               				/* $('#addeditmsg').modal('open');
//                    	     	$('#msgHead').text("Product Select Warning");
//                    	     	$('#msg').text("This Product is already added");  */
//                    	     	return false;
//               			}
//               		}
//               		var prdData=[val,rate];
//               		productList.push(prdData);
// 	             	/* $('#productratelistinput').val(productRateidlist);
// 	             	$('#productlistinput').val(productidlist); */
// 	                var text=$("#productid option:selected").text();
// 	                var vl=$("#productid option:selected").val();
// 					//alert(value+"-"+text);
// 					var rowCount = $('#productcart tr').length;
// 	                $("#t1").append("<tr id='rowdel_" + count + "' >"+
// 		               				"<td id='rowcount_" + count + "'>" + count + "</td>"+
// 		               				"<td id='rowproductname_" + count + "'><input type='hidden' id='rowproductkey_" + count + "' value='"+vl+"'><center><span id='tbproductname_" + count + "'>"+text+"</span></center></td>"+
// 		               				"<td id='rowproductrate_" + count + "'>"+ mrp +"</td>"+
// 		               				"<td id='rowcountproductedit_" + count + "'><button class='btn-flat' type='button' onclick='editrow(" + count + ")'><i class='material-icons '>edit</i></button></td>"+
// 		               				"<td id='rowdelbutton_" + count + "'><button class='btn-flat' type='button' onclick='deleterow(" + count + ")'><i class='material-icons '>clear</i></button></td>"+
// 		               				"</tr>");
// 	                count++;
//            		}
//               	var productIdList="";
//             	for (var i=0; i<productList.length; i++) {
//             		var value=productList[i];
//             		productIdList=productIdList+value[0]+"-"+value[1]+",";
//           		}
//             	productIdList=productIdList.slice(0,-1)
//             	//alert(productIdList);
//             	$('#productlistinput').val(productIdList);
//             	$('#saveSupplierForm').validate();
             	
//               	//alert(productList.entries());
//             	resetFields();
				
//             });

//             function updaterow(id) {
//             	$("#productAddId").html('<i class="material-icons left">add</i><span id="productAddButton">Add</span>');
//                 var val = $("#productid").val(); 
//                 var rate = $('#rate').val();
//                 var mrp = $('#mrp').val();
//               	var buttonStatus=$('#productAddButton').text();
//               	var text=$("#productid option:selected").text();
//                 var vl=$("#productid option:selected").val();
              	
//               	//alert(buttonStatus);
//               	if(val==0)
//               	{
//               		return false;
//               	}
//               	if(parseFloat(rate)==0)
//               	{
//               		return false;
//               	}
            	
//               	//alert($('#rowproductkey_' + id).val());
//               	var removeItem=$('#rowproductkey_' + id).val();
              	
//               	var productListTemp=[];
//               	for(var i=0; i<productList.length; i++)
//               	{
//               		var value=productList[i];
//               		if(removeItem!==value[0])
//               		{
//               			productListTemp.push(productList[i]);
//               		}
//               	}
//               	productList=[];
//               	for(var i=0; i<productListTemp.length; i++)
//               	{
//               		productList.push(productListTemp[i]);
//               	}
//               	var prdData=[val,rate];
//               	productList.push(prdData);
              	
//                 //alert('#rowproductkey_'+id);
                
//                 //alert('removeItem '+$('#rowproductkey_' + id).val());
//                 //alert('productidlist '+productidlist);
                
//                 var rowCount = $('#t1 tr').length;
//             	//alert(rowCount);
//             	var trData="";
//             	count=1;
//             	for(var i=1; i<=rowCount; i++)
//             	{
//             		//alert($('#rowcount_'+i).html() +"---"+ $('#rowprocustname_'+i).html() +"---"+ $('#rowdelbutton_'+i).html());
            		
//             		if(id!=i)
//             		{
//             			//alert("predata");
//             			//alert(i+"-(----)-"+$('#tbproductname_' + i).text());
//     	        		 /* trData=trData+"<tr id='rowdel_" + count + "' >"+
//     	           				"<td id='rowcount_" + count + "'>" + count + "</td>"+
//     	           				"<td id='rowproductname_" + count + "'><input type='hidden' id='rowproductkey_" + count + "' value='"+$('#rowproductkey_' + i).val()+"'><center><span id='tbproductname_" + count + "'>"+$('#tbproductname_' + i).text()+"</span></center></td>"+
//     	           				"<td id='rowdelbutton_" + count + "'><button class='btn-flat' type='button' onclick='deleterow(" + count + ")'><i class='material-icons '>clear</i></button></td>"+
//     	           				"</tr>"; */
//     	           				trData=trData+"<tr id='rowdel_" + count + "' >"+
//     		               				"<td id='rowcount_" + count + "'>" + count + "</td>"+
//     		               				"<td id='rowproductname_" + count + "'><input type='hidden' id='rowproductkey_" + count + "' value='"+$('#rowproductkey_' + i).val()+"'><center><span id='tbproductname_" + count + "'>"+$('#tbproductname_' + i).text()+"</span></center></td>"+
//     		               				"<td id='rowproductrate_" + count + "'><input type='hidden' id='rowproductmrp_" + count + "' value='"+$('#rowproductmrp_' + i).val()+"'>" + $('#rowproductrate_'+i).text() + "</td>"+
//     		               				"<td id='rowcountproductedit_" + count + "'><button class='btn-flat' type='button' onclick='editrow(" + count + ")'><i class='material-icons '>edit</i></button></td>"+
//     		               				"<td id='rowdelbutton_" + count + "'><button class='btn-flat' type='button' onclick='deleterow(" + count + ")'><i class='material-icons '>clear</i></button></td>"+
//     		               				"</tr>";
//     	        		 count++;
//             		}
//             		else
//             		{
//             			//alert("newdata");
//             			trData=trData+"<tr id='rowdel_" + count + "' >"+
//     		               				"<td id='rowcount_" + count + "'>" + count + "</td>"+
//     		               				"<td id='rowproductname_" + count + "'><input type='hidden' id='rowproductkey_" + count + "' value='"+vl+"'><center><span id='tbproductname_" + count + "'>"+text+"</span></center></td>"+
//     		               				"<td id='rowproductrate_" + count + "'><input type='hidden' id='rowproductmrp_" + count + "' value='"+mrp+"'>" + rate + "</td>"+
//     		               				"<td id='rowcountproductedit_" + count + "'><button class='btn-flat' type='button' onclick='editrow(" + count + ")'><i class='material-icons '>edit</i></button></td>"+
//     		               				"<td id='rowdelbutton_" + count + "'><button class='btn-flat' type='button' onclick='deleterow(" + count + ")'><i class='material-icons '>clear</i></button></td>"+
//     		               				"</tr>";
//     	        		 count++;
//             		}
//             		//alert(trData);
//             	} 
//             	var productIdList="";
//             	for (var i=0; i<productList.length; i++) {
//             		var value=productList[i];
//             		productIdList=productIdList+value[0]+"-"+value[1]+",";
//           		}
//             	productIdList=productIdList.slice(0,-1)
//             	//alert(productIdList);
//             	$('#productlistinput').val(productIdList);
            	
//             	$("#t1").html('');
//             	$("#t1").html(trData);
//             	//alert(productList.entries());
//                 //$('#rowdel_' + id).remove();
//                // alert('productidlist '+productidlist);
//             	resetFields();
//             }
			
//             // $('#categoryid').change(function() {
//     		// 	var brandid = $('#brandid').val();
//     		// 	var categoryid = $('#categoryid').val();

//     		// 	/* if(brandid==0)
//     		// 	{
//     		// 		return false;
//     		// 	}
    			
//     		// 	if(categoryid==0)
//     		// 	{
//     		// 		return false;
//     		// 	} */
//     		// 	// Get the raw DOM object for the select box
//     		// 	var select = document.getElementById('productid');

//     		// 	// Clear the old options
//     		// 	select.options.length = 0;

//     		// 	//Load the new options

//     		// 	select.options.add(new Option("Choose Product", ''));
//     		// 	$.ajax({
//     		// 		url : "${pageContext.request.contextPath}/fetchProductListByBrandIdAndCategoryId?brandId=" + brandid+"&categoryId="+categoryid,
//     		// 		dataType : "json",
//     		// 		beforeSend: function() {
// 			// 			$('.preloader-background').show();
// 			// 			$('.preloader-wrapper').show();
// 			//            },
//     		// 		success : function(data) {

//     		// 			productListForCal=data;
    					
//     		// 			/* alert(data); */
//     		// 			var options, index, option;
//     		// 			select = document.getElementById('productid');

//     		// 			for (var i = 0, len = data.length; i < len; ++i) {
//     		// 				var product = data[i];
//     		// 				select.options.add(new Option(product.productName, product.productId));
//     		// 			}

//     		// 			/* for (index = 0; index < options.length; ++index) {
//     		// 			  option = options[index];
//     		// 			  select.options.add(new Option(option.name, option.cityId));
//     		// 			} */
//     		// 			$('.preloader-wrapper').hide();
// 			// 			$('.preloader-background').hide();
//     		// 		},
// 			// 		error: function(xhr, status, error) {
// 			// 			$('.preloader-wrapper').hide();
// 			// 			$('.preloader-background').hide();
// 			// 			  //alert(error +"---"+ xhr+"---"+status);
// 			// 			  Materialize.toast('Product List Not Found!', '2000', 'teal lighten-2');
// 			// 			/* $('#addeditmsg').modal('open');
//             //    	     	$('#msgHead').text("Message : ");
//             //    	     	$('#msg').text("Product List Not Found");  */
//             //    	     		/* setTimeout(function() 
// 			// 				  {
//       	    //  					$('#addeditmsg').modal('close');
// 			// 				  }, 1000); */
// 			// 			}
//     		// 	});

//     		// });
            
//             // $('#brandid').change(function() {
//     		// 	var brandid = $('#brandid').val();
//     		// 	var categoryid = $('#categoryid').val();

//     		// 	/* if(brandid==0)
//     		// 	{
//     		// 		return false;
//     		// 	}
    			
//     		// 	if(categoryid==0)
//     		// 	{
//     		// 		return false;
//     		// 	} */
//     		// 	// Get the raw DOM object for the select box
//     		// 	var select = document.getElementById('productid');

//     		// 	// Clear the old options
//     		// 	select.options.length = 0;

//     		// 	//Load the new options

//     		// 	select.options.add(new Option("Choose Product", ''));
//     		// 	$.ajax({
//     		// 		url : "${pageContext.request.contextPath}/fetchProductListByBrandIdAndCategoryId?brandId=" + brandid+"&categoryId="+categoryid,
//     		// 		dataType : "json",
//     		// 		beforeSend: function() {
// 			// 			$('.preloader-background').show();
// 			// 			$('.preloader-wrapper').show();
// 			//            },
//     		// 		success : function(data) {

//     		// 			productListForCal=data;
    					
//     		// 			/* alert(data); */
//     		// 			var options, index, option;
//     		// 			select = document.getElementById('productid');

//     		// 			for (var i = 0, len = data.length; i < len; ++i) {
//     		// 				var product = data[i];
//     		// 				select.options.add(new Option(product.productName, product.productId));
//     		// 			}

//     		// 			/* for (index = 0; index < options.length; ++index) {
//     		// 			  option = options[index];
//     		// 			  select.options.add(new Option(option.name, option.cityId));
//     		// 			} */
//     		// 			$('.preloader-wrapper').hide();
// 			// 			$('.preloader-background').hide();
//     		// 		},
// 			// 		error: function(xhr, status, error) {
// 			// 			$('.preloader-wrapper').hide();
// 			// 			$('.preloader-background').hide();
// 			// 			 Materialize.toast('Product List Not Found!', '2000', 'teal lighten-2');
// 			// 			 // alert(error +"---"+ xhr+"---"+status);
// 			// 			/* $('#addeditmsg').modal('open');
//             //    	     	$('#msgHead').text("Message : ");
//             //    	     	$('#msg').text("Product List Not Found"); 
//             //    	     		 setTimeout(function() 
// 			// 						  {
//             //    	     					$('#addeditmsg').modal('close');
// 			// 						  },1000); */
// 			// 			}
//     		// 	});

//     		// });
            
//             // $('#name').on('keyup blur',function(){
// 			// 	//alert('1');
// 			// 	var name=$('#name').val().trim();
// 			// 	//alert(userId);
// 			// 	$.ajax({
// 			// 		url : "${pageContext.request.contextPath}/checkSupplierNameForSave?name="+name,	
// 			// 		async:false,
// 			// 		success : function(data) {
						
// 			// 			/*input:not([type]).valid+label:after, 
// 			// 			input:not([type]):focus.valid+label:after, 
// 			// 			input[type=text].valid+label:after, 
// 			// 			input[type=text]:focus.valid+label:after,
// 			// 			*/
// 			// 			if(data==="Success")
// 			// 			{
// 			// 				/*Materialize.toast('user id Available!', '2000', 'teal lighten-2');*/
// 			// 				/*$("#useridvalid").attr("data-success", "UserId Available");
// 			// 				$('#user	Id').css({"border-bottom":"1px solid green","box-shadow":"0 1px 0 0 green"});*/
// 			// 				nameValid=true;
// 			// 			}
// 			// 			else
// 			// 			{
// 			// 				//Materialize.toast('userid already in use!', '2500', 'teal lighten-2');
// 			// 				/*$("#useridvalid").attr("data-success", "UserId Not Available");
// 			// 				$("#useridvalid.active:after").css("color","red");
// 			// 				$('#userId').css({"border-bottom":"1px solid red","box-shadow":"0 1px 0 0 red"});*/
// 			// 				nameValid=false;
							
// 			// 			}
// 			// 		},
// 			// 		error: function(xhr, status, error) {
// 			// 			$('.preloader-wrapper').hide();
// 			// 			$('.preloader-background').hide();
// 			// 			 Materialize.toast('Something Went Wrong', '2000', 'teal lighten-2');
// 			// 		}
					
// 			// 	});
				
// 			// });
//             // $('#gstin').on('keyup blur',function(){
// 			// 	//alert('1');
// 			// 	var gstin=$('#gstin').val().trim();
// 			// 	if(gstin=='' || gstin==undefined)
// 			// 	{
// 			// 		gstinValid=true;
// 			// 		return false;
// 			// 	}
// 			// 	//alert(userId);
// 			// 	$.ajax({
// 			// 		url :"${pageContext.request.contextPath}/checkGSTNumberForSave?gstinNo="+gstin,
// 			// 		async:false,
// 			// 		success : function(data) {
						
// 			// 			/*input:not([type]).valid+label:after, 
// 			// 			input:not([type]):focus.valid+label:after, 
// 			// 			input[type=text].valid+label:after, 
// 			// 			input[type=text]:focus.valid+label:after,
// 			// 			*/
// 			// 			if(data==="Success")
// 			// 			{
// 			// 				/*Materialize.toast('user id Available!', '2000', 'teal lighten-2');*/
// 			// 				/*$("#useridvalid").attr("data-success", "UserId Available");
// 			// 				$('#user	Id').css({"border-bottom":"1px solid green","box-shadow":"0 1px 0 0 green"});*/
// 			// 				gstinValid=true;
// 			// 			}
// 			// 			else
// 			// 			{
// 			// 				//Materialize.toast('userid already in use!', '2500', 'teal lighten-2');
// 			// 				/*$("#useridvalid").attr("data-success", "UserId Not Available");
// 			// 				$("#useridvalid.active:after").css("color","red");
// 			// 				$('#userId').css({"border-bottom":"1px solid red","box-shadow":"0 1px 0 0 red"});*/
// 			// 				gstinValid=false;
							
// 			// 			}
// 			// 		}
// 			// 	});
				
// 			// });
//             // $('#saveSupplierSubmit1').click(function(){
       		 
//         	// 	var form = $('#saveSupplierForm');
//         	/*  var txtname = document.querySelector("#name");
//         	 var gstno= document.querySelector("#gstin");
//         	var form = $('#saveSupplierForm');
//         	if(txtname.value== ""){
//         		txtname.setCustomValidity("field is required");
        		
//         	}
//             if(gstno.value== ""){
//         		gstno.setCustomValidity("field is required");
        		
//         	} */
        	
// 			// $.ajax({
// 			// 	type : form.attr('method'),				
// 			// 	url : "${pageContext.request.contextPath}/checkSupplierNameForSave",
// 			// 	data : form.serialize(),
// 			// 	async:false,
// 			// 	beforeSend: function() {
// 			// 		$('.preloader-background').show();
// 			// 		$('.preloader-wrapper').show();
// 		    //        },
// 		    //        success : function(data) {
// 			// 			// alert(data);
// 			// 			if(data==="nameFailed")
// 			// 			{
// 			// 				 Materialize.toast('Name is already exist!', '2000', 'teal lighten-2');
// 			// 				 /* $('#addeditmsg').modal('open');
// 			//            	     $('#msgHead').text("Supplier Adding Message");
// 			//            	     $('#msg').text("Name is already exist"); */
// 			//            	     $("#name").focus();
// 		    //     			    gstinNameValidation=true;
// 		    //     			  $('.preloader-wrapper').hide();
// 			// 				$('.preloader-background').hide();
// 			//            	     return false;
// 			//            	 }
// 			// 			 if(data==="gstFailed")
// 			// 			{
// 			// 				 Materialize.toast('GST number is already exist!', '2000', 'teal lighten-2');
// 			// 				 /* $('#addeditmsg').modal('open');
// 			//            	     $('#msgHead').text("Supplier Adding Message");
// 			//            	     $('#msg').text("GST number is already exist"); */
// 		    //     			$("#gstin").focus();
// 		    //     			gstinNameValidation=true;
// 		    //     			$('.preloader-wrapper').hide();
// 			// 				$('.preloader-background').hide();
// 		    //     			return false;
// 			// 			} 
// 			// 			else 
// 			// 			{
							
// 		    //     			gstinNameValidation=false;
// 			// 			}
// 			// 			$('.preloader-wrapper').hide();
// 			// 			$('.preloader-background').hide();
//     		// 		},
// 			// 		error: function(xhr, status, error) {
// 			// 			$('.preloader-wrapper').hide();
// 			// 			$('.preloader-background').hide();
// 			// 			Materialize.toast('Something Went Wrong!', '2000', 'red lighten-2');
// 			// 			  //alert(error +"---"+ xhr+"---"+status);
// 			// 			/* $('#addeditmsg').find("#modalType").addClass("warning");
// 			// 			$('#addeditmsg').find(".modal-action").addClass("red lighten-2");
// 			// 			$('#addeditmsg').modal('open'); */
//             //    	     	/* $('#msgHead').text("Message : "); */
//             //    	     	/* $('#msg').text("Something Went Wrong"); 
//             //    	     		setTimeout(function() 
// 			// 				  {
//       	    //  					$('#addeditmsg').modal('close');
// 			// 				  }, 1000);*/
// 			// 			} 
// 			// });
        	
//         	//  if(gstinNameValidation==true)
// 			// {
// 			// 	return false;
// 			// }
			
//         	// var productlistinput=productList.entries();
//         	// //alert(productlistinput);
//         	//  if(productList.length==0)
//        	 	// {
//         	// 	 Materialize.toast('Select Atlist 1 Product!', '2000', 'teal lighten-2');
//        	    //  /* $('#addeditmsg').modal('open');
//        	    //  $('#msgHead').text("Supplier Adding Message");
//        	    //  $('#msg').text("Select Atlist 1 Product"); */
//        	    //  return false;
//        	 	// }
//         	// //alert(productList.entries());
//         	// var productIdList="";
//         	// for (var i=0; i<productList.length; i++) {
//         	// 	var value=productList[i];
//         	// 	productIdList=productIdList+value[0]+"-"+value[1]+",";
//       		// }
//         	// productIdList=productIdList.slice(0,-1)
//         	// //alert(productIdList);
//         	// $('#productlistinput').val(productIdList);
        	
//         // });  
            
//             // $('#mrp').keypress(function( event ){
// 			//     var key = event.which;
			    
// 			//     if( ! ( key >= 48 && key <= 57 || key === 13 ) )
// 			//         event.preventDefault();
// 			// });
			  
// 			//   $("#productid").change(function(){
// 			// 	  $("#mrp").keyup();
// 			//   });
            
//             // /* for calculating unit price of product */
// 			// $("#mrp").keyup(function(){
								
// 			// 	var productId=$("#productid").val();
// 			// 	if(productId=='' || productId==undefined)
// 			// 	{
// 			// 		return false;
// 			// 	}				
				
// 			// 	var product;
// 			// 	for(var i=0; i<productListForCal.length; i++){
// 			// 		if(productId==productListForCal[i].productId){
// 			// 			product=productListForCal[i];
// 			// 		}
// 			// 	}
				
// 			// 	var mrp=$("#mrp").val();
// 			// 	if(mrp==undefined || mrp==''){
// 			// 		mrp=0;
// 			// 	}
// 			// 	mrp=parseInt(mrp);
				
// 			// 	var correctAmoutWithTaxObj=calculateProperTax(mrp,product.categories.igst);
				
// 			// 	$("#rate").val(correctAmoutWithTaxObj.unitPrice);
// 			// 	$("#rate").change();
// 			// 	$("#cgst").val(correctAmoutWithTaxObj.cgst);
// 			// 	$("#cgst").change();
// 			// 	$("#sgst").val(correctAmoutWithTaxObj.sgst);
// 			// 	$("#sgst").change();
// 			// 	$("#igst").val(correctAmoutWithTaxObj.igst);
// 			// 	$("#igst").change();
// 			// });   
            
//             //onload fetch product list
// 			$('#brandid').change();
// 			$('#categoryid').change();
			
			
// 			$('#productResetId').click(function(){
// 				resetFields();
// 			});
//     });
        
//         function editrow(id) {
//         	$(".btn-flat").removeAttr('disabled','disabled');
//         	$("#rowdelbutton_"+id).find('button').attr('disabled','disabled');
//         	$('#currentUpdateProductId').val(id);
//         	var productId=$('#rowproductkey_'+id).val();
//         	//alert($('#rowproductrate_'+id).val());
        	
//         	$('#mrp').val($('#rowproductmrp_'+id).val());
//         	$('#mrp').change();
        	
//         	/* $('#rate').val($('#rowproductrate_'+id).text());
//         	$('#rate').focus();
//         	$('#rate').trigger('blur'); */ 
//         	$("#productAddId").html('<i class="material-icons left">send</i><span id="productAddButton">Update</span>');
//     		$.ajax({
//     			type : "GET",
//     			url : "${pageContext.request.contextPath}/fetchProductByProductId?productId="+productId,
//     			/* data: "id=" + id + "&name=" + name, */
//     			beforeSend: function() {
// 						$('.preloader-background').show();
// 						$('.preloader-wrapper').show();
// 			           },
//     			success : function(data) {
//     				product=data;

//     				var source2 = $("#categoryid");
//     				var v2=product.categories.categoryId;
//     				source2.val(v2);
//     				source2.change();
    				
//     		    	var source = $("#brandid");
//     				var v1=product.brand.brandId;
//     				source.val(v1);
//     				source.change();		

    			
//     				setTimeout(
//     						  function() 
//     						  {
//     						    //do something special
//     							  var source3 = $("#productid");
//     								var v3=product.productId;
//     								source3.val(v3);
//     								source3.change();
//     								//alert(v);
//     								//alert($("#stateListForCity").val());
//     						  }, 1000);
//     				$('.preloader-wrapper').hide();
// 					$('.preloader-background').hide();
    				
//     			},error: function(xhr, status, error) {
// 					$('.preloader-wrapper').hide();
// 					$('.preloader-background').hide();
// 					 // alert(error +"---"+ xhr+"---"+status);
// 					 $('#addeditmsg').find("#modalType").addClass("warning");
// 					$('#addeditmsg').find(".modal-action").removeClass("red lighten-2 teal").addClass("red lighten-2");
// 					$('#addeditmsg').modal('open');
//            	     	/* $('#msgHead').text("Message : "); */
//            	     	$('#msg').text("Something Went Wrong "); 
//            	     		 setTimeout(function() 
// 								  {
//            	     					$('#addeditmsg').modal('close');
// 								  },1000);
// 					}

//     		});
        	
//         }

//         function deleterow(id) {
        	
//             //alert('#rowproductkey_'+id);
//             var removeItem=$('#rowproductkey_' + id).val();
//             //alert('removeItem '+$('#rowproductkey_' + id).val());
//             //alert('productidlist '+productidlist);
//             var productListTemp=[];
//            	for(var i=0; i<productList.length; i++)
//            	{
//            		var value=productList[i];
//            		if(removeItem!==value[0])
//            		{
//            			productListTemp.push(productList[i]);
//            		}
//            	}
//            	productList=[];
//            	for(var i=0; i<productListTemp.length; i++)
//            	{
//            		productList.push(productListTemp[i]);
//            	}
//             var rowCount = $('#t1 tr').length;
//         	//alert(rowCount);
//         	var trData="";
//         	count=1;
//         	for(var i=1; i<=rowCount; i++)
//         	{
//         		//alert($('#rowcount_'+i).html() +"---"+ $('#rowprocustname_'+i).html() +"---"+ $('#rowdelbutton_'+i).html());
        		
//         		if(id!==i)
//         		{
//         			//alert(i+"-(----)-"+$('#tbproductname_' + i).text());
// 	        		 /* trData=trData+"<tr id='rowdel_" + count + "' >"+
// 	           				"<td id='rowcount_" + count + "'>" + count + "</td>"+
// 	           				"<td id='rowproductname_" + count + "'><input type='hidden' id='rowproductkey_" + count + "' value='"+$('#rowproductkey_' + i).val()+"'><center><span id='tbproductname_" + count + "'>"+$('#tbproductname_' + i).text()+"</span></center></td>"+
// 	           				"<td id='rowdelbutton_" + count + "'><button class='btn-flat' type='button' onclick='deleterow(" + count + ")'><i class='material-icons '>clear</i></button></td>"+
// 	           				"</tr>"; */
// 	           				trData=trData+"<tr id='rowdel_" + count + "' >"+
// 		               				"<td id='rowcount_" + count + "'>" + count + "</td>"+
// 		               				"<td id='rowproductname_" + count + "'><input type='hidden' id='rowproductkey_" + count + "' value='"+$('#rowproductkey_' + i).val()+"'><center><span id='tbproductname_" + count + "'>"+$('#tbproductname_' + i).text()+"</span></center></td>"+
// 		               				"<td id='rowproductrate_" + count + "'><input type='hidden' id='rowproductmrp_" + count + "' value='"+$('#rowproductmrp_' + i).val()+"'>" + $('#rowproductrate_'+i).text() + "</td>"+
// 		               				"<td id='rowcountproductedit_" + count + "'><button class='btn-flat' type='button' onclick='editrow(" + count + ")'><i class='material-icons '>edit</i></button></td>"+
// 		               				"<td id='rowdelbutton_" + count + "'><button class='btn-flat' type='button' onclick='deleterow(" + count + ")'><i class='material-icons '>clear</i></button></td>"+
// 		               				"</tr>";
// 	        		 count++;
//         		}
//         		//alert(trData);
//         	} 
//         	var productIdList="";
//         	for (var i=0; i<productList.length; i++) {
//         		var value=productList[i];
//         		productIdList=productIdList+value[0]+"-"+value[1]+",";
//       		}
//         	productIdList=productIdList.slice(0,-1)
//         	alert(productIdList);
//         	$('#productlistinput').val(productIdList);
//         	$("#t1").html('');
//         	$("#t1").html(trData);
//         	//alert(productList.entries());
//             //$('#rowdel_' + id).remove();
//           // alert('productidlist '+productidlist);
// 			resetFields();
//         }
        
//         function resetFields(){
//         	$('#mrp').val(0);
//           	$('#mrp').change();
//           	$('#rate').val(0);
//           	$('#rate').change();
//           	$('#igst').val(0);
//           	$('#igst').change();
//           	$('#cgst').val(0);
//           	$('#cgst').change();
//           	$('#sgst').val(0);
//           	$('#sgst').change();
          	
//           	var source3 = $("#productid");
// 			source3.val(0);
// 			source3.change();
			
// 			$(".btn-flat").removeAttr('disabled','disabled');
			
// 			$("#productAddId").html('<i class="material-icons left">add</i><span id="productAddButton">Add</span>');
//         }