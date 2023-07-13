var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
];
//получаем номер сегодняшнего дня недели
function getDayWeek() {
    var date = new Date();
    var dayWeek = new Array(7)[date.getDay()];
    return dayWeek.toString();
}
//форматируем миллисекунды в часы
function formatTime(time) {
    var hours = Math.floor(time / 3600);
    var period = hours >= 12 ? "PM" : "AM";
    var formattedHours = hours % 12 || 12;
    return "".concat(formattedHours, " ").concat(period);
}
//форматируем наше расписание
function formatSchedule(schedule) {
    var formattedSchedule = [];
    daysOfWeek.forEach(function (day, index) {
        var _a;
        var currentDay = schedule[day];
        var nextDay = schedule[daysOfWeek[index + 1 === daysOfWeek.length ? 0 : index + 1]];
        var openTime = "";
        var closeTime = "";
        if (!currentDay.find(function (elem) { return elem.type === "open"; })) {
            formattedSchedule.push({ day: day, close: true });
        }
        else if (currentDay[0].type === "open" &&
            ((_a = currentDay[1]) === null || _a === void 0 ? void 0 : _a.type) === "close") {
            openTime = formatTime(currentDay[0].value);
            closeTime = formatTime(currentDay[1].value);
            formattedSchedule.push({ day: day, openTime: openTime, closeTime: closeTime, close: false });
        }
        else if (currentDay[currentDay.length - 1].type === "open") {
            openTime = formatTime(currentDay[currentDay.length - 1].value);
            closeTime = formatTime(nextDay[0].value);
            formattedSchedule.push({ day: day, openTime: openTime, closeTime: closeTime, close: false });
        }
        else if (currentDay[currentDay.length - 1].type === "close" &&
            currentDay[currentDay.length - 2].type === "open") {
            openTime = formatTime(currentDay[currentDay.length - 2].value);
            closeTime = formatTime(currentDay[currentDay.length - 1].value);
            formattedSchedule.push({ day: day, openTime: openTime, closeTime: closeTime, close: false });
        }
    });
    return formattedSchedule;
}
//подгружаем данные из json
function loadJSON(url) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    });
}
// создаем элементы для отображения в DOM
function displaySchedule() {
    return __awaiter(this, void 0, void 0, function () {
        var jsonData, formattedSchedule, dayWeek, scheduleList, day, listItem, spanLeft, spanRight, spanCenter;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadJSON("data.json")];
                case 1:
                    jsonData = _a.sent();
                    formattedSchedule = formatSchedule(jsonData);
                    dayWeek = getDayWeek();
                    scheduleList = document.getElementById("schedule");
                    if (scheduleList) {
                        for (day in formattedSchedule) {
                            listItem = document.createElement("li");
                            spanLeft = document.createElement("span");
                            spanRight = document.createElement("span");
                            spanLeft.textContent = "".concat(formattedSchedule[day].day);
                            spanLeft.setAttribute("id", "left-text");
                            spanRight.setAttribute("id", "right-text");
                            if (formattedSchedule[day].close) {
                                spanRight.textContent = "close";
                                spanRight.classList.add("closed");
                            }
                            else {
                                spanRight.textContent = "".concat(formattedSchedule[day].openTime, " - ").concat(formattedSchedule[day].closeTime);
                            }
                            listItem.appendChild(spanLeft);
                            if (day === dayWeek) {
                                spanCenter = document.createElement("span");
                                spanCenter.textContent = "today";
                                spanCenter.setAttribute("id", "center-text");
                                listItem.appendChild(spanCenter);
                            }
                            listItem.appendChild(spanRight);
                            scheduleList.appendChild(listItem);
                        }
                    }
                    else {
                        console.error("Элемент списка 'schedule' не найден.");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
displaySchedule();
