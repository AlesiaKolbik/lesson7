"use strict";


    const regExpURL = /^https*\:\/\/\w+\.\w+|\-\.\w+$/;
    const regExpEmail = /^.+@.+\..+/;
    let ip;

    document.addEventListener('focusout', function (e) {
        e = e.target;
        validForm(e);
    });

    function isFormValid(e) {
        let form = e.target;
        let result = true;
        let childNodes = form.childNodes;
        for (let i = 0; i < childNodes.length; i++) {
            for (let j = 0; j < childNodes[i].childNodes.length; j++) {
                if (childNodes[i].childNodes[j].nodeName !== 'LABEL' && childNodes[i].childNodes[j].nodeName !== 'SPAN' && childNodes[i].childNodes[j].nodeName !== 'STRONG') {
                    validForm(childNodes[i].childNodes[j]);
                    if (childNodes[i].childNodes[j].name === 'payment') {
                        j = childNodes[i].childNodes.length
                    }
                }
                if (childNodes[i].className === 'error') {
                    result = false;
                }
            }
        }
        return result;
    }

    document.addEventListener('submit', function (e) {
        let form = e.target;
        if (!isFormValid(e)) {
            e.preventDefault();
            form.getElementsByClassName('error')[0].childNodes[1].focus();
        }
    });


    function validForm(e) {
        let valueInput = e.value;

        if (!valueInput) {   //если нет введенных данных в input
            if (e.parentNode.className !== 'error') {
                let error = createError();
                e.parentNode.appendChild(error);
                e.parentNode.classList.add('error'); //если нет текста ошибки - добавить, что поле должно быть заполнено
            }
        }
        else {                                   //если input заполнили, проверяем значение
            if (e.nextSibling && e.nextSibling.nodeName === 'STRONG') { //удаляем надпись ошибки
                e.parentNode.removeChild(e.nextSibling);
                e.parentNode.classList.remove('error');
            }
            if (e.name === 'siteurl') {    //проверяем ссылку
                if(!validUrl(e, valueInput)){
                    e.parentNode.appendChild(createError('*Введите валидный адрес сайта'));
                    e.parentNode.classList.add('error');
                }
                setTimeout(function () {   //проверяем проходит ли адрес и домен, если нет - выводим ошибку ,далее проверяем результат  запроса на сервер, и если вернулась пустая строка выводим ошибку
                    if(!ip){
                        e.parentNode.appendChild(createError('*Введите валидный адрес сайта'));
                        e.parentNode.classList.add('error');
                    }
                    else{
                        console.log(ip);
                    }
                },2000);
            }
            else if (e.name === 'email') {   //проверяем email
                if (!regExpEmail.test(valueInput)) {
                    e.parentNode.appendChild(createError('*Введите валидный адрес email'));
                    e.parentNode.classList.add('error');
                }
            }
            else if (e.name === 'visitors' && parseInt(valueInput) < 0) {  //проверяем ввод числа
                let error = createError('*Число не может быть отрицательным');
                e.parentNode.appendChild(error);
                e.parentNode.classList.add('error');
            }
            else if (e.name === 'payment') {
                validRadioGroup(e);
            }
        }
    }

    function validRadioGroup(e) {
        let radioGroup = document.getElementsByName('payment');
        let count = 0;
        for (let i = 0; i < radioGroup.length; i++) {
            if (radioGroup[i].checked !== true) {
                count++;
            }
        }
        if (count === radioGroup.length && e.parentNode.className !== 'error') {
            e.parentNode.appendChild(createError('*Сделайте выбор'));
            e.parentNode.classList.add('error');
        }
        else if (count !== radioGroup.length && e.parentNode.className === 'error') {
            e.parentNode.removeChild(e.parentNode.lastChild);
            e.parentNode.classList.remove('error');
        }
    }

    function createError(text) {    //возвращает текст ошибки
        let error = document.createElement('strong');
        error.textContent = text || '*Поле необходимо заполнить';
        error.style.color = 'red';
        return error;
    }

    function validUrl(e, valueInput) {
        if (regExpURL.test(valueInput) && validUrlAjax(valueInput)) {
            return true;
        }
        return false;
    }

function validUrlAjax(valueInput) {
    const regExpDomain = /\w+\.\w+\-*\w*\.(ru|by|com|net|org)/;
    const ajaxHandlerScript = "http://fe.it-academy.by/TestAjax3.php";
    let domainMatch = valueInput.match(regExpDomain);
    let domain;

    if(domainMatch) {
        domain = domainMatch[0];
        $.ajax(ajaxHandlerScript,
            {type: 'GET', dataType: 'text', data: {func: 'GET_DOMAIN_IP', domain: domain},
                success:function(data) { ip = data;}, error:errorHandler}
        );

        return true;
    }
    else return false;
}
function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr+' '+errorStr);
}

