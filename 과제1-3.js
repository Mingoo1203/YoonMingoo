const prompt = require('prompt-sync')(); // prompt-sync 모듈

let num1 = Number(prompt("숫자를 입력하세요 :")); // 숫자 1 입력
let num2 = Number(prompt("숫자를 입력하세요 :")); // 숫자 2 입력
let calc = prompt("연산을 선택하세요 + - : ");

function add (a, b) { // + 함수
    return a + b;
}

function minus (a, b) { // - 함수
    return a - b;
}

function calculate (a, b, func) { // 메인 계산 함수
return func(a, b); // func에 add, minus를 넣어 호출
}

// func의 함수를 이용자가 선택할 수 있게 진행

if(calc === "+"){ // +선택
console.log(calculate(num1,num2,add));
}
else if (calc === "-"){ // -선택
    console.log(calculate(num1,num2,minus));
}
else{ // 예외처리
    console.log("잘못된 연산자입니다.");
}
