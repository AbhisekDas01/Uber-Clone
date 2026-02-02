import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import UserContext from './context/UserContext.jsx';
import SocketContext from './context/SocketContext.jsx';
import { Toaster } from 'react-hot-toast';

import { BrowserRouter } from 'react-router-dom';
import CaptainContext from './context/CaptainContext.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <CaptainContext>
            <UserContext>
                <SocketContext>
                    <BrowserRouter>
                        <App />
                        <Toaster />
                    </BrowserRouter>
                </SocketContext>
            </UserContext>
        </CaptainContext>
    </StrictMode>
);
