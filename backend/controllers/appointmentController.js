const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const { calculateAvailableSlots } = require('../utils/calulateSlots');


const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('doctorId', 'name');
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments', error });
    }
};

const getAppointmentById = async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await Appointment.findById(id).populate('doctorId', 'name');
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointment', error });
    }
};


const createAppointment = async (req, res) => {
    const { doctorId, date, duration, patientName, notes } = req.body;

    if (!doctorId || !date || isNaN(Date.parse(date))) {
        return res.status(400).json({ message: 'Invalid or missing date field.' });
    }

    try {
        const newAppointment = new Appointment({
            doctorId,
            date: new Date(date), // Parse and save valid Date object
            duration,
            patientName,
            notes,
        });
        await newAppointment.save();
        res.status(201).json(newAppointment);
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ message: 'Error creating appointment', error });
    }
};



const updateAppointment = async (req, res) => {
    const { id } = req.params;
    const { date, duration, doctorId } = req.body;

    try {
        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        const existingAppointments = await Appointment.find({
            doctorId: doctorId || appointment.doctorId,
            date: { $gte: new Date(date), $lt: new Date(new Date(date).getTime() + duration * 60000) },
            _id: { $ne: id }, 
        });

        if (existingAppointments.length > 0) {
            return res.status(400).json({ message: 'Time slot is not available' });
        }

        Object.assign(appointment, req.body);
        await appointment.save();
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: 'Error updating appointment', error });
    }
};


const deleteAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await Appointment.findByIdAndDelete(id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting appointment', error });
    }
};

module.exports = {
    getAppointments,
    getAppointmentById,
    createAppointment,
    updateAppointment,
    deleteAppointment,
};
