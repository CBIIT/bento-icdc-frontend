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
    fontSize: '10px',
    fontWeight: 'heavy',
    fontFamily: FontRegistry('NunitoBold'),
    marginRight: '75px',
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
  nodeAssignmentClass: {
    float: 'right',
    paddingTop: '2px',
    paddingRight: '10px',
    paddingLeft: '10px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    border: '0.5px solid #cdcdcd',
    marginRight: '10px',
  },
  label: {
    fontWeight: '900',
    fontSize: '7px',
    paddingTop: '0px',
    paddingBottom: '2px',
    float: 'left',
    color: '#6c6c6c',
    fontFamily: FontRegistry('NunitoExtraBold'),
  },
  assignment: {
    fontSize: '7px',
    paddingTop: '2px',
    marginRight: '10px',
    border: '0.5px solid #cdcdcd',
    borderRadius: '8px',
    textAlign: 'center',
    backgroundColor: '#fff',
    color: '#2982af',
    fontFamily: FontRegistry('NunitoNormal'),
  },
  nodeClass: {
    // width: '16%',
    textAlign: 'center',
    paddingTop: '4px',
    marginTop: '-5px',
  },
  class: {
    fontSize: '7px',
    paddingRight: '4px',
    paddingTop: '2px',
    border: '0.5px solid #cdcdcd',
    borderRadius: '8px',
    backgroundColor: '#fff',
    color: '#2982af',
    height: '13px',
    fontFamily: FontRegistry('NunitoNormal'),
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
        {/* <View style={styles.nodeTitle}> */}
        <Text style={styles.nodeTitle}>
          {capitalizeFirstLetter(node.title)}
        </Text>
        <Text style={styles.nodeAssignmentClass}>
          <span style={styles.label}>
            {'Assignment: '}
          </span>
          <span style={styles.assignment}>
            {capitalizeFirstLetter(node.assignment)}
          </span>
        </Text>
        <Text style={styles.nodeAssignmentClass}>
          <span style={styles.label}>
            {'Class: '}
          </span>
          <span style={styles.class}>
            {capitalizeFirstLetter(node.nodeClass)}
          </span>
        </Text>
      </View>
      <View style={createStyle(styles.nodeInfo, categoryColor)}>
        <Text style={styles.nodeDesc}>{node.desc}</Text>
      </View>
    </View>
  );
};

export default PdfTitle;
