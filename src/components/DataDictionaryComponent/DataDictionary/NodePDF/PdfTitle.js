import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import renderSvgElement from './RenderSvg';
import { getCategoryColor } from '../NodeCategories/helper';
import { capitalizeFirstLetter } from '../../utils';
import { FontRegistry } from './util';

const styles = StyleSheet.create({
  row: {
    margin: 'auto',
    flexDirection: 'row',
  },
  categoryStyle: {
    flexDirection: 'row',
    padding: '7px 0px 7px 12px',
  },
  hr: {
    height: '4px',
    backgroundColor: '#E7E5E5',
  },
  nodeInfo: {
    flexDirection: 'row',
    padding: '6px 0px 2px 20px',
    backgroundColor: '#f4f5f5',
  },
  nodeTitle: {
    color: '#000000',
    fontSize: '9px',
    fontWeight: 'heavy',
    width: '25%',
    fontFamily: FontRegistry('NunitoBold'),
  },
  nodeDesc: {
    color: '#000000',
    fontSize: '9px',
    paddingRight: '20px',
    paddingTop: '-2px',
    fontFamily: FontRegistry('NunitoNormal'),
  },
  categoryHeader: {
    marginLeft: '10px',
    fontWeight: 'heavy',
    fontSize: '11.25px',
    paddingTop: '8px',
    fontFamily: FontRegistry('NunitoExtraBold'),
  },
  nodeAssignment: {
    width: '20%',
    float: 'right',
    paddingTop: '4px',
  },
  label: {
    fontWeight: '900',
    fontSize: '7px',
    paddingTop: '0px',
    paddingBottom: '2px',
    float: 'left',
    color: '#8e8e8e',
    fontFamily: FontRegistry('NunitoExtraBold'),
  },
  assignment: {
    fontSize: '7px',
    paddingTop: '2px',
    marginRight: '10px',
    border: '1px solid #cdcdcd',
    borderRadius: '2px',
    textAlign: 'center',
    backgroundColor: '#fff',
    color: '#2982af',
  },
  nodeClass: {
    width: '16%',
    textAlign: 'center',
    paddingTop: '4px',
  },
  class: {
    fontSize: '7px',
    paddingTop: '2px',
    border: '1px solid #cdcdcd',
    borderRadius: '2px',
    backgroundColor: '#fff',
    color: '#2982af',
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
