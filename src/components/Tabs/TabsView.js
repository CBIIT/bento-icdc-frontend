import React from 'react';
import { Tabs as BentoTabs } from '@bento-core/tab';
import { tabContainers } from '../../bento/dashboardTabData';
import customTheme from './DefaultTabTheme';

const Tabs = ({
  dashboardStats,
  currentTab,
  setCurrentTab,
}) => {
  /**
  * 1. change <name> to <display> as array item
  * 2. <display> -> [tab.name, props.dashboardStats[tab.count]]
  */
  const getTabs = (tabs) => tabs.map((tab) => ({
    ...tab,
    name: tab.name,
    count: `(${dashboardStats[tab.count]})`,
    clsName: `${tab.name}`.toLowerCase().replace(' ', '_'),
  }));
  return (
    <>
      <BentoTabs
        tabItems={getTabs(tabContainers)}
        currentTab={currentTab}
        handleTabChange={setCurrentTab}
        customTheme={customTheme}
      />
    </>
  );
};

export default Tabs;
