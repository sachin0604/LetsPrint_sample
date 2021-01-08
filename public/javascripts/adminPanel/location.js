var options, index, option;
$(document).ready(function () {	
	$('.dataTables_filter input').attr("placeholder", "  Search");
	$('#fetchCountry').click(function () {

		//$("#countryList").empty();
		 $('#resetCountrySubmit').click();
		var t = $('#tblDataCountry')
			.DataTable();
		t.clear().draw();

		$.ajax({
			type: "GET",
			url: myContextPath + "/fetchCountryList",
			/* data: "id=" + id + "&name=" + name, */
			beforeSend: function () {
                $(".hiddenAjaxLoader").show();
            },
            complete: function () {
                $(".hiddenAjaxLoader").hide();
            },

			success: function (data) {
				var srno = 1;
				//$("#tblDataCountry tbody").remove();

				//alert("data clean");

				var count = $(
					"#tblDataCountry")
					.find(
						"tr:first th").length;
				//alert(count);

				if (data == null) {
					t.row
						.add('<tr>'
							+ '<td colspan="' + count + '"><center>No Data Found</center></td>'
							+ '</tr>');
				}
				for (var i = 0, len = data.length; i < len; ++i) {
					var country = data[i];
					t.row
						.add(
							[
								srno,
								country.name,
								"<button onclick='editCountry(" + country.countryId + ")' id='editcountry' class='btn btn-flat'><i class='material-icons tooltipped' data-position='right' data-delay='50' data-tooltip='Edit' >edit</i></button>"

							]).draw(false);


					srno = srno + 1;
				}
				$(".hiddenAjaxLoader").hide();

			}
		});

	});

	// $("#saveCountrySubmit")
	// 	.click(
	// 		function () {
	// 			//alert("go to save");
	// 			//alert("go to save "+form.attr('method')+"  "+form.attr('action'));

	// 			if ($('#addCountry').val().trim() === "") {
	// 				Materialize.toast('Please Enter Country to add!', '4000', 'teal lighten-2');
	// 				/*$('#addeditmsg').find("#modalType").addClass("warning");
	// 				$('#addeditmsg').find(".modal-action").addClass("red lighten-2");
	// 					$('#addeditmsg').modal('open');*/
	// 				/*$('#msgHead').text("Error is : ");*/
	// 				//$('#msg').text("Enter Country Name First For Save Country");
	// 				return false;
	// 			}

	// 			var form = $('#saveCountryForm');

	// 			$.ajax({

	// 				type: form
	// 					.attr('method'),

	// 				url: form
	// 					.attr('action'),
	// 				beforeSend: function () {
	// 					$('.preloader-background').show();
	// 					$('.preloader-wrapper').show();
	// 				},
	// 				/* dataType : "json", */
	// 				data: $("#saveCountryForm")
	// 					.serialize(),
	// 				success: function (data) {

	// 					//alert("Country Saved ");

	// 					//alert(data);
	// 					if (data == "Success") {
	// 						$('#addeditmsg').find("#modalType").addClass("success");
	// 						$('#addeditmsg').find(".modal-action").removeClass("red lighten-2 teal").addClass("teal lighten-2");
	// 						$('#addeditmsg').modal('open');
	// 						/*$('#msgHead').text("Success : ");*/
	// 						$('#msg').text("Country Saved SuccessFully");
	// 						$('#addCountry').val('');

	// 						//reset country tab
	// 						$('#resetCountrySubmit').click();
	// 						$('#fetchCountry').click();
	// 					}
	// 					else {
	// 						$('#addeditmsg').find("#modalType").addClass("success");
	// 						$('#addeditmsg').find(".modal-action").removeClass("red lighten-2 teal").addClass("teal lighten-2");

	// 						$('#addeditmsg').modal('open');
	// 						/*$('#msgHead').text("Success : ");*/
	// 						$('#msg').text("Country " + data);
	// 					}


	// 					$('.preloader-wrapper').hide();
	// 					$('.preloader-background').hide();
	// 				},
	// 				error: function (xhr, status, error) {
	// 					$('.preloader-wrapper').hide();
	// 					$('.preloader-background').hide();
	// 					Materialize.toast('Something went wrong!', '4000', 'teal lighten-2');

	// 				}
	// 			});
	// 			return false;
	// 		});
	
	//state
	//fetchCountryList
	$('#statework').click(function () {
		$('#resetStateSubmit').click();
		// Get the raw DOM object for the select box
		var select = document.getElementById('countryListForState');

		// Clear the old options
		select.options.length = 0;
		//$('#countryListForState').html('');

		//Load the new options

		select.options.add(new Option("Choose Country", 0));
		$.ajax({
			url: myContextPath + "/fetchCountryList",
			dataType: "json",
			success: function (data) {

				/* alert(data); */
				var options, index, option;
				select = document.getElementById('countryListForState');

				for (var i = 0, len = data.length; i < len; ++i) {
					var country = data[i];
					select.options.add(new Option(country.name, country.countryId));
				}

				fetchallstate();
				$("#countryListForState > option").each(function () {

					if (this.text === "India") {
						//alert(this.text + ' ' + this.value);
						var v = this.value;
						var source = $('#countryListForState');
						source.val(v);
						source.change();
					}
				});
				/* for (index = 0; index < options.length; ++index) {
				  option = options[index];
				  select.options.add(new Option(option.name, option.cityId));
				} */
			}
		});

	});

	$("#saveStateSubmit")
		.click(
			function () {
				//alert("go to save");
				//alert("state go to save "+$("#saveStateForm").serialize());

				if ($('#addState').val() === "") {
					Materialize.toast('Enter State Name First For Save State!', '4000', 'teal lighten-2');
					/*$('#addeditmsg').modal('open');
					$('#msgHead').text("Error is : ");
					$('#msg').text("Enter State Name First For Save State");*/
					return false;
				}
				if ($("#countryListForState").val() == 0) {
					Materialize.toast('Select Country First For Save State!', '4000', 'teal lighten-2');
					/*$('#addeditmsg').modal('open');
					$('#msgHead').text("Error is : ");
					$('#msg').text("Select Country First For Save State");*/
					return false;
				}
				if ($('#addStateCodeId').val() === "") {
					Materialize.toast('Enter State Code First For Save State!', '4000', 'teal lighten-2');
					/*$('#addeditmsg').modal('open');
					$('#msgHead').text("Error is : ");
					$('#msg').text("Enter State Code First For Save State");*/
					return false;
				}

				var form = $('#saveStateForm');

				$.ajax({

					type: form
						.attr('method'),

					url: form
						.attr('action'),
					beforeSend: function () {
						$('.preloader-background').show();
						$('.preloader-wrapper').show();
					},
					/* dataType : "json", */
					data: $("#saveStateForm").serialize(),
					success: function (data) {

						//alert("Country Saved ");

						//alert(data);
						if (data == "Success") {
							$('#addeditmsg').find("#modalType").addClass("success");
							$('#addeditmsg').find(".modal-action").removeClass("red lighten-2 teal").addClass("teal lighten-2");
							$('#addeditmsg').modal('open');
							//$('#msgHead').text("Success : ");
							$('#msg').text("State Saved SuccessFully");

							var source = $("#countryListForState");
							var v = 0;
							source.val(v);
							source.change();
							$('#addState').val('');
							$('#addStateCodeId').val('');

							//reset state tab 
							$('#saveStateSubmit').html("<i class='material-icons left'>add</i>Add");
							$('#statework').click();
							var source = $("#countryListForState");
							var v = 0;
							source.val(v);
							source.change();
							$('#addState').val('');
							$('#addStateCodeId').val('');
						}
						else {
							$('#addeditmsg').find("#modalType").addClass("success");
							$('#addeditmsg').find(".modal-action").removeClass("red lighten-2 teal").addClass("teal lighten-2");
							$('#addeditmsg').modal('open');
							$('#msgHead').text("Success : ");
							$('#msg').text("State " + data);


						}


						$('.preloader-wrapper').hide();
						$('.preloader-background').hide();
					},
					error: function (xhr, status, error) {
						$('.preloader-wrapper').hide();
						$('.preloader-background').hide();
						//alert(error +"---"+ xhr+"---"+status);
						Materialize.toast('Something went wrong!', '4000', 'teal lighten-2');

					}
				});
				return false;
			});

	$('#resetStateSubmit').click(function () {


		$("#countryListForState > option").each(function () {

			if (this.text === "India") {
				//alert(this.text + ' ' + this.value);
				var v = this.value;
				var source = $('#countryListForState');
				source.val(v);
				source.change();
			}
		});



		$('#addStateId').val('0');
		$('#addState').val('');
		$('#addStateCodeId').val('');
		$('#addState').change();
		$('#addStateCodeId').change();
		$("#saveStateSubmit").html('<i class="material-icons left">add</i> Add');


	});

	//city								
	//fetchCountryList
	//fetchStateList
	$('#citywork').click(function () {
		$('#resetCitySubmit').click();
		// Get the raw DOM object for the select box
		var select = document.getElementById('countryListForCity');

		// Clear the old options
		select.options.length = 0;
		//$('#countryListForState').html('');

		//Load the new options

		select.options.add(new Option("Choose Country", 0));
		$.ajax({
			url: myContextPath + "/fetchCountryList",
			dataType: "json",
			success: function (data) {

				/* alert(data); */
				var options, index, option;
				select = document.getElementById('countryListForCity');

				for (var i = 0, len = data.length; i < len; ++i) {
					var country = data[i];
					select.options.add(new Option(country.name, country.countryId));
				}

				fetchallcity();
				$("#countryListForCity > option").each(function () {

					if (this.text === "India") {
						// alert(this.text + ' ' + this.value);
						var v = this.value;
						var source = $('#countryListForCity');
						source.val(v);
						source.change();
					}
				});

				setTimeout(
					function () {
						$("#stateListForCity > option").each(function () {

							if (this.text === "Maharashtra") {
								var v = this.value;
								var source = $('#stateListForCity');
								source.val(v);
								source.change();
							}
						});
					}, 1000);
				/* for (index = 0; index < options.length; ++index) {
				  option = options[index];
				  select.options.add(new Option(option.name, option.cityId));
				} */
			}
		});


	});

	//saveCity
	$("#saveCitySubmit")
		.click(
			function () {
				//alert("go to save");
				//alert("go to save "+form.attr('method')+"  "+form.attr('action'));
				if ($("#countryListForCity").val() == 0) {
					Materialize.toast('Select Country First For Save City!', '4000', 'teal lighten-2');
					/*$('#addeditmsg').modal('open');
					$('#msgHead').text("Error is : ");
					$('#msg').text("Select Country First For Save City");*/
					return false;
				}
				if ($("#stateListForCity").val() == 0) {
					Materialize.toast('Select State First For Save City!', '4000', 'teal lighten-2');
					/*$('#addeditmsg').modal('open');
					$('#msgHead').text("Error is : ");
					$('#msg').text("Select State First For Save City");*/
					return false;
				}
				if ($('#addCity').val() === "") {
					Materialize.toast('Enter City Name First For Save City!', '4000', 'teal lighten-2');
					/*$('#addeditmsg').modal('open');
					$('#msgHead').text("Error is : ");
					$('#msg').text("Enter City Name First For Save City");*/
					return false;
				}




				var form = $('#saveCityForm');

				$.ajax({

					type: form
						.attr('method'),

					url: form
						.attr('action'),
					beforeSend: function () {
						$('.preloader-background').show();
						$('.preloader-wrapper').show();
					},
					/* dataType : "json", */
					data: $("#saveCityForm")
						.serialize(),
					success: function (data) {

						//alert("Country Saved ");

						//alert(data);
						if (data == "Success") {
							$('#addeditmsg').find("#modalType").addClass("success");
							$('#addeditmsg').find(".modal-action").removeClass("red lighten-2 teal").addClass("teal lighten-2");
							$('#addeditmsg').modal('open');
							$('#msgHead').text("Success : ");
							$('#msg').text("City Saved SuccessFully");

							//$('#resetCitySubmit').click();

							//reset city tab
							$('#citywork').click();

						}
						else {
							$('#addeditmsg').find("#modalType").addClass("success");
							$('#addeditmsg').find(".modal-action").removeClass("red lighten-2 teal").addClass("teal lighten-2");
							$('#addeditmsg').modal('open');
							$('#msgHead').text("Success : ");
							$('#msg').text("City " + data);
						}


						$('.preloader-wrapper').hide();
						$('.preloader-background').hide();
					},
					error: function (xhr, status, error) {
						$('.preloader-wrapper').hide();
						$('.preloader-background').hide();
						//alert(error +"---"+ xhr+"---"+status);
						Materialize.toast('Something went wrong!', '4000', 'teal lighten-2');

					}
				});
				return false;
			});


	$('#countryListForCity').change(function () {



		// Get the raw DOM object for the select box
		var select = document.getElementById('stateListForCity');

		// Clear the old options
		select.options.length = 0;
		//$('#countryListForState').html('');

		//Load the new options

		select.options.add(new Option("Choose State", 0));
		$.ajax({
			url: myContextPath + "/fetchStateListByCountryId?countryId=" + $('#countryListForCity').val(),
			dataType: "json",
			success: function (data) {

				/* alert(data); */
				var options, index, option;
				select = document.getElementById('stateListForCity');

				for (var i = 0, len = data.length; i < len; ++i) {
					var state = data[i];
					//alert(state.name+" "+ state.stateId);
					select.options.add(new Option(state.name, state.stateId));
				}

			}
		});

	});

	$('#resetCitySubmit').click(function () {


		$("#countryListForCity > option").each(function () {

			if (this.text === "India") {
				// alert(this.text + ' ' + this.value);
				var v = this.value;
				var source = $('#countryListForCity');
				source.val(v);
				source.change();
			}
		});


		var source = $("#stateListForCity");
		var v = 0;
		source.val(v);
		source.change();

		$('#addCityId').val('0');
		$('#addCity').val('');
		$("#saveCitySubmit").html('<i class="material-icons left">add</i> Add');


	});
	$('#citywork').click();

});

