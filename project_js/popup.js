// 링크를 추출하는 함수
function extractLinks() {
    const a태그 = document.getElementsByTagName("a");
    const 정보담을곳 = [];
    
    for(let i = 0; i < a태그.length; i++) {
        정보담을곳.push({
            text: a태그[i].textContent.trim(),
            url: a태그[i].href
        });
    }
    
    return 정보담을곳;
}

// 결과를 팝업에 표시하는 함수
function displayResults(results) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    
    if (!results || results.length === 0) {
        resultDiv.innerHTML = '<div>링크를 찾을 수 없습니다.</div>';
        return;
    }
    
    for(let i = 0; i < results.length; i++) {
        const link = results[i];
        const linkDiv = document.createElement('div');
        linkDiv.className = 'link-item';
        linkDiv.innerHTML = 
            '<div>텍스트: ' + link.text + '</div>' +
            '<div>URL: <a href="' + link.url + '" target="_blank">' + link.url + '</a></div>';
        resultDiv.appendChild(linkDiv);
    }
}

// 버튼 클릭 이벤트 처리
document.getElementById('extractBtn').addEventListener('click', function() {
    // 현재 활성화된 탭에서 스크립트 실행
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (!tabs || !tabs[0]) {
            document.getElementById('result').innerHTML = 
                '<div style="color: red;">현재 탭을 찾을 수 없습니다.</div>';
            return;
        }

        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: extractLinks
        }, function(results) {
            if (chrome.runtime.lastError) {
                document.getElementById('result').innerHTML = 
                    '<div style="color: red;">오류가 발생했습니다: ' + 
                    chrome.runtime.lastError.message + '</div>';
                return;
            }

            if (results && results[0] && results[0].result) {
                displayResults(results[0].result);
            } else {
                document.getElementById('result').innerHTML = 
                    '<div style="color: red;">링크를 추출할 수 없습니다.</div>';
            }
        });
    });
});

// 페이지 로드 시 콘솔에 메시지 출력 (디버깅용)
console.log('팝업 스크립트가 로드되었습니다.');