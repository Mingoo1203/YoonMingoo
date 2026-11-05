const user1 = { name: '홍길동', age: 25};
const user2 = user1;
user2.age = 30;
console.log(user1.age);
console.log(user2.age);

// 과제 4-1
// 두 객체의 age 속성 값이 모두 30으로 출력된다 이유는 user2는 user1를 참조하고 있는데 
// user2.age를 30으로 변경하면 user1.age도 30으로 변경된다

// 과제 4-2
const copy = {...user2}; //객체를 복사하여 새로운 객체 생성
copy.name = '윤민구'; // 복사 개체 name 변경
console.log(user2.name); //user2.name은 '홍길동'으로 출력
console.log(copy.name); //copy.name은 '윤민구'으로 출력

// 과제 4-3
const user3 = ['홍길동', 25];
const copy2 = [...user3]; // 배열을 복사하여 새로운 배열 생성
copy2[0] = '윤민구';
console.log(user3[0]); //user3[0]은 '홍길동'으로 출력
console.log(copy2[0]); //copy2[0]은 '윤민구'으로 출력

// 과제 4-4
// 얕은복사 Shallow copy
// 원본을 복사하면 원본의 참조값도 복사해서 원본과 복사본이 같은 객체를 참조하게 됨

// 깊은 복사 Deep copy
// 아예 새로운 객체로 만들어져 원본과 복사본이 다른 객체를 참조하게되어 독립적인 객체가 됨
