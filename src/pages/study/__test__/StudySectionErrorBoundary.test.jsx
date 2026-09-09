import React from 'react';
import { render, screen } from '@testing-library/react';
import StudySectionErrorBoundary from '../StudySectionErrorBoundary';
import { STUDY_DETAILS_MESSAGES } from '../constants/studyDetails';

jest.mock('../studyDiagnostics', () => ({
  logStudyDiagnostic: jest.fn(),
}));

const UnavailableSection = () => {
  throw new Error('Section rendering failed');
};

describe('Study section failures', () => {
  it('replaces only the failed section with helpful feedback', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation();

    try {
      render(
        <div>
          <main />
          <StudySectionErrorBoundary section="Overview" studyCode="TEST-STUDY">
            <UnavailableSection />
          </StudySectionErrorBoundary>
        </div>
      );
    } finally {
      consoleError.mockRestore();
    }

    expect(screen.getByRole('main')).toBeTruthy();
    expect(
      screen.getByText(STUDY_DETAILS_MESSAGES.sectionUnavailable)
    ).toBeTruthy();
  });
});
