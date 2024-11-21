import { render, screen } from '@testing-library/react';
import UniversityTableBody from './universityTableBody';

describe('UniversityTableBody component', () => {
  it('should render correctly', () => {
    render(<UniversityTableBody isLoading={true} rows={[]}/>)
    screen.debug()
  });
});
