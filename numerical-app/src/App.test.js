import { render, screen } from '@testing-library/react';
import App from './App';

test('renders error', () => {
  render(<App />);
  screen.debug()
});
