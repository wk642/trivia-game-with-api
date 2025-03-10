import React from 'react';
import { render } from '@testing-library/react';
import GameSetup from './GameSetup'; 

describe('GameSetup Component', () => {
  test('to see if it renders the game', () => {
    render(<GameSetup />);
  });
});