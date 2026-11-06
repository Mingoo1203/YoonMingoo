
// 과제
function getUser(success) {return new Promise((resolve, reject) => // 1.Promise를 return으로 반환
    {
        setTimeout(() => { //  비동기 작업
            if(success){ // 2.성공 시 resolve
                resolve({ id : 1, name: '홍길동'});
            }
            else { // 3.실패 시 reject
                reject("정보가 없습니다.");
            }
        }, 1000 // 1초 대기
        );
    });
}

// 4.then을 이용한 성공 처리
getUser(true) // 실패처리는 false
.then((user) => {
    console.log('인증 성공 : ' ,user);
})
.catch((error) => { // 5.catch를 이용한 오류 처리
    console.log('인증 실패 : ', error);
})
.finally(() => { // 6.finally를 이용한 종료 처리 성공실패 관계 x
    console.log('종료');
})
// Promise는 작업의 성공실패 유무를 알려준다.