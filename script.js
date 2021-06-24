// 글자 byte 체크
function checkByte(obj, maxByte) {
    var str = obj.value;
    var strLen = str.length;
    var readByte = 0;
    var maxByte = 80;
    var readLen = 0;
    var oneChar = "";
    var strSplit = "";

    for (var i = 0; i < strLen; i++) {
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

    if (readByte > maxByte) {
        // 80byte 넘을경우 문자열 자르기
        strSplit = str.substr(0, readLen);
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

        if ($(this).val().length >= 300) {
            $(this).val($(this).val().substring(0, 300));
            wordCount.html("300");
        }
    });
}


// accordion
function listAccordion() {
    var accordionItem = $(".js-accordion-item");
    var accordionBtn = $(".js-btn-accordion");
    var accordionBox = $(".js-accordion-box");

    // 처음 리스트 열기
    if (accordionItem.hasClass("on")) {
        accordionItem.parent().find(".on").removeClass("on").addClass("active").find(accordionBox).slideDown("fast");
    }

    accordionBtn.on("click", function() {
        $(this).closest(accordionItem).siblings().removeClass("active").find(accordionBox).slideUp("fast");

        $(this).closest(accordionItem).addClass("active").find(accordionBox).slideDown("fast");
    });
}

// scroll fadeup ani
function fadeUpani() {
  var workItem = $(".js-workItemsItem");

  function checkIfInView() {
    var scrollTop = $(window).scrollTop();
    var windowHeight = $(window).height();
    var windowBottomPosition = (scrollTop + windowHeight);

    $.each(workItem, function() {
      var _this = $(this);
      var elementHeight = _this.outerHeight();
      var elementTopPosition = _this.offset().top;
      var elementBottomPosition = (elementTopPosition + elementHeight);

      if ((elementBottomPosition >= scrollTop) &&
        (elementTopPosition <= windowBottomPosition)) {
        _this.addClass("fade-up");
      } else {
        _this.removeClass("fade-up");
      }
    });
  }

  $(window).on("scroll resize", checkIfInView);
  $(window).trigger("scroll");
}
