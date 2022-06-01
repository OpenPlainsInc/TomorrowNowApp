/*
 * Filename: DashboardItem.test.js
 * Project: TomorrowNow
 * File Created: Wednesday June 1st 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Wed Jun 01 2022
 * Modified By: Corey White
 * -----
 * License: GPLv3
 * 
 * Copyright (c) 2022 TomorrowNow
 * 
 * TomorrowNow is an open-source geospatial participartory modeling platform
 * to enable stakeholder engagment in socio-environmental decision-makeing.
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 * 
 */


import { render, unmountComponentAtNode } from 'react-dom';
import '@testing-library/jest-dom';
import DashboardItem from './DashboardItem';
import { act } from "react-dom/test-utils";

// https://testing-library.com/docs/react-testing-library/example-intro


describe("DashboardItem", ()=> {
    let container = null;
    beforeEach(() => {
      // setup a DOM element as a render target
      container = document.createElement("div");
      document.body.appendChild(container);
    });
    
    afterEach(() => {
      // cleanup on exiting
      unmountComponentAtNode(container);
      container.remove();
      container = null;
    });

  it("renders with or without a name", () => {
    act(() => {    
        render(<DashboardItem />, container);  });  
        expect(container.textContent).toBe("Hey, stranger");
  
        act(() => {
            render(<DashboardItem itemValue="Jenny" />, container);
        });
        expect(container.textContent).toBe("Jenny");
    
        act(() => {
            render(<DashboardItem name="Margaret" />, container);
        });
        expect(container.textContent).toBe("Margaret");
    });
});