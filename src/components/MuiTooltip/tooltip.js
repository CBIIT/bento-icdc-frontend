import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core';

const tooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#FFFFFF',
    color: '#1C2023',
    maxWidth: '220px',
    fontSize: theme.typography.pxToRem(12),
    border: '2px solid #A7AFB3',
    fontFamily: 'Open Sans',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: '12px',
    padding: '4px 11px 4px 11px',
  },
  arrow: {
    color: '#FFFFFF',
    fontSize: theme.typography.pxToRem(20),
    '&::before': {
      border: '2px solid #A7AFB3',
    },
  },
}))(Tooltip);

export default tooltip;
