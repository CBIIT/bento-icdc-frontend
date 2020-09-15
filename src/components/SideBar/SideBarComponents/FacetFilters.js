import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  withStyles,
} from '@material-ui/core';
import _ from 'lodash';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { toggleCheckBox } from '../../../pages/dashboard/store/dashboardAction';
import { Typography } from '../../Wrappers/Wrappers';

const FacetPanel = (classes) => {
  // data from store
  const sideBarContent = useSelector((state) => (
    state.dashboard
    && state.dashboard.checkbox
    && state.dashboard.checkbox.data
      ? state.dashboard.checkbox.data : []));
  // redux use actions
  const dispatch = useDispatch();

  const [expanded, setExpanded] = React.useState(false);

  const [groupExpanded, setGroupExpanded] = React.useState(['case']);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleGroupChange = (panel) => (event, isExpanded) => {
    const groups = _.cloneDeep(groupExpanded);
    if (isExpanded) {
      groups.push(panel);
    } else {
      const index = groups.indexOf(panel);
      if (index > -1) {
        groups.splice(index, 1);
      }
    }

    setGroupExpanded(groups);
  };

  const handleToggle = (value) => () => {
    const valueList = value.split('$$');
    // dispatch toggleCheckBox action
    dispatch(toggleCheckBox([{
      groupName: valueList[1],
      name: valueList[0],
      datafield: valueList[2],
      isChecked: !(valueList[3] === 'true'),
      section: valueList[4],
      key: valueList[5],
    }]));
  };

  function FacetFilterWrapper(children, name, styles) {
    return (
      <ExpansionPanel
        expanded={groupExpanded.includes(name)}
        onChange={handleGroupChange(name)}
        classes={{ expanded: classes.classes.expansionPanelExpanded }}
      >
        <ExpansionPanelSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          classes={{
            root: styles,
            expandIcon: classes.classes.expansionPanelSummaryCateRootExpandIcon,
          }}
        >
          <ListItemText classes={{ primary: classes.classes.expansionPanelSummaryCateTitle }} primary={`Filter By ${name[0].toUpperCase()}${name.slice(1)}s`} />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List component="div" disablePadding dense>
            {children}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }

  function FacetFilterbuilder(sideBarItem) {
    // check if this group of filter has at least one be checked.
    // true-> yes has at least one be checked.
    const flag = sideBarItem.checkboxItems
      .map((checkboxItem) => (checkboxItem.isChecked))
      .includes(true);

    let checkedStyle = classes.classes.unCheckedBg;
    if (flag) {
      checkedStyle = classes.classes.checkedBg;
    }
    return (
      <ExpansionPanel
        expanded={expanded === sideBarItem.groupName}
        onChange={handleChange(sideBarItem.groupName)}
        classes={{ expanded: classes.classes.expansionPanelExpanded }}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          classes={{ root: checkedStyle }}
        >
          <ListItemText
            classes={{ primary: classes.classes.expansionPanelSummaryCateTitle }}
            primary={sideBarItem.groupName}
          />
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <List component="div" classes={{ root: classes.classes.nested }}>
            {
            sideBarItem.checkboxItems.map((checkboxItem) => {
              if (checkboxItem.cases === 0 && !checkboxItem.isChecked) {
                return '';
              }
              let styles = '';
              switch (sideBarItem.section) {
                case 'case':
                  styles = classes.classes.caseCheckBox;
                  break;
                case 'file':
                  styles = classes.classes.fileCheckBox;
                  break;
                case 'sample':
                  styles = classes.classes.sampleCheckBox;
                  break;
                default:
                  styles = classes.classes.caseCheckBox;
              }
              return (
                <ListItem
                  button
                  onClick={handleToggle(`${checkboxItem.name}$$${sideBarItem.groupName}$$${sideBarItem.datafield}$$${checkboxItem.isChecked}$$${sideBarItem.section}$$${sideBarItem.key}`)}
                  className={classes.nested}
                >
                  <Checkbox
                    classes={{ root: styles }}
                    checked={checkboxItem.isChecked}
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText primary={(
                    <div style={{ display: 'flex' }}>
                      <Typography>
                        {checkboxItem.name}
                      </Typography>
                      <Typography classes={{ root: styles }}>
                        (
                        {checkboxItem.cases}
                        )
                      </Typography>
                    </div>
)}
                  />
                </ListItem>
              );
            })
          }
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }

  //  'case' => [<compent>]
  const FacetFilterGroup = {};
  const GroupOrder = [];
  sideBarContent.forEach((sideBarItem) => {
    if (sideBarItem.show) {
      if (sideBarItem.section in FacetFilterGroup) {
        FacetFilterGroup[sideBarItem.section].push(FacetFilterbuilder(sideBarItem));
      } else {
        GroupOrder.push(sideBarItem.section);
        FacetFilterGroup[sideBarItem.section] = [FacetFilterbuilder(sideBarItem)];
      }
    }
  });

  return (
    GroupOrder.map((order) => {
      let styles = '';
      switch (order) {
        case 'case':
          styles = classes.classes.expansionPanelSummaryCateRootCases;
          break;
        case 'file':
          styles = classes.classes.expansionPanelSummaryCateRootFile;
          break;
        case 'sample':
          styles = classes.classes.expansionPanelSummaryCateRootSample;
          break;
        default:
          styles = classes.classes.expansionPanelSummaryCateRootCases;
      }
      return FacetFilterWrapper(
        FacetFilterGroup[order], order, styles,
      );
    })
  );
};

const styles = () => ({
  nested: {
    width: '100% !important',
  },
  expansionPanelSummaryCateRootCases: {
    borderTop: '#F48439 solid 4px',
    background: '#EAEAEA',
    height: '15px',
  },
  expansionPanelSummaryCateRootFile: {
    borderTop: '#2446C6 solid 4px',
    background: '#EAEAEA',
    height: '15px',
  },
  expansionPanelSummaryCateRootSample: {
    borderTop: '#05C5CC solid 4px',
    background: '#EAEAEA',
    height: '15px',
  },
  expansionPanelSummaryCateRootExpandIcon: {
    right: 'auto',
    left: '8px',
  },
  caseCheckBox: {
    paddingLeft: '5px',
    color: '#F48439 !important',
  },
  sampleCheckBox: {
    paddingLeft: '5px',
    color: '#05C5CC !important',
  },
  fileCheckBox: {
    paddingLeft: '5px',
    color: '#2446C6 !important',
  },
  expansionPanelSummaryCateTitle: {
    height: '15px',
    color: '#323232',
    fontFamily: 'Raleway',
    fontSize: '15px',
    fontWeight: 'bold',
    letterSpacing: '0.25px',
    lineHeight: '18px',
    paddingLeft: '5px',
    width: '100%',
  },
  expansionPanelExpanded: {
    margin: 0,
    width: '100%',
  },
  unCheckedBg: {
  },
  checkedBg: {
  },
});

export default withStyles(styles)(FacetPanel);
