import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '20%',
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderBottomColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#0B3557',
  },
  tableCellHeader: {
    margin: 'auto',
    fontSize: 14,
    fontWeight: 500,
    color: '#FFF',
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
    <View style={styles.tableColHeader}>
      <Text style={styles.tableCellHeader}>Description</Text>
    </View>
    <View style={styles.tableColHeader}>
      <Text style={styles.tableCellHeader}>Source</Text>
    </View>
  </View>
);

export default PdfTableHeader;
