import React from 'react';
import {
  Page,
  Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import PdfTable from './PdfTable';
import logo from './assets/icdc_nih_logo.png';

const styles = StyleSheet.create({
  page: {
    padding: 10,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
  },
  logo: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%',
  },
});

const PdfDocument = ({ data }) => (
  <Document>
    <Page style={styles.page} size="A2">
      <Image style={styles.logo} src={logo} />
      <PdfTable data={Object.values(data)} />
    </Page>
  </Document>
);

export default PdfDocument;
