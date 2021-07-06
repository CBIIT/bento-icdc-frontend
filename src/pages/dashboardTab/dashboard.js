import React from 'react';
import {
  Grid, withStyles, Button, Switch, Collapse, FormControlLabel, IconButton,
} from '@material-ui/core';
import { ProgramSunburst, CustomActiveDonut, ToolTip as Tooltip } from 'bento-components';
import Chip from '@material-ui/core/Chip';
import { useTheme } from '../../components/ThemeContext';
import Widget from '../../components/Widgets/WidgetView';
import Stats from '../../components/Stats/DashboardStatsController';
import SideBar from '../../components/SideBar/SideBarView';
import { widgetsData, themeToggleTooltip } from '../../bento/dashboardData';
import { multiStudyData as custodianMultiStudyData } from '../../bento/dashboardTabData';
import Tab from './components/tabController';
import { Typography } from '../../components/Wrappers/Wrappers';
import colors from '../../utils/colors';

const displaywidgets = widgetsData.filter((widget) => widget.show === true).slice(0, 6);

const Dashboard = ({
  classes, data, theme, multiStudyData,
}) => {
  const [collapse, setCollapse] = React.useState(true);
  const [unifiedViewFlag, setUnifiedViewFlag] = React.useState(false);
  const themeChanger = useTheme();
  const handleChange = () => {
    setCollapse((prev) => !prev);
  };

  React.useEffect(() => {
    if (multiStudyData) {
      handleChange(); setUnifiedViewFlag(true);
    } else { setUnifiedViewFlag(false); }
  }, [multiStudyData]);

  return (
    <>
      <div className={classes.dashboardContainer}>
        <Stats />
        <div>
          <div className={classes.content}>
            <div className={classes.sideBar}>
              <SideBar unifiedViewFlag={unifiedViewFlag} />
            </div>
            <div className={classes.rightContent}>
              {
                !multiStudyData ? (
                  <div className={classes.widgetsContainer}>
                    <div className={classes.widgetsCollapse}>
                      <div className={classes.floatLeft} />
                      <div className={classes.floatRight}>
                        <FormControlLabel
                          control={(
                            <Button className={classes.customButton} onClick={handleChange}>
                              {collapse ? 'COLLAPSE VIEW' : 'OPEN VIEW'}
                            </Button>
                      )}
                        />
                        <Switch
                          classes={{
                            root: classes.switchRoot,
                            switchBase: classes.switchBase,
                            thumb: classes.thumb,
                            track: classes.track,
                            checked: classes.checked,
                          }}
                          className={classes.customSwitch}
                          disableRipple
                          onChange={() => {
                            themeChanger.toggleTheme();
                          }}
                        />
                        <Tooltip title={themeToggleTooltip.switchThemeButtonMessage} arrow placement="bottom">
                          <IconButton className={classes.iconButton} aria-label="help">
                            <img
                              src={themeToggleTooltip.tooltipIcon}
                              alt={themeToggleTooltip.tooltipAlt}
                              className={classes.helpIcon}
                            />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                    <Collapse in={collapse} className={classes.backgroundShawdowWidgets}>
                      <Grid container spacing={1}>
                        {displaywidgets.map((widget) => {
                          if (widget.type === 'sunburst' && widget.show) {
                            return (
                              <Grid item lg={4} md={6} sm={12} xs={12}>
                                <Widget
                                  title={widget.label}
                                  upperTitle
                                  bodyClass={classes.fullHeightBody}
                                  className={classes.card}
                                  widgetBorderDivider
                                  customBackGround
                                >
                                  <ProgramSunburst
                                    data={data[widget.dataName]}
                                    width={250}
                                    height={173}
                                    innerRadius={40}
                                    outerRadius={65}
                                    cx="50%"
                                    cy="50%"
                                    marginTop="33px"
                                    textColor={theme.palette.widgetBackground.contrastText}
                                    titleLocation="top"
                                    titleAlignment="left"
                                  />
                                </Widget>
                              </Grid>
                            );
                          }
                          if (widget.type === 'donut' && widget.show) {
                            return (
                              <Grid item lg={4} md={6} sm={12} xs={12}>
                                <Widget
                                  title={widget.label}
                                  upperTitle
                                  bodyClass={classes.fullHeightBody}
                                  className={classes.card}
                                  widgetBorderDivider
                                  customBackGround
                                >
                                  <CustomActiveDonut
                                    data={data[widget.dataName]}
                                    width={400}
                                    height={225}
                                    innerRadius={50}
                                    outerRadius={75}
                                    cx="50%"
                                    cy="50%"
                                    textColor={theme.palette.widgetBackground.contrastText}
                                    colors={colors}
                                    titleLocation="top"
                                    titleAlignment="left"
                                  />
                                </Widget>
                              </Grid>
                            );
                          }
                          return <></>;
                        })}
                      </Grid>
                    </Collapse>
                  </div>
                ) : null
              }
              {
                  multiStudyData ? (
                    <div>
                      <div className={classes.multiStudyHeader}>
                        <img
                          src={custodianMultiStudyData.icon}
                          className={classes.multiStudyIcon}
                          alt={custodianMultiStudyData.alt}
                        />
                        <Typography variant="h1" className={classes.multiStudyHeaderText} size="sm">
                          Multi-study Participant
                        </Typography>
                        <Chip className={classes.chip} size="small" label={`Canine Individual: ${multiStudyData.individualId}`} />
                      </div>
                      <hr className={classes.divider} />
                    </div>
                  ) : null
                }
              <Tab
                multiStudyData={multiStudyData}
              />
            </div>
          </div>
        </div>
        {/* Addingg diclaimer for Dev */}
        {/* <PositionedSnackbar /> */}
      </div>
    </>
  );
};

