import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/system';

export const TitleContent = styled('div')({
  width: "100%",
});

export const Title = styled('div')({
  fontSize: "23px",
  marginTop: "20px",
  display: "inherit",
  fontWeight: "500",
  color: "#0d71a3",
  float: "left",
  fontFamily: "Nunito Light",
});

export const DialogActionContent = styled('div')({
  padding: "5px",
  textAlign: "right",
  fontSize: "30px",
});

export const DownloadButton = styled(Button)({
  minWidth: '30px',
  padding: '0px',
  margin: "10px 7px 0px 0px",
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
});

export const DownloadIcon = styled('img')({
  color: "#fff",
  height: "30px",
  width: "30px",
});

export const ClosButton = styled(IconButton)({
  paddingTop: "8px",
  paddingLeft: '0px',
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
});

export const CloseBtnIcon = styled(CloseIcon)({
  padding: "5px",
  textAlign: "right",
  fontSize: "30px",
});

export const ReadMeContentContainer = styled('div')({
  height: "700px",
  overflowY: "scroll",
  paddingRight: "20px",
  paddingLeft: "25px",
  lineHeight: "1.5",
  "& h1, h2, h3, h4, h5": {
    color: "#000000",
    marginBottom: "0px",
    fontWeight: "700",
    lineHeight: "40px",
  },
  "& p": {
    marginTop: "5px",
    fontSize: "14px",
    fontWeight: "300",
    marginBottom: "0px",
  },
});

export const DialogBox = styled(Dialog)({
  minWidth: "750px",
  overflowY: "scroll",
  paddingBottom: "10px",
  '& .MuiDialog-paper': {
    padding: "0px 0px 0px 20px",
  }
});
