//////////////////////////////////////////////////////////////////
///     Версия с плагином Alertify и контейнером с ошибкой
///     #preloader_formId - прелоадер
///     #formId_error - контейнер с ошибкой
///     Все поля должны начинаться с form: form-email, form-phone, form-fio
///     Обязательные поля лежат в контейнере .required
//////////////////////////////////////////////////////////////////

(function($) {
    jQuery.fn.validateForms = function(options) {
        options = $.extend({
            formId: null, //ID формы
            toUrl: null, //Url отправки
            preloader: true, //Прелоадер
            messageTime: 10000, //Время показа сообщения
            alertify: false, //Используется ли alertify.js
            inputContainer: true, //Либо alertify, либо контейнер
            g_recaptcha: false, //Использовать ли Google reCAPTCHA
            g_recaptcha_sitekey: false, //Sitekey для Google reCAPTCHA
            g_recaptcha_theme: "light", //Theme для Google reCAPTCHA
            g_recaptcha_size: "normal" //Size для Google reCAPTCHA
        }, options);

        var initForm = function() {
            var formId = options.formId;
            var form = $('#' + formId);
            //var form = $('#' + formId);
            if (options.preloader) {
                var preloader = $('#preloader_' + formId);
            }
            if (options.inputContainer) {
                var headerContainer = $('#' + formId + '_header');
                var errorContainer = $('#' + formId + '_error');
                var successContainer = $('#' + formId + '_success');
                var footerContainer = $('#' + formId + '_footer');
            }
            if (options.g_recaptcha) {
                var g_recaptcha = $('#' + formId + '_grecaptcha');
                var g_recaptcha_widgetId = null;

                $(window).load(function() {
                    if(!g_recaptcha_widgetId && g_recaptcha_widgetId !== 0) {
                        g_recaptcha.addClass("g-recaptcha");
                        g_recaptcha_widgetId = grecaptcha.render(g_recaptcha.attr("id"), {"sitekey": options.g_recaptcha_sitekey, "theme": options.g_recaptcha_theme, "size": options.g_recaptcha_size});
                    }
                });
            }


            form.submit(function (ev) {
                ev.preventDefault();

                thisForm = $(this);

                var thisSubmit = footerContainer.find("button[type='submit']");
                var thisDefault = footerContainer.find("button[type='button']");

                var req = thisForm.find(".required");
                var name = thisForm.find("[valid  = form-name]");
                var email = thisForm.find("[valid  = form-email]");
                var phone = thisForm.find('[valid  = form-phone]');
                var inn = thisForm.find('[valid  = form-inn]');
                var pass = thisForm.find('[valid = form-pass]');
                var repass = thisForm.find('[valid = form-repass]');
                var formValid = true;

                thisSubmit.prop("disabled", true);

                req.each(function(inx, el) {
                    thisObj = $(el).children("input, textarea");
                    var value = thisObj.val();

                    if(value.length == 0) {
                        formValid = false;

                        thisObj.parent().addClass('has-error');

                        thisObj.on("keyup", function() {
                            thisFocus = $(this);
                            thisFocus.parent().removeClass('has-error');
                        });
                    }
                });

                if(name.length > 0) {
                    var regName = /^\D*$/g;

                    if (name.val() != "") {
                        if(!regName.test(name.val())) {

                            formValid = false;

                            name.parent().addClass('has-error view-error');

                            name.on("keyup", function() {
                                name.parent().removeClass('has-error view-error');
                            });
                        }
                    }
                }

                if(email.length > 0) {
                    var regEmail = /.+@.+\..+/i;

                    if (email.val() != "") {
                        if(!regEmail.test(email.val())) {

                            formValid = false;

                            email.parent().addClass('has-error view-error');


                            email.on("keyup", function() {
                                email.parent().removeClass('has-error view-error');
                            });
                        }
                    }
                }

                if (phone.length > 0) {
                    var phoneValue = Inputmask.unmask(phone.val(), { alias: "+7 (999) 999-99-99"});

                    if(phoneValue.length < 10) {
                        formValid = false;

                        phone.parent().addClass('has-error view-error');

                        phone.on("keyup", function() {
                            phone.parent().removeClass('has-error view-error');
                        });
                    }
                }

                if (inn.length > 0) {
                    var innReg = /^\d*$/g;

                    if (inn.val() != "") {
                        if(!innReg.test(inn.val()) || !checkINN(inn.val())) {

                            formValid = false;

                            inn.parent().addClass('has-error view-error');

                            inn.on("keyup", function() {
                                inn.parent().removeClass('has-error view-error');
                            });
                        }
                    }
                }
                

                if (pass.length > 0) {
                    if (pass.val() != "" && pass.val().length < 6) {
                        formValid = false;

                        pass.parent().addClass('has-error');

                        pass.on("keyup", function () {
                            pass.parent().removeClass('has-error');
                        });

                        repass.parent().addClass('has-error');

                        repass.on("keyup", function () {
                            repass.parent().removeClass('has-error');
                        });
                    } else if (repass.val() != pass.val()) {
                        formValid = false;

                        repass.parent().addClass('has-error view-error');

                        repass.on("keyup", function () {
                            repass.parent().removeClass('has-error view-error');
                        });
                    }
                }

                //Валидация reCAPTCHA
                if(options.g_recaptcha && g_recaptcha.length > 0) {
                    recap_result = grecaptcha.getResponse(g_recaptcha_widgetId);
                    if(!recap_result) {
                        g_recaptcha.addClass('has-error');
                        g_recaptcha.stop().clearQueue();
                        g_recaptcha.delay(1000).queue(function(next) {
                            g_recaptcha.removeClass('has-error');
                            next();
                        });
                        formValid = false;
                    }
                }

                //Отправка данных
                if(!formValid) {
                    thisSubmit.prop("disabled", false);
                    return false;
                } else {
                    if (options.preloader) {
                        preloader.fadeIn();
                    }

                    //Сбор данных для запроса
                    var fields = {};
                    var allFields = thisForm.find('[valid ^= form-]');

                    allFields.each(function(inx, el) {
                        var thisField = $(el);
                        // Чтобы вытащить значение поля с телефоном. Иначе оно в формате +7 (456) 454-45-45
                        if (thisField.attr('valid') == "form-phone") {
                            fields[thisField.attr('valid').slice(5)] = "7" + Inputmask.unmask(thisField.val(), { alias: "+7 (999) 999-99-99"});
                        } else {
                            fields[thisField.attr('valid').slice(5)] = thisField.val();
                        }
                    });

                    //Отправка
                    $.ajax({
                        url: "registerRequest.do",
                        type: 'POST',
                        data: {ajax_data: fields},
                        dataType: "json",
                        success: function (request, textStatus) {
                            // console.log(request);
                            if ('status' in request) {
                                if($.trim(request.status) == "ok") {

                                    if (options.alertify) {
                                        alertify.success(request.success_text);
                                    }

                                    if (options.inputContainer) {
                                        successContainer.fadeIn(10);
                                        form.fadeOut(10);
                                        headerContainer.fadeOut(10);

                                        thisForm.delay(options.messageTime).queue(function(next){
                                            successContainer.fadeOut();
                                            form.fadeIn();
                                            headerContainer.fadeIn();
                                            thisSubmit.prop("disabled", false);
                                            thisDefault.click();
                                            next();
                                        });
                                    }

                                    //allFields.val("");

                                } else {
                                    if (request.status == "error") {
                                       //console.log(request);
                                       if (options.alertify) {
                                            if(request.err_msg_type == "log") {
                                                alertify.log(request.result);
                                            } else {
                                                alertify.error(request.result);
                                            }
                                        }

                                        if (options.inputContainer) {
                                            errorContainer.css('display', 'block');
                                            form.css('display', 'none');
                                            headerContainer.css('display', 'none');
                                            errorContainer.find('#bbe_form_registration_error').empty().append(request.result);
                                        }
                                    }
                                }

                                if (options.preloader) {
                                    preloader.fadeOut(700);
                                    thisSubmit.prop("disabled", false);
                                }
                            }
                        },
                         error: function (jqXHR, textStatus, errorThrown) {
                            if (options.alertify) {
                                alertify.error("Ошибка на сервере: " + textStatus + " - " + errorThrown);
                            }

                            if (options.inputContainer) {
                                thisSubmit.prop("disabled", true);
                                errorContainer.text("Ошибка на сервере: " + textStatus + " - " + errorThrown);
                                errorContainer.fadeIn(10);
                                form.fadeOut(10);
                                headerContainer.fadeOut(10);

                                thisForm.delay(options.messageTime).queue(function(next){
                                    errorContainer.fadeOut();
                                    form.fadeIn();
                                    headerContainer.fadeIn();
                                    thisSubmit.prop("disabled", false);
                                    next();
                                });
                            }

                            if (options.preloader) {
                                preloader.fadeOut();
                            }

                        }
                    });
                }
            });
        };

        var make = function() {
            if($(this).attr('id').length > 0) {
                options.formId = $(this).attr('id');
            } else {
                var formCount = $('[id^=bbe_form]').length;
                options.formId = 'bbe_form_' + (formCount + 1);
                $(this).attr('id', options.formId);
            }

            initForm();
        };

        // Проверка правильности указания ИНН:
        function checkINN(inputNumber){
            //преобразуем в строку
            inputNumber = "" + inputNumber;
            //преобразуем в массив
            inputNumber = inputNumber.split('');

            //Для 10-ти значного ИНН алгоритм проверки выглядит следующим образом:
            //1. Вычисляется контрольная сумма со следующими весовыми коэффициентами: (2,4,10,3,5,9,4,6,8,0)
            //2. Вычисляется контрольное число как остаток от деления контрольной суммы на 11
            //3. Если контрольное число больше 9, то контрольное число вычисляется как остаток от деления контрольного числа на 10
            //4. Контрольное число проверяется с десятым знаком ИНН. В случае их равенства ИНН считается правильным.
            if((inputNumber.length == 10) && (inputNumber[9] == ((2 * inputNumber[0] + 4 * inputNumber[1] + 10 * inputNumber[2] + 3 * inputNumber[3] + 5 * inputNumber[4] + 9 * inputNumber[5] + 4 * inputNumber[6] + 6 * inputNumber[7] + 8 * inputNumber[8]) % 11) % 10)){
                return true;

            } else
            //для ИНН в 12 знаков
            //1. Вычисляется контрольная сумма по 11-ти знакам со следующими весовыми коэффициентами: (7,2,4,10,3,5,9,4,6,8,0)
            //2. Вычисляется контрольное число(1) как остаток от деления контрольной суммы на 11
            //3. Если контрольное число(1) больше 9, то контрольное число(1) вычисляется как остаток от деления контрольного числа(1) на 10
            //4. Вычисляется контрольная сумма по 12-ти знакам со следующими весовыми коэффициентами: (3,7,2,4,10,3,5,9,4,6,8,0).
            //5. Вычисляется контрольное число(2) как остаток от деления контрольной суммы на 11
            //6. Если контрольное число(2) больше 9, то контрольное число(2) вычисляется как остаток от деления контрольного числа(2) на 10
            //7. Контрольное число(1) проверяется с одиннадцатым знаком ИНН и контрольное число(2) проверяется с двенадцатым знаком ИНН. В случае их равенства ИНН считается правильным.
            if((inputNumber.length == 12) && ((inputNumber[10] == ((7 * inputNumber[0] + 2 * inputNumber[1] + 4 * inputNumber[2] + 10 * inputNumber[3] + 3 * inputNumber[4] + 5 * inputNumber[5] + 9 * inputNumber[6] + 4 * inputNumber[7] + 6 * inputNumber[8] + 8 * inputNumber[9]) % 11) % 10)
                                           && (inputNumber[11] == ((3 * inputNumber[ 0] + 7 * inputNumber[1] + 2 * inputNumber[2] + 4 * inputNumber[3] + 10 * inputNumber[4] + 3 * inputNumber[5] + 5 * inputNumber[6] + 9 * inputNumber[7] + 4 * inputNumber[8] + 6 * inputNumber[9] + 8 * inputNumber[10]) % 11) % 10))){
                return true;
            }else{
                return false;
            }
        }
 
    return this.each(make); 
    };
})(jQuery);

