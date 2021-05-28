import React from 'react';
import {
  Tabs, Tab, withStyles,
} from '@material-ui/core';
import TabLabel from './TabLable';

const TabItems = ({
  classes,
  tabItems,
  styleClasses,
  handleTabChange,
  currentTab,
}) => {
  function getTabLalbel(title, id) {
    return (
      <TabLabel
        title={title}
        primaryColorClass={(currentTab === id)
          ? styleClasses.tabHighlightColor : styleClasses.tabPrimaryColor}
      />
    );
  }

  const TABs = tabItems.map((tab) => (
    <Tab
      id={tab.id}
      label={
        getTabLalbel(tab.label, tab.id)
      }
    />
  ));

  return (
    <>
      <Tabs
        onChange={(event, value) => handleTabChange(event, value)}
        value={currentTab}
        classes={{
          indicator: styleClasses.tabHighlight,
        }}
        textColor="primary"
      >
        {TABs}
      </Tabs>
      <hr className={classes.hrLine} />
    </>
  );
};

const styles = () => ({
  defaultStyle: {
    fontFamily: 'Open Sans',
    textTransform: 'none',
    fontSize: '17px',
  },
  hrLine: {
    marginTop: '-2px',
    marginBottom: '0',
    borderTop: '1px solid #81a6b9',
  },
});

export default withStyles(styles)(TabItems);
