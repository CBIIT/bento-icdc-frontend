import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    marginTop: '10px',
    // margin: 'auto',
    flexDirection: 'row',
    borderTop: '2px solid #606060',
    borderBottom: '2px solid #606060',
    backgroundColor: '#fff',
    fontSize: '10px',
    fontWeight: 900,
    color: '#606060',
    paddingTop: '10px',
    paddingLeft: '30px',
    paddingBottom: '10px',
  },
  tableColHeader: {
    width: '15%',
  },
  tableColDesc: {
    width: '40%',
  },
  tableCellHeader: {
    // margin: 'auto',
    marginLeft: '10px',
  },
});

const PdfTableHeader = () => (
  <View style={styles.container}>
    <View style={styles.tableColHeader}>
      <Text style={styles.tableCellHeader}>Property</Text>
    </View>
    <View style={styles.tableColHeader}>
      <Text style={styles.tableCellHeader}>Type</Text>
    </View>
    <View style={styles.tableColHeader}>
      <Text style={styles.tableCellHeader}>Required</Text>
    </View>
    <View style={styles.tableColDesc}>
      <Text style={styles.tableCellHeader}>Description</Text>
    </View>
    <View style={styles.tableColHeader}>
      <Text style={styles.tableCellHeader}>Source</Text>
    </View>
  </View>
);

export default PdfTableHeader;
