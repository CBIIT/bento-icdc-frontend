export default [
  {
    trackId: 'my_alignments_track',
    name: 'My Alignments',
    assemblyNames: ['hg19'],
    type: 'AlignmentsTrack',
    adapter: {
      type: 'BamAdapter',
      bamLocation: { uri: 'https://s3.amazonaws.com/bento-bam-vcf-files/HCC1143.gathered.bam' },
      index: { location: { uri: 'https://s3.amazonaws.com/bento-bam-vcf-files/HCC1143.gathered.bam.bai' } },
    },
  },
  {
    type: 'VariantTrack',
    trackId: 'my_track',
    name: 'My Variants 123',
    assemblyNames: ['hg19', 'GRCh38'],
    adapter: {
      type: 'VcfTabixAdapter',
      vcfGzLocation: { uri: 'https://bento-bam-vcf-files.s3.amazonaws.com/NA20811.10.sorted.vcf.gz' },
      index: { location: { uri: 'https://bento-bam-vcf-files.s3.amazonaws.com/NA20811.10.sorted.vcf.gz.tbi' } },
    },
  },
  {
    type: 'BasicTrack',
    trackId:
      'GCA_000001405.15_GRCh38_full_analysis_set.refseq_annotation.sorted.gff',
    name: 'NCBI RefSeq Genes',
    assemblyNames: ['GRCh38'],
    category: ['Genes'],
    adapter: {
      type: 'Gff3TabixAdapter',
      gffGzLocation: {
        uri: 'https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/ncbi_refseq/GCA_000001405.15_GRCh38_full_analysis_set.refseq_annotation.sorted.gff.gz',
      },
      index: {
        location: {
          uri: 'https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/ncbi_refseq/GCA_000001405.15_GRCh38_full_analysis_set.refseq_annotation.sorted.gff.gz.tbi',
        },
      },
    },
  },
];
