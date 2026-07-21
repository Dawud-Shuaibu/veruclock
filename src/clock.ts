window.onload = (): void => {
    switch (localStorage.getItem('timeSource')) {
        case 'local': 
            timeSource.value = 'local';
            getTimeAndDate(timeSource.value, timeZone.value);
        break;
        default: 
            timeSource.value = 'fetch';
            getTimeAndDate(timeSource.value, timeZone.value);
        break;
    }

    switch (localStorage.getItem('timeFormat')) {
        case '12hour': timeFormat.value = '12hour'; break;
        default: timeFormat.value = '24hour'; break;
    }
};

const time = <HTMLParagraphElement>document.querySelector('.time');
const amPmSymbol = <HTMLParagraphElement>document.querySelector('.am-pm-symbol');
const date = <HTMLParagraphElement>document.querySelector('.date');
// Quick time configs settings
const timeSource = <HTMLSelectElement>document.getElementById('time-source');
const timeZone = <HTMLSelectElement>document.getElementById('time-zone');
const timeFormat = <HTMLSelectElement>document.getElementById('time-format');

// Time fetcher
function getTimeAndDate(source: string, timezone: string): void {
    let dateAndTime: Date | null = null;

    let timeHour: number | null = null;
    let timeMins: number | null = null;
    let timeSecs: number | null = null;
    
    // Local fetch
    if (source === 'local') {
        dateAndTime = new Date();       // Date Object
        
        timeHour = dateAndTime.getHours();
        timeMins = dateAndTime.getMinutes();
        timeSecs = dateAndTime.getSeconds();

        timeRunner(timeHour, timeMins, timeSecs);
        showDate(dateAndTime);
    } else if (source === 'fetch') {
        
    }
}

// Continuosly runs time once fetched
function timeRunner(timeHour: number, timeMins: number, timeSecs: number): void {
    let runner;
    if (runner) 
        clearInterval(runner);

    runner = setInterval((): void => {
        let displayHour: number = timeFormatShow(timeHour);

        if (timeSecs === 59) {
            if (timeMins === 59) {
                timeHour === 23 ? timeHour = 0 : ++timeHour;
                switch (timeFormat.value)  {
                    case '24hour': displayHour = timeHour; break;
                    case '12hour': ++displayHour; timeFormatShow(timeHour); break;
                }
                showDate(new Date());       // Update Date
                timeMins = 0;
            } else 
                ++timeMins;
            timeSecs = 0;
        } else 
            ++timeSecs;

        time.innerHTML = `${leadingZero(displayHour)}:${leadingZero(timeMins)}:${leadingZero(timeSecs)}`;
    }, 1000);
}

// Shows the clock format state: am, pm and 24hr
function timeFormatShow(timeHour: number): number {
    if (timeFormat.value === '12hour') {
        timeHour >= 12 ? amPmSymbol.innerText = 'pm' : amPmSymbol.innerText = 'am';

        if (timeHour > 12) 
            return timeHour - 12;
        else if (timeHour === 0) 
            return 12;
        else 
            return timeHour;
    } else {
        amPmSymbol.innerText = '';
        return timeHour;
    }
}

// Date Function
function showDate(fetchedDate: Date): void {
    // Days and Months names control/logic
    const accurate = {
        day(dayNum: number): string | void {
            switch (dayNum) {
                case 0: return 'Sunday';
                case 1: return 'Monday';
                case 2: return 'Tuesday';
                case 3: return 'Wednesday';
                case 4: return 'Thursday';
                case 5: return 'Friday';
                case 6: return 'Saturday';
            }
        }, 

        month(monthNum: number): string | void {
            switch (monthNum) {
                case 0: return 'Jan';
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
            }
        }
    };

    const year: number = fetchedDate.getFullYear();
    const month: number = fetchedDate.getMonth();
    const monthDate: number = fetchedDate.getDate();
    const day: number = fetchedDate.getDay();

    date.innerText = `${accurate.day(day)}, ${accurate.month(month)} ${monthDate} ${year}`;
}

// Make a leading zero for the clock e.g "09:05:00"
function leadingZero (num: number): string | number {
    const time: string = String(num);
    if (time.length === 1) 
        return `<span>0</span>${num}`;
    else 
        return num;
};

// Listen when configuration are updated immediately by user
timeSource.addEventListener('change', (): void => {
    switch (timeSource.value) {
        case 'fetch': 
            localStorage.setItem('timeSource', 'fetch');
            getTimeAndDate(timeSource.value, timeZone.value);
        break;
        case 'local': 
            localStorage.setItem('timeSource', 'local');
            getTimeAndDate(timeSource.value, timeZone.value);
        break;
    }
});

timeFormat.addEventListener('change', (): void => {
    switch (timeFormat.value) {
        case '12hour': localStorage.setItem('timeFormat', '12hour'); break;
        case '24hour': localStorage.setItem('timeFormat', '24hour'); break;
    }
});