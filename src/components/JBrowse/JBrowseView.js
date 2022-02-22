import React from 'react';
import {
  JBrowseComponent,
  FileLocation,
  Index,
  Adapter,
  Track,
} from 'bento-components';
import {
  assemblies,
  assemblyNames,
  UriLocation,
  BamAdapter,
  tracks,
} from '../../bento/JBrowseData';

const JBrowseView = () => {
  const bamFileLocation = new FileLocation(
    'https://s3.amazonaws.com/bento-bam-vcf-files/HCC1143.gathered.bam',
    UriLocation,
  );
  const index = new Index(new FileLocation(
    'https://s3.amazonaws.com/bento-bam-vcf-files/HCC1143.gathered.bam.bai',
    UriLocation,
  ));
  const adapter = new Adapter(
    BamAdapter,
    bamFileLocation,
    index,
  );

  const track = new Track(
    'my_alignments_track',
    'My Alignments',
    assemblyNames,
    'AlignmentsTrack',
    adapter,
  );
  const tracks12 = [track];
  console.log(tracks12);
  return (
    <>
      <JBrowseComponent
        tracks={tracks}
        assemblies={assemblies}
      />
    </>
  );
};

export default JBrowseView;
