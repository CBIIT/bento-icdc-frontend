import React, { useContext, useEffect, useState } from 'react';
import {
  Grid,
  Divider,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
} from '@mui/material';
// import { withStyles } from "@mui/styles";
import { withStyles } from '@material-ui/core';
import axios from 'axios';
import styles from './HeaderStyle';
import {
  myFilesPageData,
} from '../../../../bento/fileCentricCartWorkflowData';
import ReadMeDialogComponent from '../../../../components/ReadMeDialog/ReadMe.controller';
import ReadMoreSVG from '../readMore';
import env from '../../../../utils/env';
import DropDownView from '../dropdown/DropDownView';
import HeaderThemeprovider from './HeaderTheme';

const HeaderView = ({
  classes,
  filesId,
}) => {
  const [displayReadMe, setDisplayReadMe] = useState(false);
  const [content, setContent] = useState(undefined);

  // if allFile radio button is true download all file with Download manifest btn
  const [allFiles, setAllFiles] = useState(true);

  const getReadMe = async (url) => {
    const { data } = await axios.get(url);
    setContent(data);
  };

  useEffect(() => {
    getReadMe(env.REACT_APP_FILE_CENTRIC_CART_README);
  }, []);

  const displayReadMeHandler = () => {
    setDisplayReadMe(!displayReadMe);
  };

  const handleRadioChange = (event) => {
    const isAllSelected = event.target.value === 'true';
    setAllFiles(isAllSelected);
  };

  return (
    <HeaderThemeprovider>
      <div className={classes.cartHeader}>
        <div className={classes.cartHeaderLogo}>
          <img
              className={classes.logo}
              src={myFilesPageData.headerIconSrc}
              alt={myFilesPageData.headerIconAlt}
          />
          <span className={classes.pageTitle}>My Files</span>
        </div>
        <div className={classes.readMeBtn}>
          <Button
            onClick={displayReadMeHandler}
            color="primary"
            variant="contained"
            endIcon={<ReadMoreSVG />}
            classes={{
              root: classes.readMeBtnRoot,
              label: classes.readMeBtnLabel,
            }}
          >
            README
          </Button>
        </div>
      </div>

      <Grid xs={12} md={12} lg={12} className={classes.actionBtn}>
        <FormControl>
          <RadioGroup
            row
            name="selectAll"
            value={allFiles}
            onChange={handleRadioChange}
          >
          <FormControlLabel
            value={true}
            control={
              <Radio />
            }
            label="All Files"
          />
          <FormControlLabel
            value={false}
            control={<Radio />} 
            className="selectFilesBtn"
            label="Selected Files"
          />
        </RadioGroup>
      </FormControl>
      <DropDownView
        filesId={filesId} 
        allFiles={allFiles}
      />
      </Grid>
      
      <ReadMeDialogComponent
        content={content}
        config={{
          readMeTitle: 'Understanding the “My Files” Cart Page',
        }}
        display={displayReadMe}
        displayReadMeDialog={displayReadMeHandler}
      />
    </HeaderThemeprovider>
  );
};

export default withStyles(styles)(HeaderView);
