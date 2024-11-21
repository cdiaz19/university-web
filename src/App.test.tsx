import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  it('should render correctly', () => {
    render(<App />);
    screen.debug();
  });

  it('renders the heading and "Add University" button', () => {
    render(<App />);

    expect(screen.getByText(/University Management/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add University/i })).toBeInTheDocument();
  })
});
