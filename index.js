import axios from 'axios';
import { addDays } from 'date-fns'

axios.get('https://dpg.gg/test/calendar.json')
    .then(res => {
        console.log(res.data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

const currentDate = new Date()
const futureDate = addDays(currentDate, 357)

console.log('Текущая дата:', currentDate)
console.log('Дата через 357 дней:', futureDate)
