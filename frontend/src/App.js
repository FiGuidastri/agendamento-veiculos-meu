import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddVehicle from './components/AddVehicle';
import AddSchedule from './components/AddSchedule';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/add-vehicle" component={AddVehicle} />
        <Route path="/add-schedule" component={AddSchedule} />
        <Route path="/" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;