import React from 'react';
import { withStyles } from '@material-ui/core';

const invertedMessage = ({ classes, data }) => (
  <div className={classes.message}>
    <div className={classes.arrayIcon}>
      <div className={classes.arrayIconCover} />
      <div className={classes.arrayIconBase} />
    </div>
    <div className={classes.messageTextArea}>{data}</div>
  </div>
);

const styles = () => ({
  arrayIconBase: {
    width: '0px',
    height: '0px',
    borderTop: '20px solid transparent',
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderBottom: '15px solid  #03A383',
  },
  arrayIconCover: {
    position: 'absolute',
    marginTop: '2px',
    marginRight: '0.3px',
    width: '0px',
    height: '0px',
    borderTop: '20px solid transparent',
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderBottom: '15px solid #fff',
  },
  messageTextArea: {
    width: '225px',
    minHeight: '50px',
    border: '2px solid #03A383',
    borderRadius: '10px',
    background: '#fff',
    padding: '10px 10px 10px 13px',
    textAlign: 'left',
    color: '#0D4659',
    fontSize: '12px',
  },
  arrayIcon: {
    marginLeft: '190px',
  },
});
export default withStyles(styles, { withTheme: true })(invertedMessage);
