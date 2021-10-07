import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  test('should navugate to correct program link on btn click', () => {
    const history = createMemoryHistory();
    const route = `/program/${data.program_acronym}`;
    const component = render(
      <CustomThemeProvider>
        <Router history={history}>
          <ProgramCard data={data} />
        </Router>
      </CustomThemeProvider>,
    );
    const leftClick = { button: 0 };

    const linkBtn = component.getByTestId('button');
    userEvent.click(linkBtn, leftClick);
    expect(screen.getByText('STUDIES IN THIS PROGRAM')).toBeInTheDocument();
  });
});
