import React from 'react';
import { render, screen } from '@testing-library/react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import ArmsAndCohort from '../cohort/ArmsAndCohort';
import * as mockStudyData from './data.json';
import { table1 } from '../../../../bento/studyDetailsData';

// 👇 Add this mock BEFORE imports that use Footer’s types at runtime
jest.mock('@bento-core/footer', () => ({
  Footer: () => <div data-testid="mock-footer">Mock Footer</div>,
}));

const CustomThemeProvider = ({ children }) => {
  const theme = createTheme({ custom: { fontFamilySans: 'sans-serif' } });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

describe('ArmsCohort', () => {
  const getComponent = data =>
    render(
      <CustomThemeProvider>
        <ArmsAndCohort studyData={data} />
      </CustomThemeProvider>
    );

  it('should render ArmsCohort component', () => {
    const component = getComponent(mockStudyData);
    expect(component).toBeDefined();
  });

  it('should render conponent when cohorts is undefined', () => {
    mockStudyData.cohorts = [];
    mockStudyData.study_arms = [
      { arm: '', cohorts: ['cohort1', 'cohort2'], description: 'description' },
    ];
    const component = getComponent(mockStudyData);
    expect(component).toBeDefined();
  });

  it('should render conponent for study without Arms or Cohorts', () => {
    mockStudyData.study_arms = [];
    const component = getComponent(mockStudyData);

    if (process.env.CI !== 'true') {
      expect(component).toMatchSnapshot();
    }

    screen.getByText(table1.noArmsCohort);
  });

  it('shows the empty state when nullable arm and cohort lists have no usable entries', () => {
    getComponent({
      study_arms: [null],
      cohorts: [null],
      study_disposition: null,
    });

    expect(screen.getByText(table1.noArmsCohort)).toBeTruthy();
  });
});
