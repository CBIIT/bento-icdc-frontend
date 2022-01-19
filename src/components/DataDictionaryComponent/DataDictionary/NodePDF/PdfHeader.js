import React from 'react';
import {
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import logo from './assets/icdc_nih_logo.png';

const styles = StyleSheet.create({
  logo: {
    float: 'left',
    width: '46%',
  },
  hr: {
    height: '5px',
    marginTop: '33px',
    backgroundColor: '#0B3556',
  },
});

const PdfHeader = () => (
  <>
    <Image style={styles.logo} src={logo} />
    <div style={styles.hr} />
  </>
);

export default PdfHeader;
