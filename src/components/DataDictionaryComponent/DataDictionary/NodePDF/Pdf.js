import React from 'react';
import {
  Page,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';
import PdfTitle from './PdfTitle';
import PdfTable from './PdfTable';
import PdfHeader from './PdfHeader';
import Sgv from './assets/Cases.svg';

const styles = StyleSheet.create({
  page: {
    padding: 10,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
  },
  logo: {
    float: 'left',
    width: '46%',
  },
});

const PdfDocument = ({ node }) => (
  <Document>
    <Page style={styles.page} size="A2">
      <PdfHeader />
      <Sgv />
      <PdfTitle title={node.id} />
      <PdfTable node={node} />
    </Page>
  </Document>
);

export default PdfDocument;
