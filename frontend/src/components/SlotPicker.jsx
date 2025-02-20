import React, { useState, useEffect } from 'react';
import { fetchSlots } from '../api/api';

const SlotPicker = ({ doctorId, date, onSlotSelect }) => {
    const [slots, setSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState('');

    useEffect(() => {
        const loadSlots = async () => {
            if (doctorId && date) {
                const availableSlots = await fetchSlots(doctorId, date);
                setSlots(availableSlots);
            }
        };
        loadSlots();
    }, [doctorId, date]);

    const handleSlotClick = (slot) => {
        setSelectedSlot(slot);
        onSlotSelect(`${date}T${slot}:00`);
    };

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Available Slots</h3>
            <div className="grid grid-cols-3 gap-4">
                {slots.length > 0 ? (
                    slots.map((slot, index) => (
                        <button
                            key={index}
                            onClick={() => handleSlotClick(slot)}
                            className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition ${
                                selectedSlot === `${date}T${slot}:00`
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-200'
                            }`}
                        >
                            {slot}
                        </button>
                    ))
                ) : (
                    <p className="col-span-3 text-center text-gray-500">No slots available</p>
                )}
            </div>
        </div>
    );
};

export default SlotPicker;
