import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  JBrowseComponent,
  FileLocation,
  Index,
  Adapter,
  Track,
  Display,
  ViewTrack,
} from 'bento-components';
import {
  assemblies,
  assemblyNames,
  UriLocation,
  BamAdapter,
  FILE_TYPE_BAM,
  FILE_TYPE_BAI,
  alignment,
  chunkSizeLimit,
  location,
  defaultSession,
} from '../../bento/JBrowseData';

const getAdapter = ({ bamLocationUri, indexUri }) => {
  const bamFileLocation = new FileLocation(
    bamLocationUri,
    UriLocation,
  );
  const index = new Index(new FileLocation(
    indexUri,
    UriLocation,
  ));
  return new Adapter(
    BamAdapter,
    bamFileLocation,
    index,
  );
};

const getDefaultSession = (alignments, session) => {
  if (alignments && alignments.length > 0) {
    alignments.forEach((item) => {
      const display = new Display(
        alignment.display,
        alignment.height,
        alignment.maxDisplayedBpPerPx,
        `${item.trackId}-${alignment.display}`,
      );
      const viewTrack = new ViewTrack(
        item.type,
        item.trackId,
        [{ ...display }],
      );
      console.log('test');
      session.view.tracks.push({ ...viewTrack });
    });
  }
  return session;
};

const getTracks = ({
  alignments, alignmentUris,
}) => {
  const allTracks = [];
  if (alignments) {
    const aligmentAdapter = getAdapter(alignmentUris);
    aligmentAdapter.chunkSizeLimit = chunkSizeLimit;
    const alignmentOpts = new Track(
      alignment.trackId,
      alignment.trackName,
      assemblyNames,
      alignment.type,
      aligmentAdapter,
    );
    allTracks.push(alignmentOpts);
  }
  return allTracks;
};

const JBrowseViewDetail = ({
  bamFiles,
  options: {
    variants,
    alignments,
    variantsUris,
  },
}) => {
  const [trackList, setTracks] = useState([]);
  const [session, setSession] = useState([]);
  const configureAdapters = () => {
    const alignmentUris = {};

    if (alignments) {
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

    const currentTracks = getTracks({
      alignmentUris, variantsUris, alignments, variants,
    });

    const initSession = getDefaultSession(currentTracks, session);
    setSession(initSession);
    setTracks(currentTracks);
  };

  useEffect(() => {
    setSession(_.cloneDeep(defaultSession));
    if (bamFiles.length > 0) {
      configureAdapters();
    }
  }, [bamFiles]);

  if (trackList.length === 0 || session.length === 0) {
    return <CircularProgress />;
  }

  return (
    <>
      <JBrowseComponent
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
