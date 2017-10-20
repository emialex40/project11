$(document).ready(function() {

	$.validator.addMethod("notnumbers", function(value, element) {
			return /^[^0-9]+$/.test(value);
		},
		"В это поле запрещен ввод цифровых значений. ");

		$('#excel_form').validate({

			rules: {
				excel_firm: {
					required: true,
					maxlength: 100
				},
				excel_name: {
					required: true,
					notnumbers: true
				},
				excel_phone: {
					required: true
				},
				excel_email: {
					required: true,
					email: true
				},
				excel_file: {
					required: true,
					extension: "xlsx|xls"
				},
				excel_comment: {
					maxlength: 1000
				}
			},
			messages: {
				excel_firm: {
					required: 'Это поле обязательно для заполнения',
					maxlength: 'Максимальное количество символов равно 100'
				},
				excel_name: {
					required: 'Это поле обязательно для заполнения'
				},
				excel_phone: {
					required: 'Это поле обязательно для заполнения'
				},
				excel_email: {
					required: 'Это поле обязательно для заполнения',
					email: 'Введите коректный E-mail'
				},
				excel_file: {
					required: 'Это поле обязательно для заполнения',
					extension: 'Допустимы файлы только с расширением .xlsx и .xls'
				}
			},
			focusCleanup: true,
			focusInvalid: false,
			invalidHandler: function(event, validator) {
				$('.js_excel').text('Заполните пожалуйста все поля');
			},
			onkeyup: function(element) {
				$('.js_excel').text('');
			},
			submitHandler: function(form) {
				$(form).ajaxSubmit({
					url: 'registerRequest.do',
					type: 'POST',
					data: $(this).serializeArray(),
					dataType: "json",
					success: function(){
						alert('Успешная отправка');
						$('#excel_form').hide();
					}
				});
			}
		});

//bid-js file beginning

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
//bid-js file end

	//falidation bid-form

	$('#form_form').validate({
		rules: {
				bid_firm: {
				required: true,
				maxlength: 100
			},
			bid_name: {
				required: true,
				notnumbers: true
			},
			bid_phone: {
				required: true
			},
			bid_quantity: {
				required: true,
				digits: true
			},
			bid_date: {
				required: true
			},
			bid_price: {
				required: true
			}
		},
		messages: {
			bid_firm: {
				required: 'Это поле обязательно для заполнения',
				maxlength: 'Максимальное количество символов равно 100'
			},
			bid_name: {
				required: 'Это поле обязательно для заполнения'
			},
			bid_phone: {
				required: 'Это поле обязательно для заполнения'
			},
			bid_quantity: {
				required: 'Это поле обязательно для заполнения',
				digits: 'В этом поле должны быть только цифры'
			},
			bid_date1: {
				required: 'Это поле обязательно для заполнения'
			},
			bid_date2: {
				required: 'Это поле обязательно для заполнения'
			},
			bid_price: {
				required: 'Это поле обязательно для заполнения'
			}
		},
		focusCleanup: true,
		focusInvalid: false,
		submitHandler: function(form) {
			$(form).ajaxSubmit({
				url: 'registerRequest.do',
				type: 'POST',
				data: obj,
				dataType: "json",
				success: function(){
					alert('Успешная отправка');
					$('#form_form').hide();
				}
			});
		}
	});

});
