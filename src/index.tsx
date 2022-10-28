import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import App from './App';
import Login from './pages/login/index'

import './index.css';
import 'antd/dist/antd.min.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
  // <Provider store={store}>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<App />} />
    </Routes>
  </BrowserRouter>
  // </Provider>
  // </React.StrictMode>
);

