export const customTheme = {
  MuiContainer: {
    root: {
      paddingTop: '5px',
      '& .add_selected_file_tooltip_icon': {
        width: '17px !important',
      },
      '&.container_header': {
        textAlign: 'right',
      },
      '&.container_footer': {
        paddingTop: '10px',
      },
      '&.container_footer_link': {
        textAlign: 'right',
        paddingRight: '100px',
        height: '65px',
        color: '#3E6886',
        fontSize: '12px',
        fontFamily: 'Lato',
        borderBottom: '1px solid #3E6886',
        textDecoration: 'none',
      },
    },
  },
  MuiButton: {
    text: {
      padding: '10px 16px',
    },
    root: {
      color: '#fff',
      fontSize: '12px',
      marginTop: '6px',
      fontFamily: 'Lato',
      borderRadius: '10px',
      marginBottom: '10px',
      textTransform: 'uppercase',
      '&.add_all_button': {
        marginRight: '24px',
        // width: '120px',
        backgroundColor: '#142D64',
      },
      '&.add_selected_button': {
        marginRight: '10px',
      },
      '&.add_selected_button_sample': {
        backgroundColor: '#ff7e15',
      },
      '&.Mui-disabled': {
        color: '#fff',
        '&.add_selected_button_sample': {
          backgroundColor: '#ff7e15',
          opacity: 0.3,
        },
      },
      '&.yesBtn': {
        width: '133px',
        height: '45px',
        cursor: 'pointer',
        background: '#98a19e',
      },
      '&.noBtn': {
        width: '133px',
        height: '45px',
        cursor: 'pointer',
        background: '#42779a',
      },
    },
  },
  MuiLink: {
    root: {
      height: '65px',
      color: '#3E6886',
      fontSize: '12px',
      fontFamily: 'Lato',
      borderBottom: '1px solid #3E6886',
      textDecoration: 'none',
    },
  },
  MuiDialog: {
    paper: {
      width: '431px',
      height: '170px',
      borderRadius: '25px !important',
      textAlign: 'center',
      backgroundColor: '#E8DFDC !important',
      border: '2px solid #A61401',
    },
  },
  MuiDialogContent: {
    root: {
      padding: '40px 20px 0px 20px',
      '&.alter-content': {
        fontFamily: 'Lato',
        size: '16px',
      },
    },
  },
  MuiDialogActions: {
    root: {
      justifyContent: 'center',
      paddingBottom: '25px',
    },
  },
};

export const tblHeader = {
  MuiTableSortLabel: {
    root: {
      color: '#13344A',
      position: 'relative',
      fontSize: '11pt',
      fontFamily: 'Lato Regular,Raleway, sans-serif',
      fontWeight: 'bold',
      letterSpacing: '0.06em',
      textDecoration: 'none',
      '&:hover': {
        color: '#13344A',
      },
    },
  },
  MuiTableCell: {
    root: {
      backgroundColor: '#f5f5f5',
      color: '#194563',
    },
  },
};

const tblBody = {
  MuiCheckbox: {
    colorSecondary: {
      '&.Mui-checked': {
        color: '#13344A',
      },
    },
  },
};

export const themeConfig = {
  customTheme,
  tblHeader,
  tblBody,
};
