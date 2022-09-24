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

export default function Futures() {
  const mockModels = mockModelData()
    return (
        <Container fluid className="bg-light text-dark" style={{paddingTop: 20, height: '100vh'}}>
          <Row>
            <Col md={4}>
              <StartNewModel/>
              <div style={{paddingTop: 20}}>
                <DataWelcomeCard/>
              </div>
              <div style={{paddingTop: 20}}>
                <LearnAboutModelCard/>
              </div>
            </Col>
            <Col md={8}>
              <FindModelMapCard data={mockModels}/>
              {/* <div style={{paddingTop: 20}}>
                <ExistingModelsCard data={mockModels}/>
              </div> */}
            </Col>
          </Row>
          
        </Container>
        
    );
  }
