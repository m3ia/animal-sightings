import './App.css';
import { useState } from 'react';
import Sightings from './components/sightings/Sightings';

function App() {
  const [currentView, setCurrentView] = useState('menu');
  return (
    <div className="App">
      <Sightings />
    </div>
  );
}

export default App;
