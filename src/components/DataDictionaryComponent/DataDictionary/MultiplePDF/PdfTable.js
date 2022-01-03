import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';
import PdfTableHeader from './PdfTableHeader';
import PdfTableRow from './PdfTableRow';
import PdfTitle from './PdfTitle';

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
  spacer: {
    height: '20px',
  },
});

const PdfTable = ({ data }) => (
  data.map((elem) => (
    <View style={styles.tableContainer}>
      <PdfTitle
        title={elem.id}
        nodeClass={elem.class}
        assignment={elem.assignment}
        desc={elem.desc}
      />
      <PdfTableHeader />
      <PdfTableRow node={elem} />
      <div style={styles.spacer} />
    </View>
  ))
);

export default PdfTable;
