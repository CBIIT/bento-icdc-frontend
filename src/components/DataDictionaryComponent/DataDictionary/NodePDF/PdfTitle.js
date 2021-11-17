import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({

  titleContainer: {
    flexDirection: 'row',
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
});

const PdfTitle = ({ title }) => (
  <View style={styles.titleContainer}>
    <Text style={styles.pdfTitle}>{title}</Text>
  </View>
);

export default PdfTitle;
