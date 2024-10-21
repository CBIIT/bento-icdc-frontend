import React, { useCallback } from 'react';
import _ from 'lodash';
import {
  Button,
  Collapse,
  FormControlLabel,
  // Grid2 as Grid,
  Switch,
  IconButton,
} from '@mui/material';
// import { withStyles, makeStyles } from "@mui/styles";
import { withStyles, makeStyles, Grid } from '@material-ui/core';
import {
  WidgetGenerator,
  ToolTip,
} from '../../../bento-core';
import { useTheme } from '../../../ThemeContext';
import styles from './WidgetStyle';
import { themeToggleTooltip, widgetsData } from '../../../bento/dashboardData';
import colors from '../../../utils/colors';
import { Typography } from '../../../components/Wrappers/Wrappers';
import { formatWidgetData } from './WidgetUtils';
import emptyResultsDonutViewConfig from './CustomizeDonutViewConfig';

const WidgetView = ({
  classes,
  data,
  theme,
  activeFilters,
}) => {
  const displayWidgets = formatWidgetData(data, widgetsData);
  const [collapse, setCollapse] = React.useState(true);
  const themeChanger = useTheme();
  const handleChange = () => setCollapse((prev) => !prev);

  /**
  * Update widget data for file types to match the table data
  * @param {*} orginalData
  * @returns modified widget data
  */
  const modifyFileTypeData = (orginalData) => {
    const { file_type: fileTypes = [] } = activeFilters;
    if (fileTypes.length === 0) {
      return orginalData;
    }
    const filterValue = _.filter(
      orginalData, (item) => fileTypes.includes(item.group),
    );
    return filterValue;
  };

  const customClasses = makeStyles({
    widgetWrapper: {
      display: 'flex',
      minHeight: '100%',
      paddingBottom: '32px',
    },
    widgetHeader: { },
    widgetDivider: {
      background: (theme && theme.custom ? theme.custom.widgetDivider : 'transparent'),
      height: '6px',
      width: '180px',
      border: 'none',
      margin: '16px auto 0px auto',
    },
    paddedTitle: {
        display: 'flex',
        justifyContent: 'flex-start',
        padding: '0px 132px',
        marginTop: '32px',
        alignItems: 'center',
        marginBottom: '8px',
      },
    noPaddedTitle: {
      margin: '0px 0px 0px 0px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    widgetRoot: { },
    widgetBody: {
      margin: '0px auto',
      paddingRight: (theme && theme.spacing ? theme.spacing.unit * 3 : 0),
      paddingLeft: (theme && theme.spacing ? theme.spacing.unit * 3 : 0),
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
    customBackGround: {
      background: (theme && theme.palette ? theme.palette.widgetBackground.main : 'transparent'),
    },
  });

  const widgetGeneratorConfig = {
    theme,
    classes: customClasses,
    DonutConfig: {
      colors,
      styles: {
        cellPadding: 2,
        textOverflowLength: 20,
        textColor: theme.palette.widgetBackground.contrastText,
      },
    },
    SunburstConfig: {
      styles: {
        textColor: theme.palette.widgetBackground.contrastText,
      },
    },
  };
  const { Widget } = useCallback(WidgetGenerator(widgetGeneratorConfig), [theme]);
  const { Widget: CustmizeWidgetView } = useCallback(WidgetGenerator({
    ...widgetGeneratorConfig,
    DonutConfig: emptyResultsDonutViewConfig(),
  }), [theme]);

  const EmptyWidget = ({ index = 0, widget }) => (
    <Grid key={index} item lg={4} md={6} sm={12} xs={12}>
      <CustmizeWidgetView
        header={(
          <Typography size="md" weight="bold" family="Raleway" color="widgetTitle">
            {widget.title}
          </Typography>
        )}
        bodyClass={classes.fullHeightBody}
        className={classes.card}
        bottomDivider
        customBackGround
        padAngle={0.02}
        chartType="donut"
        sliceTitle={widget.sliceTitle}
        data={[{
          group: '',
          subjects: 1,
        }]}
      />
    </Grid>
  );

  return (<>
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
          inputProps={{
              "aria-label": 'collapse widget view switch'
          }}
          checked={themeChanger.dark}
          onChange={themeChanger.toggleTheme}
        />
        <ToolTip title={themeToggleTooltip.switchThemeButtonMessage} arrow placement="bottom">
          <IconButton className={classes.iconButton} aria-label="help" size="large">
            <img
              src={themeToggleTooltip.tooltipIcon}
              alt={themeToggleTooltip.tooltipAlt}
              className={classes.helpIcon}
            />
          </IconButton>
        </ToolTip>
      </div>
    </div>
    <Collapse in={collapse} className={classes.backgroundWidgets}>
      <Grid container>
        {widgetsData.slice(0).map((widget, index) => {
          let dataset = displayWidgets[widget.dataName];
          // modify file type widget data
          if (index === 5) {
            dataset = modifyFileTypeData(dataset);
          }
          if (!dataset || dataset.length === 0) {
            return <EmptyWidget widget={widget} index={index} />
          }
          if (widget.type === 'sunburst' && (!dataset.children || !dataset.children.length)) {
            return <EmptyWidget widget={widget} index={index} />;
          }
          return (
            <Grid key={index} item lg={4} md={6} sm={12} xs={12}>
              <Widget
                header={(
                  <Typography size="md" weight="bold" family="Raleway" color="widgetTitle">
                    {widget.title}
                  </Typography>
                )}
                bodyClass={classes.fullHeightBody}
                className={classes.card}
                bottomDivider
                customBackGround
                data={dataset}
                chartType={widget.type}
                sliceTitle={widget.sliceTitle}
                chartTitleLocation="top"
                chartTitleAlignment="left"
                padAngle={0.02}
              />
            </Grid>
          );
        })}
      </Grid>
    </Collapse>
  </>);
};

export default withStyles(styles, { withTheme: true })(WidgetView);
