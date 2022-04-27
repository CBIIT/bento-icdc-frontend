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
    padding: '7px 0px 7px 10px',
  },
  hr: {
    height: '4px',
    backgroundColor: '#E7E5E5',
  },
  nodeInfo: {
    flexDirection: 'row',
    padding: '6px 0px 2px 15px',
    backgroundColor: '#f4f5f5',
    display: 'flex',
    justifyContent: 'space-between',
  },
  tagsInfo: {
    flexDirection: 'row',
    padding: '6px 0px 2px 15px',
    backgroundColor: '#f4f5f5',
    display: 'flex',
  },
  nodeTitle: {
    color: '#000000',
    fontSize: '10px',
    fontWeight: 'heavy',
    fontFamily: FontRegistry('NunitoBold'),
    // marginRight: '75px',
  },
  nodeDesc: {
    color: '#000000',
    fontSize: '9px',
    paddingRight: '15px',
    paddingTop: '-2px',
    lineHeight: 1.2,
    width: '350px',
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
    // float: 'right',
    paddingTop: '3px',
    paddingRight: '10px',
    paddingLeft: '10px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    border: '0.5px solid #cdcdcd',
    marginRight: '11em',
  },
  nodeClass: {
    paddingTop: '3px',
    paddingRight: '10px',
    paddingLeft: '10px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    border: '0.5px solid #cdcdcd',
  },
  tagContainer: {
    position: 'relative',
    left: '139em',
    display: 'flex',
    flexDirection: 'row',
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
    fontSize: '8px',
    paddingTop: '2px',
    marginRight: '10px',
    border: '0.5px solid #cdcdcd',
    borderRadius: '8px',
    textAlign: 'center',
    backgroundColor: '#fff',
    color: '#2982af',
    fontFamily: FontRegistry('NunitoNormal'),
  },
  class: {
    fontSize: '8px',
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
        <Text style={styles.nodeDesc}>{node.desc}</Text>
      </View>
      <View style={createStyle(styles.tagsInfo, categoryColor)}>
        <span style={styles.tagContainer}>
          <Text style={styles.nodeAssignment}>
            <span style={styles.label}>
              {'Assignment: '}
            </span>
            <span style={styles.assignment}>
              {capitalizeFirstLetter(node.assignment)}
            </span>
          </Text>
          <Text style={styles.nodeClass}>
            <span style={styles.label}>
              {'Class: '}
            </span>
            <span style={styles.class}>
              {capitalizeFirstLetter(node.nodeClass)}
            </span>
          </Text>
        </span>
      </View>
    </View>
  );
};

export default PdfTitle;
