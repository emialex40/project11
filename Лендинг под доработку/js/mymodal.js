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
