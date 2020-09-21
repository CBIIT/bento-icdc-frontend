import React, { PureComponent } from 'react';
import { Sunburst, LabelSeries } from 'react-vis';
import { withStyles } from '@material-ui/core';

function getKeyPath(node) {
  if (!node.parent) {
    return ['root'];
  }

  return [(node.data && node.data.title) || node.title].concat(
    getKeyPath(node.parent),
  );
}

function updateData(d, keyPath) {
  const data = d;
  if (data.children) {
    data.children.map((child) => updateData(child, keyPath));
    data.style = {
      ...data.style,
      fillOpacity: keyPath && !keyPath[data.title] ? 0.2 : 0.7,
    };
  } else {
    data.style = {
      ...data.style,
      fillOpacity: keyPath && !keyPath[data.title] ? 0.2 : 1,
    };
  }
  return data;
}

function sortData(d) {
  const data = d;
  if (data.children) {
    data.children.sort((a, b) => a.title.localeCompare(b.title));
    data.children.map((a) => sortData(a));
  }

  return data;
}

// find the caseSize of a given title
function findCaseSizeOfTitle(data, title) {
  if (title === '') {
    return data.children.reduce((a, c) => a + c.caseSize, 0);
  }
  if (data.title !== title) {
    if (data.children) {
      let match = 0;
      data.children.forEach((d) => {
        const res = findCaseSizeOfTitle(d, title);
        if (res !== 0) {
          match = res;
        }
      });
      return match;
    }
    return 0;
  }
  return data.caseSize;
}

const styles = (theme) => ({
  title: {
    fontSize: '12px',
    maxWidth: '1440px',
    fontFamily: theme.custom.fontFamilySans,
    lineHeight: '20px',
    fontWeight: '600',
    paddingLeft: '28px',
    height: '20px',
    color: theme.palette.widgetBackground.contrastText,
  },
  customWidget: {
    marginTop: '-21px',
  },
  sunburst: {
    marginTop: '-8px',
  },

});

class ProgramSunburst extends PureComponent {
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
      widgetData: updateData(sortData(data)),
      size: data.children[0].size,
      title: '',
      caseSize: findCaseSizeOfTitle(data, ''),
    };
  }

  componentDidUpdate(prevProps) {
    // eslint-disable-next-line react/destructuring-assignment
    if (prevProps.data !== this.props.data) {
      this.updateStateIfNeeded();
    }
  }

  updateStateIfNeeded() {
    const { size, title } = this.state;
    const { data } = this.props;
    this.setState({
      widgetData: sortData(data),
      size,
      title,
      caseSize: findCaseSizeOfTitle(data, title),
    });
  }

  render() {
    const {
      caseSize, widgetData, title,
    } = this.state;
    const {
      width, height, textColor, classes,
    } = this.props;

    return (
      <>
        <div className={classes.customWidget}>
          <div className={classes.title}>
            {caseSize > 0 ? title : ''}
          </div>
          <div className={classes.sunburst}>
            <Sunburst
              id={widgetData.key}
              hideRootNode
              animation
              colorType="literal"
              data={widgetData}
              height={height}
              width={width}
              style={{
                stroke: '#ddd',
                strokeOpacity: 0.3,
                strokeWidth: '0.5',
              }}
              onValueMouseOver={(node) => {
                const path = getKeyPath(node).reverse();
                const pathAsMap = path.reduce((res, row) => {
                  res[row.toString()] = true;
                  return res;
                }, {});
                const wdata = updateData(widgetData, pathAsMap);
                this.setState({
                  size: node.size,
                  widgetData: wdata,
                  title: node.title,
                  caseSize: node.size || node.caseSize,
                });
              }}
            >
              {caseSize > 0 && (
              <LabelSeries data={[{
                x: 0,
                y: 0,
                label: caseSize.toString(),
                style: {
                  fontSize: '12px',
                  textAnchor: 'middle',
                  fill: textColor,
                  fontFamily: '"Lato Regular","Open Sans", sans-serif',
                },
              }, {
                x: 0,
                y: 1,
                label: 'Cases',
                style: {
                  fontSize: '12px',
                  textAnchor: 'middle',
                  fill: textColor,
                  fontFamily: '"Lato Regular","Open Sans", sans-serif',
                },
              }]}
              />
              )}
            </Sunburst>
          </div>
        </div>
      </>
    );
  }
}

export default withStyles(styles)(ProgramSunburst);
