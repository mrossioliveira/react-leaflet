import React, { useState, useContext } from 'react';
import './Sidebar.scss';
import { MapContext } from '../../contexts/MapContext';
import MarkerService from '../../services/MarkerService';

const MarkerItem = ({ marker, index }) => {
  const { state, dispatch } = useContext(MapContext);

  const handleMarkerSelection = (marker) => {
    dispatch({ type: 'selectMarker', payload: marker });
  };

  const handleMarkerDeletion = async (id) => {
    const removedMarker = await MarkerService.delete(id);
    dispatch({ type: 'removeMarker', payload: removedMarker._id });
  };

  return (
    <div
      onClick={() => handleMarkerSelection(marker)}
      className={`marker-item ${
        state.selectedMarker === marker._id ? 'selected' : null
      }`}
    >
      <div>
        <strong>{`#${index + 1}. `}</strong>
        <small>lat: </small>
        {marker.geometry.coordinates[0].toFixed(4)}, <small>lng: </small>
        {marker.geometry.coordinates[1].toFixed(4)}
      </div>
      <span onClick={() => handleMarkerDeletion(marker._id)}>
        <i className="far fa-trash-alt"></i>
      </span>
    </div>
  );
};

const Sidebar = () => {
  const [statusClass, setStatusClass] = useState('sidebar-open');

  const { state } = useContext(MapContext);

  const handleStatusChange = () => {
    setStatusClass('sidebar-open');
  };

  const handleSidebarClose = (e) => {
    e.stopPropagation();
    setStatusClass('sidebar-closed');
  };

  return (
    <div className="sidebar-container">
      <div className={`sidebar ${statusClass}`} onClick={handleStatusChange}>
        <div className="sidebar-content">
          <div className="sidebar-header">
            <span>Markers</span>
            <span
              onClick={handleSidebarClose}
              style={{ cursor: 'pointer', color: '#9d3633' }}
            >
              <i className="fas fa-times-circle"></i>
            </span>
          </div>
          {state.markers.length > 0 ? (
            state.markers.map((m, i) => (
              <MarkerItem key={m._id} marker={m} index={i} />
            ))
          ) : (
            <p style={{ textAlign: 'center' }}>
              Use the right click to add markers.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
