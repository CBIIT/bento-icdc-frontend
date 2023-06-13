import React from 'react';
import { render, screen } from '@testing-library/react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import ArmsAndCohort from '../ArmsAndCohort';
import * as mockStudyData from './data.json';

const CustomThemeProvider = ({ children }) => {
  const theme = createTheme({ custom: { fontFamilySans: 'sans-serif' } });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
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
