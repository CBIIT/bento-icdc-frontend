import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  JBrowseComponent,
} from 'bento-components';
import {
  assemblies,
  theme,
  alignment,
  variant,
  alignemntLocation,
  variantLocation,
} from '../../../bento/JBrowseData';
import {
  setVarientUrl,
  setAlignmentUrl,
  createAlignmentTrack,
  createVarientTrack,
} from '../util';

const MultiFilesView = ({
  jbrowseFiles,
  options: {
    additionalTracks,
  },
}) => {
  const [trackList, setTracks] = useState([]);
  const [location, setLocation] = useState(variantLocation);
  const configureAdapters = () => {
    const tracks = [];
    jbrowseFiles.forEach((files, index) => {
      const alignmentUris = setAlignmentUrl(files);
      const trackNumber = index + 1;
      if (alignmentUris) {
        setLocation(alignemntLocation);
        const alignment1 = _.cloneDeep(alignment);
        alignment1.trackId = `${alignment.trackId}_${trackNumber}`;
        alignment1.trackName = `${alignment.trackName}_${trackNumber}`;
        const alignmentTrack = createAlignmentTrack(alignmentUris, alignment1);
        tracks.push(alignmentTrack);
      }
      const variantUris = setVarientUrl(files);
      if (variantUris) {
        const variant1 = _.cloneDeep(variant);
        variant1.trackId = `${variant.trackId}_${trackNumber}`;
        variant1.trackName = `${variant.trackName}_${trackNumber}`;
        const variantTrack = createVarientTrack(variantUris, variant1);
        tracks.push(variantTrack);
      }
    });
    tracks.push(...additionalTracks);
    setTracks(tracks);
  };

  useEffect(() => {
    if (jbrowseFiles && jbrowseFiles.length > 0) {
      configureAdapters();
    }
  }, [jbrowseFiles]);

  if (trackList && trackList.length === 0) {
    return <CircularProgress />;
  }

  return (
    <>
      <JBrowseComponent
        theme={theme}
        tracks={trackList}
        assemblies={assemblies}
        location={location}
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
