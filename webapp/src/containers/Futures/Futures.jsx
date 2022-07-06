/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/containers/Futures/Futures.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Tuesday, May 10th 2022, 1:18:26 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */

import { Outlet } from "react-router-dom";
export default function Futures() {
    return (
      <main style={{ padding: "1rem 0" }}>
        <Outlet />
      </main>
    );
  }
