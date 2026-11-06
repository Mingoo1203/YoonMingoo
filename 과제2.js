const products = 
[{ id: 1, name: '노트북', price: 1500000, stock: 3 },
 { id: 2, name: '마우스', price: 30000, stock: 10 },
 { id: 3, name: '키보드', price: 80000, stock: 5 },
 { id: 4, name: '모니터', price: 350000, stock: 2 },
 { id: 5, name: '이어폰', price: 120000, stock: 0 }];

 // 과제 1 모든 상품의 이름만 추출한다.

 let names = products.map(products => products.name); // map으로 배열의 모든 인덱스름 참고 후 name만 따로 호출
 console.log("[1번] " + names);

 // 과제 2 가격이 100,000원 이상인 상품을 검색한다.

 let pay = products.filter(products => products.price >= 100000); // 10만이상 모두
 console.log("[2번] ", pay);

 // 과제 3 재고가 0개인 상품을 검색한다.
 let stocks = products.find(products => products.stock <= 0); // 0이랑 같거나 작은 조건에 부합한 딱 하나
 console.log("[3번] ", stocks);

// 과제 4 전체 상품의 가격 합계를 계산한다.
let total = products.reduce((acc,products) => acc + products.price, 0); // acc 누적 합계 , products 배열 객체 , 연산후 초기값을 0으로 설정
console.log("[4번] ",total);

// 과제 5 상품별 재고 금액(price × stock)을 계산한다.
let stockPr = products.map(products =>({name: products.name, total: products.price * products.stock})); // map을 이용한 모든 인덱스에 계산식을 더하고 이름을 추가하기 위해 하나의 객체로 묶어서 사용
console.log("[5번] ",stockPr);

// 과제 6 전체 재고 금액을 계산한다.
let totalPr = products.reduce((acc,products) => acc + products.price * products.stock,0); // 전체 인덱스 계산식인 reduce를 사용, 과제 5에서 사용한 재고 금액 계산식을 넣는다.
console.log("[6번] ",totalPr);