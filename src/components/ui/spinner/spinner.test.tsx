import { render, screen } from '@testing-library/react'
import Spinner from './spinner'

describe('Spinner component', () => {
  it('should render correctly', () => {
    render(<Spinner />)
    screen.debug()
  })
});
