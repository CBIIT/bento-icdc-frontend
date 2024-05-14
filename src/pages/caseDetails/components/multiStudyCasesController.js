import React from 'react';
import MultiStudyCases from './multiStudyCases';

const multiStudyCasesController = ({ cases, caseID }) => (
  <MultiStudyCases
    cases={cases}
    caseID={caseID}
  />
);

export default multiStudyCasesController;
