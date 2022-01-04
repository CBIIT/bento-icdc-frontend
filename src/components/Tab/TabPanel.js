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
    <div>{children}</div>
  </div>
);

export default TabPanel;
