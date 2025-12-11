import React, { CSSProperties } from 'react';
import { Tabs, Tab, Orientation, TabProps } from '@mui/material';
import TabLabel from './TabLable';
import styled from '@emotion/styled';

const StyledLine = styled.hr<{ styles: CSSProperties }>(({ styles }) => {
  return {
    ...styles,
  };
});

const StyledTabs = styled(Tabs)({
  '& .MuiTabs-list': {
    gap: '32px !important',
  },
});

interface StyledTabProps extends TabProps {
  paddingValue?: string;
}

const StyledTab = styled(Tab)<StyledTabProps>(({ paddingValue }) => ({
  '&.MuiTab-root': {
    padding: paddingValue || '12px 16px',
    minWidth: '0',
  },
}));

interface TabItemsProps {
  tabPadding?: string;
  iconSpacing?: string;
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
  tabPadding,
  iconSpacing,
}) => {
  function getTabLalbel(title: string, image: string, index: number) {
    return (
      <TabLabel
        title={title}
        icon={image}
        iconSpacing={iconSpacing}
        primaryColorStyles={
          currentTab === index
            ? styleClasses.tabHighlightColor
            : styleClasses.tabPrimaryColor
        }
      />
    );
  }

  const TABs = tabItems.map((tab, index) => (
    <StyledTab
      label={getTabLalbel(tab.label, tab.icon, index)}
      key={index}
      disableRipple
      paddingValue={tabPadding}
    />
  ));

  return (
    <>
      <StyledTabs
        onChange={(event, value) => handleTabChange(event, value)}
        value={currentTab}
        TabIndicatorProps={{ style: { background: 'none' } }}
        orientation={orientation}
      >
        {TABs}
      </StyledTabs>
      <StyledLine styles={styleClasses.hrLine} />
    </>
  );
};

export default TabItems;
