// const axios = require('axios');
import axios from 'axios'

async function login() {
  try {
    const response = await axios.post(
      'https://trendai-backend-lime.vercel.app/auth/login',
      {
        email: 'user@example.com',
        password: 'password123',
      },
      {
        withCredentials: true, // Include credentials
      }
    );

    console.log('Login successful:', response.data);
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
  }
}

login();
