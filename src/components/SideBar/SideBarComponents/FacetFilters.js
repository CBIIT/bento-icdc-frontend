import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Checkbox,
  List,
  ListItem,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  withStyles,
  Divider,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import _ from 'lodash';
import {
  CheckBox as CheckBoxIcon, CheckBoxOutlineBlank as CheckBoxBlankIcon, ArrowDropDown
  as ArrowDropDownIcon, ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';
import { toggleCheckBox, setSideBarToLoading, setDashboardTableLoading } from '../../../pages/dashboardTab/store/dashboardReducer';
import { facetSectionVariables, facetSearchData } from '../../../bento/dashboardData';
import GA from '../../../utils/googleAnalytics';

const CustomExpansionPanelSummary = withStyles({
  root: {
    marginBottom: -1,
    minHeight: 38,
    '&$expanded': {
      minHeight: 64,
    },
  },
  content: {
    '&$expanded': {
      margin: '16px 0',
    },
  },
  expanded: {},
})(ExpansionPanelSummary);

const FacetPanel = ({ classes }) => {
  // data from store
  const sideBarContent = useSelector((state) => (
    state.dashboardTab
    && state.dashboardTab.checkbox
      ? state.dashboardTab.checkbox : {
        data: [],
        defaultPanel: false,
      }));
  // data from store for sidebar laoding
  const isSidebarLoading = useSelector((state) => (
    state.dashboardTab
  && state.dashboardTab.setSideBarLoading
      ? state.dashboardTab.setSideBarLoading : false));
  const tabDataLoading = useSelector((state) => (state.dashboardTab
    && state.dashboardTab.isDashboardTableLoading
    ? state.dashboardTab.isDashboardTableLoading
    : false));
  // redux use actions
  const dispatch = useDispatch();

  const [expanded, setExpanded] = React.useState(false);

  const [groupExpanded, setGroupExpanded] = React.useState(['case']);

  const activeFilters = useSelector((state) => (
    state.dashboardTab
      && state.dashboardTab.allActiveFilters
      ? state.dashboardTab.allActiveFilters : {}));

  Object.entries(activeFilters).map((filter) => {
    const filterLabel = facetSearchData.filter((word) => word.datafield === filter[0]);
    if ((filter[1].length >= 1) && (document.getElementById(`filterGroup_${filter[0]}`))) {
      document.getElementById(`filterGroup_${filter[0]}`).innerHTML = `${filterLabel[0].label}*`;
      document.getElementById(`filterGroup_${filter[0]}`).style.color = facetSectionVariables[filterLabel[0].section].color;
    } else if (document.getElementById(`filterGroup_${filter[0]}`)) {
      document.getElementById(`filterGroup_${filter[0]}`).innerHTML = `${filterLabel[0].label}`;
      document.getElementById(`filterGroup_${filter[0]}`).style.color = 'black';
    }
    return '';
  });

  React.useEffect(() => {
    if (!expanded || !(expanded === `${sideBarContent.defaultPanel}false` || expanded !== false)) {
      setExpanded(sideBarContent.defaultPanel);
    }
  });

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : `${panel}false`);
    GA.sendEvent('Facets', isExpanded ? 'expand' : 'collapse', `${panel} Panel`);

    // set height of filters.
  };

  const handleGroupChange = (panel) => (event, isExpanded) => {
    GA.sendEvent('Facets', isExpanded ? 'expand' : 'collapse', `${panel} Group`);
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
    GA.sendEvent('Facets', 'Filter', valueList[1]);
    setSideBarToLoading();
    setDashboardTableLoading();
    // dispatch toggleCheckBox action
    dispatch(toggleCheckBox([{
      groupName: valueList[1],
      name: valueList[0],
      datafield: valueList[2],
      isChecked: !(valueList[3] === 'true'),
      section: valueList[4],
    }]));
  };

  const sideBarDisplay = sideBarContent.data.filter((sideBar) => sideBar.show === true)
    .slice(0, 15);

  const arrangeBySections = (arr) => {
    const sideBar = {};
    arr.forEach(({ section, ...item }) => {
      if (!sideBar[section]) {
        sideBar[section] = { sectionName: section, items: [] };
      }
      sideBar[section].items.push({ section, ...item });
    });
    return Object.values(sideBar);
  };
  const sideBarSections = arrangeBySections(sideBarDisplay);

  return (
    <>
      {sideBarSections.map((currentSection) => (
        <>
          <Divider
            variant="middle"
            style={{
              backgroundColor: facetSectionVariables[currentSection.sectionName]
                ? facetSectionVariables[currentSection.sectionName].color ? facetSectionVariables[currentSection.sectionName].color : '' : '#000000',
              margin: '0px',
              height: facetSectionVariables[currentSection.sectionName]
                ? facetSectionVariables[currentSection.sectionName].height ? facetSectionVariables[currentSection.sectionName].height : '' : '5px',
            }}
          />
          <ExpansionPanel
            expanded={groupExpanded.includes(currentSection.sectionName)}
            onChange={handleGroupChange(currentSection.sectionName)}
                // className={classes.expansion}
            classes={{
              root: classes.expansionPanelRoot,
            }}
          >
            <CustomExpansionPanelSummary
              expandIcon={<ArrowDropDownIcon classes={{ root: classes.dropDownIconSection }} />}
              aria-controls={currentSection.sectionName}
              id={currentSection.sectionName}
              classes={{
                expandIcon: classes.ExpansionPaneldropDownIcon,
              }}
            >
              {/* <ListItemText primary={sideBarItem.groupName} /> */}
              <div className={classes.sectionSummaryText}>{currentSection.sectionName}</div>

            </CustomExpansionPanelSummary>

            <ExpansionPanelDetails classes={{ root: classes.expansionPanelDetailsRoot }}>
              <List component="div" disablePadding dense>
                {currentSection.items.map((sideBarItem) => (
                  <>
                    <ExpansionPanel
                      expanded={expanded === sideBarItem.groupName}
                      onChange={handleChange(sideBarItem.groupName)}
                      classes={{
                        root: classes.expansionPanelsideBarItem,
                      }}
                    >
                      <CustomExpansionPanelSummary
                        expandIcon={(
                          <ExpandMoreIcon
                            classes={{ root: classes.dropDownIconSubSection }}
                          />
)}
                        aria-controls={sideBarItem.groupName}
                        id={sideBarItem.groupName}
                      >
                        {/* <ListItemText primary={sideBarItem.groupName} /> */}
                        <div id={`filterGroup_${sideBarItem.datafield}`} style={{ color: 'black' }} className={classes.subSectionSummaryText}>{sideBarItem.groupName}</div>

                      </CustomExpansionPanelSummary>

                      <ExpansionPanelDetails
                        classes={{ root: classes.expansionPanelDetailsRoot }}
                      >
                        <List component="div" disablePadding dense>
                          {
            sideBarItem.checkboxItems.map((checkboxItem) => {
              if (checkboxItem.subjects === 0 && !checkboxItem.isChecked) {
                return '';
              }
              return (
                <ListItem
                  button
                  onClick={handleToggle(`${checkboxItem.name}$$${sideBarItem.groupName}$$${sideBarItem.datafield}$$${checkboxItem.isChecked}$$${sideBarItem.section}`)}
                  className={classes.nested}
                  classes={{ gutters: classes.listItemGutters }}
                >
                  <Checkbox
                    id={`checkbox_${sideBarItem.groupName}_${checkboxItem.name}`}
                    icon={<CheckBoxBlankIcon style={{ fontSize: 18 }} />}
                    checkedIcon={<CheckBoxIcon style={{ fontSize: 18 }} />}
                    checked={checkboxItem.isChecked}
                    tabIndex={-1}
                    disableRipple
                    color="secondary"
                    classes={{ root: classes.checkboxRoot }}
                    style={{ color: facetSectionVariables[sideBarItem.section].color ? facetSectionVariables[sideBarItem.section].color : '#137fbe' }}
                  />
                  <div className={classes.panelDetailText}>
                    {`${checkboxItem.name}`}
                    { checkboxItem.code
                    && checkboxItem.code }
                    <span style={{ color: facetSectionVariables[sideBarItem.section].color ? facetSectionVariables[sideBarItem.section].color : '#137fbe' }}>
                      &nbsp;
                      {`(${checkboxItem.subjects})`}
                    </span>
                  </div>
                </ListItem>
              );
            })
          }
                        </List>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </>
                ))}
              </List>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <Backdrop className={classes.backdrop} open={isSidebarLoading || tabDataLoading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </>
      ))}
    </>
  );
};

