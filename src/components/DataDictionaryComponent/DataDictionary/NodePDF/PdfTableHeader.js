import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import { FontRegistry } from './util';

const styles = StyleSheet.create({
  container: {
    // margin: 'auto',
    marginTop: '5px',
    flexDirection: 'row',
    borderTop: '2px solid #606060',
    borderBottom: '2px solid #606060',
    backgroundColor: '#fff',
    fontSize: 8,
    fontWeight: 900,
    color: '#606060',
    paddingTop: '5px',
    paddingRight: '5px',
    paddingLeft: '10px',
    paddingBottom: '5px',
    fontFamily: FontRegistry('NunitoExtraBold'),
  },
  tableColHeader: {
    width: '24%',
  },
  tableColType: {
    width: '18%',
  },
  tableColSource: {
    width: '14%',
  },
  tableColRequired: {
    width: '12%',
  },
  tableColDesc: {
    width: '30%',
  },
  tableCellHeader: {
    // margin: 'auto',
    overflowWrap: 'break-word',
    paddingLeft: '10px',
    fontWeight: 'heavy',
    color: '#606060',
    fontFamily: FontRegistry('NunitoExtraBold'),
  },
});

const PdfTableHeader = () => (
  <View style={styles.container}>
    <View style={styles.tableColHeader}>
      <Text style={styles.tableCellHeader}>Property</Text>
    </View>
    <View style={styles.tableColType}>
      <Text style={styles.tableCellHeader}>Type</Text>
    </View>
    <View style={styles.tableColRequired}>
      <Text style={styles.tableCellHeader}>Required</Text>
    </View>
    <View style={styles.tableColDesc}>
      <Text style={styles.tableCellHeader}>Description</Text>
    </View>
    <View style={styles.tableColSource}>
      <Text style={styles.tableCellHeader}>Source</Text>
    </View>
  </View>
);

export default PdfTableHeader;