// function editCountry(id) {
// 	//alert(id);
// 	$.ajax({
// 		type: "GET",
// 		url: myContextPath + "/fetchCountry?countryId=" + id,
// 		/* data: "id=" + id + "&name=" + name, */
// 		success: function (data) {
// 			var user = data;
// 			$('#addCountry').focus();
// 			$('#addCountryId').val(user.countryId);
// 			$('#addCountry').val(user.name);
// 			$("#saveCountrySubmit").html('<i class="material-icons left">send</i> Update');
// 		}

// 	});
// }

function editState(id) {
	//alert(id);
	$("#saveStateSubmit").html('<i class="material-icons left">send</i> update');

	$.ajax({
		type: "GET",
		url: myContextPath + "/fetchState?stateId=" + id,
		/* data: "id=" + id + "&name=" + name, */
		beforeSend: function () {
			$('.preloader-background').show();
			$('.preloader-wrapper').show();
		},
		success: function (data) {
			var state = data;
			$('#addState').focus();
			$('#addStateId').val(state.stateId);
			$('#addState').val(state.name);
			$('#addStateCodeId').val(state.code);
			$('#addStateCodeId').change();
			$('#saveStateSubmit').html("<i class='material-icons left'>send</i>Update");

			$("#countryListForState option").each(function () {

				var source = $("#countryListForState");
				var v = state.country.countryId;
				source.val(v);
				source.change();
				$('.preloader-background').hide();
				$('.preloader-wrapper').hide();
				return false;

			});


		}

	});
}

