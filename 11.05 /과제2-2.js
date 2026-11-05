// 과제 2-2

const readline = require('readline').createInterface({ // 입출력을 위한 node.js의 readline 모듈을 사용
    input: process.stdin,
    output: process.stdout
});

readline.question("점수를 입력하세요. : ", (score) => { // 점수를 수집하는 입력창을 띄움
    const Nscore = Number(score); // string타입을 number타입으로 변환


    
    if(Nscore >= 90) { // 점수가 90점 이상이면
        console.log("점수 : " + Nscore + " [A]"); // A학점 출력
    } 
    else if(Nscore >= 80) { // 점수가 80점 이상이면
        console.log("점수 : " + Nscore + " [B]"); // B학점 출력
    }
    else if(Nscore >= 70) { // 점수가 70점 이상이면
        console.log("점수 : " + Nscore + " [C]"); // C학점 출력
    }
    else if(Nscore >= 60) { // 점수가 60점 이상이면
        console.log("점수 : " + Nscore + " [D]"); // D학점 출력
    }
     else if(Nscore < 60) { // 점수가 60점 미만이면
        console.log("점수 : " + Nscore + " [F]"); // F학점 출력
    }

    readline.close(); // 입력창 종료
});