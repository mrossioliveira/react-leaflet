import React, { useContext } from 'react';

import { Map, TileLayer, Marker } from 'react-leaflet';
import { MapContext } from '../../contexts/MapContext';
import { Icon } from 'leaflet';

const AppMap = () => {
  const { state, dispatch } = useContext(MapContext);

  const handleContextMenu = (e) => {
    const position = { lat: e.latlng.lat, lng: e.latlng.lng };
    dispatch({ type: 'addMarker', payload: position });
  };

  const handleMarkerClick = (marker) => {
    dispatch({ type: 'selectMarker', payload: marker });
  };

  const handleZoomChanges = (e) => {
    dispatch({ type: 'updateZoom', payload: e.target._zoom });
  };

  var redIcon = new Icon({
    iconUrl: process.env.PUBLIC_URL + 'marker.png',
    iconSize: 24,
  });

  var blueIcon = new Icon({
    iconUrl: process.env.PUBLIC_URL + 'marker_blue.png',
    iconSize: 24,
  });

  return (
    <div className="app-map">
      <Map
        center={state.position}
        zoom={state.zoom}
        oncontextmenu={handleContextMenu}
        onzoomend={handleZoomChanges}
        zoomControl={false}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {state.markers.map((marker, i) => (
          <Marker
            key={i}
            position={marker.position}
            onclick={() => handleMarkerClick(marker)}
            icon={marker.id === state.selectedMarker ? redIcon : blueIcon}
          ></Marker>
        ))}
      </Map>
    </div>
  );
};

export default AppMap;
