import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import RosConnect from './components/RosConnect';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ROSProvider from './components/ROSProvider';
import RequireROS from './components/RequireROS';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ROSProvider>
        <Routes>
          <Route path="/connect" element={<RosConnect/>}/>
          <Route path="/" element={
            <RequireROS>
              <App/>
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
