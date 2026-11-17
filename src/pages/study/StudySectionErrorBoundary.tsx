import React, { Component, ErrorInfo, ReactNode } from 'react';
import { STUDY_DETAILS_MESSAGES } from './constants/studyDetails';
import { logStudyDiagnostic } from './studyDiagnostics';

interface StudySectionErrorBoundaryProps {
  children: ReactNode;
  section: string;
  studyCode?: string;
}

interface StudySectionErrorBoundaryState {
  hasError: boolean;
}

class StudySectionErrorBoundary extends Component<
  StudySectionErrorBoundaryProps,
  StudySectionErrorBoundaryState
> {
  state: StudySectionErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): StudySectionErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    logStudyDiagnostic({
      studyCode: this.props.studyCode,
      section: this.props.section,
      errorMessage: error.message,
      ...(error.stack ? { errorStack: error.stack } : {}),
      ...(errorInfo.componentStack
        ? { componentStack: errorInfo.componentStack }
        : {}),
    });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div role="alert" style={{ padding: '32px' }}>
          {STUDY_DETAILS_MESSAGES.sectionUnavailable}
        </div>
      );
    }

    return this.props.children;
  }
}

export default StudySectionErrorBoundary;
