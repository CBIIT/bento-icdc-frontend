import { withStyles } from "@mui/styles";
import { Accordion } from "@mui/material";

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
