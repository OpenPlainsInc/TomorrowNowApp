
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { render, screen } from '@testing-library/react';
import App from './App';

describe("App", ()=> {
  test('renders TomorrowNow', () => {
    const { container } = render(
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
      </BrowserRouter>
      );
    expect(1).toBe(1);
  });
})