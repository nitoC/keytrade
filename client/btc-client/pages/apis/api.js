import axios from 'axios'

export const fetchUser= ()=> axios.get('/dashboard ')
export const register= payload=> axios.post('http://localhost:2000/register',payload)
export const login= payload=> axios.post('http://localhost:2000/login ',payload)
export const forgotPassword= payload=> axios.post('http://localhost:2000/forgotPassword ',payload)
export const deposit= payload=> axios.patch('http://localhost:2000/deposit ',payload)
export const reset= payload=> axios.patch('http://localhost:2000/reset',payload)