$(document).ready(function() {

	$('#bid_quantity').blur(function() {
		var quant = $('#bid_quantity');
		var quantity = quant.val();
		quantity = quantity.replace(/[^0-9]/gim,'');
		quant.val(quantity);
	});

$('#bid_price').blur(function() {
	var price = $('#bid_price');
	var int = price.val();
	int = int.replace(/[^0-9|\.|\,]/gim,'');
	int = Math.round(int * 100)/100;
	price.val(int);
});

	$('.bid__item').on('click', function() {
		var city = $('#city').val();
		var title = $(this).children('.bid__txt').text();
		var err = 'Выберите город';
		if(city === err) {
			alert('Пожалуйста, выберите город!');
		} else {
			$('.bid_test').text('Вы выбрали город - ' + city);
			$('#bid_constr').val(title);
			$('#bid_ct').val(city);
		}
	});
	var obj = [];
function formCollector() {
	var bidFirm = $('#bid_firm').val();
	var bidName = $('#bid_name').val();
	var bidPhone = $('#bid_phone').val();
	var bidConstr = $('#bid_constr').val();
	var bidCity = $('#bid_ct').val();
	var bidQuantity = $('#bid_quantity').val();
	var bidRadio = $('input[name="bid_radio"]:checked').val();
	var bidDate1 = $('#bid_date1').val();
	var bidDate2 = $('#bid_date2').val();
	var bidPrice = $('#bid_price').val();
	var bidObjects = $('#bid_objects').val();

		var arr = [];
		arr.push(bidFirm, bidName, bidPhone, bidConstr, bidCity, bidQuantity, bidRadio, bidDate1, bidDate2, bidPrice, bidObjects);

		$('.tbl').append('<tr>' +
		'<td>' +  arr[3] + '</td>' +
		'<td>' + arr[5] + '</td>' +
		'<td>' + arr[6] + '</td>' +
		'<td>' + arr[7] + '</td>' +
		'<td>' + arr[8] + '</td>' +
		'<td>' + arr[9] + '</td>' +
		'<td>' + arr[10] + '</td></tr>');

		obj.push(arr);
		console.log(obj);
	}

	$('.add_to').on('click', function() {
		formCollector();
		$('.add__txt').text('Запись добавлена к заявке');
	});



	$('.tb_remove').on('click', function() {
		$(this).siblings('.val').text('');
	});

	$('.bid_clear').on('click', function() {
		$('#bid_radio1').prop('checked', true);
		$('#form_form input').val('');
		$('.val').text('');
	});


});
