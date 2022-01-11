import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  row: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 'auto',
    fontSize: 12,
    overflowWrap: 'break-word',
    padding: '5px',
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
    if (node.required.includes(key)) {
      return 'Required';
    }

    if (node.preferred.includes(key)) {
      return 'Preferred';
    }

    return 'No';
  };

  const rows = keys.map((key) => (
    <View style={styles.row} key={key}>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>{key}</Text>
      </View>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>{validateType(node.properties[key].type)}</Text>
      </View>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>{required(key)}</Text>
      </View>
      <View style={styles.tableCol}>
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
