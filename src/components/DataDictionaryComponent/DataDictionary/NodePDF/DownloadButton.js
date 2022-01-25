import React from 'react';
import { saveAs } from 'file-saver';
import {
  Button,
  withStyles,
  createTheme,
  MuiThemeProvider,
} from '@material-ui/core';
import { pdf } from '@react-pdf/renderer';
import { cn } from 'bento-components';
import PdfDocument from './Pdf';

export function convertToCSV(jsonse) {
  // const objArray = jsonse;
  // To Do empty object just print headers
  // const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
  // jsonse.map((entry) => {
  //   console.log(entry);
  //   return null;
  // });
  console.log(jsonse);
  let line = 'type'.join(',');
  Object.keys(jsonse).forEach((key) => {
    line += `${key}`.concat(',');
  });
  console.log(line);
  // let str = header.join(',');
  // array.map((entry, index) => {
  //   let line = '';
  //   keysToInclude.map((keyName) => {
  //     if (line !== '') line += ',';
  //     if (keyName === 'file_size') {
  //       line += entry[keyName] !== null ? `"${formatBytes(entry[keyName])}"` : ' ';
  //     } else {
  //       line += entry[keyName] !== null ? `"${entry[keyName]}"` : ' ';
  //     }
  //     return line;
  //   });
  //   if (index === 0) {
  //     // str = header.join(',');
  //     str += `\r\n${line}\r\n`;
  //   } else {
  //     str += `${line}\r\n`;
  //   }
  //   return str;
  // });

  return line;
}

const DownloadButton = ({
  classes,
  config,
  documentData,
  fileName,
}) => {
  const [isLoading, setLoading] = React.useState(false);

  const theme = createTheme({
    overrides: {
      MuiButton: {
        root: {
          minWidth: '35px',
          paddingRight: '10px',
          '&:hover': {
            backgroundColor: 'none',
          },
        },
      },
    },
  });

  const generatePdfDocument = async (object) => {
    const document = (config.type === 'document') ? Object.values(object) : [object];
    const blob = await pdf((
      <PdfDocument nodes={document} />
    )).toBlob();
    setLoading(false);
    saveAs(blob, `${fileName}.pdf`);
  };

  const downloadPdf = () => {
    setLoading(true);
    setTimeout(() => {
      generatePdfDocument(documentData);
    }, 50);
  };

  const downloadTsv = () => {
    console.log('download TSv');
    console.log(documentData);
    const csv = convertToCSV(documentData.properties);
    const exportData = new Blob([csv], { type: 'text/csv' });
    saveAs(exportData, 'test_file.txt');
  };

  const download = () => {
    if (config.fileType === 'pdf') {
      downloadPdf();
    } else {
      downloadTsv();
    }
  };

  const btnClass = (config.type === 'document')
    ? cn(classes.headerButton, classes.documentDownloadBtn)
    : cn(classes.headerButton, classes.nodeDownloadBtn);

  return (
    <>
      <MuiThemeProvider theme={theme}>
        <Button
          type="button"
          disableRipple
          // className={isLoading ? config.loading : config.class}
          className={btnClass}
          onClick={() => download()}
        >
          {isLoading ? ' Loading document... '
            : config.image ? <img className={classes.image} src={config.image} alt="download pdf" /> : 'DOWNLOAD DICTIONARY'}
        </Button>
      </MuiThemeProvider>
    </>
  );
};

const styles = () => ({
  root: {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: '9px',
    letterSpacing: '0.025em',
    color: '#000',
  },
  headerButton: {
    padding: 0,
  },
  documentDownloadBtn: {
    background: '#0D71A3',
    paddingRight: '15px',
    paddingLeft: '20px',
    color: '#fff',
    fontSize: '11px',
    marginBottom: '15px',
    height: '38px',
    marginRight: '21px',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  nodeDownloadBtn: {
    marginLeft: '15px',
    background: '#0D71A3',
    height: '35px',
    color: '#fff',
  },
  image: {
    width: '35px',
  },
  loading: {

  },
});

export default withStyles(styles)(DownloadButton);
