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
  height,
  maxDisplayedBpPerPx,
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

const getSessionDisplayValue = (display, trackId) => new Display(
  display,
  height,
  maxDisplayedBpPerPx,
  `${trackId}-${display}`,
);

const getDefaultSession = (tracks, session) => {
  if (tracks && tracks.length > 0) {
    tracks.forEach((item) => {
      let display;
      switch (item.type) {
        case alignment.type:
          display = getSessionDisplayValue(alignment.display, alignment.trackId);
          break;
        case variant.type:
          display = getSessionDisplayValue(variant.display, variant.trackId);
          break;
        default:
          display = getSessionDisplayValue(item.display, item.trackId);
          break;
      }
      const viewTrack = new ViewTrack(
        item.type,
        item.trackId,
        [{ ...display }],
      );
      session.view.tracks.push({ ...viewTrack });
    });
  }
  return session;
};

const getTracks = ({
  alignmentUris, variantUris, additionalTracks,
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
  allTracks.push(...additionalTracks);
  return allTracks;
};

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
