
import React, { Fragment} from "react"

import {Route} from "react-router-dom";
import Game from '../containers/Game/Game';

const GameRoutes = (
  <Fragment>
      <Route path="game" element={<Game />} />
  </Fragment>
)

export default GameRoutes



