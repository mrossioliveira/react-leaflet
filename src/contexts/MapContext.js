import React, { useReducer } from 'react';

import { v4 as uuidv4 } from 'uuid';

const initialState = {
  position: { lat: 51.505, lng: 0.09 },
  zoom: 10,
  markers: [],
  selectedMarker: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'updateZoom': {
      return { ...state, zoom: action.payload };
    }

    case 'addMarker': {
      const updatedMarkers = [...state.markers];
      const uuid = uuidv4();
      updatedMarkers.push({ id: uuid, position: action.payload });

      return {
        ...state,
        position: action.payload,
        markers: updatedMarkers,
        selectedMarker: uuid,
      };
    }

    case 'removeMarker': {
      const updatedMarkers = [
        ...state.markers.filter((m) => m.id !== action.payload),
      ];

      return {
        ...state,
        markers: updatedMarkers,
      };
    }

    case 'selectMarker': {
      return {
        ...state,
        selectedMarker: action.payload.id,
        position: action.payload.position,
      };
    }

    default:
      throw new Error('MapContext: Invalid action');
  }
}

export const MapContext = React.createContext();

export const MapProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MapContext.Provider value={{ state, dispatch }}>
      {props.children}
    </MapContext.Provider>
  );
};
