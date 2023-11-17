import React, { useCallback } from 'react';
import _ from 'lodash';
import {
  Button,
  Collapse,
  FormControlLabel,
  Grid,
  Switch,
  withStyles,
  IconButton,
} from '@material-ui/core';
import {
  WidgetGenerator,
  ToolTip,
} from '../../../bento-core';
import { useTheme } from '../../../components/ThemeContext';
import styles from './WidgetStyle';
import { themeToggleTooltip, widgetsData } from '../../../bento/dashboardData';
import colors from '../../../utils/colors';
import { Typography } from '../../../components/Wrappers/Wrappers';
import { formatWidgetData } from './WidgetUtils';

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

  const widgetGeneratorConfig = {
    theme,
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

  return (
    <>
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
            checked={themeChanger.dark}
            onChange={themeChanger.toggleTheme}
          />
          <ToolTip title={themeToggleTooltip.switchThemeButtonMessage} arrow placement="bottom">
            <IconButton className={classes.iconButton} aria-label="help">
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
            if (index === 5) {
              dataset = modifyFileTypeData(dataset);
            }
            if (!dataset || dataset.length === 0) {
              return <></>;
            }
            if (widget.type === 'sunburst' && (!dataset.children || !dataset.children.length)) {
              return <></>;
            }
            return (
              <Grid key={index} item lg={4} md={6} sm={12} xs={12}>
                <Widget
                  header={(
                    <Typography size="md" weight="bold" family="Raleway" color="lochmara">
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
    </>
  );
};

export default withStyles(styles, { withTheme: true })(WidgetView);
