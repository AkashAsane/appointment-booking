const { parse, addMinutes, format, isBefore, isEqual } = require('date-fns');

function calculateAvailableSlots(workingHours, appointments, date, duration) {
    const startTime = parse(workingHours.start, 'HH:mm', new Date(date));
    const endTime = parse(workingHours.end, 'HH:mm', new Date(date));
    const slots = [];
    let currentTime = startTime;

    while (isBefore(currentTime, endTime)) {
        const nextTime = addMinutes(currentTime, duration);
        if (isBefore(nextTime, endTime) || isEqual(nextTime, endTime)) {
            slots.push(format(currentTime, 'HH:mm'));
        }
        currentTime = nextTime;
    }

    const bookedSlots = appointments.map((app) => format(app.date, 'HH:mm'));
    return slots.filter((slot) => !bookedSlots.includes(slot));
}

module.exports = { calculateAvailableSlots };
