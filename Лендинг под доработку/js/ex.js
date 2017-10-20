$('#company_name, #excel_name, #excel_phone, #excel_email, #excel_file, #excel_comment').unbind().blur( function(){
	var id = $(this).attr('id');
	var val = $(this).val();

	switch(id){
		case 'company_name':
			var rv_firm = /^[a-zA-Z�-��-�]+$/;

			if(val.length > 2 && val.length < 101 && val != '')){
				$(this).removeClass('error').addClass('not_error');
				$(this).next('.error-box').text('�������')
					.css('color','green')
					.animate({'paddingLeft':'10px'},400)
					.animate({'paddingLeft':'5px'},400);
			} else {
				$(this).removeClass('not_error').addClass('error');
				$(this).next('.error-box').html('���� "�������� ��������" ����������� ��� ����������,<br> ����� ����� ������ ���������� �� ����� 2 � �� ����� 100 ��������,<br> ���� ������ ��������� ������ ������� ��� ��������� �����')
					.css('color','red')
					.animate({'paddingLeft':'10px'},400)
					.animate({'paddingLeft':'5px'},400);
			} break;

		case 'excel_name':
			var rv_name = /^[a-zA-Z�-��-�]+$/;

			if(val.length > 2 && val != '' && rv_name.test(val)){
				$(this).removeClass('error').addClass('not_error');
				$(this).next('.error-box').text('�������')
					.css('color','green')
					.animate({'paddingLeft':'10px'},400)
					.animate({'paddingLeft':'5px'},400);
			} else {
				$(this).removeClass('not_error').addClass('error');
				$(this).next('.error-box').html('���� "��� ����������� ����" ����������� ��� ����������,<br> ���� ������ ��������� ������ ������� ��� ��������� �����.')
					.css('color','red')
					.animate({'paddingLeft':'10px'},400)
					.animate({'paddingLeft':'5px'},400);
			} break;

		case 'excel_phone':
			var rv_phone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
			if(val != '' && rv_phone.test(val)) {
				$(this).removeClass('error').addClass('not_error');
				$(this).next('.error-box').text('�������')
					.css('color','green')
					.animate({'paddingLeft':'10px'},400)
					.animate({'paddingLeft':'5px'},400);
			} else {
				$(this).removeClass('not_error').addClass('error');
				$(this).next('.error-box').html('���� "�������" ����������� ��� ����������,<br> ���� ������ ��������� ����� ��������<br> � ������� +7-***-***-**-**').css('color', 'red').animate({'paddingLeft': '10px'},400).animate({'paddingLeft': '5px'},400);
			}
			break;

		case 'excel_email':
			var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
			if(val != '' && rv_email.test(val)) {
				$(this).removeClass('error').addClass('not_error');
				$(this).next('.error-box').text('�������')
					.css('color','green')
					.animate({'paddingLeft':'10px'},400)
					.animate({'paddingLeft':'5px'},400);
			} else {
				$(this).removeClass('not_error').addClass('error');
				$(this).next('.error-box').html('���� "Email" ����������� ��� ����������,<br> ���� ������ ��������� ���������� email-�����').css('color','red').animate({'paddingLeft':'10px'},400).animate({'paddingLeft':'5px'},400);
			}
			break;

		case 'excel_file':
			var rv_file = /\.(xlsx|xls)$/i;
			if(val != '' && rv_file.test(val)) {
				$(this).removeClass('error').addClass('not_error');
				$(this).next('.error-box').text('�������')
					.css('color','green')
					.animate({'paddingLeft':'10px'},400)
					.animate({'paddingLeft':'5px'},400);
			} else {
				$(this).removeClass('not_error').addClass('error');
				$(this).next('.error-box').html('���� ������ ���� � ������� xlsx ��� xls').css('color','red').animate({'paddingLeft':'10px'},400).animate({'paddingLeft':'5px'},400);
			}
			break;

		case 'excel_comment':
			if(val != '' && val.length < 1001)
			{
				$(this).removeClass('error').addClass('not_error');
				$(this).next('.error-box').text('�������')
					.css('color','green')
					.animate({'paddingLeft':'10px'},400)
					.animate({'paddingLeft':'5px'},400);
			}
			else
			{
				$(this).removeClass('not_error').addClass('error');
				$(this).next('.error-box').html('���� "�����������" ����������� ��� ����������, ���� ������ ��������� �� ����� 1000 ��������.')
					.css('color','red')
					.animate({'paddingLeft':'10px'},400)
					.animate({'paddingLeft':'5px'},400);
			}
			break;
	} //end switch
}); //end blur



// ������ �������� ���� ������ � ������� AJAX
$('#excel_form').submit(function(ev){
	ev.preventDefault();

	var test = $('.not_error').length;
	if(test === 6){
		$.ajax({
			url: 'registerRequest.do',
			type: 'POST',
			data: $(this).serialize(),
			dataType: "json",

			beforeSend: function(xhr, textStatus){
				$('form#excel_form :input').attr('disabled','disabled');
			},

			success: function(response){
				$('#excel_form:input').removeAttr('disabled');
				$('#excel_form:text, textarea').val('').removeClass().next('.error-box').text('');
				$('#contact-form')[0].reset();
				alert(response);
			}

		});
	} else if(test !== 6){
		alert('��������� ���������� ��� ������������ ���� �����!')
		return false;
	}
})