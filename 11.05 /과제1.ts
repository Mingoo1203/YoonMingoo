// 과제 1

let name1 = "Yoon Mingoo"; // ""를 사용한 문자열 
let age1 = 26; // 정수
let job1 = "Frontend Developer"; // ""를 사용한 문자열

// let과 const는 변수를 선언하는 것은 같으나, let은 후에 변경이 가능한 변수, const는 후에 변경이 불가능한 상수이다.

let name2: string = "윤민구"; // string 타입으로 선언한 문자열
let age2: number = 26; // number 타입으로 선언한 정수
let lunch: boolean = true; // 참 거짓의 bool타입

// 자료형을 따로 선언을 할 수 있는 TypeScript, JavaScript는 따로 선언하지 않아도 된다.

console.log("이름의 변수 :" + typeof name1); // console.log()를 사용하여 출력, typeof로 자료형을 확인한다.
console.log("나이의 변수 :" + typeof age1);
console.log("직업의 변수 :" + typeof job1);
console.log("점심 여부 :" + typeof lunch);

// null은 값이 없음을 나타내는 자료형, undefined는 값이 할당이 되지 않은 자료형입니다.