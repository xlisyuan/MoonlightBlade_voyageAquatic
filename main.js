var aquaList = {
    '海蜇-泉州港': { name: '海蜇-泉州港', startTime: 2, endTime: 12, completed: false, id: 0 },
    '小鱗針-滄浪島': { name: '小鱗針-滄浪島', startTime: 6, endTime: 12, completed: false, id: 1 },
    '大黃魚-望海岬': { name: '大黃魚-望海岬', startTime: 7, endTime: 13, completed: false, id: 2 },
    '山口海鰻-幽靈島': { name: '山口海鰻-幽靈島', startTime: 8, endTime: 12, completed: false, id: 3 },
    '複蝦虎魚-錢塘港': { name: '複蝦虎魚-錢塘港', startTime: 8, endTime: 13, completed: false, id: 4 },
    '黃泥螺-錢塘港': { name: '黃泥螺-錢塘港', startTime: 10, endTime: 18, completed: false, id: 5 },
    '東星斑-望海岬': { name: '東星斑-望海岬', startTime: 10, endTime: 18, completed: false, id: 6 },
    '深海帶魚-寶礦山': { name: '深海帶魚-寶礦山', startTime: 10, endTime: 20, completed: false, id: 7 },
    '碟魚-江洋港': { name: '碟魚-江洋港', startTime: 12, endTime: 20, completed: false, id: 8 },
    '鯔魚-泉州港': { name: '鯔魚-泉州港', startTime: 13, endTime: 20, completed: false, id: 9 },
    '鞍帶石斑-天涯鹽場': { name: '鞍帶石斑-天涯鹽場', startTime: 14, endTime: 21, completed: false, id: 10 },
    '海蝙蝠-寶礦山': { name: '海蝙蝠-寶礦山', startTime: 14, endTime: 22, completed: false, id: 11 },
    '皮皮蝦-天涯鹽場': { name: '皮皮蝦-天涯鹽場', startTime: 15, endTime: 17, completed: false, id: 12 },
    '幼鯊-幽靈島': { name: '幼鯊-幽靈島', startTime: 15, endTime: 20, completed: false, id: 13 },
    '海鱸魚-靈鹿島': { name: '海鱸魚-靈鹿島', startTime: 16, endTime: 22, completed: false, id: 14 },
    '霞光魚-靈鹿島': { name: '霞光魚-靈鹿島', startTime: 18, endTime: 20, completed: false, id: 15 },
    '鼈蟹-江洋港': { name: '鼈蟹-江洋港', startTime: 18, endTime: 23, completed: false, id: 16 },
    '大菱鮃-滄浪島': { name: '大菱鮃-滄浪島', startTime: 13, endTime: 20, completed: false, id: 17 },
    '紫月蝴蝶-瑯環福地': { name: '紫月蝴蝶-瑯環福地', startTime: 10, endTime: 18, completed: false, id: 18 },
    '鸚哥魚-瑯環福地': { name: '鸚哥魚-瑯環福地', startTime: 19, endTime: 21, completed: false, id: 19 },
    '鱈魚-大滄海': { name: '鱈魚-大滄海', startTime: 12, endTime: 18, completed: false, id: 20 },
    '深海龍蝦-大滄海': { name: '深海龍蝦-大滄海', startTime: 18, endTime: 23, completed: false, id: 21 },
    '鮭魚-東海玉渦': { name: '鮭魚-東海玉渦', startTime: 12, endTime: 18, completed: false, id: 22 },
    '寶石魚-東海玉渦': { name: '寶石魚-東海玉渦', startTime: 6, endTime: 12, completed: false, id: 23 },
};

var aquaCompletedList = [];

var preAquaProduct = "<li class='aquaProduct' data-name='{{NAME}}'><p class='start'>{{START}}</p><p class='name'>{{NAME}}</p><p class='end'>{{END}}</p></li>";
var fromStartTime = true;

$(document).ready(function () {
    checkCookie();
    setup();
});

function checkCookie() {
    if ($.cookie("aquaCompletedList") != undefined) {
        //cookie exist
        aquaCompletedList = JSON.parse($.cookie("aquaCompletedList"));
        aquaCompletedList.forEach(function (value, id, arr) {
            Object.values(aquaList)[value].completed = true;
        });
    } else {
        //create cookie
        var jString = JSON.stringify(aquaCompletedList);
        $.cookie("aquaCompletedList", jString, { expires: 30, path: '/' });
    }
}

function setup() {
    Object.values(aquaList).forEach((aqua) => {
        var aProduct = preAquaProduct.replace("{{START}}", aqua.startTime).replaceAll("{{NAME}}", aqua.name).replace("{{END}}", aqua.endTime);
        $('#board').append(aProduct);
    });

    $('.aquaProduct').each(function (index) {
        var pdt = aquaList[$(this).find(".name").text()];
        var left = pdt.startTime / 24 * 100;
        var width = (pdt.endTime - pdt.startTime) / 24 * 100;
        var color = pdt.completed ? "#555" : "#ccc";

        $(this).css({ "left": left + "%", "width": width + "%", "background-color": color });
    });
    setCurrent();
    sort();
}

// update every min.
function setCurrent() {
    const d = new Date();
    let hour = d.getHours();
    var left = hour / 24 * 100;
    $('#currentText').text(hour);
    $('#current').css("left", left + "%");
    $('#currentText').css("left", left + "%");
    setTimeout(setCurrent, 60 * 1000);
}

// array sort attr
function sort() {
    var subjects = $('.aquaProduct');
    var subjectsArray = Array.from(subjects);
    let sorted = subjectsArray.sort(comparator);
    sorted.forEach(e => document.querySelector("#board").appendChild(e));
}

function comparator(a, b) {
    var ca = (fromStartTime) ? aquaList[a.dataset.name].startTime : aquaList[a.dataset.name].endTime;
    var cb = (fromStartTime) ? aquaList[b.dataset.name].startTime : aquaList[b.dataset.name].endTime;
    if (ca < cb)
        return -1;
    if (ca > cb)
        return 1;
    return 0;
}

$('#sortBtn').click(function () {
    fromStartTime = !fromStartTime;
    sort();
});

$("#board").on('click', ".aquaProduct", function () {
    var pdt = aquaList[$(this).find(".name").text()];
    pdt.completed = !pdt.completed;
    if (pdt.completed && !aquaCompletedList.includes(pdt.id)) aquaCompletedList.push(pdt.id);
    if (!pdt.completed && aquaCompletedList.includes(pdt.id)) {
        for (var count = 0; count < aquaCompletedList.length; count++) {
            if (aquaCompletedList[count] === pdt.id) {
                aquaCompletedList.splice(count, 1);
                count--;
            }
        }
    }
    var color = pdt.completed ? "#555" : "#ccc";
    $(this).css("background-color", color);

    //update cookie
    var jString = JSON.stringify(aquaCompletedList);
    $.cookie("aquaCompletedList", jString, { expires: 7, path: '/' });
});