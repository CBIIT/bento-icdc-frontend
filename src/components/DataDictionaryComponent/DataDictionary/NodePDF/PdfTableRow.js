import React, { Fragment } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import { FontRegistry } from './util';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingLeft: '10px',
  },
  evenRow: {
    backgroundColor: '#f4f5f5',
  },
  tableCol: {
    width: '24%',
  },
  tableColType: {
    width: '18%',
  },
  tableColSource: {
    width: '14%',
  },
  tableColDesc: {
    textAlign: 'left',
    width: '30%',
  },
  tableColRequired: {
    width: '12%',
  },
  tableCell: {
    fontSize: 8,
    // lineHeight: '9px',
    overflowWrap: 'break-word',
    paddingLeft: '8px',
    paddingTop: '5px',
    paddingBottom: '5px',
    fontFamily: FontRegistry('NunitoNormal'),
  },
  required: {
    color: '#ff5a20',
    fontFamily: FontRegistry('NunitoExtraBold'),
  },
});

const PdfTableRow = ({ node }) => {
  const keys = Object.keys(node.properties);

  const validateType = (property) => {
    if (Array.isArray(property)) {
      if (property.length > 10) {
        return JSON.stringify(property, undefined, 2);
      }
      return property;
    }
    const type = typeof property;
    if (type === 'object') {
      return JSON.stringify(property, undefined, 2);
    }
    return property;
  };

  const required = (key) => {
    if (node.required.includes(key) || node.preferred.includes(key)) {
      return (
        <Text style={{ ...styles.tableCell, ...styles.required }}>Required</Text>
      );
    }
    return <Text style={styles.tableCell}>No</Text>;
  };

  const getStyles = (classes, index) => ((index % 2 === 0)
    ? { ...classes, ...styles.evenRow } : { ...classes });
  const rows = keys.map((key, index) => (
    <View style={getStyles(styles.row, index)} key={key}>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>{key}</Text>
      </View>
      <View style={styles.tableColType}>
        <Text style={styles.tableCell}>{validateType(node.properties[key].type)}</Text>
      </View>
      <View style={styles.tableColRequired}>
        {required(key)}
      </View>
      <View style={styles.tableColDesc}>
        <Text style={styles.tableCell}>{node.properties[key].description}</Text>
      </View>
      <View style={styles.tableColSource}>
        <Text style={styles.tableCell}>{node.properties[key].src}</Text>
      </View>
    </View>
  ));

  return (<>{rows}</>);
};

export default PdfTableRow;
