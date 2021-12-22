import React from 'react';

const TabPanel = ({
  children,
  value,
  index,
}) => (
  <div
    role="tabpanel"
    hidden={value !== index}
  >
    {children}
  </div>
);

export default TabPanel;
