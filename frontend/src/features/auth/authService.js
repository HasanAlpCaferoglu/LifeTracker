// This file is to make http request and sending the data back and setting any data in localStorage
import axios from 'axios';

const API_URL = '/api/users/'

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData) // make the request and put the response into that variable

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    
    return response.data
}

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData) // make the request and put the response into that variable

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    
    return response.data
}

const logout = async () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    logout,
}

export default authService