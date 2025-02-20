import React, { useEffect, useState } from 'react';
import { fetchAppointments, deleteAppointment } from '../api/api';
import { useNavigate } from 'react-router-dom';

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadAppointments = async () => {
            const data = await fetchAppointments();
            setAppointments(data);
        };
        loadAppointments();
    }, []);

    const handleDelete = async (id) => {
        await deleteAppointment(id);
        setAppointments(appointments.filter((appt) => appt._id !== id));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Appointments</h2>
                <button
                    onClick={() => navigate('/')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Back to Homepage
                </button>
            </div>
            {appointments.length > 0 ? (
                <ul className="space-y-4">
                    {appointments.map((appt) => (
                        <li
                            key={appt._id}
                            className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm"
                        >
                            <div>
                                <p className="text-lg font-medium text-gray-700">{appt.patientName}</p>
                                <p className="text-sm text-gray-500">{new Date(appt.date).toLocaleString()}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(appt._id)}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Cancel
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500">No appointments found.</p>
            )}
        </div>
    );
};

export default AppointmentList;
