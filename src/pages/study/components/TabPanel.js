import React from 'react';
import Typography from '@material-ui/core/Typography';

const TabPanel = ({
  children,
  value,
  index,
}) => (
  <div
    role="tabpanel"
    hidden={value !== index}
  >
    {value === index && (
      <Typography>{children}</Typography>
    )}
  </div>
);

export default TabPanel;
