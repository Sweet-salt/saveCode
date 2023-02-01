// 달력
const  uf_calendarInit = () => {

    // 날짜 정보 가져오기
    var date = new Date(); // 현재 날짜(로컬 기준) 가져오기
    var utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000); // uct 표준시 도출
    var kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
    var today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)
  
    var thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    // 달력에서 표기하는 날짜 객체
  
    var currentYear = thisMonth.getFullYear(); // 달력에서 표기하는 연
    var currentMonth = thisMonth.getMonth(); // 달력에서 표기하는 월
    var currentDate = thisMonth.getDate(); // 달력에서 표기하는 일

    // kst 기준 현재시간
    // console.log(thisMonth);

    // 캘린더 렌더링
    renderCalender(thisMonth);

    function renderCalender(thisMonth) {

        // 렌더링을 위한 데이터 정리
        currentYear = thisMonth.getFullYear();
        currentMonth = thisMonth.getMonth();
        currentDate = thisMonth.getDate();

        // 이전 달의 마지막 날 날짜와 요일 구하기
        var startDay = new Date(currentYear, currentMonth, 0);
        var prevDate = startDay.getDate();
        var prevDay = startDay.getDay();

        // 이번 달의 마지막날 날짜와 요일 구하기
        var endDay = new Date(currentYear, currentMonth + 1, 0);
        var nextDate = endDay.getDate();
        var nextDay = endDay.getDay();

        // 현재 월 표기
        $('.year-month').text(`${currentYear}년 ${(currentMonth + 1)}월`);

        // 렌더링 html 요소 생성
        calendar = document.querySelector('.dates')
        calendar.innerHTML = '';
        
        // 지난달
        for (var i = prevDate - prevDay + 1; i <= prevDate; i++) {
            calendar.innerHTML = calendar.innerHTML + '<div class="day prev disable">' + i + '</div>'
        }
        // 이번달
        for (var i = 1; i <= nextDate; i++) {
            calendar.innerHTML = calendar.innerHTML + '<div class="day current">' + i + '</div>'
        }
        // 다음달
        for (var i = 1; i <= (7 - nextDay == 7 ? 0 : 7 - nextDay); i++) {
            calendar.innerHTML = calendar.innerHTML + '<div class="day next disable">' + i + '</div>'
        }

        // 오늘 날짜 표기
        // if (today.getMonth() == currentMonth) {
        //     todayDate = today.getDate();
        //     var currentMonthDate = document.querySelectorAll('.dates .current');
        //     currentMonthDate[todayDate -1].classList.add('today');
        // }
    }

    // 이전달로 이동
    $('.go-prev').on('click', function() {
        thisMonth = new Date(currentYear, currentMonth - 1, 1);
        renderCalender(thisMonth);
    });

    // 다음달로 이동
    $('.go-next').on('click', function() {
        thisMonth = new Date(currentYear, currentMonth + 1, 1);
        renderCalender(thisMonth); 
    });

    // 년도 클릭해서 이전 연도 열기 닫기
    $(document).on("click", ".year-month", () => {
        let block = $("#selctMonth").css('display')
        if(block == 'block'){
            $("#selctMonth").css("display", "none");
        }else{
            $("#selctMonth").css("display", "block");
        }
    })

    // 달력 년도 제외하고 클릭시 닫히게 하기
    $(document).on("click", ".nav-btn, .cal_wrap", () => {
        $("#selctMonth").css("display", "none");
    })

    // ex) 2023년 3월 이면 2023년 2월 ~ 2022년 1월 까지 그림
    let month = today.getMonth() + 1;
    let year = Number(String(new Date()).split(' ')[3]);
    for(let i = 1; i < month+1; i++){
        let div = `<div class="option_detail" id='fristCal'><p class='year'>${year}년</p> <p class='month'>${i}월</p></div>`
        $("#selctMonth").prepend(div);
    }
    for(let i = 12; i > 0; i--){
        let div = `<div class="option_detail" id='firstCal'><p class='year'>${year - 1}년</p> <p class='month'>${i}월</p></div>`
        $("#selctMonth").append(div);
    }
    // 연도 목록 중 하나 클릭하면 그 시기 달력으로 이동함
    $(document).on("click", "#firstCal", ({target}) => {
        let findClass = $(target).attr('class');
        let year = '';
        let month = '';
        if(findClass == 'option_detail'){
            year = Number($(target).children("p:eq(0)").text().split('년')[0]);
            month = Number($(target).children("p:eq(1)").text().split('월')[0]) - 1;
            thisMonth = new Date(year, month);
        }else{
            year = Number($(target).parents('.option_detail').children("p:eq(0)").text().split('년')[0]);
            month = Number($(target).parents('.option_detail').children("p:eq(1)").text().split('월')[0]) - 1;
            thisMonth = new Date(year, month);
        }
        renderCalender(thisMonth);
        $("#selctMonth").css("display", "none");
    })
    // 현재 클릭된 달력 년월로 이동하게 하기
    $(document).on("click", "#demo", () => {
        let check = $("#demo").val().split('-');
        let year = Number(check[0])
        let month = Number(check[1]) - 1;
        thisMonth = new Date(year, month);
        renderCalender(thisMonth);
    })
}
