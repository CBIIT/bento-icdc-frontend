/* eslint-disable no-unused-vars */
import React from 'react';
import {
  withStyles,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Container,
} from '@material-ui/core';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import YouTube from 'react-youtube-embed';
import StatView from '../../../components/Stats/AllStatsController';
import lbg from '../../../assets/landing/Background.png';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    cols: 2,
  },
];

const NewsView = ({ classes, availableSoonImage }) => (
  <>
    <StatView />

    <div className={classes.outterContainer}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '3em' }}>
        <div style={{
        }}
        >
          <h4 style={{ color: '#fff' }}>Updates</h4>
          <List style={{ width: '30em', height: '100%', backgroundColor: '#fff' }}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Brunch this weekend?"
                secondary={(
                  <>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </>
          )}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Summer BBQ"
                secondary={(
                  <>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      to Scott, Alex, Jennifer
                    </Typography>
                    {" — Wish I could come, but I'm out of town this…"}
                  </>
          )}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Oui Oui"
                secondary={(
                  <>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Sandra Adams
                    </Typography>
                    {' — Do you have Paris recommendations? Have you ever…'}
                  </>
          )}
              />
            </ListItem>
          </List>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3em' }}>
          <div style={{ width: '60em' }}>
            <h4 style={{ color: '#fff' }}>Twitter</h4>
            <TwitterTimelineEmbed
              sourceType="profile"
              screenName="ncidatasci"
              options={{ height: 600 }}
            />
          </div>

          <div style={{ position: 'relative', top: '4.6em' }}>
            <h4 style={{ color: '#fff' }}>Images</h4>
            <div className={classes.root}>
              <ImageList className={classes.imageList} cols={2.5}>
                {itemData.map((item) => (
                  <ImageListItem key={item.img}>
                    <img src={item.img} alt={item.titlee} />
                    <ImageListItemBar
                      title={item.title}
                      classes={{
                        root: classes.titleBar,
                        title: classes.title,
                      }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </div>
          </div>
        </div>
      </div>

      <div style={{ width: '93em' }}>
        {' '}
        <h4 style={{ color: '#fff' }}>Videos</h4>
        <YouTube id="bIWaMKZ9pl4" />
      </div>
    </div>
  </>
);

const styles = (theme) => ({
  outterContainer: {
    background: '#5E8CA5',
    backgroundImage: `url(${lbg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '5em',
    gap: '6em',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    width: '60em',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titlee: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
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
