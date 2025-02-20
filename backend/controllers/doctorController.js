const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const { calculateAvailableSlots } = require('../utils/calulateSlots');


const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching doctors', error });
    }
};


const getDoctorSlots = async (req, res) => {
    const { id } = req.params;
    const { date } = req.query;

    if (!date) {
        return res.status(400).json({ message: 'Date is required' });
    }

    try {
        const doctor = await Doctor.findById(id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        const appointments = await Appointment.find({
            doctorId: id,
            date: { $gte: new Date(date), $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)) },
        });

        const availableSlots = calculateAvailableSlots(
            doctor.workingHours,
            appointments,
            date,
            30 
        );

        res.status(200).json(availableSlots);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching available slots', error });
    }
};

module.exports = { getDoctors, getDoctorSlots };
