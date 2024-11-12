// 웹페이지 내에 있는 텍스트와 텍스트에 연결된 url을 전부 추출한다
//     1. a 태그 수집
//     2. a 태그 내에 있는 텍스트와 url 정보 정리

let a태그 = document.getElementsByTagName('a');
let 정보담을곳 = [];

// console.log(a태그); // 배열 비슷한 것을 반환함 

for(let i = 0; i < a태그.length; i++){
    정보담을곳.push({
        text: a태그[i].textContent.trim(),
        url: a태그[i].href
    });
};
console.log(정보담을곳);