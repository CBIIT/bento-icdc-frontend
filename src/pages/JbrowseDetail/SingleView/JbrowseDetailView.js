import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  JBrowseComponent,
} from 'bento-components';
import {
  assemblies,
  alignemntLocation,
  variantLocation,
  defaultSession,
  theme,
} from '../../../bento/JBrowseData';
import {
  getDefaultSession,
  getTracks,
  setVarientUrl,
  setAlignmentUrl,
} from '../util';

const JBrowseViewDetail = ({
  bamFiles,
  vcfFiles,
  options: {
    alignments,
    additionalTracks,
  },
}) => {
  const [trackList, setTracks] = useState([]);
  const [session, setSession] = useState([]);
  const [location, setLocation] = useState(alignemntLocation);
  const configureAdapters = () => {
    const alignmentUris = setAlignmentUrl(bamFiles);
    const variantUris = setVarientUrl(vcfFiles);
    setLocation(variantLocation);

    const currentTracks = getTracks({
      alignmentUris, alignments, variantUris, additionalTracks,
    });

    console.log(currentTracks);
    const initSession = getDefaultSession(currentTracks, session);
    setSession(initSession);
    setTracks(currentTracks);
  };

  useEffect(() => {
    setSession(_.cloneDeep(defaultSession));
    if (bamFiles.length > 0 || vcfFiles.length > 0) {
      configureAdapters();
    }
    if (bamFiles.length > 0) {
      setLocation(alignemntLocation);
    } else {
      setLocation(variantLocation);
    }
  }, [bamFiles, vcfFiles]);

  if (trackList.length === 0 || session.length === 0) {
    return <CircularProgress />;
  }
  console.log(location);

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

JBrowseViewDetail.defaultProps = {
  options: {
    variants: false,
    alignments: false,
  },
  bamFiles: [],
};

export default JBrowseViewDetail;
