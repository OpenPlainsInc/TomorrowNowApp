/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/containers/Modules/ModulesContainer.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Friday, April 22nd 2022, 12:14:54 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */
// import Modules from "../../components/Grass/Modules/Modules"
import { Outlet } from "react-router-dom";
export default function ModulesContainer() {
    return (
      <main style={{ padding: "1rem 0" }}>
        <Outlet />
      </main>
    );
  }