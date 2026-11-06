const num1 = [1,2,3];
const num2 = [4,5,6];

const user = 
{ id: 1, name: '홍길동',
 age: 25, 
 address: { city: '서울', district: '강남구' }};

// 과제 1 두 배열을 하나의 배열로 합친다.
const result1 = [...num1,...num2]; // spread 연산자 사용 두개의 배열의 인덱스를 서로 펼쳐서 입력한 순서대로 합침
console.log("[1번] " + result1);

// 과제 2 기존 객체에 새로운 속성을 추가한 객체를 생성한다.
const user2 = {
    ...user, height: 158 // spread 연산자로 기존 배열의 인덱스를 펼치고 뒤에 height를 추가한 새로운 user2를 생성
};
console.log ("[2번] " , user2); // +로 하면 객체가 문자열로 됨

// 과제 3 기존 배열을 변경하지 않고 새로운 배열을 생성한다.
const num3 = [...num1]; // spread 연산자로 num1의 값을 가진 새로운 num3 배열 생성
console.log ("[3번] ", num3);

// 과제 4 Rest Parameter를 이용해 전달받은 숫자들의 합계를 계산한다.
function total(...numbers) { //spread와 기호는 같으나 이용이 다름
    return numbers.reduce((acc, num) => acc + num, 0); // reduce로 배열의 합
}

console.log("[4번]", total(10, 20, 30)); // 10,20,30을 전달