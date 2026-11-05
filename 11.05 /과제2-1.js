// 과제 2-1

const prompt = require('prompt-sync')(); // 입출력을 위한 node.js의 prompt-sync 사용

let score = prompt("점수를 입력하세요. : "); // 입력받는 prompt를 score라는 변수에 저장
let Nscore = Number(score); // 문자열을 숫자로 변환
if(Nscore %2 == 0) { // 입력받은 점수가 2로 나눠지면 짝수 그 외는 홀수
    console.log("입력한 점수: " + Nscore + " [짝수]");
} else {
    console.log("입력한 점수: " + Nscore + " [홀수]");
}
