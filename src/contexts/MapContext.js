import React, { useReducer } from 'react';

const initialState = {
  position: [51.505, 0.09],
  zoom: 10,
  markers: [],
  selectedMarker: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'updateZoom': {
      return { ...state, zoom: action.payload };
    }

    case 'loadMarkers': {
      return { ...state, markers: action.payload };
    }

    case 'addMarker': {
      const updatedMarkers = [...state.markers];
      updatedMarkers.push(action.payload);

      return {
        ...state,
        position: action.payload.geometry.coordinates,
        markers: updatedMarkers,
        selectedMarker: action.payload._id,
      };
    }

    case 'removeMarker': {
      const updatedMarkers = [
        ...state.markers.filter((m) => m._id !== action.payload),
      ];

      return {
        ...state,
        markers: updatedMarkers,
      };
    }

    case 'selectMarker': {
      return {
        ...state,
        selectedMarker: action.payload._id,
        position: action.payload.geometry.coordinates,
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
