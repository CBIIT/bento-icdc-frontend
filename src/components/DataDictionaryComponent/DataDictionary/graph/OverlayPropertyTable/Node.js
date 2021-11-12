/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';

const PdfDocument = (props) => {
  // eslint-disable-next-line no-console
  console.log('pdf props', props);

  return (
    <Document>
      <Page>
        <View>
          <Text>A test text</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PdfDocument;
