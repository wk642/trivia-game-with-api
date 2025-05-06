import React from 'react';
import { render } from '@testing-library/react';
import GameSetup from './GameSetup'; 
import '@testing-library/jest-dom';


describe('GameSetup Component', () => {
  it('to see if it renders the game', () => {
    render(<GameSetup />);
  });
});