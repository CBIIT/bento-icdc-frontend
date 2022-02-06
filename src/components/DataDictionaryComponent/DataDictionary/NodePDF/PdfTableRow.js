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
    paddingLeft: '5px',
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
    paddingLeft: 5,
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
    paddingLeft: '2px',
    paddingTop: '5px',
    paddingBottom: '5px',
    lineHeight: 1.2,
    fontFamily: FontRegistry('NunitoNormal'),
  },
  required: {
    color: '#ff5a20',
    fontFamily: FontRegistry('NunitoExtraBold'),
  },
});

const PdfTableRow = ({ node }) => {
  const keys = Object.keys(node.properties);

  const textContent = (text, symbol) => {
    if (String(text).length > 20) {
      return String(text).replace(symbol, `${symbol}\n`);
    }
    return text;
  };

  const validateEnums = (enums) => {
    if (Array.isArray(enums)) {
      let concatEnums = '';
      enums.forEach((value) => {
        concatEnums += textContent(`'${value}'; `, '/');
      });
      return concatEnums;
    }
    return JSON.stringify(enums);
  };

  const validateType = (property) => {
    if (Array.isArray(property)) {
      if (property.length > 10) {
        // return JSON.stringify(property, undefined, 2);
        return textContent(`${property}`, '_');
      }
      return property;
    }
    const type = typeof property;
    if (type === 'object') {
      return textContent(JSON.stringify(property), ']');
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
        <Text style={styles.tableCell}>{textContent(key, '_')}</Text>
      </View>
      <View style={styles.tableColType}>
        {node.properties[key].enum ? (
          <Text style={styles.tableCell}>
            {'Acceptable Values: '}
            {validateEnums(node.properties[key].enum)}
          </Text>
        ) : (
          <Text style={styles.tableCell}>{validateType(node.properties[key].type)}</Text>
        ) }
      </View>
      <View style={styles.tableColRequired}>
        {required(key)}
      </View>
      <View style={styles.tableColDesc}>
        <Text style={styles.tableCell}>{node.properties[key].description}</Text>
      </View>
      <View style={styles.tableColSource}>
        <Text style={styles.tableCell}>{textContent(node.properties[key].src, '/')}</Text>
      </View>
    </View>
  ));

  return (<>{rows}</>);
};

export default PdfTableRow;
