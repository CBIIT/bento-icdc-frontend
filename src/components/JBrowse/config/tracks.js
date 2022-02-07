export default [
  {
    type: 'GDCTrack',
    trackId: 'gdc_plugin_track',
    name: 'GDC',
    assemblyNames: ['hg38'],
    category: ['Annotation'],
    adapter: {
      GDCAdapterId: 'DefaultGDCAdapter',
      type: 'GDCAdapter',
    },
    displays: [
      {
        type: 'LinearGDCDisplay',
        displayId: 'gdc_plugin_track_linear',
        renderer: {
          color1: 'jexl:cast({LOW: \'blue\', MODIFIER: \'goldenrod\', MODERATE: \'green\', HIGH: \'red\'})[get(feature,\'consequence\').hits.edges[.node.transcript.is_canonical == true][0].node.transcript.annotation.vep_impact] || \'lightgray\'',
          labels: {
            name: 'jexl:get(feature,\'genomicDnaChange\')',
          },
          type: 'SvgFeatureRenderer',
        },
      },
    ],
  },
  {
    type: 'FeatureTrack',
    trackId: 'gencode_nclist_hg38',
    name: 'Gencode v32',
    assemblyNames: ['hg38'],
    category: ['Annotation'],
    adapter: {
      type: 'NCListAdapter',
      rootUrlTemplate: {
        uri: 'https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/gencode/{refseq}/trackData.jsonz',
      },
      refNames: [
        'chr1',
        'chr2',
        'chr3',
        'chr4',
        'chr5',
        'chr6',
        'chr7',
        'chr8',
        'chr9',
        'chr10',
        'chr11',
        'chr12',
        'chr13',
        'chr14',
        'chr15',
        'chr16',
        'chr17',
        'chr18',
        'chr19',
        'chr20',
        'chr21',
        'chr22',
        'chr23',
        'chrX',
        'chrY',
        'chrMT',
      ],
    },
    displays: [
      {
        type: 'LinearBasicDisplay',
        displayId: 'gencode_nclist_hg38_linear',
        renderer: {
          type: 'SvgFeatureRenderer',
          labels: {
            description: 'jexl:get(feature,\'gene_name\')',
          },
        },
      },
    ],
  },
];
