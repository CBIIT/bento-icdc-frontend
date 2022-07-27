import axios from 'axios';
import {
  FileLocation,
  Index,
  Adapter,
  Track,
  Display,
  ViewTrack,
} from 'bento-components';
import {
  assemblyNames,
  UriLocation,
  BamAdapter,
  VariantAdapter,
  alignment,
  variant,
  chunkSizeLimit,
  height,
  maxDisplayedBpPerPx,
} from '../../bento/JBrowseData';
import env from '../../utils/env';

const FILE_SERVICE_API = env.REACT_APP_FILE_SERVICE_API;

export const getAdapter = ({ bamLocationUri, indexUri }) => {
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

export const getVariant = ({ vcfGzLocationUri, indexUri }) => {
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

export const getSessionDisplayValue = (display, trackId) => new Display(
  display,
  height,
  maxDisplayedBpPerPx,
  `${trackId}-${display}`,
);

export const getDefaultSession = (tracks, session) => {
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

export const getTracks = ({
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

export const getAllFilesUri = async (file) => {
  const resp = await axios.get(
    `${FILE_SERVICE_API}${file.file_uuid}`,
    {
      headers: {
        'Content-Type': 'application/pdf',
      },
    },
  );
  return {
    file_location: resp.data,
    file_type: `${file.file_name}`.split('.').pop(),
    file_name: file.file_name,
  };
};
