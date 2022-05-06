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
} from '@material-ui/core';
import { TwitterTimelineEmbed, TwitterTweetEmbed } from 'react-twitter-embed';
import ReactPlayer from 'react-player';
import StatView from '../../../components/Stats/AllStatsController';
import lbg from '../../../assets/landing/Background.png';
import Bosco from '../../../content/pre-prod/ICDC-Images/Bosco.jpg';
import DogAtVet from '../../../content/pre-prod/ICDC-Images/dogAtVet.jpg';
import Emmie from '../../../content/pre-prod/ICDC-Images/Emmie.JPG';

// function srcset(image, size, rows = 1, cols = 1) {
//   return {
//     src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
//     srcSet: `${image}?w=${size * cols}&h=${
//       size * rows
//     }&fit=crop&auto=format&dpr=2 2x`,
//   };
// }

const itemData = [
  {
    img: Bosco,
    rows: 2,
    cols: 2,
  },
  {
    img: DogAtVet,
  },
  {
    img: Emmie,
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

const NewsView = ({ classes }) => (
  <>
    <StatView />

    <div className={classes.outterContainer}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '3em' }}>
        <div style={{
        }}
        >
          <h4 style={{
            color: '#fff', fontSize: '2em', fontFamily: 'Raleway', margin: '0',
          }}
          >
            Updates
          </h4>
          <List style={{
            width: '30em', height: '100%', backgroundColor: '#fff', borderRadius: '0.5em',
          }}
          >
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
            <h4 style={{
              color: '#fff', fontSize: '2em', fontFamily: 'Raleway', margin: '0',
            }}
            >
              Twitter
            </h4>
            <div style={{
              display: 'flex', justifyContent: 'center', background: '#fff', flexDirection: 'column', borderRadius: '0.5em', width: 'fit-content',
            }}
            >
              <div style={{
                display: 'flex', background: '#1977CC', justifyContent: 'space-between', padding: '0.5em 15em 0.5em 1em', color: '#fff', borderTopLeftRadius: '0.5em', borderTopRightRadius: '0.5em', WebkitBorderTopLeftRadius: '0.5em', WebkitBorderTopRightRadius: '0.5em',
              }}
              >
                <div><h6 style={{ fontSize: '1.2em', margin: '0' }}>Featured tweet</h6></div>
                <div><h6 style={{ fontSize: '1.2em', margin: '0' }}>Follow us on Twitter</h6></div>
              </div>
              <div style={{
                display: 'flex', justifyContent: 'center', padding: '1em', gap: '2em',
              }}
              >
                <TwitterTweetEmbed
                  tweetId="933354946111705097"
                  className={classes.test}
                />

                <div style={{
                  marginTop: '1em', height: '26.5em',
                }}
                >
                  <TwitterTimelineEmbed
                    sourceType="profile"
                    screenName="ncidatasci"
                    options={{ height: 300 }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div style={{ position: 'relative', top: '4.1em' }}>
            <h4 style={{
              color: '#fff', fontSize: '2em', fontFamily: 'Raleway', margin: '0',
            }}
            >
              Images
            </h4>
            <div className={classes.root}>
              <ImageList className={classes.imageList} cols={2.5}>
                {itemData.map((item) => (
                  <ImageListItem key={item.img}>
                    <img src={item.img} alt={item.titlee} className={classes.img} />
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

      <div style={{ width: '81em', position: 'relative', right: '6em' }}>
        <h4 style={{
          color: '#fff', fontSize: '2em', fontFamily: 'Raleway', margin: '0',
        }}
        >
          Videos
        </h4>
        <div style={{
          display: 'flex', backgroundColor: '#fff', borderRadius: '0.5em', justifyContent: 'center', marginBottom: '5em', flexDirection: 'column',
        }}
        >
          <div style={{
            display: 'flex',
            background: '#1977CC',
            justifyContent: 'space-between',
            padding: '0.5em 19.5em 0.5em 1em',
            color: '#fff',
            borderTopLeftRadius: '0.5em',
            borderTopRightRadius: '0.5em',
            WebkitBorderTopLeftRadius: '0.5em',
            WebkitBorderTopRightRadius: '0.5em',
          }}
          >
            <div><h6 style={{ fontSize: '1.2em', margin: '0' }}>Featured video</h6></div>
            <div><h6 style={{ fontSize: '1.2em', margin: '0' }}>Other videos</h6></div>
          </div>

          <div style={{
            display: 'grid', justifyContent: 'center', gridTemplateColumns: '2fr 1fr', gap: '1em', padding: '1em',
          }}
          >
            <div>
              <ReactPlayer url="https://www.youtube.com/watch?v=bIWaMKZ9pl4" height="100%" width="100%" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
              <ReactPlayer url="https://www.youtube.com/watch?v=bIWaMKZ9pl4" height="15em" width="100%" />
              <ReactPlayer url="https://www.youtube.com/watch?v=bIWaMKZ9pl4" height="15em" width="100%" />
            </div>
          </div>

        </div>
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
    // justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '5em',
    gap: '6em',
    height: '100%',
    width: '100%',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    width: '48em',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '0.5em',
    padding: '1em',
  },
  img: {
    height: '100%',
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
