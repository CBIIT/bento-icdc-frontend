// src/components/PaginatedTable/Customize/components/DeleteButton.generated.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DeleteButton from './DeleteButton';

// Import the asset so our expectation matches whatever moduleNameMapper provides
import mockedDeleteIcon from '../../assets/deleteIcon.svg';

describe('DeleteButton', () => {
  it('renders the delete icon button and image with correct alt and a deterministic src', () => {
    render(
      <DeleteButton
        row={{ id: 1 }}
        onDeleteRow={jest.fn()}
        deleteCartFile={jest.fn()}
      />
    );

    const button = screen.getByRole('button', { name: /delete/i });
    expect(button).toBeTruthy();

    const img = screen.getByAltText('delete');
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe(mockedDeleteIcon);
  });

  it('calls deleteCartFile with row and onDeleteRow when clicked (happy path)', () => {
    const row = { id: 'row-123' };
    const onDeleteRow = jest.fn();
    const deleteCartFile = jest.fn();

    render(
      <DeleteButton
        row={row}
        onDeleteRow={onDeleteRow}
        deleteCartFile={deleteCartFile}
      />
    );

    const button = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(button);

    expect(deleteCartFile).toHaveBeenCalledTimes(1);
    expect(deleteCartFile).toHaveBeenCalledWith(row, onDeleteRow);
  });

  it('passes undefined row to deleteCartFile when row is not provided (edge case)', () => {
    const onDeleteRow = jest.fn();
    const deleteCartFile = jest.fn();

    render(
      <DeleteButton onDeleteRow={onDeleteRow} deleteCartFile={deleteCartFile} />
    );

    const button = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(button);

    expect(deleteCartFile).toHaveBeenCalledTimes(1);
    expect(deleteCartFile).toHaveBeenCalledWith(undefined, onDeleteRow);
  });

  it('passes undefined onDeleteRow to deleteCartFile when onDeleteRow is not provided (edge case)', () => {
    const row = { id: 'row-xyz' };
    const deleteCartFile = jest.fn();

    render(<DeleteButton row={row} deleteCartFile={deleteCartFile} />);

    const button = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(button);

    expect(deleteCartFile).toHaveBeenCalledTimes(1);
    expect(deleteCartFile).toHaveBeenCalledWith(row, undefined);
  });

  it('renders without crashing when deleteCartFile is missing', () => {
    const row = { id: 'row-error' };
    const onDeleteRow = jest.fn();

    render(<DeleteButton row={row} onDeleteRow={onDeleteRow} />);

    const button = screen.getByRole('button', { name: /delete/i });
    expect(button).toBeTruthy();
  });
});
