import {Route} from "react-router-dom";
import App from "../App"
import GameRoutes from "./GameRoutes";
import BoardRoutes from "./BoardRoutes"
import DashboardRoutes from "./DashboardRoutes";
import WorldRoutes from "./WorldRoutes"
import HomeRoutres from "./HomeRoutes";
import SettingsRoutes from "./SettingsRoutes";
const routes = (
    <Route path="/" element={<App />}>
        {HomeRoutres}
        {GameRoutes}
        {BoardRoutes}
        {WorldRoutes}
        {DashboardRoutes}
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