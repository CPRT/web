import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './components/Dashboard';
import Connect from './components/Connect';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ROSProvider from './components/ROSProvider';
import RequireROS from './components/RequireROS';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ROSProvider>
        <ToastContainer />
        <Routes>
          <Route path="/connect" element={<Connect/>}/>
          <Route path="/" element={
            <RequireROS>
              <Dashboard/>
            </RequireROS>}
          />  
        </Routes>
      </ROSProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
