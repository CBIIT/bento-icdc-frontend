/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React from 'react';
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
  Button,
} from '@material-ui/core';
import _ from 'lodash';
import {
  ArrowDropDown as ArrowDropDownIcon, ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  facetSearchData, facetSectionVariables, resetIcon, defaultFacetSectionVariables,
} from '../../../bento/dataDictionaryData';
import { toggleCheckBox, clearAllFilters } from '../reducers';
import CheckBoxView from '../../SideBar/SideBarComponents/CheckBoxView';

const CustomExpansionPanelSummary = withStyles({
  root: {
    marginBottom: -1,
    minHeight: 48,
    // marginLeft: 35,
    '&$expanded': {
      minHeight: 48,
    },
  },
  content: {
    '&$expanded': {
      margin: '16px 0',
    },
  },
  expanded: {},
})(ExpansionPanelSummary);

const FacetFilters = ({ classes }) => {
  const activeFilters = useSelector((state) => (
    state.submission
          && state.submission.allActiveFilters
      ? state.submission.allActiveFilters : {}));
  const activeFiltersCount = Object.entries(activeFilters).reduce(
    (acc, [key, val]) => acc + (val.length), 0, // eslint-disable-line no-unused-vars
  );

  const sideBarContent = useSelector((state) => (
    state.submission
        && state.submission.checkbox
      ? state.submission.checkbox : {
        data: [],
        defaultPanel: false,
      }));

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

  const getGroupNameColor = (sideBarItem, currentSection) => {
    let groupNameColor = 'black';
    sideBarItem.checkboxItems.map(
      (item) => {
        if (item.isChecked) {
          groupNameColor = facetSectionVariables[currentSection.sectionName] ? facetSectionVariables[currentSection.sectionName].color ? facetSectionVariables[currentSection.sectionName].color : '' : defaultFacetSectionVariables.color;
        }
        return '';
      },
    );
    return groupNameColor;
  };

  //   const getTooltipContent = (value, type) => tooltipContent
  //     .filter((item) => (item.name === value.name
  //       && type === item.type) || (item.acronym === value.name && type === item.type))[0];

  function getCheckBoxColor(index, currentSection) {
    return index % 2 ? facetSectionVariables[currentSection.sectionName] ? facetSectionVariables[currentSection.sectionName].checkBoxColorsTwo ? facetSectionVariables[currentSection.sectionName].checkBoxColorsTwo : '' : defaultFacetSectionVariables.checkBoxColorsTwo
      : facetSectionVariables[currentSection.sectionName] ? facetSectionVariables[currentSection.sectionName].checkBoxColorsOne ? facetSectionVariables[currentSection.sectionName].checkBoxColorsOne : '' : defaultFacetSectionVariables.checkBoxColorsOne;
  }

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

  const dispatch = useDispatch();
  const handleToggle = (value) => () => {
    const valueList = value.split('$$');
    // dispatch toggleCheckBox action
    dispatch(toggleCheckBox([{
      groupName: valueList[1],
      datafield: valueList[2],
      name: valueList[0],
      isChecked: !(valueList[3] === 'true'),
      section: valueList[4],
    }]));
  };

  const getCheckBoxView = (sideBarItem, currentSection) => {
    const showItems = sideBarItem.checkboxItems.filter((item) => item !== undefined
    && item.subjects > 0).map((item) => (
      {
        ...item,
        title: sideBarItem.tooltip ? sideBarItem.tooltip : 'undefined!!!!!!',
      }
    ));
    return showItems.map(
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
          dataDictionary
        />
      ),
    );
  };

  const showSelectedChecbox = (sideBarItem, currentSection) => {
    const selectedItems = sideBarItem.checkboxItems.filter((item) => (item.isChecked
      && item.subjects > 0)).map((item) => (
      {
        ...item,
        title: sideBarItem.tooltip ? sideBarItem.tooltip : 'undefined!!!!!!',
      }
    ));
    const selectedCheckbox = selectedItems.slice(0, 3)
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
          dataDictionary
        />
      ));

    return (
      <div>
        {selectedCheckbox}
        {/* {selectedItems.length > showCheckboxCount && (
          <div className={classes.clearfix}>
            <div
              className={classes.showMore}
              onClick={(e) => (handleGroupsChange(sideBarItem.groupName)(e, true))}
            >
              {sortLabels.showMore}
            </div>
          </div>
        )} */}
      </div>
    );
  };

  const sideBarDisplay = sideBarContent.data.filter((sideBar) => sideBar.show === true);

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
      <Button
        id="button_sidebar_clear_all_filters"
        variant="outlined"
        disabled={activeFiltersCount === 0}
        className={classes.customButton}
        classes={{ root: classes.clearAllButtonRoot }}
        onClick={() => clearAllFilters()}
        disableRipple
      >
        CLEAR ALL
      </Button>
      {
    sideBarSections.map((currentSection) => (
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
          expanded={sectionExpanded.includes(currentSection.sectionName)}
          onChange={handleSectionChange(currentSection.sectionName)}
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
              {
                      // eslint-disable-next-line arrow-body-style
                      currentSection.items.map((sideBarItem) => {
                        return (
                          <>
                            <ExpansionPanel
                              square
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
                                    style={{ fontSize: 26 }}
                                  />
                                      )}
                                aria-controls={sideBarItem.groupName}
                                id={sideBarItem.groupName}
                                className={classes.customExpansionPanelSummaryRoot}
                              >
                                {/* <ListItemText primary={sideBarItem.groupName} /> */}
                                <div
                                  id={`filterGroup_${sideBarItem.datafield}`}
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
                                  {/* <div
                                        className={classes.sortGroup}
                                      >
                                        <span
                                          className={classes.sortGroupIcon}
                                        >
                                          <Icon
                                            onClick={handleGroupReset(
                                              sideBarItem.datafield, sideBarItem.groupName,
                                            )}
                                            style={{ fontSize: 10 }}
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
                                      </div> */}
                                  {getCheckBoxView(sideBarItem, currentSection)}
                                </List>
                              </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <div className={classes.selectedCheckboxDisplay}>
                              { !groupsExpanded.includes(sideBarItem.groupName)
                                      && showSelectedChecbox(sideBarItem, currentSection)}
                            </div>
                          </>
                        );
                      })
                  }
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </>
    ))
  }
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
  customExpansionPanelSummaryRoot: {
    flexDirection: 'row-reverse',
    paddingLeft: 0,
  },
  ExpansionPaneldropDownIcon: {
    left: '-290px',
    marginRight: '-20px',
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
    marginLeft: '10px',
    lineHeight: 0,
    color: '#323232',
    fontFamily: 'Raleway',
    fontSize: '13px',
    fontWeight: 'bold',
    letterSpacing: '0.25px',
  },
  checkboxRoot: {
    height: 12,
  },
  listItemGutters: {
    padding: '8px 0px 8px 23px',
    // marginLeft: '-5px',
  },
  selectedCheckboxDisplay: {
    maxHeight: '300px',
    overflow: 'auto',
  },
  sortGroup: {
    paddingTop: '10px',
    marginBottom: '5px',
    borderTop: '1px solid #B1B1B1',
    textAlign: 'left',
    marginLeft: '-5px',
  },
  sortGroupItem: {
    cursor: 'pointer',
    fontFamily: 'Nunito',
    fontSize: '10px',
    marginRight: '32px',
  },
  sortGroupItemCounts: {
    cursor: 'pointer',
    fontFamily: 'Nunito',
    fontSize: '10px',
  },
  sortGroupIcon: {
    cursor: 'pointer',
    fontFamily: 'Nunito',
    fontSize: '10px',
    marginRight: '12px',
    marginLeft: '16px',
  },
  showMore: {
    float: 'right',
    paddingRight: '5px',
    cursor: 'pointer',
    fontSize: '10px',
  },
  clearAllButtonRoot: {
    margin: 'auto',
  },
  customButton: {
    borderRadius: '100px',
    marginTop: '4px',
    minHeight: '20px',
    fontSize: 9,
    textTransform: 'none',
    color: '#3d4241',
    marginLeft: '100px',
    marginBottom: '10px',
    '&:hover': {
      backgroundColor: '#566672',
      color: 'white',
    },
  },
});

export default withStyles(styles)(FacetFilters);
