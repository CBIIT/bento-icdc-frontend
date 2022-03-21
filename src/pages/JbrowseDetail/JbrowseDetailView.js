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
  VarientAdapter,
  FILE_TYPE_BAM,
  FILE_TYPE_BAI,
  FILE_TYPE_VCF,
  FILE_TYPE_VCF_INDEX,
  alignment,
  varient,
  chunkSizeLimit,
  location,
  defaultSession,
  theme,
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

const getVarient = ({ vcfGzLocationUri, indexUri }) => {
  const varFileLocation = new FileLocation(
    vcfGzLocationUri,
    UriLocation,
  );
  const varientIndex = new Index(new FileLocation(
    indexUri,
    UriLocation,
  ));
  const adapter = {
    type: VarientAdapter,
    vcfGzLocation: varFileLocation,
    index: varientIndex,
  };
  return adapter;
};

const getDefaultSession = (alignments, session) => {
  if (alignments && alignments.length > 0) {
    alignments.forEach((item) => {
      if (item.type === alignment.type) {
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
        session.view.tracks.push({ ...viewTrack });
      }
    });
  }
  return session;
};

const getTracks = ({
  alignmentUris, varientUris, optionalTracks,
}) => {
  const allTracks = [];
  if (alignmentUris.file_name) {
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

  if (varientUris.file_name) {
    const varientAdapter = getVarient(varientUris);
    const variantOpts = new Track(
      varient.trackId,
      varient.trackName,
      assemblyNames,
      varient.type,
      varientAdapter,
    );
    allTracks.push(variantOpts);
  }
  optionalTracks.forEach((track) => {
    if (track.display) {
      allTracks.push(track);
    }
  });
  return allTracks;
};

const JBrowseViewDetail = ({
  bamFiles,
  vcfFiles,
  options: {
    alignments,
    optionalTracks,
  },
}) => {
  const [trackList, setTracks] = useState([]);
  const [session, setSession] = useState([]);
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

    const varientUris = {};
    if (vcfFiles.length > 0) {
      vcfFiles.forEach((file) => {
        varientUris.file_name = file.file_name;
        if (file.file_type === FILE_TYPE_VCF) {
          varientUris.vcfGzLocationUri = file.file_location;
        }
        if (file.file_type === FILE_TYPE_VCF_INDEX) {
          varientUris.indexUri = file.file_location;
        }
      });
    }

    const currentTracks = getTracks({
      alignmentUris, alignments, varientUris, optionalTracks,
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
