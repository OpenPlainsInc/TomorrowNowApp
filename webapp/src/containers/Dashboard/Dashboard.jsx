import { DashboardItem } from "./DashboardItem";
import { DashboardList } from "./DashboardList";
import { Spinner } from "react-bootstrap";
import { useDataSource } from "../../components/Grass/Utils";
import Grass from "../../components/Grass/grass";

export default function Dashboard() {
  const rasters = useDataSource({getDataFunc: Grass.getRasterLayers, params: ['nc_spm_08', 'PERMANENT']})

  let title = 'Dashboard'
  let style =   { padding: "1rem 0" }
  
  return (
     
      <main style={style}>
        <h2>{title}</h2>
        <DashboardList>
          { rasters.data ?
            rasters.data.map(item => {
              return( <DashboardItem key={item} itemValue={item}/> )
            })
            : rasters.isloading ? <Spinner animation="border" /> : null
          }
        </DashboardList>
       
      </main>
    );
  }