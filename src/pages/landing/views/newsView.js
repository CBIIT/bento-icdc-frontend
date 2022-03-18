import React from 'react';
import {
  withStyles,
} from '@material-ui/core';
import StatView from '../../../components/Stats/AllStatsController';

const NewsView = ({ classes, availableSoonImage }) => (
  <>
    <StatView />
    <div className={classes.outterContainer}>
      <div className={classes.text}>
        <p className={classes.title}>Coming Soon</p>
        <p className={classes.desc}>This feature is not yet fully supported.</p>
      </div>
      <div className={classes.content}>
        <img src={availableSoonImage} alt="available-soon" />
      </div>
    </div>
  </>
);

const styles = () => ({
  outterContainer: {
    width: '100%',
    margin: 'auto',
    textAlign: 'center',
    paddingTop: '130px',
    paddingBottom: '60px',
    border: '1px solid #000000',
    background: 'linear-gradient(270deg, #3C86AD 0%, #82AAC6 100%)',
  },
  content: {
    boxSizing: 'border-box',
    background: '#23AEE2',
    width: '690px',
    height: '464px',
    margin: 'auto',
    '& img': {
      width: '689px',
      height: '459px',
      marginTop: '-20px',
      marginRight: '-40px',
    },
  },
  text: {
    height: '31px',
    width: '100%',
    textAlign: 'center',
    position: 'absolute',
  },
  title: {
    color: '#1EA8E1',
    fontSize: '32px',
    letterSpacing: '0',
    lineHeight: '22px',
    fontFamily: 'Lato',
    fontWeight: 'bold',
    display: 'block',
    marginTop: '18px',
    marginBottom: '8px',
  },
  desc: {
    color: '#4a4a4a',
    fontSize: '17px',
    letterSpacing: '0',
    lineHeight: '20px',
  },
});
export default withStyles(styles)(NewsView);
