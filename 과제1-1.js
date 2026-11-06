const prompt = require('prompt-sync')(); // prompt-sync 모듈

let num1 = Number(prompt("숫자를 입력하세요 :")); // 숫자 1 입력
let num2 = Number(prompt("숫자를 입력하세요 :")); // 숫자 2 입력

function add(a, b) { // 연산 함수
    let result = a + b;
    console.log("[1번] 두 수의 합은 : " + result);
}

add(num1, num2); // a,b 파라미터에 num1,num2를 넣어 호출