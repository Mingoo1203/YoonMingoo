// 1. 1초 후 사용자 정보를 반환하는 Promise
function getUser(success) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (success) {
                resolve({ id: 1, name: '홍길동' });
            } else {
                reject('사용자 정보가 없습니다.');
            }
        }, 1000);
    });
}

// 2. 2초 후 사용자 정보를 반환하는 Promise
function getUser2(success) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (success) {
                resolve({ id: 2, name: '김철수' });
            } else {
                reject('사용자 정보가 없습니다.');
            }
        }, 2000);
    });
}

// 3. Promise.all로 동시 실행
async function main() {
    try {
        const [user1, user2] = await Promise.all([
            getUser(true),
            getUser2(true)
        ]);

    const result = { // 4. 두 값을 합침
        user1: user1,
        user2: user2
    };
    console.log('인증 성공 : ' , result); // 로그로 불러오기
    }

    catch (error){
        console.log('인증 실패 : ', error);
    }
    finally {
        console.log('종료');
    }
}

main();