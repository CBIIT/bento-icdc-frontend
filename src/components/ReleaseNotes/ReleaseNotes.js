/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router';

const ReleaseNotes = () => {
  const history = useHistory();

  useEffect(() => {
    window.open('https://github.com/CBIIT/bento-icdc-frontend/releases/tag/v3.2.0-507', '_blank');
  });

  return <Redirect to={history.location} />;
};

export default ReleaseNotes;
