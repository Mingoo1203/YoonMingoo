// 과제 1 문자열의 길이 확인
const str = "PPP";
console.log(str.length);// length는 문자열의 길이를 확인함

// 과제 2 특정 문자열 포함 여부 확인
const str2 = "Food"
console.log(str2.includes("Food")); // true
console.log(str2.includes("Drink")); // false
// includes는 특정 값이 있는지 확인함

// 과제 3 문자열 앞뒤 공백 제거
const str3 = " Mou se ";
console.log(str3.trim()); // trim은 공백을 지워주지만 양끝만 제거해줌

// 과제 4 문자열 일부 추출
const str4 = "DamoaSolution";
console.log(str4.slice(0, 5)); // (처음인덱스,종료인덱스) slice는 추출해주고 잘라주는 역할

// 과제 5 문자열을 특정 구분자로 분리
const str5 = "Arm/Leg/Head";
const spl = str5.split("/"); // /를 구분자로 설정하여 문자열을 나눠줌
console.log(spl);

// 과제 6 Template Literal을 이용해 문자열 생성
const name = "Clip"
const day = "11.06";

const result = `닉네임 : ${name} 가입일 : ${day} `; // `과 ' 구별 주의 '나 "는 문자열
console.log(result);

// 과제 7  왜 문자열끼리 비교했는데도 시간 비교처럼 결과가 나오는지 설명한다.
console.log('19:30' < '19:35');
console.log('19:40' < '19:35');
// 프로그램이 문자열하나씩 비교하기 때문임
// 숫자의 위치에서 하나씩 비교를 하여 19:40의 4는 19:35의 3 보다 크기 때문이다.
