import React from 'react';
import { BentoTabs } from '../../bento-core';
import { tableContainers } from '../../bento/dashboardTabData';
import customTheme from './DefaultTabTheme';
import { Skeleton } from '@mui/material';

const Tabs = ({
  dashboardStats,
  currentTab,
  setCurrentTab,
  loading = false,
}) => {
  /**
   * 1. change <name> to <display> as array item
   * 2. <display> -> [tab.name, props.dashboardStats[tab.count]]
   */
  const getTabs = tabs =>
    tabs.map(tab => ({
      ...tab,
      name: tab.name,
      count: loading ? (
        <Skeleton width={24} style={{ display: 'inline-block' }} />
      ) : (
        `(${dashboardStats[tab.count]})`
      ),
      clsName: `${tab.name}`.toLowerCase().replace(' ', '_'),
    }));
  return (
    <>
      <BentoTabs
        tabItems={getTabs(tableContainers)}
        currentTab={currentTab}
        handleTabChange={setCurrentTab}
        customTheme={customTheme}
      />
    </>
  );
};

export default Tabs;
