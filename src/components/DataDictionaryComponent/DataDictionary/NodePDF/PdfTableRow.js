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
  const keys = Object.keys(node);

  const validateType = (property) => {
    const type = typeof property;
    if (type === 'object') {
      return property.pattern;
    }
    return property;
  };

  const rows = keys.map((elem) => (
    <View style={styles.row} key={elem}>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>{elem}</Text>
      </View>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>{validateType(node[elem].type)}</Text>
      </View>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>No</Text>
      </View>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>{node[elem].description}</Text>
      </View>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>{node[elem].src}</Text>
      </View>
    </View>
  ));

  return (<>{rows}</>);
};

export default PdfTableRow;