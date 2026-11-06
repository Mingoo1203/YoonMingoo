const user = 
{ id: 1, name: '홍길동',
 age: 25, 
 address: { city: '서울', district: '강남구' }};

 // 과제 1 name과 age를 각각 변수로 추출한다.

 const {name, age} = user; // user에서 name,age를 추출 후 변수화
console.log("[1번] "+name);
console.log(age);

 // 과제 2 변수명을 변경해서 추출한다.
const {name: name2,age: age2} = user; // :를 사용하여 추출 후 변수명을 변경한다.

console.log("[2번] "+ name2);
console.log(age2);

// 과제 3 address 내부의 city를 추출한다.
const {city} = user.address; // 기존에는 user전부를 참고 했지만 city의 내부 객체를 보려면 address를 달아야함
console.log("[3번] "+ city);

// 과제 4 존재하지 않는 속성에 기본값을 설정한다.
const { height = "키 없음"} = user; // 내부에 없는 속성에 작성되면 undefined가 출력되는데 그거에 대한 예외처리
console.log("[4번] "+height);

// 과제 5 배열의 첫 번째와 두 번째 값을 각각 추출한다.
const num = [1,2,3,4]; // 위는 배열이 아니기에 배열 생성
const [fir,sec] = num; // 첫번째 두번째의 변수 이름
console.log("[5번]", fir, sec); 

