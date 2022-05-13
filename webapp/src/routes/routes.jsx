import {Route} from "react-router-dom";
import App from "../App"
import GameRoutes from "./GameRoutes";
import BoardRoutes from "./BoardRoutes"
import DashboardRoutes from "./DashboardRoutes";
import HomeRoutres from "./HomeRoutes";
import SettingsRoutes from "./SettingsRoutes";
import ModuleRouters from "./ModuleRoutes";
import AuthRoutes from "./AuthRoutes";

const routes = (
    <Route path="/" element={<App />}>
        {AuthRoutes}
        {HomeRoutres}
        {GameRoutes}
        {BoardRoutes}
        {DashboardRoutes}
        {ModuleRouters}
        {SettingsRoutes}
        <Route path="*"
            element={
            <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
            </main>
            }
        />
    </Route>
  )

  export default routes