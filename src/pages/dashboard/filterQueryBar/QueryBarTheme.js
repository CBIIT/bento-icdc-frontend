const theme = {
  overrides: {
    MuiContainer: {
      maxWidthXl: {
        '@media (min-width: 1920px)': {
          maxWidth: '100%',
        },
      },
      root: {
        '&.icdc_query_bar': {
          padding: '0px 0px 14px 0px',
          '& .filter-by-cases': {
            // color: '#ff7f15',
          },
          '& .filter-by-samples': {
            // color: '#9dc1d9',
          },
          '& .filter-by-files': {
            // color: '#667a87',
          },
        },
      },
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: '#ffffff',
        color: '#1c2023',
        maxWidth: '220px',
        fontSize: '0.75rem',
        border: '2px solid #a7afb3',
        fontFamily: 'Open Sans',
        fontWeight: '600',
        textAlign: 'left',
        lineHeight: '1.6',
        padding: '5px 12px',
        borderRadius: '0px',
      },
      arrow: {
        color: '#ffffff',
        marginTop: '-0.71em',
        marginLeft: '0px',
        marginRight: '4px',
        fontSize: '1.25rem',
        '&:before': {
          border: '2px solid #a7afb3',
        },
      },
    },
  },
};

export default theme;
