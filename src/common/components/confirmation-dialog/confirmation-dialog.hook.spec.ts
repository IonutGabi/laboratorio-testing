import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useConfirmationDialog } from './confirmation-dialog.hook';
import { Lookup } from 'common/models';

describe('useConfirmationDialog', () => {
  it('Should return an empty object initially', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useConfirmationDialog());
    // Assert
    expect(result.current.isOpen).toBeFalsy();
    expect(result.current.itemToDelete).toEqual<Lookup>({ id: '', name: '' });
    expect(result.current.onAccept).toEqual(expect.any(Function));
    expect(result.current.onClose).toEqual(expect.any(Function));
    expect(result.current.onOpenDialog).toEqual(expect.any(Function));
  });

  it('Should set new object when the function onAccept is called', () => {
    // Arrange
    const newItem: Lookup = { id: '', name: '' };
    // Act

    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onAccept();
    });

    // Assert

    expect(result.current.itemToDelete).toEqual<Lookup>(newItem);
  });

  it('Should set isOpen to false when the function onClose is called', () => {
    // Arrange
    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onClose();
    });
    // Assert
    expect(result.current.isOpen).toBeFalsy();
  });

  it('Should set isOpen to true and update itemToDelete with a new object when onOpenDialog is called', () => {
    // Arrange
    const newItem: Lookup = { id: '', name: '' };
    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog(newItem);
    });
    // Assert
    expect(result.current.isOpen).toBeTruthy();
    expect(result.current.itemToDelete).toEqual<Lookup>(newItem);
  });
});
