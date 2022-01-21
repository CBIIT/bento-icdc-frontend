import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingLeft: '30px',
  },
  evenRow: {
    backgroundColor: '#f4f5f5',
  },
  tableCol: {
    width: '15%',
  },
  tableColDesc: {
    textAlign: 'left',
    width: '40%',
  },
  tableCell: {
    fontSize: 10,
    overflowWrap: 'break-word',
    paddingLeft: '10px',
    paddingTop: '10px',
    paddingBottom: '10px',
  },
  required: {
    color: '#ff5a20',
  },
});

const PdfTableRow = ({ node }) => {
  const keys = Object.keys(node.properties);

  const validateType = (property) => {
    const type = typeof property;
    if (type === 'object') {
      return property.pattern;
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
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>{validateType(node.properties[key].type)}</Text>
      </View>
      <View style={styles.tableCol}>
        {required(key)}
      </View>
      <View style={styles.tableColDesc}>
        <Text style={styles.tableCell}>{node.properties[key].description}</Text>
      </View>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>{node.properties[key].src}</Text>
      </View>
    </View>
  ));

  return (<>{rows}</>);
};

export default PdfTableRow;
