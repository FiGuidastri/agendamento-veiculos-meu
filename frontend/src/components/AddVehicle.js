import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function AddVehicle() {
  const [name, setName] = useState('');
  const [plate, setPlate] = useState('');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [capacity, setCapacity] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/vehicles', {
        name, plate, model, color, capacity
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      history.push('/dashboard');
    } catch (error) {
      console.error('Failed to add vehicle', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Vehicle</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 p-3 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Plate"
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
          className="mb-4 p-3 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="mb-4 p-3 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="mb-4 p-3 border rounded w-full"
        />
        <input
          type="number"
          placeholder="Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          className="mb-4 p-3 border rounded w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-3 rounded w-full hover:bg-blue-600">Add Vehicle</button>
      </form>
    </div>
  );
}

export default AddVehicle;