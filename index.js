// Импорт библиотек
import axios from 'axios';
import { addDays, format, getMonth, differenceInDays, getDay } from 'date-fns'
import { ru } from 'date-fns/locale';

// Словарь месяцев
const months = {
    1: "Янв.",
    2: "Февр.",
    3: "Март",
    4: "Апр.",
    5: "Май",
    6: "Июнь",
    7: "Июль",
    8: "Авг.",
    9: "Сент.",
    10: "Окт.",
    11: "Нояб.",
    12: "Дек."
};

// Переменные
const DayOfWeek = getDay(new Date())
let graph = document.querySelector(".graph__main_contributions");
let graphTitle = document.querySelector(".graph__title");
let difference;
if (DayOfWeek !== 0) {
    difference = 7 - DayOfWeek;
}
const finalDate = format(addDays(new Date(), difference), 'yyyy-MM-dd'); // Необходима для коректного построение даты относительно графа
const pastDate = format(addDays(new Date(), -(357 - difference)), 'yyyy-MM-dd')
const daysDifference = differenceInDays(finalDate, pastDate)
let currentMonth = getMonth(pastDate) + 1; // Отсчёт месяцев происходит от 0
console.log(finalDate)
// Запрос на получение данных
axios.get('https://dpg.gg/test/calendar.json')
    .then(res => {
        let data = res.data;

        // Цикл на построение графа
        for (let i = 1; i <= daysDifference; i++) {
            const currentD = format(addDays(pastDate, i), 'yyyy-MM-dd')
            let element = document.createElement("div");

            element.classList.add("contribution");

            if (data.hasOwnProperty(currentD)) {
                if (data[currentD] < 10) {
                    element.classList.add("to_nine");
                }
                else if (data[currentD] < 20) {
                    element.classList.add("to_nineteen");
                }
                else if (data[currentD] < 30) {
                    element.classList.add("to_twenty_nine");
                } else {
                    element.classList.add("many");
                }
                element.setAttribute("data-title", data[currentD] + " " + " contributions" + " " + format(currentD, 'EEEE, MMMM dd, yyyy', { locale: ru }));
            } else {
                element.classList.add("absent")
                element.setAttribute("data-title", "No contributions" + " " + format(currentD, 'EEEE, MMMM dd, yyyy', { locale: ru }));
            }

            graph.appendChild(element)
        }
    })

    .catch(error => {
        console.error('Error fetching data:', error);
    });


// Цикл для постановки месяцев 
for (let index = 0; index < 12; index++) {
    let element = document.createElement("p");
    if (currentMonth > 12) {
        currentMonth = 1;
        element.innerText = months[currentMonth];
    } else {
        element.innerText = months[currentMonth];
    }
    currentMonth = currentMonth + 1;
    graphTitle.appendChild(element);
}