const styles = () => ({
  expansionPanelRoot: {
    boxShadow: 'none',
    background: '#EAEAEA',
    margin: 'auto',
    position: 'initial',
    '&:before': {
      position: 'initial',
    },
  },
  expansionPanelsideBarItem: {
    boxShadow: 'none',
    borderTop: '1px solid #D2D2D2',
    borderLeft: '1px solid #D2D2D2',
    borderRight: '1px solid #D2D2D2',
    '&:last-child': {
      borderBottom: '1px solid #D2D2D2',
    },
    margin: 'auto',
    position: 'initial',
    '&:before': {
      position: 'initial',
    },
  },
  backdrop: {
    // position: 'absolute',
    zIndex: 99999,
    background: 'rgba(0, 0, 0, 0.1)',
  },
  expansionPanelDetailsRoot: {
    paddingBottom: '8px',
    display: 'unset',
  },
  dropDownIconSection: {
    fill: '#000000',
  },
  dropDownIconSubSection: {
    marginRight: '9px',
  },
  ExpansionPaneldropDownIcon: {
    left: '-215px',
  },
  sectionSummaryText: {
    color: '#323232',
    fontFamily: 'Raleway',
    fontSize: '15px',
    fontWeight: 'bold',
    letterSpacing: '0.25px',
    marginLeft: '-1px',
    lineHeight: '26px',
  },
  subSectionSummaryText: {
    marginLeft: '-1px',
    lineHeight: 0,
    color: '#323232',
    fontFamily: 'Raleway',
    fontSize: '13px',
    fontWeight: 'bold',
    letterSpacing: '0.25px',
  },
  panelDetailText: {
    color: '#000000',
    fontFamily: 'Nunito',
    fontSize: '15px',
    marginRight: '12px',
  },
  checkboxRoot: {
    height: 12,
  },
  listItemGutters: {
    padding: '8px 0px 8px 23px',
  },
});

export default withStyles(styles)(FacetPanel);
