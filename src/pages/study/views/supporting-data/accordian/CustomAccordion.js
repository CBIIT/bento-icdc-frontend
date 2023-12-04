import { Accordion, withStyles } from '@material-ui/core';

const CustomAccordion = withStyles({
  root: {
    width: '100%',
    boxShadow: 'none',
    marginTop: '-2px',
    '&.Mui-expanded': {
      marginTop: '-2px',
    },
  },
})(Accordion);

export default CustomAccordion;
