import React, { useContext, useEffect } from 'react';
import { Icon } from 'leaflet';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { MapContext } from '../../contexts/MapContext';
import MarkerService from '../../services/MarkerService';

const AppMap = () => {
  const { state, dispatch } = useContext(MapContext);

  useEffect(() => {
    async function load() {
      const markers = await MarkerService.find();
      dispatch({ type: 'loadMarkers', payload: markers });
    }

    load();
  }, [dispatch]);

  const handleContextMenu = async (e) => {
    const coordinates = [e.latlng.lat, e.latlng.lng];
    const newMarker = await MarkerService.create(coordinates);
    dispatch({ type: 'addMarker', payload: newMarker });
  };

  const handleMarkerClick = (marker) => {
    dispatch({ type: 'selectMarker', payload: marker });
  };

  const handleZoomChanges = (e) => {
    dispatch({ type: 'updateZoom', payload: e.target._zoom });
  };

  const redIcon = new Icon({
    iconUrl: process.env.PUBLIC_URL + 'marker.png',
    iconSize: 24,
  });

  const blueIcon = new Icon({
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
            key={marker._id}
            position={marker.geometry.coordinates}
            onclick={() => handleMarkerClick(marker)}
            icon={marker._id === state.selectedMarker ? redIcon : blueIcon}
          ></Marker>
        ))}
      </Map>
    </div>
  );
};

export default AppMap;
