const user = { id: 1, name: '홍길동', age: 25};

//과제 3-1
console.log(user.id); //객체의 id를 출력
console.log(user.name); //객체의 name을 출력
console.log(user.age); //객체의 age를 출력

//과제 3-2
user["email"] = "hong1234@gmail.com"; //객체에 email 추가
console.log(user); //객체의 모든 속성을 출력

// 과제 3-3
user.age = 26; //객체의 age 속성 값을 26으로 변경
console.log(user); //객체의 모든 속성을 출력

// 과제 3-4
delete user.id; //객체의 id 속성을 삭제
console.log(user); //객체의 모든 속성을 출력

// 과제 3-5
const jsonString = JSON.stringify(user); //객체를 JSON 문자열로 변환
console.log(jsonString); //JSON 문자열을 출력
// 직렬화

// 과제 3-6
const parsedString = JSON.parse(jsonString); //JSON 문자열을 객체로 변환
console.log(parsedString); //객체를 출력
