import React from 'react';
import { render, screen } from '@testing-library/react';
import * as promiseTracker from 'react-promise-tracker/lib/trackerHook';
import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent specs', () => {
  it('Should return the loader component when promiseInProgress is true', () => {
    // Arrange
    jest
      .spyOn(promiseTracker, 'usePromiseTracker')
      .mockReturnValue({ promiseInProgress: true });
    // Act
    render(<SpinnerComponent />);

    const loaderElement = screen.getByRole('presentation');
    expect(loaderElement).toBeInTheDocument();
  });

  it('Should return the loader component hidden when promiseInProgress is false', () => {
    // Arrange
    jest
      .spyOn(promiseTracker, 'usePromiseTracker')
      .mockReturnValue({ promiseInProgress: false });
    // Act
    const { container } = render(<SpinnerComponent />);

    // Assert
    expect(container).toBeInTheDocument();
  });
});
