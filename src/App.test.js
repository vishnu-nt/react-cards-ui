import { render, screen } from '@testing-library/react';
import App from './App';

test('renders If you buy text', () => {
  render(<App />);
  const linkElement = screen.getByText(/If you buy/i);
  expect(linkElement).toBeInTheDocument();
});
