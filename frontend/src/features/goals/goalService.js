import axios from "axios";

const API_URL = "/api/goals/";

// Create new goal
const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // remember we have authorization header which will be token
      // we wnat to send the token as a bearer token
    },
  };

  // if we do not send that config variable which includes headers with bearer token, we are not gonna be able to acces that route
  const response = await axios.post(API_URL, goalData, config);

  return response.data;
};

// Get user goals
const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // remember we have authorization header which will be token
      // we wnat to send the token as a bearer token
    },
  };

  // if we do not send that config variable which includes headers with bearer token, we are not gonna be able to acces that route
  const response = await axios.get(API_URL, config);

  return response.data;
};

// Delete user goal 
const deleteGoal = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // remember we have authorization header which will be token
      // we wnat to send the token as a bearer token
    },
  };

  // if we do not send that config variable which includes headers with bearer token, we are not gonna be able to acces that route
  const response = await axios.delete(API_URL + goalId, config);

  return response.data;
};

const goalService = {
  createGoal,
  getGoals,
  deleteGoal,
};

export default goalService;
