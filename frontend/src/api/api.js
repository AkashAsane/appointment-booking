import axios from 'axios';
const API_BASE = 'https://appointment-booking-wcit.onrender.com/api';

export const fetchDoctors = async () => {
    const response = await axios.get(`${API_BASE}/doctors`);
    return response.data;
};

export const fetchSlots = async (doctorId, date) => {
    try {
        const response = await axios.get(`${API_BASE}/doctors/${doctorId}/slots`, { params: { date } });
        return response.data; 
    } catch (error) {
        console.error('Error fetching slots:', error.response?.data || error.message);
        throw error;
    }
};

export const fetchAppointments = async () => {
    const response = await axios.get(`${API_BASE}/appointments`);
    return response.data;
};

export const createAppointment = async (appointment) => {
    const response = await axios.post(`${API_BASE}/appointments`, appointment);
    return response.data;
};

export const deleteAppointment = async (id) => {
    const response = await axios.delete(`${API_BASE}/appointments/${id}`);
    return response.data;
};
