import React from 'react';
import './App.scss';
import AppMap from './components/Map/AppMap';
import Sidebar from './components/Sidebar/Sidebar';
import { MapProvider } from './contexts/MapContext';

function App() {
  return (
    <MapProvider>
      <Sidebar />
      <AppMap />
    </MapProvider>
  );
}

export default App;