function editCity(id) {
	//alert(id);
	$("#saveCitySubmit").html('<i class="material-icons left">send</i> update');

	$.ajax({
		type: "GET",
		url: myContextPath + "/fetchCity?cityId=" + id,
		/* data: "id=" + id + "&name=" + name, */
		beforeSend: function () {
			$('.preloader-background').show();
			$('.preloader-wrapper').show();
		},
		success: function (data) {
			var city = data;
			$('#addCity').focus();
			$('#addCityId').val(city.cityId);
			$('#addCity').val(city.name);
			//alert(city.state.country.countryId);
			var source = $("#countryListForCity");
			var v1 = city.state.country.countryId;
			source.val(v1);
			source.change();
			//alert($("#countryListForCity").val());

			//alert(document.getElementById('stateListForCity').options.length);
			setTimeout(
				function () {
					//do something special
					var source1 = $("#stateListForCity");
					var v = city.state.stateId;
					source1.val(v);
					source1.change();
					$('.preloader-background').hide();
					$('.preloader-wrapper').hide();
					//alert(v);
					//alert($("#stateListForCity").val());
				}, 1000);


		}

	});
}

function fetchallstate() {
	var t = $('#tblDataState').DataTable();
	t.clear().draw();
	$
		.ajax({
			type: "GET",
			url: myContextPath + "/fetchStateList",
			/* data: "id=" + id + "&name=" + name, */
			beforeSend: function () {
				$('.preloader-background').show();
				$('.preloader-wrapper').show();
			},
			success: function (data) {
				var srno = 1;

				var count = $(
					"#tblDataState")
					.find(
						"tr:first th").length;

				if (data == null) {
					t.row
						.add('<tr>'
							+ '<td colspan="' + count + '"><center>No Data Found</center></td>'
							+ '</tr>');
				}
				for (var i = 0, len = data.length; i < len; ++i) {
					var state = data[i];
					t.row
						.add([
							srno,
							state.name,
							state.code,
							state.country.name,
							"<button onclick='editState(" + state.stateId + ")' id='editstate' class='btn btn-flat'><i class='material-icons tooltipped' data-position='right' data-delay='50' data-tooltip='Edit' >edit</i></button>"

						])
						.draw(false);

					srno = srno + 1;
				}
				$('.preloader-background').hide();
				$('.preloader-wrapper').hide();

			}
		});

}

