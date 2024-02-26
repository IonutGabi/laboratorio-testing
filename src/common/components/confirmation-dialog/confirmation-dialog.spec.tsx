import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent', () => {
  it('Should display the dialog modal with every information', () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'Hello world',
      labels: { closeButton: 'Cancelar', acceptButton: 'Aceptar' },
      children: 'Foo',
    };
    // Act
    render(<ConfirmationDialogComponent {...props} />);

    const dialogModal = screen.getByRole('dialog');
    const h2Element = screen.getByRole('heading', { level: 2 });
    const paragraphElement = screen.getByText(props.children);
    const acceptButtonElement = screen.getByRole('button', {
      name: props.labels.acceptButton,
    });
    const cancelButtonElement = screen.getByRole('button', {
      name: props.labels.closeButton,
    });
    // Assert
    expect(props.isOpen).toBeTruthy();
    expect(dialogModal).toBeInTheDocument();
    expect(h2Element.textContent).toEqual('Hello world');
    expect(paragraphElement.textContent).toEqual('Foo');
    expect(acceptButtonElement.textContent).toEqual('Aceptar');
    expect(cancelButtonElement.textContent).toEqual('Cancelar');
  });

  it('Should hidden the dialog modal when the user click on the cancel button', async () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'Hello world',
      labels: { closeButton: 'Cancelar', acceptButton: 'Aceptar' },
      children: 'Foo',
    };
    // Act
    render(<ConfirmationDialogComponent {...props} />);

    const cancelButtonElement = screen.getByRole('button', {
      name: props.labels.closeButton,
    });
    await userEvent.click(cancelButtonElement);
    // Assert
    expect(props.onClose).toHaveBeenCalled();
  });

  it('Should hidden the dialog modal when the user click on the accept button', async () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'Hello world',
      labels: { closeButton: 'Cancelar', acceptButton: 'Aceptar' },
      children: 'Foo',
    };
    // Act
    render(<ConfirmationDialogComponent {...props} />);

    const acceptButtonElement = screen.getByRole('button', {
      name: props.labels.acceptButton,
    });

    await userEvent.click(acceptButtonElement);

    // Assert
    expect(props.onAccept).toHaveBeenCalled();
    expect(props.onClose).toHaveBeenCalled();
  });
});
