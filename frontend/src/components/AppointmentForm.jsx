import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { createAppointment } from '../api/api';

const AppointmentForm = ({ doctorId, slot, onSuccess }) => {
    const [patientName, setPatientName] = useState('');
    const [notes, setNotes] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const appointment = {
            doctorId,
            date: slot,
            patientName,
            notes,
        };
        try {
            await createAppointment(appointment);
            alert('Appointment successfully booked!');
            navigate('/');
        } catch (error) {
            console.error('Error creating appointment:', error);
            alert('Failed to book appointment. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <label className="block mb-2 font-semibold text-gray-700">Patient Name:</label>
            <input
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
                className="w-full mb-4 p-2 border rounded-md"
            />
            <label className="block mb-2 font-semibold text-gray-700">Notes:</label>
            <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full mb-4 p-2 border rounded-md"
            />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
                Book Appointment
            </button>
        </form>
    );
};

export default AppointmentForm;
