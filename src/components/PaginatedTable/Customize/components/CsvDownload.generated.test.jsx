// src/components/PaginatedTable/Customize/components/CsvDownload.test.jsx
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

const mockReact = React;

// Mock withStyles to inject deterministic class names without relying on JSS
jest.mock('@material-ui/styles', () => {
  return {
    withStyles: styles => Component => {
      const Wrapped = props => {
        const classes =
          styles && typeof styles === 'object'
            ? Object.keys(styles).reduce((acc, key) => {
                acc[key] = key;
                return acc;
              }, {})
            : {};
        return mockReact.createElement(Component, { ...props, classes });
      };
      Wrapped.displayName = 'WithStylesMock';
      return Wrapped;
    },
  };
});

// Explicitly mock the image import to ensure a deterministic src in tests
jest.mock(
  '../../../../assets/icons/clinical_data_csv_icon.svg',
  () => 'mock-csv-icon.svg'
);

// Mock only what's needed from bento-core: ToolTip renders children deterministically
jest.mock('../../../../bento-core', () => {
  return {
    ToolTip: props =>
      mockReact.createElement(
        'div',
        { 'data-testid': 'tooltip' },
        props.children
      ),
  };
});

// Mock downloadJson to avoid real side effects and assert it is called properly
jest.mock('../../../../pages/Cart/utils', () => ({
  downloadJson: jest.fn(),
}));

import CsvDownload from './CsvDownload';
import { downloadJson } from '../../../../pages/Cart/utils';

describe('CsvDownload component', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  describe('rendering behavior', () => {
    it('should not render anything when csvDataRow is empty', () => {
      render(<CsvDownload csvDataRow={[]} manifest={{}} fileName="file" />);

      expect(screen.queryByAltText('csv download icon')).toBeNull();
      expect(screen.queryByTestId('tooltip')).toBeNull();
    });

    it('should not render when csvDataRow is undefined (uses default [])', () => {
      render(<CsvDownload manifest={{}} fileName="file" />);

      expect(screen.queryByAltText('csv download icon')).toBeNull();
      expect(screen.queryByTestId('tooltip')).toBeNull();
    });

    it('should render tooltip and icon when csvDataRow has items', () => {
      render(
        <CsvDownload
          csvDataRow={[{ id: 1 }]}
          manifest={{}}
          fileName="test-file"
        />
      );

      const img = screen.getByAltText('csv download icon');
      expect(img).toBeTruthy();
      expect(img.getAttribute('src')).toBe('mock-csv-icon.svg');

      const tooltip = screen.getByTestId('tooltip');
      expect(tooltip).toBeTruthy();
    });
  });

  describe('interaction', () => {
    it('should call downloadJson with correct arguments when clicked', () => {
      const csvDataRow = [{ id: 1, name: 'row1' }];
      const manifest = {
        keysToInclude: ['id', 'name'],
        header: ['ID', 'Name'],
      };
      const fileName = 'MyData';

      render(
        <CsvDownload
          csvDataRow={csvDataRow}
          manifest={manifest}
          fileName={fileName}
        />
      );

      const img = screen.getByAltText('csv download icon');
      fireEvent.click(img);

      expect(downloadJson).toHaveBeenCalledTimes(1);
      expect(downloadJson).toHaveBeenCalledWith(
        csvDataRow,
        '',
        fileName,
        manifest
      );
    });

    it('should still invoke downloadJson when manifest and fileName are missing', () => {
      const csvDataRow = [{ id: 2 }];

      render(<CsvDownload csvDataRow={csvDataRow} />);

      const img = screen.getByAltText('csv download icon');
      fireEvent.click(img);

      expect(downloadJson).toHaveBeenCalledTimes(1);
      expect(downloadJson).toHaveBeenCalledWith(
        csvDataRow,
        '',
        undefined,
        undefined
      );
    });
  });
});
