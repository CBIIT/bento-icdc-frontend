import React from 'react';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import {
  Typography,
  withStyles,
  Link,
  Box,
  List,
  ListItem,
} from '@material-ui/core';
import { ToolTip as Tooltip } from '../../../../bento-core';
import {
  multiStudyData,
} from '../../../../bento/dashboardTabData';

const theme = {
  overrides: {
    MuiLink: {
      root: {
        color: '#DC762F',
        fontSize: '14px',
        fontFmily: 'Open Sans',
        fontWeight: 'bold',
        lineSpacing: '19pt',
        textDecoration: 'underline',
      },
    },
    MuiTooltip: {
      toottip: {
        borderRadius: '8%',
        padding: 'auto',
        maxWidth: '250px',
        '&#customTooltip': {
          borderRadius: '8%',
        },
      },
    },
    MuiTypography: {
      root: {
        '&#descripText': {
          fontWeight: '600',
          fontSize: '14px',
          letterSpacing: '0.05px',
          lineHeight: '18px',
          paddingBottom: '5px',
        },
        '&#viewAllCases': {
          color: '#DC762F',
          fontSize: '14px',
          textDecoration: 'underline',
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
      alignCenter: {
        fontSize: '14px',
      },
    },
    MuiList: {
      root: {
        listStyleType: 'none',
        padding: '0px',
      },
      padding: {
        paddingBottom: '0px',
      },
    },
    MuiListItem: {
      root: {
        padding: '0px',
      },
      gutters: {
        fontSize: '14px',
        lineHeight: '18px',
        paddingTop: '1px',
        paddingBottom: '1px',
        lineSpacing: '19pt',
        paddingLeft: '0px',
        paddingRight: '0px',
        justifyContent: 'center',
        textDecoration: 'underline',
        '&:hover': {
          textDecoration: 'underline',
        },
        '& .caseLink': {
          fontSize: '14px',
          color: '#DC762F',
        },
      },
    },
    cartCounter: {
      marginTop: '-5px',
      display: 'block',
      float: 'right',
    },
  },
};

const StudyCount = ({ length }) => (
  <Box component="span" id="cartCounter" style={theme.overrides.cartCounter}>
    {length + 1}
  </Box>
);

const MultiStudyToolTip = ({
  tableMeta,
  value,
}) => {
  const renderMultiStudyTooltipText = () => {
    const caseID = value;
    return (
      <Box padding="10px 12px">
        <Typography align="center" color="inherit" id="descripText">
          {multiStudyData.toolTipText}
        </Typography>
        <Box component="div" style={{ marginTop: '-10px' }}>
          <List>
            {tableMeta.map((elem, elemIdx) => (
              <ListItem key={elemIdx}>
                <Link class="caseLink" href={`/#/case/${elem}`}>
                  <Typography align="center">
                    {`Case: ${elem}`}
                  </Typography>
                </Link>
              </ListItem>
            ))}
          </List>
          <Link
            rel="noreferrer"
            class="caseLink"
            href={`/#/unifiedView/${caseID}`}
          >
            <Typography align="center" id="viewAllCases">
              View All Related Cases
            </Typography>
          </Link>
        </Box>
      </Box>
    );
  };

  return (
    <MuiThemeProvider theme={createTheme(theme)}>
      <Box style={{ marginLeft: '5px' }}>
        <Tooltip
          title={renderMultiStudyTooltipText()}
          renderComponent={renderMultiStudyTooltipText()}
          placement="bottom"
          interactive
          borderRadius="8%"
          padding="0"
          maxWidth="250px"
        >
          <Box component="span" id="badge">
            <StudyCount length={tableMeta.length} />
            <img
              src={multiStudyData.icon}
              alt={multiStudyData.alt}
              style={{ height: '2em' }}
            />
          </Box>
        </Tooltip>
      </Box>
    </MuiThemeProvider>
  );
};

const styles = () => ({});

export default withStyles(styles)(MultiStudyToolTip);
