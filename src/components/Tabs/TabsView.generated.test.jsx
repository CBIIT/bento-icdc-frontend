// src/components/Tabs/TabsView.test.jsx

import React from 'react';
import { render } from '@testing-library/react';
import Tabs from './TabsView';
import { BentoTabs } from '../../bento-core';

// Mock BentoTabs so we can inspect the props it receives without rendering real UI
jest.mock('../../bento-core', () => {
  const BentoTabs = jest.fn(() => null);
  return { BentoTabs };
});

// Mock tableContainers to avoid importing the heavy real module and to keep tests deterministic
jest.mock('../../bento/dashboardTabData', () => ({
  tableContainers: [
    {
      id: 'case_tab',
      name: 'Cases',
      count: 'numberOfCases',
      someOtherProp: 'keep-me',
    },
    { id: 'sample_tab', name: 'Samples', count: 'numberOfSamples' },
    { id: 'file_tab', name: 'Case Files', count: 'numberOfFiles' },
    { id: 'study_file_tab', name: 'Study Files', count: 'numberOfStudyFiles' },
  ],
}));

describe('TabsView', () => {
  const getBentoTabsProps = () => {
    expect(BentoTabs).toHaveBeenCalledTimes(1);
    return BentoTabs.mock.calls[0][0];
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should transform tableContainers into tabItems with counts and clsName, and pass to BentoTabs (happy path)', () => {
    const dashboardStats = {
      numberOfCases: 10,
      numberOfSamples: 20,
      numberOfFiles: 30,
      numberOfStudyFiles: 40,
    };
    const currentTab = 'case_tab';
    const setCurrentTab = jest.fn();

    render(
      <Tabs
        dashboardStats={dashboardStats}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
    );

    const props = getBentoTabsProps();

    expect(props.currentTab).toBe(currentTab);
    expect(typeof props.handleTabChange).toBe('function');
    expect(props.customTheme).toBeDefined();

    expect(props.tabItems).toHaveLength(4);

    expect(props.tabItems[0]).toEqual(
      expect.objectContaining({
        id: 'case_tab',
        name: 'Cases',
        count: '(10)',
        clsName: 'cases',
        someOtherProp: 'keep-me',
      })
    );

    expect(props.tabItems[1]).toEqual(
      expect.objectContaining({
        id: 'sample_tab',
        name: 'Samples',
        count: '(20)',
        clsName: 'samples',
      })
    );

    expect(props.tabItems[2]).toEqual(
      expect.objectContaining({
        id: 'file_tab',
        name: 'Case Files',
        count: '(30)',
        clsName: 'case_files',
      })
    );

    expect(props.tabItems[3]).toEqual(
      expect.objectContaining({
        id: 'study_file_tab',
        name: 'Study Files',
        count: '(40)',
        clsName: 'study_files',
      })
    );
  });

  it('should pass through handleTabChange and allow invoking the provided setCurrentTab', () => {
    const dashboardStats = {
      numberOfCases: 1,
      numberOfSamples: 2,
      numberOfFiles: 3,
      numberOfStudyFiles: 4,
    };
    const setCurrentTab = jest.fn();

    render(
      <Tabs
        dashboardStats={dashboardStats}
        currentTab="case_tab"
        setCurrentTab={setCurrentTab}
      />
    );

    const { handleTabChange } = getBentoTabsProps();

    handleTabChange('sample_tab');

    expect(setCurrentTab).toHaveBeenCalledTimes(1);
    expect(setCurrentTab).toHaveBeenCalledWith('sample_tab');
  });

  it('should render counts as "(undefined)" when the key is missing in dashboardStats (edge case)', () => {
    const dashboardStats = {
      numberOfCases: 5,
      numberOfSamples: 6,
      numberOfFiles: 7,
      // numberOfStudyFiles intentionally missing
    };

    render(
      <Tabs
        dashboardStats={dashboardStats}
        currentTab="study_file_tab"
        setCurrentTab={() => {}}
      />
    );

    const { tabItems } = getBentoTabsProps();

    const studyFilesTab = tabItems.find(t => t.id === 'study_file_tab');
    expect(studyFilesTab).toBeDefined();
    expect(studyFilesTab.count).toBe('(undefined)');
  });

  it('should handle empty dashboardStats object by producing "(undefined)" counts for all tabs', () => {
    const dashboardStats = {};

    render(
      <Tabs
        dashboardStats={dashboardStats}
        currentTab={null}
        setCurrentTab={() => {}}
      />
    );

    const { tabItems, currentTab } = getBentoTabsProps();

    expect(currentTab).toBeNull();
    tabItems.forEach(tab => {
      expect(tab.count).toBe('(undefined)');
    });
  });

  it('should generate clsName by lowercasing and replacing spaces with underscores', () => {
    const dashboardStats = {
      numberOfCases: 0,
      numberOfSamples: 0,
      numberOfFiles: 0,
      numberOfStudyFiles: 0,
    };

    render(
      <Tabs
        dashboardStats={dashboardStats}
        currentTab="file_tab"
        setCurrentTab={() => {}}
      />
    );

    const { tabItems } = getBentoTabsProps();

    const expectations = {
      Cases: 'cases',
      Samples: 'samples',
      'Case Files': 'case_files',
      'Study Files': 'study_files',
    };

    tabItems.forEach(tab => {
      expect(tab.clsName).toBe(expectations[tab.name]);
    });
  });
});
