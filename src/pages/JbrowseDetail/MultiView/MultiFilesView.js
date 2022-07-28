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
  // setVarientUrl,
  setAlignmentUrl,
  createAlignmentTrack,
} from '../util';

const MultiFilesView = ({
  jbrowseFiles,
  options: {
    additionalTracks,
  },
}) => {
  console.log(jbrowseFiles);
  const [trackList, setTracks] = useState([]);
  const [session, setSession] = useState([]);
  console.log(session);
  const configureAdapters = () => {
    console.log('configure adapters');
    console.log(jbrowseFiles);
    const tracks = [];
    jbrowseFiles.forEach((files) => {
      const alignmentUris = setAlignmentUrl(files);
      const alignmentTrack = createAlignmentTrack(alignmentUris);
      tracks.push(alignmentTrack);
      console.log(alignmentTrack);
    });
    tracks.push(...additionalTracks);
    setTracks(tracks);
  };

  useEffect(() => {
    setSession(_.cloneDeep(defaultSession));
    if (jbrowseFiles && jbrowseFiles.length > 0) {
      configureAdapters();
    }
  }, [jbrowseFiles]);

  if (trackList && trackList.length === 0) {
    return <CircularProgress />;
  }
  console.log(trackList);

  return (
    <>
      <JBrowseComponent
        theme={theme}
        tracks={trackList}
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
