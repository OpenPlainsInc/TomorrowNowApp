
import React, { Fragment} from "react"

import { Route } from "react-router-dom";
import Board from '../containers/Board/Board';
import BoardDetail from '../containers/Board/BoardDetail';
import BoardMap from '../containers/Board/BoardMap';

const BoardRoutes = (
  <Fragment>
    <Route path="board/map/:rasterId" element={<BoardMap /> } />
    <Route path="board/:rasterId" element={<BoardDetail /> } />
    <Route path="board" element={<Board /> } />
    
  </Fragment>
)

export default BoardRoutes



