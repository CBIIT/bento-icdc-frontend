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
          padding: '0',
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
  },
};

export default theme;
