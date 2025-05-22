import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./api/axiosSetup.js"

createRoot(document.getElementById('root')).render(
    <App />
)
