// About.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import PrivacyPolicy from '../components/PrivacyPolicy';

test('renders PrivacyPolicy component', () => {
  render(<PrivacyPolicy />);
  
  // Using toBeTruthy() instead of toBeInTheDocument()
  const title = screen.getByText('Privacy Policy');
//  const disclosure = screen.getByText('Third-Party Disclosure.');

  expect(title).toBeTruthy();
//  expect(disclosure).toBeTruthy();
});