function fetchallcity() {
	var t = $('#tblDataCity').DataTable();
	t.clear().draw();
	$
		.ajax({
			type: "GET",
			url: myContextPath + "/fetchCityList",
			beforeSend: function () {
				$('.preloader-background').show();
				$('.preloader-wrapper').show();
			},
			success: function (data) {
				var srno = 1;

				var count = $(
					"#tblDataCity")
					.find(
						"tr:first th").length;

				if (data == null) {
					t.row.add('<tr>'
						+ '<td colspan="' + count + '"><center>No Data Found</center></td>'
						+ '</tr>');
				}
				for (var i = 0, len = data.length; i < len; ++i) {
					var city = data[i];
					t.row
						.add(
							[
								srno,
								city.name,
								city.state.name,
								city.state.country.name,
								"<button onclick='editCity(" + city.cityId + ")' class='editcity btn btn-flat' ><i class='material-icons tooltipped' data-position='right' data-delay='50' data-tooltip='Edit' >edit</i></button>"

							])
						.draw(
							false);

					srno = srno + 1;
				}
				$('.preloader-background').hide();
				$('.preloader-wrapper').hide();

			}
		});

}
var options, index, option;
$(document).ready(function () {

	$('.preloader-background').hide();
	$('.preloader-wrapper').hide();

	$('#addpincode').keypress(function (event) {
		var key = event.which;

		if (!(key >= 48 && key <= 57 || key === 13))
			event.preventDefault();
	});

	//  for no of entries and global search


	$('#regionwork').click(function () {
		$('.preloader-background').show();
		$('.preloader-wrapper').show();

		$('#resetRegionSubmit').click();
		fetchCityList('cityListForRegion');

		$('.preloader-background').hide();
		$('.preloader-wrapper').hide();
	});





	//saveCity
	$("#saveRegionSubmit").click(
		function () {
			//alert("go to save");
			//alert("go to save "+form.attr('method')+"  "+form.attr('action'));
			if ($("#cityListForRegion").val() == 0) {
				Materialize.toast('Select City First For Save City!', '4000', 'teal lighten-2');
																/*$('#addeditmsg').modal('open');
																$('#msgHead').text("Error is : ");
																$('#msg').text("Select City First For Save City")*/;
				return false;
			}
			if ($('#addRegion').val() === "") {
				Materialize.toast('Enter Region First For Save Region!', '4000', 'teal lighten-2');
				/*$('#addeditmsg').modal('open');
				$('#msgHead').text("Error is : ");
				$('#msg').text("Enter Area Name First For Save Area");*/
				return false;
			}

			var form = $('#saveRegionForm');

			$.ajax({

				type: form.attr('method'),
				url: form.attr('action'),
				beforeSend: function () {
					$('.preloader-background').show();
					$('.preloader-wrapper').show();
				},
				/* dataType : "json", */
				data: $("#saveRegionForm").serialize(),
				success: function (data) {

					//alert("Country Saved ");

					//alert(data);
					if (data == "Success") {
						$('#addeditmsg').find("#modalType").addClass("success");
						$('#addeditmsg').find(".modal-action").removeClass("red lighten-2 teal").addClass("teal lighten-2");
						$('#addeditmsg').modal('open');
						$('#msgHead').text("Success : ");
						$('#msg').text("Region Saved SuccessFully");

						//$('#resetRegionSubmit').click();

						//reset region tab
						$('#regionwork').click();
					}
					else {
						$('#addeditmsg').find("#modalType").addClass("success");
						$('#addeditmsg').find(".modal-action").removeClass("red lighten-2 teal").addClass("teal lighten-2");
						$('#addeditmsg').modal('open');
						$('#msgHead').text("Success : ");
						$('#msg').text("Region " + data);
					}


					$('.preloader-background').hide();
					$('.preloader-wrapper').hide();

				},
				error: function (xhr, status, error) {
					$('.preloader-wrapper').hide();
					$('.preloader-background').hide();
					//alert(error +"---"+ xhr+"---"+status);
					Materialize.toast('Something went wrong!', '4000', 'teal lighten-2');
					/*$('#addeditmsg').modal('open');
							  $('#msgHead').text("Message : ");
							  $('#msg').text("Something Went Wrong"); 
									setTimeout(function() 
						  {
									$('#addeditmsg').modal('close');
						  }, 1000);*/
				}
			});
			return false;
		});

	$('#resetRegionSubmit').click(function () {
		$('.preloader-background').show();
		$('.preloader-wrapper').show();

		var source1 = $("#cityListForRegion");
		var v1 = 0;
		source1.val(v1);
		source1.change();

		$('#addRegionId').val('0');
		$('#addRegion').val('');
		$("#saveRegionSubmit").html('<i class="material-icons left">add</i> Add');

		fetchallregion();

		$('.preloader-background').hide();
		$('.preloader-wrapper').hide();
	});

	$('#areawork').click(function () {
		$('.preloader-background').show();
		$('.preloader-wrapper').show();

		$('#resetAreaSubmit').click();
		fetchCityList('cityListForArea');

		$('.preloader-background').hide();
		$('.preloader-wrapper').hide();
	});

	$('#cityListForArea').change(function () {

		// Get the raw DOM object for the select box
		var select = document.getElementById('regionListForArea');

		// Clear the old options
		select.options.length = 0;
		//$('#countryListForState').html('');

		//Load the new options

		select.options.add(new Option("Choose Region", 0));
		$.ajax({
			url: myContextPath + "/fetchRegionListByCityId?cityId=" + $('#cityListForArea').val(),
			dataType: "json",
			beforeSend: function () {
				$('.preloader-background').show();
				$('.preloader-wrapper').show();
			},
			success: function (data) {

				/* alert(data); */
				var options, index, option;
				select = document.getElementById('regionListForArea');

				for (var i = 0, len = data.length; i < len; ++i) {
					var region = data[i];
					//alert(state.name+" "+ state.stateId);
					select.options.add(new Option(region.name, region.regionId));
				}

				/* for (index = 0; index < options.length; ++index) {
				  option = options[index];
				  select.options.add(new Option(option.name, option.cityId));
				} */
				$('.preloader-wrapper').hide();
				$('.preloader-background').hide();

			},
			error: function (xhr, status, error) {
				$('.preloader-wrapper').hide();
				$('.preloader-background').hide();
			}
		});

	});

	//saveCity
	$("#saveAreaSubmit").click(function () {

		if ($("#cityListForArea").val() == 0) {
			Materialize.toast('Select City First For Save Area!', '4000', 'teal lighten-2');
			/*$('#addeditmsg').modal('open');
			$('#msgHead').text("Error is : ");
			$('#msg').text("Select City First For Save Area");*/
			return false;
		}
		//alert("go to save");
		//alert("go to save "+form.attr('method')+"  "+form.attr('action'));
		if ($("#regionListForArea").val() == 0) {
			Materialize.toast('Select Region First For Save Area!', '4000', 'teal lighten-2');
			/*$('#addeditmsg').modal('open');
			$('#msgHead').text("Error is : ");
			$('#msg').text("Select Region First For Save Area");*/
			return false;
		}

		if ($('#addArea').val() === "") {
			Materialize.toast('Enter Area Name First For Save Area!', '4000', 'teal lighten-2');
			/*$('#addeditmsg').modal('open');
			$('#msgHead').text("Error is : ");
			$('#msg').text("Enter Area Name First For Save Area");*/
			return false;
		}

		if ($('#addpincode').val() === "") {
			Materialize.toast('Enter Area Pincode First For Save Area!', '4000', 'teal lighten-2');
			/*$('#addeditmsg').modal('open');
			$('#msgHead').text("Error is : ");
			$('#msg').text("Enter Area Pincode First For Save Area");*/
			return false;
		}

		var form = $('#saveAreaForm');

		$.ajax({

			type: form.attr('method'),
			url: form.attr('action'),
			beforeSend: function () {
				$('.preloader-background').show();
				$('.preloader-wrapper').show();
			},
			/* dataType : "json", */
			data: $("#saveAreaForm").serialize(),

			success: function (data) {

				//alert("Country Saved ");

				//alert(data);
				if (data == "Success") {
					$('#addeditmsg').find("#modalType").addClass("success");
					$('#addeditmsg').find(".modal-action").removeClass("red lighten-2 teal").addClass("teal lighten-2");
					$('#addeditmsg').modal('open');
					$('#msgHead').text("Success : ");
					$('#msg').text("Area Saved SuccessFully");

					//$('#resetAreaSubmit').click();

					//reset area tab
					$('#areawork').click();
				}
				else {
					$('#addeditmsg').find("#modalType").addClass("success");
					$('#addeditmsg').find(".modal-action").removeClass("red lighten-2 teal").addClass("teal lighten-2");
					$('#addeditmsg').modal('open');
					$('#msgHead').text("Success : ");
					$('#msg').text("Area " + data);
				}


				$('.preloader-wrapper').hide();
				$('.preloader-background').hide();

			},
			error: function (xhr, status, error) {
				$('.preloader-wrapper').hide();
				$('.preloader-background').hide();


			}
		});
		return false;
	});

	$('#resetAreaSubmit').click(function () {

		$('.preloader-background').show();
		$('.preloader-wrapper').show();

		var source1 = $("#cityListForArea");
		var v1 = 0;
		source1.val(v1);
		source1.change();

		var source2 = $("#regionListForArea");
		var v2 = 0;
		source2.val(v2);
		source1.change();

		$('#addAreaId').val('0');
		$('#addArea').val('');
		$('#addpincode').val('');
		$("#saveAreaSubmit").html('<i class="material-icons left">add</i> Add');

		fetchallarea();

		$('.preloader-background').hide();
		$('.preloader-wrapper').hide();
	});
	$('#areawork').click();

});

