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
			$('.bid_test').text('Вы выбрали ' + title);
			$('#bid_constr').val(title);
			$('#bid_ct').val(city);
            $('html, body').animate({
                scrollTop: $("#bid__form-wrap").offset().top
            }, 1000);
		}
	});


	var bidArray = [];

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

		var arr = {};
        arr = {
            city: bidCity,
            firm: bidFirm,
            name: bidName,
            phone: bidPhone,
            construction: bidConstr,
            quantity: bidQuantity,
            type: bidRadio,
            date1: bidDate1,
            date2: bidDate2,
            price: bidPrice,
            objects: bidObjects
        };
        console.log(arr);
		//arr.push(bidFirm, bidName, bidPhone, bidConstr, bidCity, bidQuantity, bidRadio, bidDate1, bidDate2, bidPrice, bidObjects);

		$('.tbl').append('<tr>' +
            '<td class="val">' +  bidConstr + '</td>' +
            '<td class="val">' + bidQuantity + '</td>' +
            '<td class="val">' + bidRadio + '</td>' +
            '<td class="val">' + bidDate1 + '</td>' +
            '<td class="val">' + bidDate2 + '</td>' +
            '<td class="val">' + bidPrice + '</td>' +
            '<td class="val">' + bidObjects + '</td>' +
            '<td class="tb_remove"><button class="remove" id ="' + x + '">Удалить</button></td>' +
        '</tr>');

        bidArray.push(arr);
        console.log(bidArray);
        $('.remove').on('click', function() {
            $(this).parent().parent().remove();
            var y = $(this).attr('id');
            delete bidArray[y];
        });
	}


    var x = 0;
	$('.add_to').on('click', function() {
		formCollector();
        x = x + 1;
		$('.add__txt').text('Запись добавлена к заявке');
        $('html, body').animate({
            scrollTop: $("#bid__table").offset().top
        }, 1000);
	});





	$('.bid_clear').on('click', function() {
		location.reload();
	});

    $('.bid_begin').on('click', function() {
        $('html, body').animate({
            scrollTop: $("#bid__head").offset().top
        }, 700);
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
            event.preventDefault();
            var jsonArr = {};
            jsonArr = JSON.stringify(bidArray);
            console.log(jsonArr);
 				$.ajax({
				url: 'post.php',
				type: 'POST',
				data: jsonArr,
				dataType: "json",
				success: function(){
					alert('Успешная отправка');
					//$('#form_form').hide();
				}
			});
		}
	});

});
