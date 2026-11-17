import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CsvDownload from '../CsvDownload';
import { downloadJson } from '../../../../../pages/Cart/utils';
import {
  CLINICAL_DATA_MESSAGES,
  getDownloadCountMismatchTooltip,
  getDownloadUnavailableTooltip,
} from '../../../../../pages/study/constants/clinicalData';

jest.mock('../../../../../pages/Cart/utils', () => ({
  downloadJson: jest.fn(),
}));

jest.mock('../../../../../bento-core', () => ({
  ToolTip: ({ children, title }) => (
    <div>
      <span>{title}</span>
      {children}
    </div>
  ),
}));

describe('CSV download availability', () => {
  it('explains why an unavailable download cannot be selected', () => {
    render(
      <CsvDownload
        clinicalDataNode="visit"
        csvDataRow={[]}
        csvDownloadUnavailable
      />
    );

    const downloadIcon = screen.getByRole('img', {
      name: CLINICAL_DATA_MESSAGES.downloadIconAlt,
    });

    expect(downloadIcon.parentElement.getAttribute('aria-disabled')).toBe(
      'true'
    );
    expect(
      screen.getByText(getDownloadUnavailableTooltip('Visit'))
    ).toBeTruthy();

    fireEvent.click(downloadIcon);
    expect(downloadJson).not.toHaveBeenCalled();
  });

  it('explains when reported records have no available CSV data', () => {
    render(
      <CsvDownload
        clinicalDataNode="visit"
        csvDataRow={[]}
        csvDownloadUnavailable
        csvDownloadCountMismatch
      />
    );

    expect(
      screen.getByText(getDownloadCountMismatchTooltip('Visit'))
    ).toBeTruthy();
  });
});
