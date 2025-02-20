import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-blue-600 mb-6">Welcome to the Appointment System</h1>
            <p className="text-lg text-gray-700 mb-4">Book your appointment with the best doctors.</p>
            <div className="flex space-x-4">
                <Link to="/booking">
                    <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 shadow-md">
                        Book an Appointment
                    </button>
                </Link>
                <Link to="/appointments">
                    <button className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 shadow-md">
                        Manage Appointments
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