const styles = (theme) => ({
  dashboardContainer: {
    backgroundColor: '#FFFFFF',
    // boxShadow: 'inset 0 0 87px 7px rgba(27,28,28,0.15)',
  },
  multiStudyHeader: {
    display: 'flex',
  },
  headerBar: {
    fontWeight: '10',
    color: '#5e8ca5',
    margin: '0px 15px 0 15px',
  },
  chip: {
    marginTop: '15px',
    marginLeft: '10px',
    backgroundColor: '#FFFFFF',
    border: '2px solid #CF6A1A',
    color: '#CF6A1A',
  },
  multiStudyHeaderText: {
    color: '#CF6A1A',
    fontFamily: 'Open Sans',
    fontSize: '21px',
    lineHeight: '17px',
    height: '21px',
    paddingTop: '17px',
  },
  divider: {
    backgroundColor: '#81A6BA',
    height: '4px',
    width: '100%',
  },
  dashboardDivider: {
    height: 16,
    marginTop: '32px',
    backgroundColor: '#E2E7EC',
  },
  dashboardDividerTop: {
    height: 16,
    backgroundColor: theme.palette.widgetBackground.main,
  },
  rightContent: {
    maxWidth: 'calc(100% - 250px)',
    position: 'relative',
  },
  content: {
    // padding: theme.spacing.unit * 3,
    display: 'flex',
    // maxWidth: '1800px',
    margin: 'auto',
    paddingTop: '20px',
  },
  widgetsContainer: {
    background: theme.palette.widgetBackground.main,
  },
  contentShift: {
    width: `calc(100vw - ${theme.custom.drawerWidth})`,
    marginLeft: theme.custom.drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  card: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    textAlign: 'center',
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
  sunburst: {
    textAlign: 'center',
  },
  widgetInner: {
    marginTop: '-8px',
    borderBottom: '6px solid #E2E7EC',
  },
  widgetsCollapse: {
    background: theme.palette.widgetBackground.main,
  },
  helpIcon: {
    verticalAlign: 'top',
    width: '17px',
    zIndex: '600',
  },
  switchThemeMsg: {
    position: 'absolute',
    right: '-8px',
    zIndex: '400',
  },
  multiStudyIcon: {
    width: '50px',
  },
  floatRight: {
    position: 'relative',
    float: 'right',
    marginRight: '80px',
  },
  floatLeft: {
    float: 'left',
  },
  customSwitch: {
    marginTop: '-6px',
  },
  customButton: {
    borderRadius: '0 0 18px 18px',
    minHeight: '20px',
    fontSize: 8,
    color: '#ffffff',
    textTransform: 'none',
    backgroundColor: '#566672',
    marginRight: '4px',
    fontFamily: theme.custom.fontFamilySans,
    marginTop: '-4px',
    '&:hover': {
      backgroundColor: '#566672',
    },
  },
  backgroundWidgets: {
    background: theme.palette.widgetBackground.main,
  },
  backgroundShawdowWidgets: {
    background: theme.palette.widgetBackground.lattice,
    paddingBottom: '40px',
  },
  sideBar: {
    width: '250px',
    backgroundColor: '#FFFFFF',
    boxShadow: 'inset 0 0 87px 7px #E2E7EC',
    zIndex: '99',
  },
  statsBar: {
    position: 'fixed',
  },
  switchBase: {
    color: theme.palette.widgetBackground.contrastText,
    '&$checked': {
      color: theme.palette.widgetBackground.contrastSwicthColor,
    },
    '&$checked + $track': {
      backgroundColor: theme.palette.widgetBackground.contrastText,
    },
  },
  checked: {},
  track: {},
});

export default withStyles(styles, { withTheme: true })(Dashboard);
