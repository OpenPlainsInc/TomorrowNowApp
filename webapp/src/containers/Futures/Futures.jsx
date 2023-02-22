/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/containers/Futures/Futures.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Tuesday, May 10th 2022, 1:18:26 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */

import { Outlet } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ExistingModelsCard from "./ExistingModelsCard";
import StartNewModel from "./StartNewModel";
import DataWelcomeCard from './DataWelcomeCard';
import LearnAboutModelCard from "./LearnAboutModelCard";
import FindModelMapCard from "./FindModelMapCard";
import mockModelData from "./mockModelData";
import { useEffect, useState } from "react";
import { useToken } from "../../components/Grass/Utils/Auth/useToken";
import { useModels } from './useModels';

export default function Futures() {
  const mockModels = mockModelData()
  const {token} = useToken()
  const [mockModelss, setMockModelss] = useState(null)
  const models = useModels()
  

    return (
        <Container fluid className="bg-light text-dark" style={{paddingTop: 20, height: '100vh'}}>
          <Row>
            <Col md={4}>
              {/* <StartNewModel/> */}
              {/* <div style={{paddingTop: 20}}> */}
                <LearnAboutModelCard/>
              {/* </div> */}
              <div style={{paddingTop: 20}}>
                <DataWelcomeCard/>
              </div>
              
            </Col>
            <Col md={8}>
              <StartNewModel/>
              {
                models?.data ?
                <div style={{paddingTop: 20}}>
                  <FindModelMapCard data={models.data}/>
                </div> 
                : null
              }
              
              {/* <div style={{paddingTop: 20}}>
                <ExistingModelsCard data={mockModels}/>
              </div> */}
            </Col>
          </Row>
          <Outlet/>
        </Container>
        
    );
  }