function editRegion(id) {
	//alert(id);

	$("#saveRegionSubmit").html('<i class="material-icons left">send</i> update');

	$.ajax({
		type: "GET",
		url: myContextPath + "/fetchRegion?regionId=" + id,
		/* data: "id=" + id + "&name=" + name, */
		beforeSend: function () {
			$('.preloader-background').show();
			$('.preloader-wrapper').show();
		},
		success: function (data) {
			var region = data;
			$('#addRegion').focus();
			$('#addRegionId').val(region.regionId);
			$('#addRegion').val(region.name);


			setTimeout(function () {
				//do something special
				//alert("city");
				var source2 = $("#cityListForRegion");
				var v2 = region.city.cityId;
				source2.val(v2);
				source2.change();
				$('.preloader-background').hide();
				$('.preloader-wrapper').hide();
				//alert(v2);
				//alert($("#stateListForCity").val());
			}, 1000);

			/*$('.preloader-background').hide();
			$('.preloader-wrapper').hide();*/

		},
		error: function (xhr, status, error) {
			$('.preloader-wrapper').hide();
			$('.preloader-background').hide();
		}

	});
}


function editArea(id) {

	//alert(id);
	$("#saveAreaSubmit").html('<i class="material-icons left">send</i> update');

	$.ajax({
		type: "GET",
		url: myContextPath + "/fetchArea?areaId=" + id,
		/* data: "id=" + id + "&name=" + name, */
		beforeSend: function () {
			$('.preloader-background').show();
			$('.preloader-wrapper').show();
		},
		success: function (data) {
			var area = data;
			$('#addArea').focus();
			$('#addAreaId').val(area.areaId);
			$('#addArea').val(area.name);
			$('#addpincode').val(area.pincode);
			$('#addpincode').focus();
			$('#addArea').focus();
			//alert($('#addRegionId').val());

			var source2 = $("#cityListForArea");
			var v2 = area.region.city.cityId;
			source2.val(v2);
			source2.change();

			setTimeout(function () {
				//do something special
				// alert("city");
				var source3 = $("#regionListForArea");
				var v3 = area.region.regionId;
				source3.val(v3);
				source3.change();
				//alert(v2);
				//alert($("#stateListForCity").val());
				$('.preloader-background').hide();
				$('.preloader-wrapper').hide();

			}, 1000);

			/*$('.preloader-background').hide();
			$('.preloader-wrapper').hide();*/

		},
		error: function (xhr, status, error) {
			$('.preloader-wrapper').hide();
			$('.preloader-background').hide();
		}

	});
}


