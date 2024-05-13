import React from 'react';
import {
  withStyles,
} from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import { Link } from 'react-router-dom';
import { Button } from '../Wrappers/Wrappers';
import { pageData } from '../../bento/programData';

const ProgramCard = ({
  classes, data,
}) => {
  const programConfig = pageData[data.program_acronym];
  const programImage = programConfig ? programConfig.primaryImage : '';
  const primaryImageAlt = programConfig ? programConfig.primaryImageAlt : '';

  return (
    <div className={classes.detailContainer}>
      <div className={classes.detailContainerHeader}>
        {data.program_name}
      </div>
      <div className={classes.detailContainerBody}>
        <div className={classes.detailContainerButtonAndDesc}>
          <div className={classes.content}>{data.program_short_description}</div>
          <div className={classes.buttonAndLink}>
            <Button variant="contained" className={classes.button} endIcon={<Badge color="primary" badgeContent={data.studies.length} data-testid="badge"> </Badge>}>
              <Link to={`/program/${data.program_acronym}`} className={classes.headerButtonLink}>
                <span className={classes.headerButtonLinkLeft}>VIEW STUDIES </span>
              </Link>
            </Button>

            <div>
              <div className={classes.linkAndTooltip}>
                <a href={`${data.program_external_url}`} target="icdc" className={classes.outLink} data-testid="outlink">
                  {data.program_external_url}
                </a>
                {
                  data.program_external_url
                  && (
                  <img
                    src={pageData.externalIcon}
                    alt="dog for program detail"
                    className={classes.linkIcon}
                  />
                  )
                }
              </div>
            </div>
          </div>
        </div>
        {
          programConfig && (
            <div>
              <img
                src={programImage}
                alt={primaryImageAlt}
                className={classes.dogImage}
              />
            </div>
          )
        }
      </div>
    </div>
  );
};

const styles = (theme) => ({
  detailContainerBody: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: '16px',
  },
  buttonAndLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  detailContainerButtonAndDesc: {
    paddingTop: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '23px',
  },
  linkAndTooltip: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  dogImage: {
    width: '100%',
  },
  linkIcon: {
    width: '25px',
    verticalAlign: 'middle',
  },
  outLink: {
    color: '#2fa000',
    fontWeight: 'bold',
    textDecoration: 'underline',
    fontSize: '12px',
  },
  container: {
    paddingTop: '50px',
    fontFamily: 'Raleway, sans-serif',
    background: '#f3f3f3',
  },
  content: {
    fontSize: '12px',
    lineHeight: '17px',
    width: '622px',
    fontFamily: 'Open Sans',
    color: '#000',
  },
  detailContainerHeader: {
    background: '#fff',
    lineHeight: '30px',
    padding: '4px 4px 4px 12px',
    borderBottom: '4px solid #1db634',
    color: '#1db634',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  headerButtonLinkLeft: {
    paddingRight: '39px',
    fontSize: '12px',
    lineHeight: '12px',
    fontWeight: '600',
  },
  headerButtonLinkBadge: {
  },
  logo: {
    position: 'absolute',
    float: 'left',
    marginTop: '-14px',
    width: '96px',
  },
  headerButtonLink: {
    textDecoration: 'none',
    color: '#ffffff',
  },
  button: {
    borderRadius: '0px',
    width: '165px',
    height: '30px',
    lineHeight: '18px',
    fontSize: '12px',
    color: '#ffffff',
    textTransform: 'uppercase',
    backgroundColor: '#0296c9',
    fontFamily: theme.custom.fontFamilySans,
    '&:hover': {
      backgroundColor: '#3890c5',
      color: '#ffffff',
      textDecoration: 'none',
    },
  },
});

export default withStyles(styles, { withTheme: true })(ProgramCard);
