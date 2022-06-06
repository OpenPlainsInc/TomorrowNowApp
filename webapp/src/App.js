import React from "react"
import {Outlet} from "react-router-dom";
import { AuthProvider } from "./components/Grass/Utils/Auth/useAuth"
import { TopNavbar } from "./containers/TopNavbar/TopNavBar";

const App = () => {
      return (
        <main>
          <AuthProvider>   
            <TopNavbar />
            <Outlet />
          </AuthProvider>
        </main>
      )
  }
  
export default App;