function sum (...num){ // ...은 Spread연산자로 배열로 만들어줌.
    console.log(num);
}

console.log("[2번]");
sum(1,2,3,4,5) // 넣는 숫자 만큼 배열로 만들기 때문에 개수가 정해지 않고 사용 가능하다.