import axios from "axios";

const API_URL = "/api/routines/";

// Create new routine
const createRoutine = async (routineData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // if we do not send that config variable which includes headers with bearer token, we are not gonna be able to acces that route due to the protection
  const response = await axios.post(API_URL, routineData, config);

  return response.data;
};

// Get user routines
const getRoutines = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Delete user routine
const deleteRoutine = async (routineId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + routineId, config);

  return response.data;
};

const routineService = {
  createRoutine,
  getRoutines,
  deleteRoutine,
};

export default routineService;
 