window.onload = (): void => {
    setInterval(getLocalTimeAndDate, 1000);
};

const time = <HTMLParagraphElement>document.querySelector('.time');
const amPmSymbol = <HTMLParagraphElement>document.querySelector('.am-pm-symbol');
const date = <HTMLParagraphElement>document.querySelector('.date');

function getLocalTimeAndDate(): void {
    const dateAndTime: Date = new Date();
    
    // Time Info Control
    const timeHour: number = dateAndTime.getHours();
    const timeMins: number = dateAndTime.getMinutes();
    const timeSecs: number = dateAndTime.getSeconds();

    time.innerText = `${timeHour}:${timeMins}:${timeSecs}`;

    if (timeHour >= 12) 
        amPmSymbol.innerText = 'pm';
    else 
        amPmSymbol.innerText = 'am';

    // Date data exchanger
    const accurate = {
        day(dayNum: number): string {
            switch (dayNum) {
                case 1: return 'Monday';
                case 2: return 'Tuesday';
                case 3: return 'Wednesday';
                case 4: return 'Thursday';
                case 5: return 'Friday';
                case 6: return 'Saturday';
                default: return 'Sunday';
            }
        }, 

        month(monthNum: number): string {
            switch (monthNum) {
                case 1: return 'Feb';
                case 2: return 'Mar';
                case 3: return 'Apr';
                case 4: return 'May';
                case 5: return 'Jun';
                case 6: return 'Jul';
                case 7: return 'Aug';
                case 8: return 'Sep';
                case 9: return 'Oct';
                case 10: return 'Nov';
                case 11: return 'Dec';
                default: return 'Jan';
            }
        }
    };

    const year: number = dateAndTime.getFullYear();
    const month: number = dateAndTime.getMonth();
    const monthDate: number = dateAndTime.getDate();
    const day: number = dateAndTime.getDay();

    date.innerText = `${accurate.day(day)}, ${accurate.month(month)} ${monthDate} ${year}`;
}