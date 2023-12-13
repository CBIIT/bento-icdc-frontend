/* eslint-disable */
import React, { PureComponent } from 'react';
import Chart, {
  Series,
  CommonSeriesSettings,
  SeriesTemplate,
  Tooltip as CartToolTip,
  Grid as ChartGrid,
  Label,
  ValueAxis,
  ArgumentAxis,
  Border,
  Shadow,
  Size,
  Font,
  Title,
  Legend,
  Tick,
  HoverStyle,
} from 'devextreme-react/chart';

const enable = true;

class BarChart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  /** repeat palette to argument length */
  extendPalette = (palette, data) => {
    if (palette && palette.length > 0) {
      return [].concat(...new Array(Math
        .ceil(data.length / palette.length)).fill(palette));
    }
  }

  /** override deafault config values */
  setConfigValues = (props) => {
    const properties = {};
    for (const [key, defaultVal] of Object.entries(props.defaultConfig)) {
      const value = props[key];
      properties[key] = { ...defaultVal, ...value };
    }
    // update data
    const { data } = this.props;
    this.state = { ...this.state, ...properties, data };
  }

  render() {
    this.setConfigValues(this.props);
    const {
      data, palette, mode, tooltipContent, size,
      tooltipConfig, seriesSetting, argument, value, type,
    } = this.state;
    return (
      <>
        <Chart
          palette={mode ? palette : this.extendPalette(palette, data)}
          dataSource={data}
          paletteExtensionMode={mode}
        >

          {/* chart dimension */}
          <Size height={size.height} width={size.width} />

          {/* indiviual series setting */}
          <Series type={type}  />

          {/* common series setting */}
          <CommonSeriesSettings
            argumentField={argument.field}
            valueField={value.field}
            type={type}
            ignoreEmptyPoints={seriesSetting.ignoreEmptyPoints}
            showInLegend={seriesSetting.showInLegend}
            barWidth={seriesSetting.maxBarWidth}
            hoverMode={seriesSetting.hoverMode}
            border={seriesSetting.border}
            color={seriesSetting.color}
            hoverStyle={seriesSetting.hoverStyle}
          >
            <HoverStyle
              border={seriesSetting.hoverStyle.border}
              color={seriesSetting.hoverStyle.color}
              dashStyle={seriesSetting.hoverStyle.dashStyle}
              width={seriesSetting.hoverStyle.width}
            />
            <Label
              visible={seriesSetting.label.visible}
              backgroundColor={seriesSetting.label.backgroundColor}
              alignment={seriesSetting.label.alignment}
            >
              <Font {...seriesSetting.label.size} />
            </Label>
            <Border
              color={seriesSetting.border.color}
              dashStyle={seriesSetting.border.dashStyle}
              visible={seriesSetting.border.visible}
              width={seriesSetting.border.width}
            />
          </CommonSeriesSettings>

          <SeriesTemplate nameField={argument.field}  />

          {/* value or y axis */}
          <ValueAxis allowDecimals={value.allowDecimals}>
            <Tick {...value.tick} />
            <Title text={value.title.text}>
              <Font {...value.title} />
            </Title>
            <ChartGrid visible={value.chartGrid.visible} />
            <Label position={value.label.position}>
              <Font {...value.label} />
            </Label>
          </ValueAxis>

          {/* argument axis */}
          <ArgumentAxis>
            <Title text={argument.title.text}>
              <Font {...argument.title} />
            </Title>
            <Label visible={argument.visible} position={argument.label.position}>
              <Font {...argument.label} />
            </Label>
          </ArgumentAxis>

          {/* tooltip */}
          {tooltipContent && (
          <CartToolTip enabled={tooltipConfig.enable} contentRender={tooltipContent}>
            <Font family={tooltipConfig.family} size={tooltipConfig.size} />
            <Border color={tooltipConfig.color} width={tooltipConfig.width} />
            <Shadow
              blur={tooltipConfig.blur}
              offsetY={tooltipConfig.offsetY}
              opacity={tooltipConfig.opacity}
            />
          </CartToolTip>
          )}

          {/*<Legend visible />*/}
        </Chart>
      </>
    );
  }
}

BarChart.defaultProps = {
  type: 'bar',
  palette: '',
  defaultConfig: {
    //* * Xaxis config value */
    argument: {
      field: '',
      visible: false,
      position: 'inside',
      title: {
        text: '',
        color: '#ffffff',
        family: 'Open Sans',
        opacity: 1,
        size: 14,
        weight: 400,
      },
      size: 12,
      label: {
        visible: false,
        size: 12,
        position: 'inside',
        staggeringSpacing: 10,
      },
    },

    //* * Yaxis config value */
    value: {
      field: 'count',
      title: {
        text: '',
        color: '#ffffff',
        family: 'Open Sans',
        opacity: 1,
        size: 14,
        weight: 400,
      },
      size: 12,
      allowDecimals: false,
      chartGrid: {
        visible: false,
      },
      label: {
        size: 12,
        position: 'outside',
      },
      tick: {
        visible: true,
      },
    },

    /** common series setting */
    seriesSetting: {
      ignoreEmptyPoints: true,
      showInLegend: false,
      maxBarWidth: 80,
      hoverMode: 'none',
      label: {
        visible: false,
        backgroundColor: undefined,
        alignment: 'center',
        color: '#ffffff',
        family: 'Open Sans',
        opacity: 1,
        size: 14,
        weight: 400,
      },
      color: '',
      border: {
        color: undefined,
        dashStyle: undefined,
        visible: false,
        with: false,
      },
      hoverStyle: {
        border: {
          color: 'red',
          dashStyle: undefined,
          visible: false,
          with: false,
        },
        color: undefined,
        dashStyle: 'solid',
        width: 3,
      },
    },

    /** chart dimension */
    size: {
      height: 300,
      width: 300,
    },

    /** tooltip configuration */
    tooltipConfig: {
      enable: true,
      family: 'Open Sans',
      size: 12,
      color: '#A7AFB3',
      width: 2,
      blur: 0,
      offsetY: 0,
      opacity: 0,
      interactive: false,
    },
  },
};

export default BarChart;
