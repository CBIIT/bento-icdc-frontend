import React, { useState } from 'react';
import {
  Grid,
  withStyles,
  Paper,
  CircularProgress,
  // eslint-disable-next-line no-unused-vars
  Typography,
} from '@material-ui/core';
import _ from 'lodash';
import styled from 'styled-components';
import { useOrderSupportingData } from './useOrderSupportingData';
import { ToolTip } from '../../../../bento-core';

const ScrollContainer = styled.div`
  overflow: auto;
  max-height: 400px;
  min-height: fit-content;
  border-bottom: 3px solid #004C73;
  margin-top: -4px;
  width: 100%;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #81ACDF;
    outline: 1px solid #fff;
   
  }

  &::-webkit-scrollbar-track {
    background-color: #fff;
  }

  scrollbar-color: #81ACDF #fff;
  scrollbar-width: thin;


`;

const SupportingData = ({
  classes,
  data,
  isLoading,
}) => {
  if (isLoading) {
    return <CircularProgress />;
  }

  const [IDCMetaData, TCIAMetaData] = useOrderSupportingData(data);
  const [displayLine, setDisplayLine] = useState(false);

  const showLine = () => {
    setDisplayLine(true);
  };

  return (
    <div className={classes.supportDataContainer}>
      <Grid container justifyContent="center">
        <Grid item lg={6} md={6} sm={6} xs={12} className={classes.borderRight}>
          <Paper className={classes.paper}>
            <Grid container direction="row" className={classes.containerLeft}>
              <Grid item xs={12}>
                <div className={classes.headerText}>
                  Repository:
                  {' '}
                  <span className={classes.headerSpan}>Imaging Data Commons (IDC)</span>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className={classes.externalLinkWrapper}>
                  <span>Go to site:</span>
                  {' '}
                  <ToolTip title="Click to view external link in new tab">
                    <a href="https://portal.imaging.datacommons.cancer.gov/explore/" target="_blank" rel="noreferrer">
                      <img
                        style={{
                          width: '1.5em',
                          marginTop: '3px',
                        }}
                        src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/ExternalLink.svg"
                        alt="external link icon"
                      />
                    </a>
                  </ToolTip>
                </div>
              </Grid>
              <div className={classes.idcScrollContainer}>
                <div className={classes.topIdcBorder} />
                <ScrollContainer onScroll={showLine}>
                  <div>
                    <Grid container className={classes.idcTableContainer} xs={12}>
                      {
                        Object.keys(IDCMetaData).length > 0
                          ? (Object.keys(IDCMetaData).map((item, index) => {
                            const title = _.replace(item, '_', ' ');
                            let content = IDCMetaData[item];
                            if (content.length > 92) {
                              content = _.truncate(content, { length: 92, separator: ' ' });
                            }

                            return (
                              <Grid item xs={12}>
                                <Grid item container direction="row" alignItems="center" className={classes.idcTableItem}>
                                  <Grid item xs={12} sm={4} className={classes.title}>
                                    <div className={classes.keyTitle}>{_.toUpper(title)}</div>
                                  </Grid>
                                  {
                                    IDCMetaData[item].length > 90 ? (
                                      <ToolTip title={Array.isArray(content) ? content.join(', ') : content} placement="bottom">
                                        <Grid item xs={12} sm={6} className={classes.content}>
                                          {Array.isArray(content) ? content.join(', ') : content}
                                        </Grid>
                                      </ToolTip>
                                    ) : (
                                      <Grid item xs={12} sm={6} className={classes.content}>
                                        {Array.isArray(content) ? content.join(', ') : content}
                                      </Grid>
                                    )
                                  }
                                </Grid>
                                {/* eslint-disable-next-line max-len */}
                                {((((index + 1) !== Object.keys(IDCMetaData).length) && index !== 4) || (index === 4 && displayLine)) && <div><hr className={classes.hrLine} /></div>}
                              </Grid>
                            );
                          })) : (
                            <div className={classes.apiFailed}>
                              Data unavailable at this time
                            </div>
                          )
                      }
                    </Grid>

                  </div>
                </ScrollContainer>
              </div>
            </Grid>
          </Paper>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Paper className={classes.paper}>
            <Grid container direction="row" className={classes.containerLeft}>
              <Grid item xs={12}>
                <div className={classes.tciaHeaderText}>
                  Repository:
                  {' '}
                  <span className={classes.headerSpan}>The Cancer Imaging Archive (TCIA)</span>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className={classes.tciaExternalLinkWrapper}>
                  Go to site:
                  {' '}
                  <ToolTip title="Click to view external link in new tab">
                    <a href="https://wiki.cancerimagingarchive.net/pages/viewpage.action?pageId=70227341#702273419937cb85808048c99e4b55fd520d63f2" target="_blank" rel="noreferrer">
                      <img
                        style={{
                          width: '1.5em',
                          marginTop: '3px',
                        }}
                        src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/ExternalLink.svg"
                        alt="external link icon"
                      />
                    </a>
                  </ToolTip>
                </div>
              </Grid>
              <div className={classes.tciaScrollConatiner}>
                <div className={classes.topTciaBorder} />
                <ScrollContainer>
                  <div>
                    <Grid container className={classes.idcTableContainer} xs={12}>
                      {
                        Object.keys(TCIAMetaData).length > 0
                          ? (Object.keys(TCIAMetaData).map((item, index) => {
                            const title = _.replace(item, '_', ' ');
                            let content = TCIAMetaData[item];
                            if (content.length > 92) {
                              content = _.truncate(content, { length: 92, separator: ' ' });
                            }

                            return (
                              <Grid item xs={12}>
                                <Grid item container direction="row" alignItems="center" className={classes.idcTableItem}>
                                  <Grid item xs={12} sm={4} className={classes.title}>
                                    <div className={classes.keyTitle}>{_.toUpper(title)}</div>
                                  </Grid>
                                  {
                                    TCIAMetaData[item].length > 90 ? (
                                      <ToolTip title={Array.isArray(content) ? content.join(', ') : content} placement="bottom">
                                        <Grid item xs={12} sm={6} className={classes.content}>
                                          {Array.isArray(content) ? content.join(', ') : content}
                                        </Grid>
                                      </ToolTip>
                                    ) : (
                                      <Grid item xs={12} sm={6} className={classes.content}>
                                        {Array.isArray(content) ? content.join(', ') : content}
                                      </Grid>
                                    )
                                  }
                                </Grid>
                                {/* eslint-disable-next-line max-len */}
                                {(index + 1) !== Object.keys(TCIAMetaData).length && <div><hr className={classes.hrLine} /></div>}
                              </Grid>
                            );
                          })) : (
                            <div className={classes.apiFailed}>
                              Data unavailable at this time
                            </div>
                          )
                      }
                    </Grid>

                  </div>
                </ScrollContainer>
              </div>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

const styles = {
  paper: {
    boxShadow: 'none',
  },
  apiFailed: {
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Open Sans',
  },
  supportDataContainer: {
    margin: 'auto',
    paddingLeft: '77px',
    paddingRight: '77px',
    // fontFamily: theme.custom.fontFamilySans,
    letterSpacing: '0.014em',
    color: '#000000',
    size: '12px',
    lineHeight: '23px',
  },
  borderRight: {
    borderRight: '#81a6b9 1px solid',
  },
  containerLeft: {
    display: 'block',
    padding: '28px 20px 5px 10px',
    minHeight: '700px',
    maxHeight: '600px',
    overflowY: 'auto',
    overflowX: 'hidden',
    width: 'calc(100% + 8px) !important',
    margin: '0px -8px',
  },
  idcScrollContainer: {
    width: '80%',
    marginTop: '37px',
  },
  topIdcBorder: {
    backgroundColor: '#004C73',
    width: '100%',
    height: '3px',
  },
  idcTableContainer: {
    width: '50%',
  },
  idcTableItem: {
    height: '54px',
    paddingLeft: '20px',
  },
  tciaScrollConatiner: {
    marginLeft: '30px',
    width: '80%',
    marginTop: '37px',
  },
  topTciaBorder: {
    backgroundColor: '#004C73',
    width: '100%',
    height: '3px',
  },
  headerText: {
    color: '#0296C9',
    fontFamily: 'Open Sans',
    fontWeight: '400',
    fontSize: '17px',
    textTransform: 'uppercase',
  },
  tciaHeaderText: {
    color: '#0296C9',
    fontFamily: 'Open Sans',
    fontWeight: '400',
    fontSize: '17px',
    marginLeft: '30px',
    textTransform: 'uppercase',
  },
  headerSpan: {
    color: '#007299',
    fontWeight: '900',
    fontSize: '18px',
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    paddingLeft: '5px',
    textTransform: 'Capitalize',
  },
  externalLinkWrapper: {
    color: '#000',
    fontWeight: '400',
    fontSize: '12px',
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
  },
  tciaExternalLinkWrapper: {
    color: '#000',
    fontWeight: '400',
    fontSize: '12px',
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    marginLeft: '30px',
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    color: '#0296C9',
    fontWeight: '600',
    fontSize: '12px',
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
  },
  content: {
    color: '#223D4C',
    fontWeight: '600',
    fontSize: '13px',
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
  },
  hrLine: {
    color: '#808080',
    margin: '0',
  },
  keyTitle: {
    width: '130px',
  },
};

export default withStyles(styles)(SupportingData);
