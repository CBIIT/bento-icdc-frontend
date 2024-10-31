import styled from '@emotion/styled';
import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';

export const CancerGenomicsCloudLink = styled('a')({
  color: '#165F83',
});

export const CancerGenomicsCloudLinkText = styled('span')({
  textDecoration: 'underline',
  margin: 0,
  padding: 0,
});

export const CancerGenomicsCloudLinkIcon = styled('img')({
  width: "12px",
  height: "12px",
  marginLeft: "3px",
});

export const CancerGenomicsCloudButtonLabel = styled('span')({
  float: "left",
  width: "180px",
  textWrap: "wrap",
  lineHeight: "18px",
  fontSize: "15px",
  fontFamily: "Lato",
});

export const CancerGenomicsCloudButtonIcon = styled('img')({
  marginTop: "10px",
  marginLeft: "7px",
});

export const CancerGenomicsCloudButton = styled('span')(({isDropDownDisabled}) => ({
  cursor: isDropDownDisabled && 'not-allowed'
}));

export const DownloadFileManifestButtonLabel = styled('span')({
  float: "left",
  width: "190px",
  height: "35px",
  lineHeight: "35px",
  fontSize: "15px",
  fontFamily: "Lato",
});
  
export const DownloadFileManifestButtonIcon = styled('img')({
  width: "20px",
  height: "20px",
  margingLeft: "4px",
  float: "right",
  marginTop: "10px",
});
  
export const DownloadFileManifestButton = styled('span')({});

export const DownloadFileManifestLink = styled('a')({
  color: '#165F83',
});

export const DownloadFileManifestLinkText = styled('span')({
  textDecoration: 'underline',
  margin: 0,
  padding: 0,
});

export const DownloadFileManifestLinkIcon = styled('img')({
  width: "12px",
  height: "12px",
  marginLeft: "3px",
});

export const CancerGenomicsCloudMenuItem = styled(MenuItem)({
  textAlign: "left",
});
export const DownloadFileManifestMenuItem = styled(MenuItem)
(({isDropDownDisabled}) => ({
  textAlign: "left",
  cursor: isDropDownDisabled && 'not-allowed'
}));

export const DropDownMenuList = styled(MenuList)({
    paddingTop: "0px",
    paddingBottom: "0px",
    backgroundColor: "#0d71a3",
    color: "#ffffff",
    borderBottomRightRadius: "8px",
    borderBottomLeftRadius: "8px",
    border: "2px solid #0d71a3",
});

export const DisplayLinksDropDownButton = styled(Button)
(({open, isDropDownDisabled}) => {
  const onDropdownStyles = open ? {
    borderTop: "1px solid #155F97",
    borderRight: "1px solid #155F97",
    borderLeft: "1px solid #155F97",
    borderTopRightRadius: "8px",
    borderTopLeftRadius: "8px",
    borderBottomRightRadius: "0px",
    borderBottomLeftRadius: "0px",
  } : {
    border: "1px solid #155F97",
    borderRadius: "8px",
    textWrap: "nowrap",
  };

  const disableStyles = isDropDownDisabled ? {
    opacity: "0.5",
    cursor: "not-allowed"
  } : {
    opacity: "1",
    cursor: "pointer"
  };

  return {
    color: "#09557B",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "15px",
    fontFamily: "Lato",
    textTransform: "capitalize",
    paddingRight: "6px",
    backgroundColor: "#F2F2F2",
    width: "250px",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#F2F2F2",
      boxShadow: "none",
    },
    '& .MuiButton-icon': {
      marginRight: "12px",
      marginLeft: "30px",
    },
    ...disableStyles,
    ...onDropdownStyles,
  };
});

export const DropDownMenuContainer = styled('div')({
  float: "right",
});

export const MuiStyledPaper = styled(Paper)({
  maxWidth: "250px",
  borderBottomRightRadius: "8px",
  borderBottomLeftRadius: "8px",
  zIndex: "100",
});

export const MuiStyledGrow = styled(Grow)(({placement}) => ({
  transformOrigin: placement === 'bottom'
    ? 'center top' : 'center bottom'
}));
