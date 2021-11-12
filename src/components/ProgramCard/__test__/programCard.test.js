import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ProgramCard from '../programCard';
import { CustomThemeProvider } from '../../ThemeContext';

const data = {
  __typename: 'program',
  program_acronym: 'CMCP',
  program_external_url: '',
  program_full_description: 'The Comparative Molecular Characterization Program (CMCP) serves as an umbrella program for the studies generating molecular data focused on comparative study of canine cancers that lack any pre-designated program affiliation.  CMCP data include multi-omics data such as whole exome sequencing, whole genome sequencing, transcriptome sequencing, and methylation sequencing from various canine cancer types.',
  program_name: 'Comparative Molecular Characterization Program',
  program_short_description: 'The Comparative Molecular Characterization Program serves as an umbrella program under which studies lacking any pre-designated program affiliation, but generating multi-omics and molecular data focused upon comparative study of canine cancers, can be grouped.',
  program_sort_order: 2,
  studies: [
    {
      __typename: 'study',
      clinical_study_designation: 'MGT01',
    },
    {
      __typename: 'study',
      clinical_study_designation: 'OSA01',
    },
    {
      __typename: 'study',
      clinical_study_designation: 'GLIOMA01',
    },
  ],
};

describe('ProgramCard', () => {
  test('Should render ProgramCard', () => {
    const history = createMemoryHistory();
    const component = render(
      <CustomThemeProvider>
        <Router history={history}>
          <ProgramCard data={data} />
        </Router>
      </CustomThemeProvider>,
    );
    expect(component).toBeDefined();
  });

  test('should render correct program header', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <CustomThemeProvider>
        <Router history={history}>
          <ProgramCard data={data} />
        </Router>
      </CustomThemeProvider>,
    );
    const headerElem = getByTestId('header');
    expect(headerElem.textContent).toBe(data.program_name);
  });

  test('should render correct program description', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <CustomThemeProvider>
        <Router history={history}>
          <ProgramCard data={data} />
        </Router>
      </CustomThemeProvider>,
    );
    const headerElem = getByTestId('content');
    expect(headerElem.textContent.trim()).toBe(data.program_short_description);
  });

  test('should render correct number of programs', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <CustomThemeProvider>
        <Router history={history}>
          <ProgramCard data={data} />
        </Router>
      </CustomThemeProvider>,
    );
    const headerElem = getByTestId('badge');
    expect(parseInt(headerElem.textContent, 10)).toBe(data.studies.length);
  });

  test('should render correct outlink', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <CustomThemeProvider>
        <Router history={history}>
          <ProgramCard data={data} />
        </Router>
      </CustomThemeProvider>,
    );
    const headerElem = getByTestId('outlink');
    expect(headerElem.textContent).toBe(data.program_external_url);
  });

  //   test('should navugate to correct program link on btn click', () => {
  //     const history = createMemoryHistory();
  //     const component = render(
  //       <CustomThemeProvider>
  //         <Router history={history}>
  //           <ProgramCard data={data} />
  //         </Router>
  //       </CustomThemeProvider>,
  //     );
  //     const leftClick = { button: 0 };

//     const linkBtn = component.getByTestId('button');
//     userEvent.click(linkBtn, leftClick);
//     expect(screen.getByText('STUDIES IN THIS PROGRAM')).toBeInTheDocument();
//   });
});