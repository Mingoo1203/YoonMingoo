interface User {
  id: number;
  name: string;
  age: number;
  email: string;
  isActive: boolean;

}

const users: User[] = [
  {
    id: 1,
    name: '홍길동',
    age: 25,
    email: 'hong@test.com',
    isActive: true
  },

  {
    id: 2,
    name: '김철수',
    age: 30,
    email: 'kim@test.com',
    isActive: true
  },

  {
    id: 3,
    name: '이영희',
    age: 22,
    email: 'lee@test.com',
    isActive: false
  },

  {
    id: 4,
    name: '박민수',
    age: 35,
    email: 'park@test.com',
    isActive: true
  }
];
// 함수
function getUsers(users:User[]): User[]{
  return users.map(user=>({...user}));
}

function searchUsers(users:User[],name:string): User[] {
  return users.filter(user => user.name.includes(name));
}

function findUsers(user:User[],id:number ): User |undefined{
  return users.find(user => user.id === id)
}

function updateUsers(users: User[], id:number, newAge: number) : User[]{
  return users.map(user => {
    if (user.id === id){
      return {...user, age: newAge};
    }

    return user;
  });
}

import promptSync from "prompt-sync";
const prompt = promptSync();

console.log("회원 목록 1 / 회원 검색 2 / 회원 조회 3 / 회원 추가 4 / 회원 수정 5 / 회원 삭제 6 / 활성 회원 7 / 나이 계산 8 ");
let menu: string = prompt("메뉴를 선택해 주세요. : ");

// 동작
if (menu === "1"){ // 회원 목록
  console.log("[회원 목록] ",getUsers(users));
}

else if (menu === "2"){ // 회원 검색
  let choice: string = prompt("이름을 입력해 주세요 : ");
  console.log(searchUsers(users,choice));
}
else if (menu === "3") { // 회원 조회
  let choice2: number = Number(prompt("ID를 입력해 주세요 : "));
  console.log(findUsers(users,choice2));
}
else if (menu === "4") { // 회원 추가

}
else if (menu === "5") { // 회원 수정
let id: number = Number(prompt("수정할 회원 ID :"));
let age: number = Number(prompt("수정할 나이 :"));

let updateUsers: User[] = updateUser
}
else if (menu === "6") { // 회원 삭제

}
else if (menu === "7") { // 활성 회원

}
else if (menu === "8") { // 나이 계산

}
else {
  console.log("유효하지않은 값입니다.");
  
}