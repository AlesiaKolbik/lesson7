
"use strict";

// находим корни квадратного уравнения
// возвращает массив корней
function squareRoots(a,b,c) {
    var d = b * b - 4 * a * c; // дискриминант

    if (d < 0) {
        return [];
    }// нет корней
    else if (d === 0) {
        return [-b / (2 * a)];// один корень
    }
    else if(a === 0){
        return [-c/b];
    }
    var x1 = ((-b) + Math.sqrt(d)) / (2 * a);
    var x2 = ((-b) - Math.sqrt(d)) / (2 * a);
    return [x1, x2]; // два корня
}

function squareRootsTests()
{
    console.log('тест 1,1,1 -> нет корней');
    var roots = squareRoots(1,1,1);
    console.log( (roots.length===0)?'пройден':'НЕ ПРОЙДЕН!' );

    console.log('тест 1,-2,-3 -> два корня 3,-1');
    var roots = squareRoots(1,-2,-3);
    console.log( ((roots.length===2)&&(roots[0]===3)&&(roots[1]===-1))?'пройден':'НЕ ПРОЙДЕН!' );

    console.log('тест -1,-2,15 -> два корня -5,3');
    var roots = squareRoots(-1,-2,15);
    console.log( ((roots.length===2)&&(roots[0]===-5)&&(roots[1]===3))?'пройден':'НЕ ПРОЙДЕН!');

    console.log('тест 1,12,36 -> один корень -6');
    var roots = squareRoots(1,12,36);
    console.log( ((roots.length===1)&&(roots[0]===-6))?'пройден':'НЕ ПРОЙДЕН!');

    console.log('тест 0, 5, -5 -> один корень 1');
    var roots = squareRoots(0, 5, -5);
    console.log( ((roots.length===1)&&(roots[0]===1))?'пройден':'НЕ ПРОЙДЕН!')
}

function ttt() {
    var a=Number(prompt('Введите a'));
    var b=Number(prompt('Введите b'));
    var c=Number(prompt('Введите c'));
    var roots=squareRoots(a,b,c);

    if ( !roots.length )
        alert('корней нет!');
    else if ( roots.length===1 )
        alert('один корень: '+roots[0]);
    else
        alert('два корня: '+roots[0]+' и '+roots[1]);
}
squareRootsTests();



if (arr[index].kind === 'check') {
    el.type = 'checkbox';
}
else if (teg2 === 'select') {
    for (var j = 0; j < arr[index].variants.length; j++) {
        var newOption = new Option(arr[index].variants[j].text, arr[index].variants[j].value);
        el.appendChild(newOption);
    }
}
else if (arr[index].kind === 'radio') {
    var span = document.createElement('span');
    span.textContent = arr[index].variants[0].text;
    form.appendChild(span);
    form.removeChild(el);
    span.appendChild(el);
    el.type = 'radio';
    el.value = arr[index].variants[0].value;
    for (var k = 1; k < arr[index].variants.length; k++) {
        var radio = span.cloneNode(true);
        form.appendChild(span);
        span.textContent = arr[index].variants[k].text;
        radio.value = arr[index].variants[k].value;
    }
}