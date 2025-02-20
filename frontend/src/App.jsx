import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import ManageAppointments from './pages/ManageAppointments';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/appointments" element={<ManageAppointments />} />
            </Routes>
        </Router>
    );
};

export default App;
