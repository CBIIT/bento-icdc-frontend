import React, { CSSProperties } from 'react';
import { Tabs, Tab, Orientation } from '@mui/material';
import TabLabel from './TabLable';
import styled from '@emotion/styled';

const StyledLine = styled.hr<{ styles: CSSProperties }>(({ styles }) => {
  return {
    ...styles,
  };
});

interface TabItemsProps {
  styleClasses: {
    tabPrimaryColor: CSSProperties;
    tabHighlightColor: CSSProperties;
    hrLine: CSSProperties;
  };
  tabItems: {
    index: number;
    label: string;
    value: string;
    icon?: string;
  }[];
  handleTabChange: (
    _event: React.SyntheticEvent<Element, Event>,
    _value: any
  ) => void;
  currentTab: number;
  orientation?: Orientation;
}

const TabItems: React.FC<TabItemsProps> = ({
  tabItems,
  styleClasses,
  handleTabChange,
  currentTab,
  orientation,
}) => {
  function getTabLalbel(title: string, image: string, index: number) {
    return (
      <TabLabel
        title={title}
        icon={image}
        primaryColorStyles={
          currentTab === index
            ? styleClasses.tabHighlightColor
            : styleClasses.tabPrimaryColor
        }
      />
    );
  }

  const TABs = tabItems.map((tab, index) => (
    <Tab
      label={getTabLalbel(tab.label, tab.icon, index)}
      key={index}
      disableRipple
    />
  ));

  return (
    <>
      <Tabs
        onChange={(event, value) => handleTabChange(event, value)}
        value={currentTab}
        TabIndicatorProps={{ style: { background: 'none' } }}
        orientation={orientation}
      >
        {TABs}
      </Tabs>
      <StyledLine styles={styleClasses.hrLine} />
    </>
  );
};

export default TabItems;
