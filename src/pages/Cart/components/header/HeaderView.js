import React, { useContext, useEffect, useState } from 'react';
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
import styles from './HeaderStyle';
import {
  myFilesPageData,
} from '../../../../bento/fileCentricCartWorkflowData';
import { TableContext } from '../../../../bento-core';
import ReadMeDialogComponent from '../../../../components/ReadMeDialog/ReadMe.controller';
import ReadMoreSVG from '../../readMore';
import env from '../../../../utils/env';
import DropDownView from '../dropdown/DropDownView';

const HeaderView = ({
  classes,
  filesId,
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

  const tableContext = useContext(TableContext);
  const { context } = tableContext;
  console.log(context);

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
      <Divider classes={{ root: classes.divider }} />
      <Grid xs={9} md={9} lg={9} className={classes.allFilesBtn}>
        <input type="radio" name="donwloadFiles" value="allFiles" />
        <label for="huey">All Files</label>
      </Grid>
      <Grid xs={1} md={1} lg={1}>
        <input type="radio" name="donwloadFiles" value="selected" />
        <label for="huey">Selected Files</label>
      </Grid>
      <Grid xs={2} md={2} lg={2}>
        <DropDownView filesId={filesId} />
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
