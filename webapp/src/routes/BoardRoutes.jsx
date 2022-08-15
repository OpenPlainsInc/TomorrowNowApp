
import React, { Fragment} from "react"

import { Route } from "react-router-dom";
import Board from '../containers/Board/Board';
import BoardDetail from '../containers/Board/BoardDetail';
import BoardMap from '../containers/Board/BoardMap';

const BoardRoutes = (
  <Fragment>
    <Route path="board/location/:locationId/mapset/:mapsetId/raster/:rasterId/map" element={<BoardMap /> } />
    <Route path="board/location/:locationId/mapset/:mapsetId/raster/:rasterId" element={<BoardDetail /> } />
    <Route path="board/location/:locationId/mapset/:mapsetId" element={<Board /> } />
    <Route path="board" element={<Board /> } />
    
  </Fragment>
)

export default BoardRoutes



