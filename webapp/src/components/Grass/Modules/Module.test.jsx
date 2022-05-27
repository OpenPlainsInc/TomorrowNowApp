/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Modules/Module.test.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Tuesday, April 12th 2022, 4:05:52 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */

import { render, screen } from '@testing-library/react';
import {Router} from 'react-router-dom'
// import { shallow } from "enzyme"
import {createMemoryHistory} from 'history';
import '@testing-library/jest-dom';
import Module from './Module';
// https://testing-library.com/docs/react-testing-library/example-intro


describe("Module", ()=> {
  test('renders GRASS module component', () => {
    const history = createMemoryHistory()
    render(
      <Router location={history.location} navigator={history}>
        <Module moduleName="r.basin" />
      </Router>
    )
    const linkElement = screen.getByText(/r.basin/i);
    expect(linkElement).toBeInTheDocument();
  });
});
