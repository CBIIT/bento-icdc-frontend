import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import _ from 'lodash';
import {
  ToolTip as Tooltip,
} from 'bento-components';
import {
  customSorting,
  studyDisposition,
} from '../utils';
import {
  externalIcon,
} from '../../../bento/studyDetailsData';
import themes from '../../../themes';
import SampleProfile from './SampleProfile';

const Overview = ({
  classes,
  studyData,
  diagnoses,
  caseFileTypes,
  data,
}) => {
  const getImageTypes = (typeString) => {
    const types = JSON.parse(typeString);
    return types.join(', ');
  };

  const themesLight = _.cloneDeep(themes.light);
  themesLight.overrides.MuiTableCell = {
    ...themesLight.overrides.MuiTableCell,
    root: {
      '&:first-child': {
        paddingLeft: '30px',
      },
      '&:lastchild': {
        paddingRight: '30px',
      },
    },
  };

  themesLight.overrides.MUIDataTableToolbar = {
    ...themesLight.overrides.MUIDataTableToolbar,
    root: {
      backgroundColor: '#ffffff',
    },
    actions: {
      '& span': {
        '& button': {
          right: '0px',
        },
      },
    },
  };

  const getAccessTypeString = (accessType) => (accessType === 'Cloud'
    ? 'Available only via the Cloud' : 'Available for Download');

  return (
    <>
      <div className={classes.container}>
        <div className={classes.detailContainer}>
          <Grid container>
            <Grid item lg={6} md={6} sm={6} xs={12} className={classes.borderRight}>
              <Grid container spacing={16} direction="row" className={classes.detailContainerLeft}>
                <Grid item xs={12}>
                  <span className={classes.detailContainerHeader}>Description</span>
                </Grid>
                <Grid item xs={12}>
                  <div>
                    <span className={classes.content}>
                      {' '}
                      {studyData.clinical_study_description}
                      {' '}
                    </span>
                  </div>
                  <div><hr className={classes.hrLine} /></div>
                </Grid>
                <Grid container className={classes.detailContainerItems}>
                  <Grid item xs={12} className={classes.detailContainerItem}>
                    <Grid item container direction="row">
                      <Grid item xs={12} sm={4} className={classes.title}>
                        Study Type:
                      </Grid>
                      <Grid item xs={12} sm={6} className={classes.content}>
                        {studyData.clinical_study_type}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.detailContainerItem}>
                    <Grid item container direction="row">
                      <Grid item xs={12} sm={4} className={classes.title}>
                        Principal Investigators:
                      </Grid>
                      <Grid item xs={12} sm={6} className={classes.content}>
                        {studyData.principal_investigators ? studyData.principal_investigators.map((principalInvestigator) => (`${principalInvestigator.pi_first_name} ${principalInvestigator.pi_middle_initial} ${principalInvestigator.pi_last_name},  `)) : ''}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.detailContainerItem}>
                    <Grid item container direction="row">
                      <Grid item xs={12} sm={4} className={classes.title}>
                        Date of IACUC Approval:
                      </Grid>
                      <Grid item xs={12} sm={6} className={classes.content}>
                        {studyData.date_of_iacuc_approval}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.detailContainerItem}>
                    <Grid item container direction="row">
                      <Grid item xs={12} sm={4} className={classes.title}>
                        Conducted:
                      </Grid>
                      <Grid item xs={12} sm={6} className={classes.content}>
                        {studyData.dates_of_conduct}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {
              (!studyDisposition(studyData.study_disposition))
              && (
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Grid
                  container
                  spacing={16}
                  direction="row"
                  className={classes.detailContainerRight}
                >
                  <Grid
                    item
                    lg={6}
                    md={6}
                    sm={6}
                    xs={12}
                    className={classes.detailContainerRightTop}
                  >
                    <Grid container spacing={16}>
                      <Grid item xs={12}>
                        <span className={classes.detailContainerHeader}>DIAGNOSES</span>
                      </Grid>
                    </Grid>
                    <Grid container className={classes.paddingTop12}>
                      {diagnoses.sort((a, b) => customSorting(a, b, 'alphabetical')).map((diagnosis) => (
                        <Grid item xs={12}>
                          <span className={classes.content}>
                            {' '}
                            {diagnosis}
                          </span>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    lg={6}
                    md={6}
                    sm={6}
                    xs={12}
                    className={classes.detailContainerRightTop}
                  >
                    <Grid container spacing={16}>
                      <Grid item xs={12}>
                        <span className={classes.detailContainerHeader}>Case File Types</span>
                      </Grid>
                    </Grid>
                    <Grid container className={classes.paddingTop12}>
                      {(caseFileTypes.length > 0) ? caseFileTypes.sort((a, b) => customSorting(a, b, 'alphabetical')).map((fileType) => (
                        <Grid item xs={12}>
                          <span className={classes.content}>{fileType}</span>
                        </Grid>
                      )) : (
                        <div className={classes.content}>
                          This study currently has no Files associated with its cases
                        </div>
                      )}
                    </Grid>
                  </Grid>
                  <div><hr className={classes.hrLine} /></div>
                </Grid>
                <Grid container spacing={16} direction="row" className={classes.detailContainerRight}>

                  {/* START: Image Collection */}
                  <Grid item lg={6} md={6} sm={6} xs={12} className={classes.marginTop10}>
                    <Grid container spacing={16}>
                      <Grid item xs={12}>
                        <span className={classes.detailContainerHeader}> IMAGE COLLECTIONS </span>
                      </Grid>
                    </Grid>
                    <Grid container className={classes.detailContainerItems}>
                      {studyData.image_collections.length > 0 ? studyData.image_collections.map(
                        (imageCollection) => (
                          <Grid item xs={12} className={classes.detailContainerItem}>
                            <Grid item container direction="row">
                              <Grid item xs={12} sm={4} className={classes.title}>
                                COLLECTION:
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sm={8}
                                className={[classes.content, classes.marginTopN5]}
                              >
                                <Tooltip title={getAccessTypeString(imageCollection.collection_access)} arrow placement="top">
                                  <a href={`${imageCollection.image_collection_url}`} target="icdc" className={classes.outLink}>
                                    {imageCollection.image_collection_name}
                                    {' - '}
                                    {imageCollection.repository_name}
                                    <span className={classes.paddingLeft5}>
                                      <img
                                        src={externalIcon}
                                        alt="imageLink"
                                        className={classes.linkIcon}
                                      />
                                    </span>
                                  </a>
                                </Tooltip>
                              </Grid>
                            </Grid>
                            <Grid item container direction="row">
                              <Grid item xs={12} sm={4} className={classes.title}>
                                IMAGE TYPES:
                              </Grid>
                              <Grid item xs={12} sm={8} className={classes.content}>
                                {imageCollection.image_type_included
                                && getImageTypes(imageCollection.image_type_included)}
                              </Grid>
                            </Grid>
                          </Grid>
                        ),
                      ) : (
                        <Grid item xs={12} sm={10} className={classes.content}>
                          <div className={classes.content}>
                            This study currently has no associated Image Collections
                          </div>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                  {/* END: Image Collection */}
                  <SampleProfile data={data} />
                </Grid>
              </Grid>
              )
          }
          </Grid>
        </div>
      </div>
    </>
  );
};

const styles = (theme) => ({
  container: {
    fontFamily: 'Raleway, sans-serif',
    paddingLeft: '33px',
    paddingRight: '33px',
    paddingBottom: '25px',
  },
  spacer: {
    marginTop: '50px',
    height: '80px',
    width: '100%',
  },
  detailContainer: {
    margin: 'auto',
    paddingLeft: '36px',
    paddingRight: '36px',
    fontFamily: theme.custom.fontFamilySans,
    letterSpacing: '0.014em',
    color: '#000000',
    size: '12px',
    lineHeight: '23px',

  },
  hrLine: {
    width: '50px',
    float: 'left',
    marginTop: '30px',
    border: '#81a6b9 2px solid',
    background: '#81a6b9',
  },
  borderRight: {
    borderRight: '#81a6b9 1px solid',
  },
  detailContainerLeft: {
    display: 'block',
    padding: '15px 20px 5px 10px !important',
    minHeight: '500px',
    maxHeight: '500px',
    overflowY: 'auto',
    overflowX: 'hidden',
    width: 'calc(100% + 8px) !important',
    margin: '0px -8px',
  },
  detailContainerHeader: {
    textTransform: 'uppercase',
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '17px',
    letterSpacing: '0.017em',
    color: '#0296c9',
  },
  content: {
    fontSize: '12px',
  },
  detailContainerItems: {
    paddingTop: '7px',
  },
  title: {
    color: '#0296c9',
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '12px',
    letterSpacing: '0.017em',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  detailContainerItem: {
    paddingTop: '15px !important',
  },
  detailContainerRight: {
    padding: '20px 0 5px 20px !important',
    maxHeight: '500px',
    overflowY: 'auto',
    overflowX: 'hidden',
    width: 'calc(100% + 8px)',
  },
  detailContainerRightTop: {
    maxHeight: '250px',
    overflow: 'auto',
  },
  marginTop10: {
    marginTop: '10px',
  },
  paddingTop12: {
    paddingTop: '12px',
  },
  linkIcon: {
    width: '20px',
  },
  tableContainer: {
    background: '#f3f3f3',
  },
  paddingLeft5: {
    paddingLeft: '5px',
  },
  outLink: {
    color: '#DD752F',
    textDecoration: 'none',
    fontSize: '12px',
  },
  tableContainer2: {
    background: '#fff',
  },
});

export default withStyles(styles, { withTheme: true })(Overview);
