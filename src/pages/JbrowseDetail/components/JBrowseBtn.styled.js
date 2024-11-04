import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';

export const WarningLabel = styled('span')({
  color: "#971818",
  fontWeight: "900",
});

export const TooltipContent = styled(Typography)({
  fontSize: "0.75rem",
  fontWeight: "600",
  lineHeight: "1.6",
  textAlign: "left",
  fontFamily: "Open Sans",
});

export const JBrowsePageLink = styled(Link)
(({isInvlaid, disable}) => {
  if (isInvlaid || disable) {
    return { pointerEvents : "none" };
  }
  return {
    cursor: "pointer"
  };
});

export const JBrowseIcon = styled('img')
({
  width: "2.25em",
});

export const JBrowseButton = styled(Button)
(({isInvlaid, disable}) => ({
    borderRadius: "10px",
    width: "210px",
    lineHeight: "37px",
    fontSize: "16px",
    fontFamily: "Lato",
    color: "#ffffff",
    backgroundColor: (isInvlaid || disable) ? "#CCD1D4" : "#566672",
    opacity: (isInvlaid || disable) ? "0.5" : "1",
    marginTop: "6px",
    marginBottom: "10px",
    textTransform: "none",
    marginRight: "5px",
    "&:hover": {
      backgroundColor: "#566672",
    }
}));

export const HelpIconButton = styled(IconButton)
({
  zIndex: "600",
  verticalAlign: "top",
  position: "absolute",
  width: "25px",
  paddingTop: 0,
  paddingLeft: 0,
  "&:hover": {
    backgroundColor: "transparent",
  },
});

export const HelpIconImg = styled('img')
(({customStyle}) => ({ ...customStyle }));
