export const ConvertTime = (createdAt) => {
    const weekday = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    const date2 = new Date(createdAt);
    const year = date2.getFullYear();
    const month = date2.getMonth() + 1;
    const day = date2.getDate();
    const hour24 = date2.getHours();
    const hour12 = hour24 % 12 || 12;
    const minute = date2.getMinutes();
    const second = date2.getSeconds().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });
    const day_of_the_week = date2.getDay();
    const amOrPm = hour24 < 12 ? 'AM' : 'PM';
    return `${weekday[day_of_the_week]} ${day}/${month}/${year}, ${hour12}:${minute}:${second} ${amOrPm}`;
};

