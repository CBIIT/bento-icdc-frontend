// /Users/ranaab/Documents/repository/workspace/bento-icdc-frontend/src/components/PaginatedTable/Customize/DataAvailability/HeaderCell.generated.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import DataAvailabilityHeader from './HeaderCell.jsx';

describe('DataAvailabilityHeader', () => {
  it('should render an img with provided src and alt (happy path)', () => {
    // Arrange
    const icon = 'mock-flag.png';
    const dataField = 'US Flag';

    // Act
    render(<DataAvailabilityHeader icon={icon} dataField={dataField} />);

    // Assert
    const img = screen.getByAltText(dataField);
    expect(img).toBeTruthy();

    // jsdom may turn relative srcs into absolute; use contains for determinism
    expect(img.getAttribute('src')).toContain(icon);

    // withStyles should inject a class
    expect(img.className).toBeTruthy();
  });

  it('should render img with empty alt when dataField is an empty string (edge case)', () => {
    // Arrange
    const icon = 'mock-flag.png';
    const dataField = '';

    // Act
    render(<DataAvailabilityHeader icon={icon} dataField={dataField} />);

    // Assert
    const img = screen.getByAltText(dataField); // empty string
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toContain(icon);
  });

  it('should render img without alt attribute when dataField is undefined (null/undefined case)', () => {
    // Arrange
    const icon = 'mock-flag.png';

    // Act
    const { container } = render(<DataAvailabilityHeader icon={icon} />);

    // Assert
    const img = container.querySelector('img');
    expect(img).toBeTruthy();
    // alt is not set when undefined
    expect(img.hasAttribute('alt')).toBe(false);
    expect(img.getAttribute('src')).toContain(icon);
  });

  it('should render img without src attribute when icon is undefined (invalid input)', () => {
    // Arrange
    const dataField = 'No Icon';

    // Act
    const { container } = render(
      <DataAvailabilityHeader dataField={dataField} />
    );

    // Assert
    const img = container.querySelector('img');
    expect(img).toBeTruthy();
    // React omits attribute when value is undefined
    expect(img.hasAttribute('src')).toBe(false);
    // alt should be present with provided dataField
    expect(img.getAttribute('alt')).toBe(dataField);
  });

  it('should render even when both icon and dataField are undefined (robustness)', () => {
    // Act
    const { container } = render(<DataAvailabilityHeader />);

    // Assert
    const img = container.querySelector('img');
    expect(img).toBeTruthy();
    // Both attributes omitted when undefined
    expect(img.hasAttribute('src')).toBe(false);
    expect(img.hasAttribute('alt')).toBe(false);
    // withStyles should still inject a non-empty class
    expect(img.className).toBeTruthy();
  });
});
