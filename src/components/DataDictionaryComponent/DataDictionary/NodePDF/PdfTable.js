import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';
import PdfTableHeader from './PdfTableHeader';
import PdfTableRow from './PdfTableRow';

const styles = StyleSheet.create({
  tableContainer: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
});

const PdfTable = ({ node }) => (
  <View style={styles.tableContainer}>
    <PdfTableHeader />
    <PdfTableRow node={node} />
  </View>
);

export default PdfTable;
