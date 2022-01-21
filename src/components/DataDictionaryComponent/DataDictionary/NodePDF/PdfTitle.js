import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import renderSvgElement from './RenderSvg';
import { getCategoryColor } from '../NodeCategories/helper';
import { capitalizeFirstLetter } from '../../utils';

const styles = StyleSheet.create({
  row: {
    margin: 'auto',
    flexDirection: 'row',
  },
  categoryStyle: {
    flexDirection: 'row',
    padding: '10px 0px 10px 30px',
    height: '64px',
  },
  hr: {
    height: '4px',
    backgroundColor: '#E7E5E5',
  },
  nodeInfo: {
    flexDirection: 'row',
    padding: '10px 0px 10px 30px',
    backgroundColor: '#f4f5f5',
  },
  nodeTitle: {
    color: '#000000',
    fontSize: '11px',
    paddingLeft: '20px',
    fontWeight: '900',
    width: '25%',
  },
  nodeDesc: {
    color: '#000000',
    fontSize: '9px',
    paddingLeft: '20px',
    paddingRight: '57px',
  },
  categoryHeader: {
    marginLeft: '25px',
    fontWeight: '900',
    fontSize: '18px',
    paddingTop: '15px',
    float: 'left',
  },
  nodeAssignment: {
    width: '13%',
    float: 'right',
  },
  label: {
    fontWeight: '900',
    fontSize: '9px',
    paddingTop: '15px',
    float: 'left',
    color: '#8e8e8e',
  },
  assignment: {
    fontWeight: '600',
    fontSize: '9px',
    paddingTop: '5px',
    marginRight: '10px',
    border: '1px solid #cdcdcd',
    borderRadius: '2px',
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  nodeClass: {
    width: '10%',
    textAlign: 'center',
  },
  class: {
    fontWeight: '600',
    fontSize: '9px',
    paddingTop: '5px',
    border: '1px solid #cdcdcd',
    borderRadius: '2px',
    backgroundColor: '#fff',
  },
});

const createStyle = (classes, categoryColor) => ({ ...classes, ...{ borderLeft: `5px solid ${categoryColor}` } });

const PdfTitle = (node) => {
  const svgNode = document.querySelector(`svg.${node.category}`);
  const SvgIcon = renderSvgElement(svgNode);
  const categoryColor = getCategoryColor(node.category);
  return (
    <View>
      <View style={createStyle(styles.categoryStyle, categoryColor)}>
        {SvgIcon}
        <Text style={{ color: categoryColor, ...styles.categoryHeader }}>
          {capitalizeFirstLetter(node.category)}
        </Text>
      </View>
      <View style={createStyle(styles.hr, categoryColor)} />
      <View style={createStyle(styles.nodeInfo, categoryColor)}>
        <View style={styles.nodeTitle}>
          <Text style={styles.nodeName}>
            {capitalizeFirstLetter(node.title)}
          </Text>
        </View>
        <View style={styles.nodeAssignment}>
          <Text style={styles.assignment}>
            <span style={styles.label}>
              {'Assignment: '}
            </span>
            {capitalizeFirstLetter(node.assignment)}
          </Text>
        </View>
        <View style={styles.nodeClass}>
          <Text style={styles.class}>
            <span style={styles.label}>
              {'Class: '}
            </span>
            {capitalizeFirstLetter(node.nodeClass)}
          </Text>
        </View>
      </View>
      <View style={createStyle(styles.nodeInfo, categoryColor)}>
        <Text style={styles.nodeDesc}>{node.desc}</Text>
      </View>
    </View>
  );
};

export default PdfTitle;
