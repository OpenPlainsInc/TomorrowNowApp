/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Locations/Mapsets/Mapset.test.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Tuesday, April 12th 2022, 4:04:12 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */

import { Mapset } from "./Mapset"
import React from "react";
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
// https://testing-library.com/docs/react-testing-library/example-intro
describe("Mapset", ()=> {
    const locationName = "nc_spm_08"
    const mapsetName = "PERMANENT"
    it("Mapset loads with initial state of null", () => {
        const { container } = render(<Mapset locationName={locationName} mapsetName={mapsetName} />);
        expect(container.textContent).toBe(`${locationName}: ${mapsetName}`);
    });
})
