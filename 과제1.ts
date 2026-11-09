// 1. string, number, boolean 타입 선언
let user: string = "홍길동"; // C언어처럼 타입을 정해줄 수 있음.
let age: number = 26;
let isStudy: boolean = true;

console.log("[1번] ",user,age,isStudy);

// 2.  배열 타입 선언
let numbers : number[] = [1,2,3,4]; // 기존 []선언과 같다.
let strings: string[] = ['a','b','c'];

console.log(["2번]",numbers,strings);

// 3. 객체 타입 선언
let user2: {name: string; age: number} = {name: "홍길동",age: 26}; // 객체 선언에서도 객체이름: 객체타입으로 선언가능
console.log("[3번] ",user2);

// 4. Union Type
function valueid (value: string | number){ // string이어도 number여도 사용이 가능하다.
console.log("[4번] ",`Id is ${value}`);
};

valueid("홍길동");
valueid(25);

// 5. any, unknown의 차이
let data1 : any = "A아무타입가능a";
console.log("[5번] ",data1.toUpperCase()); // toUpperCase()는 문자열을 대문자로 바꿔준다.

let data2 : unknown = "A아무타입가능하나 타입확인후 호출a";
if(typeof data2 === "string"){ // 조건으로 타입 확인
    console.log("[5번] ",data2.toUpperCase());
}

// 6. null과 undefined의 차이
let num1: string | null = null; // 문자열이거나 null이거나
let num2: string | undefined = undefined // 문자열이거나 undefined이거나
// null은 값이 없다 를 나타낼 수 있음
// undefined는 할당이 되지 않아 존재하지 않다는 뜻 직접 할당 가능

console.log("[6번] ",num1 ?? "Null값"); // ??연산자로 값이 없었을 때 지정가능
console.log("[6번] ",num2 ?? "Undefined값"); // 둘 다 지정은 가능함

export {};