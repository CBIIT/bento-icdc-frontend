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
  VariantAdapter,
  FILE_TYPE_BAM,
  FILE_TYPE_BAI,
  FILE_TYPE_VCF,
  FILE_TYPE_VCF_INDEX,
  alignment,
  variant,
  chunkSizeLimit,
  alignemntLocation,
  variantLocation,
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

const getVariant = ({ vcfGzLocationUri, indexUri }) => {
  const varFileLocation = new FileLocation(
    vcfGzLocationUri,
    UriLocation,
  );
  const variantIndex = new Index(new FileLocation(
    indexUri,
    UriLocation,
  ));
  const adapter = {
    type: VariantAdapter,
    vcfGzLocation: varFileLocation,
    index: variantIndex,
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

      if (item.type === variant.type) {
        const display = new Display(
          variant.display,
          variant.height,
          variant.maxDisplayedBpPerPx,
          `${item.trackId}-${variant.display}`,
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
  alignmentUris, variantUris, optionalTracks,
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

  if (variantUris.file_name) {
    const variantAdapter = getVariant(variantUris);
    const variantOpts = new Track(
      variant.trackId,
      variant.trackName,
      assemblyNames,
      variant.type,
      variantAdapter,
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
      alignmentUris, alignments, variantUris, optionalTracks,
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
