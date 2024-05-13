import React from 'react';
import {
  Grid,
  withStyles,
  styled,
  Paper,
  makeStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { pageData } from '../../../bento/landingPageData';

const useStyles = makeStyles({
  root: {
    marginTop: (props) => (props.activeTemplate === 'twitter' ? '3em' : '1em'),
  },
});

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: '13px',
  marginTop: '50px',
}));

const Widgets = ({ classes, ...props }) => {
  const { root } = useStyles(props);

  return (
    <Grid className={root} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
      {
        pageData.widgets.map((widget) => (
          <Grid item xs={3} className={classes.widget}>
            <Item>
              <Link to={widget.callToActionLink}>
                <div className={classes.container}>
                  <div className={classes.title}>
                    {widget.titleText}
                  </div>
                  <div className={classes.image}>
                    <img src={widget.img} alt={widget.alt} />
                  </div>
                  <div className={classes.description}>
                    {widget.descriptionText}
                  </div>
                </div>
              </Link>
            </Item>
          </Grid>
        ))
      }
    </Grid>
  );
};

const styles = (theme) => ({
  widget: {
    paddingLeft: theme.spacing(2),
  },
  title: {
    background: '#ffffff',
    color: '#103556',
    fontSize: '18px',
    fontWeight: '900',
    borderRadius: '13px',
    height: '30px',
    paddingTop: '5px',
    lineHeight: '25px',
  },
  headerTitle: {
    paddingTop: '180px',
    paddingBottom: '12px',
    width: '208px',
    color: '#FFFFFF',
    fontFamily: 'Raleway, sans-serif',
    fontSize: '40px',
    fontWeight: 'bold',
    lineHeight: '40px',
  },
  description: {
    fontSize: '13px',
    padding: '1px 5px 10px 5px',
    color: '#000000',
    height: '25px',
  },
  image: {
    '& img': {
      maxWidth: '100%',
    },
  },
});

export default withStyles(styles, { withTheme: true })(Widgets);
