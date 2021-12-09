import React from 'react';
import {
  Page,
  Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import PdfTitle from './PdfTitle';
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

const PdfDocument = ({ node }) => (
  <Document>
    <Page style={styles.page} size="A2">
      <Image style={styles.logo} src={logo} />
      <PdfTitle title={node.id} />
      <PdfTable node={node} />
    </Page>
  </Document>
);

export default PdfDocument;
