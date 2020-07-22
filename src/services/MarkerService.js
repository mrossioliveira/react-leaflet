import api from './Api';

const MarkerService = {
  find: async () => {
    try {
      const URL = '/markers';
      const response = await api.get(URL);
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  create: async (coordinates) => {
    const URL = '/markers';
    try {
      const newMarker = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates,
        },
      };

      const response = await api.post(URL, newMarker);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  delete: async (id) => {
    const URL = `/markers/${id}`;
    try {
      const response = await api.delete(URL);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

export default MarkerService;
