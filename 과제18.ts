interface User { id: number; name: string; age: number; email?: string;}

// 2. User타입의 객체 생성
let user1: User = {
    id: 123,
    name: "강아지",
    age: 3
};
console.log("[2번] ",user1);

// 3. User타입의 배열 생성
let users:User[] = [
    {id:234, name:"고양이", age:5},
    {id:345, name:"돼지", age:2}
];
console.log("[3번] ",users);

// 4. 선택적 속성 추가
let user3: User = { // email을 인터페이스 추가 후 사용
    id: 1234,
    name: "소",
    age: 5,
    email : "1234@5432"
};
console.log("[4번] ",user3);

// 5. 인터페이스를 이용한 함수 매개변수 타입 지정
function print(user:User){ // 함수로 매개변수 사용
    console.log("[5번] ",user.name);
}
print(user3);

// 6. 함수 반환 
function newUser() : User{
    return { // return으로 반환
        id: 5678,
        name: "닭",
        age : 2
    };
}
console.log("[6번] ", newUser());


export {};