function fetchallregion() {
	var t = $('#tblDataRegion').DataTable();
	t.clear().draw();
	$
		.ajax({
			type: "GET",
			url: myContextPath + "/fetchRegionList",
			/* data: "id=" + id + "&name=" + name, */
			beforeSend: function () {
				$('.preloader-background').show();
				$('.preloader-wrapper').show();
			},
			success: function (data) {
				var srno = 1;

				var count = $(
					"#tblDataRegion")
					.find(
						"tr:first th").length;

				if (data == null) {
					t.row
						.add('<tr>'
							+ '<td colspan="' + count + '"><center>No Data Found</center></td>'
							+ '</tr>');
				}
				for (var i = 0, len = data.length; i < len; ++i) {
					var region = data[i];
					t.row
						.add(
							[
								srno,
								region.name,
								region.city.name,
								region.city.state.name,
								region.city.state.country.name,
								"<button onclick='editRegion(" + region.regionId + ")' class='editregion btn btn-flat' ><i class='material-icons tooltipped' data-position='right' data-delay='50' data-tooltip='Edit' >edit</i></button>"

							])
						.draw(
							false);

					srno = srno + 1;
				}
				$('.preloader-background').hide();
				$('.preloader-wrapper').hide();

			},
			error: function (xhr, status, error) {
				$('.preloader-wrapper').hide();
				$('.preloader-background').hide();
			}
		});

}


