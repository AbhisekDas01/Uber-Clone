import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserContext from './context/UserContext.jsx'
import {Toaster} from 'react-hot-toast'

import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContext>
      <BrowserRouter>
        <App />
        <Toaster/>
      </BrowserRouter>
    </UserContext>
  </StrictMode>,
)
