
import React, { Fragment} from "react"

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Board from '../containers/Board/Board';
import BoardDetail from '../containers/Board/BoardDetail';

const BoardRoutes = (
  <Fragment>
    <Route path="board" element={<Board /> } />
    <Route path="board/:rasterId" element={<BoardDetail /> } />
  </Fragment>
)

export default BoardRoutes



