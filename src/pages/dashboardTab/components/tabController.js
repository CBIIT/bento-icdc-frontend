import React from 'react';
import { useSelector } from 'react-redux';
import {
  Tabs, Tab, withStyles,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import Snackbar from '@material-ui/core/Snackbar';
import { getOptions } from 'bento-components';
import TabView from './tabView';
import SuccessOutlinedIcon from '../../../utils/SuccessOutlined';
import TabThemeProvider from './tabThemeConfig';
import TabLabel from './tabLabel';
import Message from '../../../components/Message';
import {
  tabs, tooltipContent, tabContainers, tabIndex, externalLinkIcon, selectAllToolTip,
} from '../../../bento/dashboardTabData';
import {
  fetchDataForDashboardTab, getTableRowSelectionEvent, tableHasSelections, getFilesCount,
  getUnifiedViewStats, clearAllFilters,
} from '../store/dashboardReducer';
import GA from '../../../utils/googleAnalytics';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: '5px,5px,5px,5px' }}>
      {children}
    </Typography>
  );
}

const tabController = ({ classes, unifiedViewData }) => {
  const currentActiveTabTitle = useSelector((state) => (state.dashboardTab
    && state.dashboardTab.currentActiveTab
    ? state.dashboardTab.currentActiveTab
    : tabIndex[0].title));
  const tabVlaue = tabIndex.map((el) => el.title).indexOf(currentActiveTabTitle) || 0;
  // tab settings
  const [currentTab, setCurrentTab] = React.useState(tabVlaue);
  let prevMultistudyProp;

  React.useEffect(() => {
    if (unifiedViewData) {
      prevMultistudyProp = unifiedViewData;
      fetchDataForDashboardTab('Cases', unifiedViewData.caseIds, unifiedViewData.sampleIds, unifiedViewData.fileIds);
      const obj = {
        numberOfStudies: unifiedViewData.numberOfStudies,
        numberOfCases: unifiedViewData.numberOfCases,
        numberOfFiles: unifiedViewData.numberOfFiles,
        numberOfSamples: unifiedViewData.numberOfSamples,
        numberOfAliquots: unifiedViewData.numberOfAliquots,
        caseIds: unifiedViewData.caseIds,
        sampleIds: unifiedViewData.sampleIds,
        fileIds: unifiedViewData.fileIds,
      };
      getUnifiedViewStats(obj);
    }

    // check multiStudyData prop.
    // If multistudyData was present in prev prop
    // then run clearAllFilters()
    return () => {
      if (prevMultistudyProp) {
        clearAllFilters();
      }
    };
  }, [unifiedViewData]);

  // data from store
  const dashboard = useSelector((state) => (state.dashboardTab
    && state.dashboardTab.datatable
    ? state.dashboardTab.datatable : {}));

  const tableRowSelectionData = [
    useSelector((state) => (state.dashboardTab.dataCaseSelected)),
    useSelector((state) => (state.dashboardTab.dataSampleSelected)),
    useSelector((state) => (state.dashboardTab.dataFileSelected))];

  const getDashboardStats = () => {
    if (unifiedViewData) {
      return (
        {
          numberOfStudies: unifiedViewData.studies,
          numberOfCases: unifiedViewData.caseIds.length,
          numberOfFiles: unifiedViewData.fileIds.length,
          numberOfSamples: unifiedViewData.sampleIds.length,
          numberOfAliquots: 0,
        }
      );
    }

    return (
      useSelector((state) => (state.dashboardTab
        && state.dashboardTab.stats ? state.dashboardTab.stats : {}))
    );
  };

  // get stats data from store
  const dashboardStats = getDashboardStats();

  const filteredSubjectIds = useSelector((state) => (state.dashboardTab
    && state.dashboardTab.filteredSubjectIds ? state.dashboardTab.filteredSubjectIds : null));
  const filteredSampleIds = useSelector((state) => (state.dashboardTab
    && state.dashboardTab.filteredSampleIds ? state.dashboardTab.filteredSampleIds : null));
  const filteredFileIds = useSelector((state) => (state.dashboardTab
    && state.dashboardTab.filteredFileIds ? state.dashboardTab.filteredFileIds : null));
  const [TopMessageStatus, setTopMessageStatus] = React.useState({
    text: tooltipContent[currentTab],
    src: tooltipContent.icon,
    alt: tooltipContent.alt,
    isActive: false,
    currentTab,
  });
  const [BottomMessageStatus, setBottomMessageStatus] = React.useState({
    text: tooltipContent[currentTab],
    src: tooltipContent.icon,
    alt: tooltipContent.alt,
    isActive: false,
    currentTab,
  });
  const [selectAllToolTipStatus, setSelectAllToolTipStatus] = React.useState({
    text: tooltipContent[currentTab],
    src: tooltipContent.icon,
    alt: tooltipContent.alt,
    isActive: false,
    currentTab,
  });

  function setTooltip(status, tabInfo = '', icon, alt) {
    return {
      text: tabInfo,
      src: icon,
      alt,
      isActive: status,
      currentTab,
    };
  }

  const tooltipConfig = {
    location: {
      top: {
        open: () => setTopMessageStatus(setTooltip(true,
          tooltipContent[currentTab],
          tooltipContent.icon,
          tooltipContent.alt)),
        close: () => setTopMessageStatus(setTooltip(false,
          tooltipContent[currentTab],
          tooltipContent.icon,
          tooltipContent.alt)),
      },
      bottom: {
        open: () => setBottomMessageStatus(setTooltip(true,
          tooltipContent[currentTab],
          tooltipContent.icon,
          tooltipContent.alt)),
        close: () => setBottomMessageStatus(setTooltip(false,
          tooltipContent[currentTab],
          tooltipContent.icon,
          tooltipContent.alt)),
      },
      addAll: {
        open: () => setSelectAllToolTipStatus(setTooltip(true,
          selectAllToolTip[currentTab],
          tooltipContent.icon,
          tooltipContent.alt)),
        close: () => setSelectAllToolTipStatus(setTooltip(false,
          selectAllToolTip[currentTab],
          tooltipContent.icon,
          tooltipContent.alt)),
      },
    },

  };

  function toggleMessageStatus(location, status) {
    return tooltipConfig.location[location][status]();
  }

  const handleTabChange = (event, value) => {
    if (currentTab !== value) {
      const currentTabTitle = tabIndex[currentTab].title;
      const newTabTitle = tabIndex[value].title;
      GA.sendEvent('Tab Change', tabIndex[value].title, `${currentTabTitle} -> ${newTabTitle}`, null);
    }
    setCurrentTab(value);
    if (unifiedViewData) {
      fetchDataForDashboardTab(tabIndex[value].title,
        unifiedViewData.caseIds,
        unifiedViewData.sampleIds,
        unifiedViewData.fileIds);
    } else {
      fetchDataForDashboardTab(tabIndex[value].title,
        filteredSubjectIds,
        filteredSampleIds,
        filteredFileIds);
    }
  };

  const [snackbarState, setsnackbarState] = React.useState({
    open: false,
    value: 0,
  });
  function openSnack(value1) {
    setsnackbarState({ open: true, value: value1 });
  }

  // eslint-disable-next-line no-unused-vars
  function closeSnack() {
    setsnackbarState({ open: false });
  }

  function getBorderStyle() {
    const style = '3px solid';
    return `${tabIndex[currentTab].primaryColor} ${style}`;
  }

  function getTableColor() {
    return `${tabIndex[currentTab].primaryColor}`;
  }

  function getTabLalbel(title, count) {
    const tabObj = tabIndex[currentTab];
    // NOTE: refactor white color to theme's white color.
    const primaryColor = (tabObj.title === title) ? tabIndex[currentTab].selectedColor : undefined;
    const secondaryColor = (tabObj.title === title) ? tabObj.secondaryColor : undefined;

    return (
      <TabLabel
        title={title}
        count={count}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
    );
  }

  // This function for future use
  /*  To check if this row is selectable or not.
    I want the system to visually communicate ("flag") which of
    the samples being displayed have already had all of their files added to the cart.
    @param  data  row of data from sample tab
    @param  cartData, list of fileIDs
    @output  boolean true-> selectable
*/
  // eslint-disable-next-line no-unused-vars
  function disableRowSelection(data, cartData) {
    return true;
  }

  // disableRowSelectionFunction contains all the disableRowSelection functions
  // user can pick one for use.
  const disableRowSelectionFunction = {
    type1: disableRowSelection,
    type2: disableRowSelection,
    type3: disableRowSelection,
  };

  // Tab Header Generator
  const TABs = tabs.map((tab) => (
    <Tab
      id={tab.id}
      label={
        getTabLalbel(tab.title, dashboardStats[tab.count] ? dashboardStats[tab.count] : 0)
      }
    />
  ));

  // Calculate the properate marginTop value for the tooltip on the top
  function tooltipStyle(text) {
    const marginTopValue = text.length > 40 ? '-13px' : '-3px';
    return { marginTop: marginTopValue };
  }

  // Tab table Generator
  const TABContainers = tabContainers.map((container) => (
    <TabContainer id={container.id}>
      <TabView
        options={getOptions(container, classes)}
        data={dashboard[container.dataField] ? dashboard[container.dataField] : 'undefined'}
        unifiedViewFlag={!!unifiedViewData}
        customColumn={container}
        openSnack={openSnack}
        closeSnack={closeSnack}
        disableRowSelection={disableRowSelectionFunction[container.disableRowSelection]}
        buttonText={container.buttonText}
        addAllButtonText={container.addAllButtonText}
        tableID={container.tableID}
        saveButtonDefaultStyle={container.saveButtonDefaultStyle}
        ActiveSaveButtonDefaultStyle={container.ActiveSaveButtonDefaultStyle}
        DeactiveSaveButtonDefaultStyle={container.DeactiveSaveButtonDefaultStyle}
        toggleMessageStatus={toggleMessageStatus}
        BottomMessageStatus={BottomMessageStatus}
        TopMessageStatus={TopMessageStatus}
        selectAllToolTipStatus={selectAllToolTipStatus}
        // eslint-disable-next-line jsx-a11y/tabindex-no-positive
        tabIndex={container.tabIndex}
        externalLinkIcon={externalLinkIcon}
        count={dashboardStats[container.count] ? dashboardStats[container.count] : 0}
        api={container.api}
        paginationAPIField={container.paginationAPIField}
        paginationAPIFieldDesc={container.paginationAPIFieldDesc}
        defaultSortCoulmn={container.defaultSortField || ''}
        defaultSortDirection={container.defaultSortDirection || 'asc'}
        dataKey={container.dataKey}
        tableHasSelections={tableHasSelections}
        filteredSubjectIds={filteredSubjectIds}
        filteredSampleIds={filteredSampleIds}
        filteredFileIds={filteredFileIds}
        tableDownloadCSV={container.tableDownloadCSV || false}
        setRowSelection={getTableRowSelectionEvent()}
        getFilesCount={getFilesCount}
        selectedRowInfo={tableRowSelectionData[container.tabIndex].selectedRowInfo}
        selectedRowIndex={tableRowSelectionData[container.tabIndex].selectedRowIndex}
      />
    </TabContainer>
  ));

  return (
    <>
      <Snackbar
        className={classes.snackBar}
        open={snackbarState.open}
        onClose={closeSnack}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        message={(
          <div className={classes.snackBarMessage}>
            <span className={classes.snackBarMessageIcon}>
              <SuccessOutlinedIcon />
              {' '}
            </span>
            <span className={classes.snackBarText}>
              {snackbarState.value}
              {' '}
              File(s) successfully added to My Files.
            </span>
          </div>
        )}
      />
      { selectAllToolTipStatus.isActive ? (
        <div
          className={classes.classes.messageSelectAllTop}
          style={tooltipStyle(selectAllToolTipStatus.text)}
        >
          {' '}
          <Message data={selectAllToolTipStatus.text} />
          {' '}
        </div>
      ) : ' '}
      { TopMessageStatus.isActive ? (
        <div className={classes.classes.messageTop} style={tooltipStyle(TopMessageStatus.text)}>
          {' '}
          <Message data={TopMessageStatus.text} />
          {' '}
        </div>
      ) : ' '}
      <TabThemeProvider tableBorder={getBorderStyle()} tablecolor={getTableColor()}>
        <Tabs
          classes
          value={currentTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          textColorPrimary
        >
          {TABs}
        </Tabs>
        <SwipeableViews
          index={currentTab}
          onChangeIndex={handleTabChange}
          animateTransitions={false}
          style={{ overflowX: 'hidden' }}
        >
          {TABContainers}
        </SwipeableViews>
      </TabThemeProvider>
    </>
  );
};

const styles = () => ({
  button: {
    borderRadius: '10px',
    width: '330px',
    height: '27px',
    lineHeight: '18px',
    fontSize: '10pt',
    color: '#fff',
    backgroundColor: '#ff7f15',
  },
  snackBarMessageIcon: {
    verticalAlign: 'middle',
  },
  messageTop: {
    position: 'absolute',
    left: '288px',
    zIndex: '300',
    // marginTop: '-10px',
  },
  messageSelectAllTop: {
    position: 'absolute',
    left: '52px',
    zIndex: '300',
    marginTop: '-10px',
  },
});
export default withStyles(styles, { withTheme: true })(tabController);
