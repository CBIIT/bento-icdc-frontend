/* eslint-disable */
import React from 'react';
import classnames from 'classnames';
import {
  Paper,
  withStyles,
} from '@material-ui/core';
import { Typography } from '../Wrappers/Wrappers';

const Widget = ({
  classes,
  color, // Color of text
  children,
  title,  // Title of the widget
  noBodyPadding, // NO padding 
  bodyClass,
  className,
  header,
  customBackGround, // For customBackground Color
  titleClass,
  widgetBorderDivider, // true for add  bottom divider
  noPaddedTitle, // Padded title
  ...props
}) => (
  <div className={classes.widgetWrapper}>
    <Paper className={classnames(classes.paper,{[classes.customBackGround]:customBackGround})} classes={{ root: classes.widgetRoot }}>
      <div id={title} className={classes.widgetHeader}>
        {props.header ? (
          props.header
        ) : (
          <>
            <Typography className={titleClass} size="md" weight="bold" family="Raleway" classes={ {root :classes.textWithBackground}} >
              {title}
            </Typography>
          </>
        )}
      </div>
      <div
        className={classnames(classes.widgetBody, {
          [classes.noPadding]: noBodyPadding,
          [bodyClass]: bodyClass,
        })}
      >
        {children}
      </div>
      {widgetBorderDivider && <hr className={classes.widgetDivider} />}
    </Paper>
  </div>
);

const styles = (theme) => ({
  textWithBackground: {
    color: theme.palette.textWithBackground.main,
  },
  widgetWrapper: {
    display: 'flex',
    minHeight: '100%',
  },
  widgetDivider:{
    background: theme.custom.widgetDivider,
    height: '6px',
    width: '180px',
    border: 'none',
    margin: '16px auto 0px auto'
  },
  widgetHeader: {
    padding: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  widgetRoot: {
    // boxShadow: theme.customShadows.widget
  },
  widgetBody: {
    margin:'0px auto',
    paddingBottom: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 3,
  },
  noPadding: {
    padding: 0,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflow: 'hidden',
    boxShadow: 'none',
  },
  customBackGround : {
    background: theme.palette.widgetBackground.main,
  }
});


Widget.defaultProps = {
  color: "info",
}

export default withStyles(styles, { withTheme: true })(Widget);
