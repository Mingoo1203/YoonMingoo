const prompt = require('prompt-sync')(); // 입출력을 위한 node.js의 prompt-sync 사용

let num = Number(prompt("숫자를 입력하세요. : ")); // number타입 변환 및 num에 저장

function main(num) { // main함수
    if(num % 2 == 0) { // 입력받은 점수가 2로 나눠지면 짝수 그 외는 홀수
        console.log("입력한 숫자: " + num + " [홀수가 아닙니다.]");
    } else {
        console.log("입력한 숫자: " + num + " [홀수]");
    }
}

main(num);