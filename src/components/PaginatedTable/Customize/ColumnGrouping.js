import React from 'react';
import AvailabilityColumnGrouping from './DataAvailability/ColGrouping';

export const ColumnGrouping = (groups = []) => {
  if (!groups) {
    return null;
  }
  const customGroups = groups.map((group) => {
    if (group.custom) {
      return {
        ...group,
        customViewRender: () => <AvailabilityColumnGrouping />,
      };
    }
    return group;
  });
  return customGroups;
};

export const cofigGrouping = '';
