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

function calculate (func) { // 메인 계산 함수
    if( func === "+"){ //   +
        return add;
    }
    else if ( func === "-"){ // -
        return minus;
    }
    
}

let func2 = calculate(calc); // func2는 calculate함수를 참고하며 입력받은 calc값을 전달함. ( + / - )

if (func2 === undefined) { // 예외처리
    console.log("잘못된 연산자입니다."); 
}
else {
    console.log(func2(num1,num2));// ex) + 로 전달했다면 add함수가 return 되어 func2는 곧 add함수를 나타내고 입력받은 num1,2 를 전달 후 로그
}
