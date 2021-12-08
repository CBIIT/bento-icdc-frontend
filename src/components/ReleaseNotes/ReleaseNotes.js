import { useEffect } from 'react';

const ReleaseNotes = () => {
  useEffect(() => {
    window.open('https://github.com/CBIIT/bento-icdc-frontend/releases/tag/v3.2.0-507', '_blank');
  });

  return null;
};

export default ReleaseNotes;
