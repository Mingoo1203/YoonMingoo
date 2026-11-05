// 과제 1

const numbers = [10, 20, 30, 40, 50];

console.log(numbers); //배열의 모든 숫자를 출력 

// 과제 1-2

console.log(numbers[0] , numbers[numbers.length - 1]); //배열의 첫 번째 숫자와 마지막 숫자를 출력
//length는 배열의 길이, -1은 마지막 값을 의미함

// 과제 1-3
numbers.push(60); //배열의 마지막에 60을 추가
console.log(numbers); //배열의 모든 숫자를 출력 

// 과제 1-4
numbers.splice(2, 1); //배열의 (삭제할 위치, 삭제할 개수))
console.log(numbers); //배열의 모든 숫자를 출력

// 과제 1-5

let sum = 0; //합계를 저장할 변수

for (let i = 0; i < numbers.length; i++) { // 배열의 길이만큼 반복
    sum += numbers[i]; // 배열의 모든 숫자를 합산
}

console.log(sum); //배열의 모든 숫자의 합을 출력

// 과제 1-6
const multiply = numbers.map(num => num * 2); //배열의 모든 숫자에 2를 곱함
console.log(multiply); //배열의 모든 숫자에 2를 곱한 결과를 출력
//map은 배열의 모든 요소를 순회하며 새로운 배열을 만듬

