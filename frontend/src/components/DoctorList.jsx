import React, { useEffect, useState } from 'react';
import { fetchDoctors } from '../api/api';

const DoctorList = ({ onSelect }) => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const loadDoctors = async () => {
            const data = await fetchDoctors();
            setDoctors(data);
        };
        loadDoctors();
    }, []);

    return (
        <div>
            <label>Select Doctor:</label>
            <select onChange={(e) => onSelect(e.target.value)}>
                <option value="">Choose a Doctor</option>
                {doctors.map((doc) => (
                    <option key={doc._id} value={doc._id}>
                        {doc.name} ({doc.specialization})
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DoctorList;
