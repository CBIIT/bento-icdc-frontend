import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({

  titleContainer: {
    flexDirection: 'column',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'space-around',
  },
  pdfTitle: {
    color: '#1db634',
    letterSpacing: 4,
    fontSize: 25,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  assignment: {
    flexDirection: 'row',
  },
  class: {
    flexDirection: 'row',
  },
  subText: {
    marginLeft: '5px',
  },
  description: {
    textAlign: 'center',
  },
});

const PdfTitle = ({
  title, desc, assignment, nodeClass,
}) => (
  <View style={styles.titleContainer}>
    <Text style={styles.pdfTitle}>{title}</Text>
    <Text style={styles.description}>{desc}</Text>
    <div style={styles.assignment}>
      <Text>Assignment:</Text>
      <Text style={styles.subText}>{assignment}</Text>
    </div>
    <div style={styles.class}>
      <Text>Class:</Text>
      <Text style={styles.subText}>{nodeClass}</Text>
    </div>
  </View>
);

export default PdfTitle;
