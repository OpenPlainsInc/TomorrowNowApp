/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Locations/LocationInfo.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Tuesday, April 12th 2022, 4:03:28 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */

/**
 * Location Component
 * *******************
 * View Mapsets
 *      - Click to view Details
 * Create Mapset
 * Delete Mapset
 * View Authorized Users
 * Projection Info...
 * 
 */


import React, { useState, useEffect } from "react"
import { parserProjection } from "../Utils/jsonparsers"
import { useMapsets } from "./Mapsets/useMapsets"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MapsetsCountCard } from "./Mapsets/MapsetsCountCard";
import { Mapset } from "./Mapsets/Mapset";
import { ComputationalRegion } from "./ComputationalRegion";
import { ProjectionCardView } from "./ProjectionCardView";
import { MapsetsAdminTable } from "./Mapsets/MapsetAdminTable";

export const LocationInfo = ({locationId, grassLocation}) => {
  const [locationInfo, setLocationInfo] = useState(null)
  let locationErrors = grassLocation.errors
  const {mapsets, errors, isLoading} = useMapsets({locationName: locationId})
  const [stringProjection, setStringProjection] = useState(null)
  useEffect(() => {
    if (!grassLocation.data || locationInfo) return;
      setLocationInfo(grassLocation.data.processResults)
      setStringProjection(JSON.stringify(parserProjection(grassLocation.data.processResults.projection, ","), null, 2))
  }, [grassLocation, locationInfo])

  return (
    <div>
      
    { 

   stringProjection ?
      <>
        <Row>
          {/* <h1 data-testid="locationNameText">{locationId}</h1> */}
          <Col>
            <MapsetsAdminTable 
              mapsets={mapsets?.processResults} 
              locationName={locationId}/>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <MapsetsCountCard mapsetCount={mapsets?.processResults.length}></MapsetsCountCard>
          </Col>
          <Col md={5}>
            <ComputationalRegion region={locationInfo?.region}/>
          </Col>
          <Col md={4}>
            <ProjectionCardView projection={stringProjection}/>
          </Col>
        </Row>
      </>
      : locationErrors ? <p>{locationErrors}</p> : <></>
    }
    </div>
  )
}
