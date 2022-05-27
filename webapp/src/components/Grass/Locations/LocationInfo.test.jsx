/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Locations/LocationInfo.test.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Tuesday, April 12th 2022, 4:04:04 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


import { LocationInfo } from "./LocationInfo"
import React from "react";
import { render, getByTestId } from '@testing-library/react'
import { ProjectionInfoModel } from "../Utils/Models/ProjectionInfoModel";
import '@testing-library/jest-dom'
// https://testing-library.com/docs/react-testing-library/example-intro
describe("LocationInfo", ()=> {
    const projectionInfo = new ProjectionInfoModel({espg: '4326'})
    const locationName = "nc_spm_08"
    const projection = "WGS84"
    const region = "region"
    it("renders with location name displayed", () => {
        const { container } = render(<LocationInfo name={locationName} projection={projection} region={region}/>);
        let locationNameText = getByTestId(container, 'locationNameText')
        expect(locationNameText.textContent).toBe(locationName);
    });
})