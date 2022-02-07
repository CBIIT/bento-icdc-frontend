import React from 'react';
import { JBrowseComponent } from 'bento-components';
import tracks from './config/tracks';
import assembly from './config/assembly';
import assemblies from './config/assemblies';

const JBrowseView = () => {
  return (
    <>
      <JBrowseComponent
        tracks={tracks}
        assembly={assembly}
        assemblies={assemblies}
      />
    </>
  );
};

export default JBrowseView;
