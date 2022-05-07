/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Modules/Module.test.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Tuesday, April 12th 2022, 4:05:52 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


import { render, screen } from '@testing-library/react';
import Module from './Module';

test('renders module component', () => {
  render(<Module moduleName="r.basin" />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

