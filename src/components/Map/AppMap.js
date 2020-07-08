import React, { useState } from 'react';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

const AppMap = () => {
  const position = [-22.430110434852047, -46.95230484008789];
  const zoom = 10;

  const [markers, setMarkers] = useState([]);

  const handleMapClick = (e) => {
    console.log(e.latlng);
  };

  const handleContextMenu = (e) => {
    console.log(e.latlng);
    console.log('context menu');
    setMarkers([...markers, { position: [e.latlng.lat, e.latlng.lng] }]);
  };

  return (
    <div className="app-map">
      <Map
        center={position}
        zoom={zoom}
        onclick={handleMapClick}
        oncontextmenu={handleContextMenu}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker, i) => (
          <Marker key={i} position={marker.position}>
            <Popup>
              <span>
                {`lat: ${marker.position[0]}, lng: ${marker.position[1]}`}
              </span>
            </Popup>
          </Marker>
        ))}
      </Map>
    </div>
  );
};

export default AppMap;
