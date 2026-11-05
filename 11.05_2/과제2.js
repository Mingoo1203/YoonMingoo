const users = [ { id: 1, name: '홍길동', age: 25 },
     { id: 2, name: '김철수', age: 30 },
      { id: 3, name: '이영희', age: 22 },
       { id: 4, name: '박민수', age: 35 }, 
       { id: 5, name: '최지영', age: 28 }];

// 과제 2-1
const userNames = users.map(user => user.name); //배열에서 name만 추출하여 새로운 배열 생성
console.log(userNames); //배열의 모든 이름을 출력

// 과제 2-2
const userAges = users.filter((value)=> value.age >= 30); //배열에서 age가 30 이상인 객체만 추출하여 새로운 배열 생성
console.log(userAges); //배열의 모든 나이가 30 이상인 객체를 출력

// 과제 2-3
const foundid = users.find((value)=> value.id === 3); //배열에서 id가 3인 객체를 찾아서 새로운 배열 생성
console.log(foundid); //배열에서 id가 3인 객체를 찾아 출력

// 과제 2-4
const totalAge = users.reduce((acc, user) => acc + user.age, 0); //배열의 모든 나이를 합산하여 새로운 배열 생성
console.log(totalAge); //배열의 모든 나이의 합을 출력

// 과제 2-5
const Ages = users.every((value)=> value.age >= 20); //배열의 모든 나이가 20 이상인지 확인
console.log(Ages); //배열의 모든 나이가 20 이상이면 true, 아니면 false를 출력

// 과제 2-6
const AgeOver35 = users.some((value)=> value.age >= 35); //배열의 나이가 35 이상인 객체가 있는지 확인
console.log(AgeOver35); //배열의 나이가 35 이상인 객체가 있으면 true, 아니면 false를 출력
