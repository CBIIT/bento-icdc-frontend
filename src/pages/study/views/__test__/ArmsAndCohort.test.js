import React from 'react';
import { adaptV4Theme } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material';
import ArmsAndCohort from '../ArmsAndCohort';
import * as mockStudyData from './data.json';

const CustomThemeProvider = ({ children }) => {
  const theme = createTheme(adaptV4Theme({ custom: { fontFamilySans: 'sans-serif' } }));
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  );
};

describe('ArmsCohort', () => {
  const getComponent = (data) => render(<CustomThemeProvider><ArmsAndCohort studyData={data} /></CustomThemeProvider>);

  it('should render ArmsCohort component', () => {
    const component = getComponent(mockStudyData);
    expect(component).toBeDefined();
  });

  it('should render conponent when cohorts is undefined', () => {
    mockStudyData.cohorts = [];
    mockStudyData.study_arms = [{ arm: '', cohorts: ['cohort1', 'cohort2'], description: 'description' }];
    const component = getComponent(mockStudyData);
    expect(component).toBeDefined();
  });

  it('should render conponent for study without Arms or Cohorts', () => {
    mockStudyData.cohorts = [];
    mockStudyData.study_arms = [];
    const component = getComponent(mockStudyData);
    expect(component).toMatchSnapshot();
    screen.getByText('This study is not divided into Arms or Cohorts');
  });
});
