"use strict";

document.onload = function () {

    let form = document.forms[0];


    form.addEventListener('focusout', function (e) {
        e = e.target;
        validForm(e);
    });

    function isFormValid(e) {
        form = e.target;
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

    form.addEventListener('submit', function (e) {
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
                e.value = validUrl(e, valueInput) || "";
            }
            else if (e.name === 'email') {   //проверяем email
                if (valueInput.indexOf('@') === -1) {
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
        let protocol = 'http';
        if (valueInput.indexOf('.') !== -1) {
            if (valueInput.indexOf(protocol) === -1) {
                return protocol + '://' + valueInput + '/';
            }
            else return valueInput;
        }
        else {
            e.parentNode.appendChild(createError('*Введите валидный адрес сайта'));
            e.parentNode.classList.add('error');
        }

    }

}