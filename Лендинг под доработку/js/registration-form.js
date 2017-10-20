jQuery(document).ready(function ($) {
    $('#registration_form_phone').inputmask("+7 (999) 999-99-99");
    $('#excel_phone').inputmask("+7 (999) 999-99-99");
    $('#bid_phone').inputmask("+7 (999) 999-99-99");

    $('#bbe_form_registration').validateForms({
        preloader: false,
        inputContainer: true,
        g_recaptcha: true,
        g_recaptcha_sitekey: "6LexxAcUAAAAAAU3M_QbpWOScd17Z_z0PXhMPe3U"
    });

    $('#select_registration_partner').click(function() {
        $("#registration_form_corp_type").val(1);
        document.getElementById('myModalLabel').innerHTML = "Регистрация в системе Владельца РК";
        $('#registration_select_modal').modal('hide');
        $('#registration_modal').modal('show');
    });

    $('#select_registration_client').click(function() {
        $("#registration_form_corp_type").val(2);
        document.getElementById('myModalLabel').innerHTML = "Регистрация в системе Рекламодателя";
        $('#registration_select_modal').modal('hide');
        $('#registration_modal').modal('show');
    });

    $('button[type="submit"]').on('click',function(){$("#bbe_form_registration").submit()});
});

jQuery(document).ready(function ($) {




});