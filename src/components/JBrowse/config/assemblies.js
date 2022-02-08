export default [{
  name: 'hg19',
  aliases: ['GRCh37'],
  sequence: {
    type: 'ReferenceSequenceTrack',
    trackId: 'Pd8Wh30ei9R',
    adapter: {
      type: 'BgzipFastaAdapter',
      fastaLocation: {
        uri: 'https://jbrowse.org/genomes/hg19/fasta/hg19.fa.gz',
        locationType: 'UriLocation',
      },
      faiLocation: {
        uri: 'https://jbrowse.org/genomes/hg19/fasta/hg19.fa.gz.fai',
        locationType: 'UriLocation',
      },
      gziLocation: {
        uri: 'https://jbrowse.org/genomes/hg19/fasta/hg19.fa.gz.gzi',
        locationType: 'UriLocation',
      },
    },
  },
  refNameAliases: {
    adapter: {
      type: 'RefNameAliasAdapter',
      location: {
        uri: 'https://hgdownload.soe.ucsc.edu/goldenPath/canFam6/bigZips/canFam6.chromAlias.txt',
        locationType: 'UriLocation',
      },
    },
  },
},
{
  name: 'GRCh38',
  sequence: {
    type: 'ReferenceSequenceTrack',
    trackId: 'GRCh38-ReferenceSequenceTrack',
    adapter: {
      type: 'BgzipFastaAdapter',
      gziLocation: {
        uri: 'http://ftp.ensembl.org/pub/release-100/fasta/homo_sapiens/dna_index/Homo_sapiens.GRCh38.dna.toplevel.fa.gz.gzi',
        locationType: 'UriLocation',
      },
    },
  },
  aliases: ['hg38'],
  refNameAliases: {
    adapter: {
      type: 'RefNameAliasAdapter',
      location: {
        uri: 'https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/hg38_aliases.txt',
        locationType: 'UriLocation',
      },
    },
  },
},
];
