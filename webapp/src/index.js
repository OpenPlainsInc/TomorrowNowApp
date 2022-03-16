/* The following line can be included in your src/index.js or App.js file */
import './App.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './App';
import World from './routes/world';
import Country from './routes/country'
import Dashboard from './routes/dashboard';
import Board from './routes/Board';
import BoardDetail from './routes/BoardDetail';
import Game from './routes/Game';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
      <Route path="game" element={<Game />} />
      <Route path="board" element={<Board /> } />
      <Route path="board/:rasterId" element={<BoardDetail /> } />
      <Route path="world/:unId" element={<Country /> } />
      <Route path="world" element={<World />} /> 
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
