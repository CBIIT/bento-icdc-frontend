import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  List,
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
  ArrowDropDown
  as ArrowDropDownIcon, ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';
import {
  toggleCheckBox,
  setSideBarToLoading,
  setDashboardTableLoading,
  sortSection,
  resetGroupSelections,
} from '../../../pages/dashboardTab/store/dashboardReducer';
import {
  facetSectionVariables,
  defaultFacetSectionVariables,
  sortLabels, showCheckboxCount,
  resetIconFilter,
} from '../../../bento/dashboardData';
import GA from '../../../utils/googleAnalytics';
import CheckBoxView from './CheckBoxView';

const size = '10px';
if (resetIconFilter.src === '') {
  resetIconFilter.src = 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Clear-icon.svg';
}

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

  const sortByForGroups = useSelector((state) => (
    state.dashboardTab
          && state.dashboardTab.sortByList
      ? state.dashboardTab.sortByList : {}));

  let groupNameColor = '';
  function getGroupNameColor(sideBarItem, currentSection) {
    groupNameColor = 'black';
    sideBarItem.checkboxItems.map(
      (item) => {
        if (item.isChecked) {
          groupNameColor = facetSectionVariables[currentSection.sectionName].color;
        }
        return '';
      },
    );
    return groupNameColor;
  }

  function getLineColor(index, length) {
    if (index === length - 1) {
      return '#FFFFFF';
    }
    return '#B1B1B1';
  }

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

  function getCheckBoxColor(index, currentSection) {
    return index % 2 ? facetSectionVariables[currentSection.sectionName].checkBoxColorsTwo
      : facetSectionVariables[currentSection.sectionName].checkBoxColorsOne;
  }

  const showSelectedChecbox = (sideBarItem, currentSection) => {
    const selectedItems = sideBarItem.checkboxItems.filter((item) => (item.isChecked));
    const selectedCheckbox = selectedItems.slice(0, showCheckboxCount)
      .map((item, index) => (
        <CheckBoxView
          checkboxItem={item}
          sideBarItem={sideBarItem}
          currentSection={currentSection}
          handleToggle={handleToggle}
          facetSectionVariables={facetSectionVariables}
          defaultFacetSectionVariables={defaultFacetSectionVariables}
          backgroundColor={getCheckBoxColor(index, currentSection)}
          checkColor={getGroupNameColor(sideBarItem, currentSection)}
        />
      ));

    return (
      <div>
        {selectedCheckbox}
        {selectedItems.length > showCheckboxCount && (
          <div className={classes.clearfix}>
            <div
              className={classes.showMore}
              onClick={(e) => (handleGroupsChange(sideBarItem.groupName)(e, true))}
            >
              {sortLabels.showMore}
            </div>
          </div>
        )}
      </div>
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
                            style={{ fontSize: 36 }}
                          />
)}
                        aria-controls={sideBarItem.groupName}
                        id={sideBarItem.groupName}
                        className={classes.customExpansionPanelSummaryRoot}
                      >
                        {/* <ListItemText primary={sideBarItem.groupName} /> */}
                        <div
                          id={sideBarItem.groupName}
                          style={{ color: getGroupNameColor(sideBarItem, currentSection) }}
                          className={classes.subSectionSummaryText}
                        >
                          {sideBarItem.groupName}
                        </div>

                      </CustomExpansionPanelSummary>

                      <ExpansionPanelDetails
                        classes={{ root: classes.expansionPanelDetailsRoot }}
                      >
                        <List component="div" disablePadding dense>
                          <div
                            className={classes.sortGroup}
                          >
                            <span
                              className={classes.sortGroupIcon}
                            >
                              <Icon
                                onClick={handleGroupReset(
                                  sideBarItem.datafield, sideBarItem.groupName,
                                )}
                                style={{ fontSize: 15 }}
                              >
                                <img
                                  src={resetIconFilter.src}
                                  height={size}
                                  width={size}
                                  alt={resetIconFilter.alt}
                                />
                              </Icon>
                            </span>
                            <span
                              className={classes.sortGroupItem}
                              style={{ color: getSortButtonColor(sideBarItem, 'alphabet') }}
                              onClick={() => {
                                sortSection(sideBarItem.groupName, 'alphabet');
                              }}
                            >
                              {sortLabels.sortAlphabetically}
                            </span>
                            <span
                              className={classes.sortGroupItemCounts}
                              style={{ color: getSortButtonColor(sideBarItem, 'count') }}
                              onClick={() => {
                                sortSection(sideBarItem.groupName, 'count');
                              }}
                            >
                              {sortLabels.sortByCount}
                            </span>
                          </div>
                          {
                            sideBarItem.checkboxItems.map(
                              (item, index) => (
                                <CheckBoxView
                                  key={index}
                                  checkboxItem={item}
                                  sideBarItem={sideBarItem}
                                  currentSection={currentSection}
                                  handleToggle={handleToggle}
                                  facetSectionVariables={facetSectionVariables}
                                  defaultFacetSectionVariables={defaultFacetSectionVariables}
                                  backgroundColor={getCheckBoxColor(index, currentSection)}
                                  checkColor={getGroupNameColor(sideBarItem, currentSection)}
                                  lineColor={getLineColor(index, sideBarItem.checkboxItems.length)}
                                />
                              ),
                            )
          }
                        </List>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <div className={classes.selectedCheckboxDisplay}>
                      { !groupsExpanded.includes(sideBarItem.groupName)
                      && showSelectedChecbox(sideBarItem, currentSection)}
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
    marginLeft: '0px',
    fill: '#000000',
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
    marginLeft: '5px',
    lineHeight: 0,
    color: '#323232',
    fontFamily: 'Raleway',
    fontSize: '13px',
    fontWeight: 'bold',
    letterSpacing: '0.25px',
    flexShrink: 0,
  },
  customExpansionPanelSummaryRoot: {
    flexDirection: 'row-reverse',
    paddingLeft: 0,
  },
  panelDetailText: {
    color: '#000000',
    fontFamily: 'Nunito',
    fontSize: '15px',
    marginRight: '12px',
  },
  panelSubjectText: {
    color: '#000000',
    fontFamily: 'Nunito',
    fontSize: '14px',
    marginRight: '12px',
  },
  sortGroup: {
    textAlign: 'left',
    borderTop: '1px solid #B1B1B1',
  },
  sortGroupItem: {
    cursor: 'pointer',
    fontFamily: 'Nunito',
    fontSize: '12px',
    marginRight: '8px',
  },
  sortGroupItemCounts: {
    cursor: 'pointer',
    fontFamily: 'Nunito',
    fontSize: '12px',
    marginRight: '8px',
  },
  sortGroupIcon: {
    cursor: 'pointer',
    fontFamily: 'Nunito',
    fontSize: '12px',
    marginRight: '10px',
    marginLeft: '16px',
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
});

export default withStyles(styles)(FacetPanel);
