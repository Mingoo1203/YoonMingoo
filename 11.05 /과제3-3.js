const prompt = require('prompt-sync')(); // 입출력을 위한 node.js의 prompt-sync 사용

let name = prompt("이름을 입력하세요. : "); // 이름을 받는 prompt를 name이라는 변수에 저장

function main(name) { // main함수
    console.log("안녕하세요. " + name + "님"); // 입력받은 이름을 출력
}

main(name);