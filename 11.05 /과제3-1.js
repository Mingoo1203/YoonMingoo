
const prompt = require('prompt-sync')(); // 입출력을 위한 node.js의 prompt-sync 사용

let num1 = Number(prompt("첫 번째 숫자를 입력하세요. : ")); // number타입 변환 및 num1에 저장
let num2 = Number(prompt("두 번째 숫자를 입력하세요. : ")); // number타입 변환 및 num2에 저장

function Plus (num1, num2) { // + 함수
    return num1 + num2;
}

console.log("두 수의 합 : " + Plus(num1, num2)); // 두 수의 합 출력