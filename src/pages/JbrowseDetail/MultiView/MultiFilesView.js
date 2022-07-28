import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  JBrowseComponent,
} from 'bento-components';
import {
  assemblies,
  theme,
  defaultSession,
} from '../../../bento/JBrowseData';
import {
  setVarientUrl,
  setAlignmentUrl,
} from '../util';

const MultiFilesView = ({
  jbrowseFiles,
}) => {
  console.log(jbrowseFiles);
  const [session, setSession] = useState([]);
  console.log(session);
  const configureAdapters = () => {
    console.log('configure adapters');
    console.log(jbrowseFiles);
    // const tracks = [];
    jbrowseFiles.forEach((tracks) => {
      tracks.forEach((track) => {
        console.log(track);
        const alignmentUris = setAlignmentUrl(tracks);
        const variantUris = setVarientUrl(tracks);
        console.log(alignmentUris);
        console.log(variantUris);
      });
    });
  };

  useEffect(() => {
    setSession(_.cloneDeep(defaultSession));
    if (jbrowseFiles && jbrowseFiles.length > 0) {
      configureAdapters();
    }
  }, [jbrowseFiles]);

  if (session && session.length === 0) {
    return <CircularProgress />;
  }

  return (
    <>
      <JBrowseComponent
        theme={theme}
        assemblies={assemblies}
      />
    </>
  );
};

MultiFilesView.defaultProps = {
  options: {
    variants: false,
    alignments: false,
  },
  bamFiles: [],
};

export default MultiFilesView;
