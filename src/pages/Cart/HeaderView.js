import React, { useEffect, useState } from 'react';
import {
  Grid,
  ThemeProvider,
  createTheme,
  withStyles,
  Divider,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio
} from '@material-ui/core';
import axios from 'axios';
import DropDownview from './dropdown/DropDownview';
import styles from './HeaderStyle';
import {
  myFilesPageData,
} from '../../bento/fileCentricCartWorkflowData';
import ReadMeDialogComponent from '../../components/ReadMeDialog/ReadMe.controller';
import ReadMoreSVG from './readMore';
import env from '../../utils/env';

const HeaderView = ({
  classes,
}) => {

  const [displayReadMe, setDisplayReadMe] = useState(false);
  const [content, setContent] = useState(undefined);

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

  return (
    <>
      <div className={classes.cartHeader}>
        <div className={classes.cartHeaderLogo}>
          <img
              className={classes.logo}
              src={myFilesPageData.headerIconSrc}
              alt={myFilesPageData.headerIconAlt}
          />
          <span className={classes.pageTitle}>My Files</span>
        </div>
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
      <Grid xs={12} md={12}>
        <Divider classes={{ root: classes.divider }} />
      </Grid>
      <Grid xs={9} md={9} className={classes.allFilesBtn}>
        <input type="radio" id="huey" name="drone" value="huey" />
        <label for="huey">All Files</label>
      </Grid>
      <Grid xs={1} md={1}>
        <input type="radio" id="huey" name="drone" value="huey" />
        <label for="huey">Selected Files</label>
      </Grid>
      <Grid xs={2} md={2}>
        <DropDownview />
      </Grid>
      <ReadMeDialogComponent
        content={content}
        config={{
          readMeTitle: 'Understanding the “My Files” Cart Page',
        }}
        display={displayReadMe}
        displayReadMeDialog={displayReadMeHandler}
      />
    </>
  );
};

export default withStyles(styles)(HeaderView);
