// 과제 3 작성한 함수를 async / await 방식으로 변경한다.


function getUser(success) {return new Promise((resolve, reject) => 
    {
        setTimeout(() => { 
            if(success){ // 2.성공 시 resolve
                resolve({ id : 1, name: '홍길동'});
            }
            else { 
                reject("정보가 없습니다.");
            }
        }, 1000 
        );
    });
}

// 1. async함수 작성
async function main() {
    try { 
        const user = await getUser(true); // 2. await으로 비동기 작업 결과 대기 및 유저 정보 확인
        console.log('인증 성공 : ',user);
    }
    catch (error) {
        console.log('인증 실패 : ',error);
    } // 3. try / catch를 이용한 오류 처리
    finally {
        console.log('종료');
    }
}

main();