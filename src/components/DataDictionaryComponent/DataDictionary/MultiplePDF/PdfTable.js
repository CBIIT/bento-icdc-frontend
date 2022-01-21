import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';
import PdfTitle from '../NodePDF/PdfTitle';
import NodePdfTable from '../NodePDF/PdfTable';

const styles = StyleSheet.create({
  tableContainer: {
    border: '1px solid #C1C1C1',
    marginTop: '50px',
  },
  spacer: {
    height: '20px',
  },
});

const PdfTable = ({ data }) => (
  data.map((node) => (
    <View style={styles.tableContainer}>
      <PdfTitle
        title={node.id}
        nodeClass={node.class}
        assignment={node.assignment}
        desc={node.desc}
        category={node.category}
      />
      {/* <PdfTableHeader />
      <PdfTableRow node={node} /> */}
      <div style={styles.spacer} />
      <NodePdfTable node={node} />
    </View>
  )
));

export default PdfTable;
