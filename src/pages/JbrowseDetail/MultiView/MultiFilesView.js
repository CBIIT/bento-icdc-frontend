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
  alignment,
  variant,
  alignemntLocation,
  variantLocation,
} from '../../../bento/JBrowseData';
import {
  setVarientUrl,
  setAlignmentUrl,
  createAlignmentTrack,
  getDefaultSession,
  createVarientTrack,
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
  const [location, setLocation] = useState(variantLocation);
  console.log(session);
  const configureAdapters = () => {
    console.log('configure adapters');
    console.log(jbrowseFiles);
    const tracks = [];
    jbrowseFiles.forEach((files, index) => {
      const alignmentUris = setAlignmentUrl(files);
      if (alignmentUris) {
        setLocation(alignemntLocation);
        const alignmentTrack = createAlignmentTrack(alignmentUris, `${alignment.trackId}_${index}`);
        tracks.push(alignmentTrack);
      }
      const varientUris = setVarientUrl(files);
      if (varientUris) {
        const varientTrack = createVarientTrack(varientUris, `${variant.trackId}_${index}`);
        tracks.push(varientTrack);
      }
    });
    tracks.push(...additionalTracks);
    setTracks(tracks);
    console.log(tracks);
    const initSession = getDefaultSession(additionalTracks, session);
    setSession(initSession);
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
        location={location}
        defaultSession={session}
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
