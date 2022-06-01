import { DashboardItem } from "./DashboardItem";
import { DashboardList } from "./DashboardList";
import { useDataSource } from "../../components/Grass/Utils";
import Grass from "../../components/Grass/grass";
import { useEffect, useState } from "react";
export default function Dashboard() {

  const rasters = useDataSource(Grass.getRasterLayers('nc_spm_08', 'PERMANENT')) 
  let title = 'Dashboard'
  let style =   { padding: "1rem 0" }
  // const [rasters, setRasters] = useState(null)

  // useEffect(()=> {
  //   if (rasters) return;

  //   let isMounted = true;
  //   (async () => {
  //       let result = await Grass.getRasterLayers('nc_spm_08', 'PERMANENT')    
  //       console.log(result)      
  //       setRasters(result)
  //   })()
  //   return () => { isMounted = false } 
  // }, [rasters])
  
  return (
     
      <main style={style}>
        <h2>{title}</h2>
        <DashboardList>
          { rasters ?
            rasters.map(item => {
              return( <DashboardItem key={item} itemValue={item}/> )
            })
            : null
          }
        </DashboardList>
       
      </main>
    );
  }