import React, { useState } from 'react';
import DoctorList from '../components/DoctorList';
import SlotPicker from '../components/SlotPicker';
import AppointmentForm from '../components/AppointmentForm';

const Booking = () => {
    const [doctorId, setDoctorId] = useState('');
    const [date, setDate] = useState('');
    const [slot, setSlot] = useState('');

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
            <h1 className="text-3xl font-bold text-blue-600 mb-6">Book an Appointment</h1>
            <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md space-y-6">
                <div>
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Select a Doctor</h2>
                    <DoctorList onSelect={setDoctorId} />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Choose a Date</h2>
                    <input
                        type="date"
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                {doctorId && date && (
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Select a Time Slot</h2>
                        <SlotPicker doctorId={doctorId} date={date} onSlotSelect={setSlot} />
                    </div>
                )}
                {slot && (
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Confirm Your Appointment</h2>
                        <AppointmentForm
                            doctorId={doctorId}
                            slot={slot}
                            onSuccess={() => alert('Appointment Booked!')}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Booking;
