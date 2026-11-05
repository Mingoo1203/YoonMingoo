const prompt = require('prompt-sync')();

let name = prompt("이름을 입력하세요. : ");

function main(name= "익명") { // 기본매개변수 (미입력시 익명으로 출력)
    console.log("안녕하세요. " + name + "님");
}

main(name||undefined); // 입력받은 이름이 없으면 위에 설정한 익명으로 출력 파라미터가 있지 않다면 기본매개변수만 출력됨.