function fetchallarea() {
	var t = $('#tblDataArea').DataTable();
	t.clear().draw();
	$.ajax({
		type: "GET",
		url: myContextPath + "/fetchAreaList",
		/* data: "id=" + id + "&name=" + name, */
		beforeSend: function () {
			$('.preloader-background').show();
			$('.preloader-wrapper').show();
		},
		success: function (data) {
			var srno = 1;

			var count = $(
				"#tblDataArea")
				.find(
					"tr:first th").length;

			if (data == null) {
				t.row
					.add('<tr>'
						+ '<td colspan="' + count + '"><center>No Data Found</center></td>'
						+ '</tr>');
			}
			for (var i = 0, len = data.length; i < len; ++i) {
				var area = data[i];
				t.row
					.add(
						[
							srno,
							area.name,
							area.pincode,
							area.region.name,
							area.region.city.name,
							area.region.city.state.name,
							area.region.city.state.country.name,
							"<button onclick='editArea(" + area.areaId + ")' class='editarea btn btn-flat'><i class='material-icons tooltipped' data-position='right' data-delay='50' data-tooltip='Edit' >edit</i></button>"

						])
					.draw(
						false);

				srno = srno + 1;
			}
			$('.preloader-background').hide();
			$('.preloader-wrapper').hide();

		},
		error: function (xhr, status, error) {
			$('.preloader-wrapper').hide();
			$('.preloader-background').hide();
		}
	});

}

function fetchCityList(taskForId) {
	// Get the raw DOM object for the select box
	var select = document.getElementById(taskForId);

	// Clear the old options
	select.options.length = 0;
	//$('#countryListForState').html('');

	//Load the new options

	select.options.add(new Option("Choose City", 0));
	$.ajax({
		url: myContextPath + "/fetchCityListByCompanyId",
		dataType: "json",
		beforeSend: function () {
			$('.preloader-background').show();
			$('.preloader-wrapper').show();
		},
		async: false,
		success: function (data) {

			//alert(data); 
			var options, index, option;
			select = document.getElementById(taskForId);

			for (var i = 0, len = data.length; i < len; ++i) {
				var city = data[i];
				//alert(state.name+" "+ state.stateId);
				select.options.add(new Option(city.name, city.cityId));
			}
			$('.preloader-wrapper').hide();
			$('.preloader-background').hide();
		},
		error: function (xhr, status, error) {
			$('.preloader-wrapper').hide();
			$('.preloader-background').hide();
		}
	});
}
