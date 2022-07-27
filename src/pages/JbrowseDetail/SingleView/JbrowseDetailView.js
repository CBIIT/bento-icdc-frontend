import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  JBrowseComponent,
} from 'bento-components';
import {
  assemblies,
  FILE_TYPE_BAM,
  FILE_TYPE_BAI,
  FILE_TYPE_VCF,
  FILE_TYPE_VCF_INDEX,
  alignemntLocation,
  variantLocation,
  defaultSession,
  theme,
} from '../../../bento/JBrowseData';
import {
  getDefaultSession,
  getTracks,
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
    const alignmentUris = {};

    if (bamFiles.length > 0 && alignments) {
      bamFiles.forEach((file) => {
        alignmentUris.file_name = file.file_name;
        if (file.file_type === FILE_TYPE_BAM) {
          alignmentUris.bamLocationUri = file.file_location;
        }
        if (file.file_type === FILE_TYPE_BAI) {
          alignmentUris.indexUri = file.file_location;
        }
      });
    }

    const variantUris = {};
    if (vcfFiles.length > 0) {
      vcfFiles.forEach((file) => {
        variantUris.file_name = file.file_name;
        if (file.file_type === FILE_TYPE_VCF) {
          variantUris.vcfGzLocationUri = file.file_location;
        }
        if (file.file_type === FILE_TYPE_VCF_INDEX) {
          variantUris.indexUri = file.file_location;
        }
        setLocation(variantLocation);
      });
    }

    const currentTracks = getTracks({
      alignmentUris, alignments, variantUris, additionalTracks,
    });

    const initSession = getDefaultSession(currentTracks, session);
    setSession(initSession);
    setTracks(currentTracks);
  };

  useEffect(() => {
    setSession(_.cloneDeep(defaultSession));
    if (bamFiles.length > 0 || vcfFiles.length > 0) {
      configureAdapters();
    }
  }, [bamFiles, vcfFiles]);

  if (trackList.length === 0 || session.length === 0) {
    return <CircularProgress />;
  }

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
