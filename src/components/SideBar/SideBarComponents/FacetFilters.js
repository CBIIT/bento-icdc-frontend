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
  Icon,
} from '@material-ui/core';
import _ from 'lodash';
import {
  CheckBox as CheckBoxIcon, CheckBoxOutlineBlank as CheckBoxBlankIcon, ArrowDropDown
  as ArrowDropDownIcon, ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';
import {
  toggleCheckBox,
  setSideBarToLoading,
  setDashboardTableLoading,
  sortGroupCheckboxByAlphabet,
  sortGroupCheckboxByCount,
  resetGroupSelections,
} from '../../../pages/dashboardTab/store/dashboardReducer';
import {
  facetSectionVariables, facetSearchData, sortLabels, resetIcon,
} from '../../../bento/dashboardData';
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

const FacetPanel = ({ classes, disabled }) => {
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

  const [groupsExpanded, setGroupsExpanded] = React.useState([]);

  const [sectionExpanded, setSectionExpanded] = React.useState(
    Object.keys(facetSectionVariables).reduce((acc, filterKey) => {
      const { isExpanded } = facetSectionVariables[filterKey];
      if (isExpanded) {
        acc.push(filterKey);
      }
      return acc;
    }, []),
  );

  const activeFilters = useSelector((state) => (
    state.dashboardTab
      && state.dashboardTab.allActiveFilters
      ? state.dashboardTab.allActiveFilters : {}));

  const sortByForGroups = useSelector((state) => (
    state.dashboardTab
          && state.dashboardTab.sortByList
      ? state.dashboardTab.sortByList : {}));

  Object.entries(activeFilters).map((filter) => {
    const filterLabel = facetSearchData.filter((word) => word.datafield === filter[0]);
    if ((filter[1].length >= 1) && (document.getElementById(`filterGroup_${filter[0]}`))) {
      document.getElementById(`filterGroup_${filter[0]}`).innerHTML = `${filterLabel[0].label}`;
      document.getElementById(`filterGroup_${filter[0]}`).style.color = facetSectionVariables[filterLabel[0].section].color;
    } else if (document.getElementById(`filterGroup_${filter[0]}`)) {
      document.getElementById(`filterGroup_${filter[0]}`).innerHTML = `${filterLabel[0].label}`;
      document.getElementById(`filterGroup_${filter[0]}`).style.color = 'black';
    }
    return '';
  });

  React.useEffect(() => {
    if (!groupsExpanded || !(groupsExpanded === `${sideBarContent.defaultPanel}false` || groupsExpanded !== false)) {
      setGroupsExpanded(sideBarContent.defaultPanel);
    }
  });

  // const handleChange = (panel) => (event, isExpanded) => {
  //   setExpanded(isExpanded ? panel : `${panel}false`);
  //   GA.sendEvent('Facets', isExpanded ? 'expand' : 'collapse', `${panel} Panel`);

  //   // set height of filters.
  // };

  const handleGroupsChange = (panel) => (event, isExpanded) => {
    const groups = _.cloneDeep(groupsExpanded);
    if (isExpanded) {
      groups.push(panel);
    } else {
      const index = groups.indexOf(panel);
      if (index > -1) {
        groups.splice(index, 1);
      }
    }

    setGroupsExpanded(groups);

    // set height of filters.
  };

  const handleSectionChange = (panel) => (event, isExpanded) => {
    const sections = _.cloneDeep(sectionExpanded);
    if (isExpanded) {
      sections.push(panel);
    } else {
      const index = sections.indexOf(panel);
      if (index > -1) {
        sections.splice(index, 1);
      }
    }

    setSectionExpanded(sections);
  };

  // const handleGroupChange = (panel) => (event, isExpanded) => {
  //   GA.sendEvent('Facets', isExpanded ? 'expand' : 'collapse', `${panel} Group`);
  //   const groups = _.cloneDeep(expanded);
  //   if (isExpanded) {
  //     groups.push(panel);
  //   } else {
  //     const index = groups.indexOf(panel);
  //     if (index > -1) {
  //       groups.splice(index, 1);
  //     }
  //   }

  //   setGroupExpanded(groups);
  // };

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

  const handleGroupReset = (dataField, groupName) => () => {
    setSideBarToLoading();
    setDashboardTableLoading();
    // dispatch toggleCheckBox action
    dispatch(resetGroupSelections({ dataField, groupName }));
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

  function getSortButtonColor(sideBarItem, sortType) {
    return (sortByForGroups[sideBarItem.groupName] === sortType
      ? '#B2C6D6' : '#4A4A4A');
  }

  const getCheckBoxView = (checkboxItem, sideBarItem) => {
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
  };

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
            disabled={disabled}
            expanded={sectionExpanded.includes(currentSection.sectionName)}
            onChange={handleSectionChange(currentSection.sectionName)}
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
                      expanded={groupsExpanded.includes(sideBarItem.groupName)}
                      onChange={handleGroupsChange(sideBarItem.groupName)}
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
                          <div className={classes.sortGroup}>
                            <span
                              className={classes.sortGroupItem}
                              style={{ paddingLeft: '5px' }}
                            >
                              <Icon
                                onClick={
                                  handleGroupReset(sideBarItem.datafield, sideBarItem.groupName)
                                }
                              >
                                <img
                                  src={resetIcon.src}
                                  height={resetIcon.size}
                                  width={resetIcon.size}
                                  alt={resetIcon.alt}
                                />
                              </Icon>
                            </span>
                            <span
                              className={classes.sortGroupItem}
                              style={{ color: getSortButtonColor(sideBarItem, 'alphabet') }}
                              onClick={() => {
                                sortGroupCheckboxByAlphabet(sideBarItem.groupName);
                              }}
                            >
                              {sortLabels.sortAlphabetically}
                            </span>
                            <span
                              className={classes.sortGroupItem}
                              style={{ color: getSortButtonColor(sideBarItem, 'count') }}
                              onClick={() => {
                                sortGroupCheckboxByCount(sideBarItem.groupName);
                              }}
                            >
                              {sortLabels.sortByCount}
                            </span>
                          </div>
                          {
            sideBarItem.checkboxItems.map(
              (checkboxItem) => getCheckBoxView(checkboxItem, sideBarItem, currentSection),
            )
          }
                        </List>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <div className={classes.selectedCheckboxDisplay}>
                      { !groupsExpanded.includes(sideBarItem.groupName)
                      && sideBarItem.checkboxItems
                        .filter((item) => (item.isChecked))
                        .map((item) => getCheckBoxView(item, sideBarItem, currentSection))}
                    </div>
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
  sortGroup: {
    textAlign: 'center',
  },
  sortGroupItem: {
    cursor: 'pointer',
    fontFamily: 'Nunito',
    fontSize: '12px',
    marginRight: '10px',
  },
  checkboxRoot: {
    height: 12,
  },
  showMore: {
    float: 'right',
    paddingRight: '5px',
    cursor: 'pointer',
    fontSize: '10px',
  },
  selectedCheckboxDisplay: {
    maxHeight: '200px',
    overflow: 'auto',
  },
  listItemGutters: {
    padding: '8px 0px 8px 23px',
  },
});

export default withStyles(styles)(FacetPanel);
