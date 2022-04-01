import React from 'react';
import {
  Page,
  Document,
  StyleSheet,
  // Text,
} from '@react-pdf/renderer';
import PdfHeader from '../NodePDF/PdfHeader';
import PdfFooter from '../NodePDF/PdfFooter';
import PdfTable from './PdfTable';

const styles = StyleSheet.create({
  page: {
    padding: '130px 150px 100px 150px',
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
  },
  logo: {
    float: 'left',
    width: '46%',
  },
  body: {
    border: '1px solid #C1C1C1',
    marginTop: '50px',
  },
});

const PdfDocument = ({ data }) => (
  <Document>
    <Page style={styles.page} size="A2">
      <PdfHeader />
      <PdfTable data={Object.values(data)} />
      {/* <Text
        render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
        fixed
      /> */}
      <PdfFooter />
    </Page>
  </Document>
);

export default PdfDocument;
