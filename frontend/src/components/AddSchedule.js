import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function AddSchedule() {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleId, setVehicleId] = useState('');
  const [driver, setDriver] = useState('');
  const [reason, setReason] = useState('');
  const [destination, setDestination] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const history = useHistory();

  useEffect(() => {
    const fetchVehicles = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/vehicles', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVehicles(response.data);
    };

    fetchVehicles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/schedules', {
        vehicle_id: vehicleId,
        driver,
        reason,
        destination,
        start_time: startTime,
        end_time: endTime
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      history.push('/dashboard');
    } catch (error) {
      console.error('Failed to add schedule', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Schedule</h2>
        <select
          value={vehicleId}
          onChange={(e) => setVehicleId(e.target.value)}
          className="mb-4 p-3 border rounded w-full"
        >
          <option value="">Select Vehicle</option>
          {vehicles.map(vehicle => (
            <option key={vehicle.id} value={vehicle.id}>{vehicle.name}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Driver"
          value={driver}
          onChange={(e) => setDriver(e.target.value)}
          className="mb-4 p-3 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="mb-4 p-3 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="mb-4 p-3 border rounded w-full"
        />
        <input
          type="datetime-local"
          placeholder="Start Time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="mb-4 p-3 border rounded w-full"
        />
        <input
          type="datetime-local"
          placeholder="End Time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="mb-4 p-3 border rounded w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-3 rounded w-full hover:bg-blue-600">Add Schedule</button>
      </form>
    </div>
  );
}

export default AddSchedule;