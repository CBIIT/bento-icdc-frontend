import React from 'react';
import { View, StyleSheet, Text } from '@react-pdf/renderer';
import PdfTableHeader from './PdfTableHeader';
import PdfTableRow from './PdfTableRow';

const styles = StyleSheet.create({
  tableContainer: {
    display: 'table',
    width: 'auto',
    paddingTop: '20px',
    paddingLeft: '55px',
    paddingRight: '54px',
  },
  properties: {
    color: '#7a7a7a',
    fontSize: '8px',
    marginLeft: '41px',
    fontStyle: 'italic',
  },
});

const PdfTable = ({ node }) => {
  const { properties } = node;
  const count = Object.keys(properties).length;
  return (
    <View style={styles.tableContainer}>
      <Text style={styles.properties}>
        {`This node has ${count} properties`}
      </Text>
      <PdfTableHeader />
      <PdfTableRow node={node} />
    </View>
  );
};

export default PdfTable;
