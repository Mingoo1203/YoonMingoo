// 4. 인터페이스를 구현하는 Class
interface User{
    id: number;
    name: string;
    age: number;
}

// 1. 클래스 작성
class User implements User{ // 인터페이스 User를 구현하여 사용가능한 클래스 implements사용한다
    //변수 선언
    public id:number;
    public name:string;
    public age: number;

// 2. 생성자 작성
    constructor(id: number, name: string, age: number){ // 생성자로 초기화
        this.id = id;
        this.name = name;
        this.age = age;
    }

}
// 5. 클래스를 이용해 사용자 객체를 생성한다.
let user10 = new User(111,"물고기",3); // 생성자를 이용하여 생성
console.log("[1번] ",user10);

// 3. public, private 차이
// public은 클래스 내,외부 둘 다 사용가능하나 private은 내부에서만 접근 가능함
// age에 private을 넣는다면 클래스 바깥으로 나와버린 console.log는 접근하지 못해서 사용x
// 바깥에서 사용하려면 복잡하지만 return해주는 함수를 만든 뒤 그 것을 불러와야함. (this.age)

export {};