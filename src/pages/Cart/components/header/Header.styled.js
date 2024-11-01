import styled from '@emotion/styled';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

export const CartHeader = styled('div')({
  marginBottom: "14px",
  width: "100%",
  height: "85px",
  borderBottom: "3px solid #686F7F",
});

export const CartHeaderLogo = styled('div')({
  float: "left",
  display: "flex",
  height: "100px",
  lineHeight: "100px",
  color: "#C25700",
  width: "225px",
});

export const CartHeaderLogoIcon = styled('img')({
  width: "85px",
  marginRight: "15px",
  zIndex: "100",
});

export const PageTitle = styled('span')({
  marginLeft: "10px",
  color: "#C25700",
  fontFamily: "Lato",
  fontSize: "25px",
  fontWeight: 800,
});

export const ReadMeBtnDiv = styled('div')({
  paddingTop: "35px",
  marginLeft: "5px",
});

export const ReadMeButton = styled(Button)({
  color: "#ffffff",
  fontFamily: "Lato",
  fontSize: "16px",
  fontWeight: 400,
  fontStyle: "normal",
  boxShadow: "none",
  background: "#3C597C",
  borderRadius: "8px",
  border: "1.25px solid #0B3556",
  height: "38px",
});

export const SelectFilesActionContainer = styled(Box)({
  width: "100%",
  textAlign: "right",
  paddingRight: "80px",
  justifyContent: "flex-end",
});

export const RadioInput = styled(Radio)({
  color: "#09557B",
});

export const SelectAllFilesBtn = styled(FormControlLabel)({
  color: "#525252",
  fontSize: "16px",
  fontFamily: "Lato",
  fontWeight: 400,
});

export const SelectFilesBtn = styled(FormControlLabel)({
  marginRight: "30px",
  color: "#525252",
  fontSize: "16px",
  fontFamily: "Lato",
  fontWeight: 400,
});
