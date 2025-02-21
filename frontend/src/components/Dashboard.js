import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const vehicleResponse = await axios.get('http://localhost:3000/vehicles', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVehicles(vehicleResponse.data);

      const scheduleResponse = await axios.get('http://localhost:3000/schedules', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSchedules(scheduleResponse.data);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="mb-6">
          <Link to="/add-vehicle" className="bg-green-500 text-white p-3 rounded hover:bg-green-600 mr-4">Add Vehicle</Link>
          <Link to="/add-schedule" className="bg-green-500 text-white p-3 rounded hover:bg-green-600">Add Schedule</Link>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Vehicles</h2>
        <ul className="list-disc pl-5">
          {vehicles.map(vehicle => (
            <li key={vehicle.id} className="mb-2">{vehicle.name} - {vehicle.plate} - {vehicle.model} - {vehicle.color} - {vehicle.capacity} people</li>
          ))}
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Schedules</h2>
        <ul className="list-disc pl-5">
          {schedules.map(schedule => (
            <li key={schedule.id} className="mb-2">{schedule.driver} - {schedule.reason} - {schedule.destination} - {new Date(schedule.start_time).toLocaleString()} to {new Date(schedule.end_time).toLocaleString()}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;