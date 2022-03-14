import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
import './index.css';
import App from './App';
import World from './routes/world';
import Country from './routes/country'
import Dashboard from './routes/dashboard';
import Board from './routes/Board';


import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
      <Route path="board" element={<Board /> } />
      <Route path="world/:unId" element={<Country /> } />
      <Route path="world" element={<World />}></Route>

      <Route path="dashboard" element={<Dashboard />} />
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
      </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();