import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './main.scss'
import { AuthProvider } from './context/AuthProvider.jsx'
import { MessageProvider } from './context/MessageProvider.jsx'

if (typeof window !== "undefined") {
  window.global = window;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <MessageProvider>
        <App />
      </MessageProvider>
    </AuthProvider>
  </React.StrictMode>,
)
