// 글자 byte 체크
function checkByte(obj, maxByte) {
  var str = obj.value;
  var strLen = str.length;
  var readByte = 0;
  var readLen = 0;
  var oneChar = "";
  var strSplit = "";

  for(var i = 0; i < strLen; i++) {
    // 유니코드 단일문자를 반환
    oneChar = str.charAt(i);

    // 인코딩된 문자열을 반환
    if (escape(oneChar).length > 4) {
      // 한글 2byte
      readByte += 2;
    } else {
      //영문 등 나머지 1byte
      readByte++;
    }

    if (readByte <= maxByte) {
      readLen = i + 1;
    }
  }

  if (readByte > maxByte)  {
    // 80byte 넘을경우 문자열 자르기
    strSplit = str.substr(0,readLen);
    obj.value = strSplit;

    checkByte(obj, maxByte);
  } else {
    // byte 증가 표시
    document.getElementById("byteCnt").innerText = readByte;
  }
}

// 한자리 숫자 0 붙이기
function numberPad(n, width) {
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

// 글자수 제한
function wordLimit(e) {
	var wordTarget = $(".event_wallstreet_textarea");
	var wordCount = $(".word_limit .word_limit_count");

	wordTarget.on("keyup", function() {
		var wordCountLength = $(this).val().length;
		wordCount.html(wordCountLength);

		if($(this).val().length >= 300) {
			$(this).val($(this).val().substring(0, 300));
			wordCount.html("300");
		}
	});
}
