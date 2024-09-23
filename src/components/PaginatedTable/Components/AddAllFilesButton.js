import React, { useCallback } from 'react';
import { createTheme, Grid, ThemeProvider } from '@material-ui/core';
import {
  btnTypes,
  ButtonView
} from '../../../bento-core';
import {
  GET_ALL_FILEIDS_CASESTAB_FOR_SELECT_ALL
} from '../../../bento/dashboardTabData';
​
const btnTheme = {
  overrides: {
    MuiButton: {
      root: {
        '&.add_all_button': {
          background: 'blue',
          color: '#fff'
        },
        '&.add_selected_button': {
          background: 'orange',
          color: '#fff'
        }
      }
    },
    MuiGrid: {
      root: {
        '& img': {
          width: '17px',
          '&.addAllTooltip': {
              verticalAlign: 'top',
              marginTop: '8px',
          },
        },
      },
    },
  }
};
​
const AddAllFilesButton = ({
  activeFilters
}) => {
​
  const BlueButton = () => useCallback(
    <>
      <ButtonView
        btnType={btnTypes.ADD_ALL_FILES}
        title="Add all files Btn"
        clsName="add_all_button"
        maxFileLimit={10000}
        activeFilters={activeFilters}
        addFileQuery={GET_ALL_FILEIDS_CASESTAB_FOR_SELECT_ALL}
        responseKeys={['caseOverview', 'files']}
        classes={classes}
        section="toolTipText"
        tooltipCofig={{
          arrow: true,
          clsName: 'addAllTooltip',
          toolTipText: 'Add filtered files associated with all cases',
          icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/Tooltip.SpeechBubble.svg',
        }}
      />
    </>
  , [activeFilters]);
​
  return (
    <>
      <ThemeProvider theme={createTheme(btnTheme)}>
        <Grid container>
          <BlueButton />
        </Grid>
      </ThemeProvider>
    </>
  );
};
​
export default AddAllFilesButton;
