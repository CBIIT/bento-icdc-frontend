/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
// import { PDFDownloadLink } from '@react-pdf/renderer';
// eslint-disable-next-line no-unused-vars
import {
  Grid, Typography,
} from '@material-ui/core';
// import Button from '@gen3/ui-component/dist/components/Button';
import { downloadTemplate } from '../../utils';
import { capitalizeFirstLetter, createFileName } from '../../../utils';
import { getCategoryColor } from '../../NodeCategories/helper';
import DataDictionaryPropertyTable from '../DataDictionaryPropertyTable';
import './DataDictionaryNode.css';
// import PdfDocument from '../../NodePDF';
import DownloadButton from '../../NodePDF/DownloadButton';
import IconDownloadPDF from '../icons/icon_download_PDF.svg';
import IconDownloadPTSV from '../icons/icon_download_TSV.svg';

const csvBtnDownloadConfig = {
  class: 'data-dictionary-node__download-button_tsv',
  loading: 'data-dictionary-node__loading',
  image: IconDownloadPTSV,
  fileType: 'txt',
  prefix: 'ICDC-',
};

const pdfDownloadConfig = {
  class: 'data-dictionary-node__download-button_pdf',
  loading: 'data-dictionary-node__loading',
  image: IconDownloadPDF,
  type: 'single',
  fileType: 'pdf',
  prefix: 'ICDC_Data_Model_',
};

class DataDictionaryNode extends React.Component {
  handleClickNode(nodeID) {
    if (!this.props.expanded) {
      this.props.onExpandNode(nodeID);
    } else {
      this.props.onExpandNode(null);
    }
  }

  handleCloseNode = () => {
    this.props.onExpandNode(null);
  }

  handleDownloadTemplate = (e, format) => {
    e.stopPropagation(); // no toggling
    downloadTemplate(format, this.props.node.id);
  }

  render() {
    return (
      <>
        <div
          className="data-dictionary-node"
          style={{ borderLeftColor: getCategoryColor(this.props.node.category) }}
          onClick={() => this.handleClickNode(this.props.node.id)}
          onKeyPress={() => this.handleClickNode(this.props.node.id)}
          role="button"
          tabIndex={0}
        >
          <Grid container>
            <Grid item xs={3}>
              <span className="data-dictionary-node__title">
                {/* <i className="g3-icon g3-icon--folder data-dictionary-node__file-icon" /> */}
                {capitalizeFirstLetter(this.props.node.title)}
                <i className={`g3-icon g3-icon--chevron-${this.props.expanded ? 'down' : 'right'} data-dictionary-node__toggle-icon`} />
              </span>
            </Grid>
            <Grid item xs={9} className="data-dictionary-node__description">
              <Typography>
                {(this.props.node.desc) ? this.props.node.desc : this.props.description}
              </Typography>
            </Grid>
            <Grid item lg={2} md={2} sm={2} xs={12} className="data-dictionary-node__assignment_group">
              <span className="data-dictionary-node__label">
                <span>
                  Assignment:
                </span>
                <span className="data-dictionary-node__assignment">
                  {capitalizeFirstLetter(this.props.node.assignment)}
                </span>
              </span>
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={12} className="data-dictionary-node__class_group">
              <span className="data-dictionary-node__label">
                Class:
                <span className="data-dictionary-node__class">
                  {capitalizeFirstLetter(this.props.node.class)}
                </span>
              </span>
            </Grid>
            <Grid item xs={3} className="data-dictionary-node__download-button-group">
              <div className="data-dictionary-node__button-wrap">
                {
                // Fix Download buttons
                /* <Button
                  className="data-dictionary-node__download-button"
                  onClick={(e) => { this.handleDownloadTemplate(e, 'json'); }}
                  label="JSON"
                  rightIcon="download"
                  buttonType="secondary"
                />
              </span>
              <span className="data-dictionary-node__button-wrap">
                <Button
                  className="data-dictionary-node__download-button"
                  onClick={(e) => { this.handleDownloadTemplate(e, 'tsv'); }}
                  label="TSV"
                  rightIcon="download"
                  buttonType="secondary"
                /> */}
                {/* <PDFDownloadLink
                  document={<PdfDocument node={this.props.node} />}
                  fileName={createFileName(this.props.node.id, true, '.pdf')}
                  className="data-dictionary-node__download-button_pdf"
                >
                  {({
                    loading,
                  }) => (loading ? <div className="data-dictionary-node__loading">
                  Loading document... </div>
                    : <img src={IconDownloadPDF} alt="download pdf" />)}
                </PDFDownloadLink> */}
                <DownloadButton
                  config={pdfDownloadConfig}
                  documentData={this.props.node}
                  fileName={createFileName(this.props.node.id, pdfDownloadConfig.prefix)}
                />
              </div>
              <div className="data-dictionary-node__button-wrap">
                {/* <button
                  type="button"
                  onClick={() => {}}
                  className="data-dictionary-node__download-button_tsv"
                >
                  <img src={IconDownloadPTSV} alt="download TSV" />
                </button> */}
                {
                  this.props.node.template === 'Yes' ? (
                    <DownloadButton
                      config={csvBtnDownloadConfig}
                      documentData={this.props.node}
                      template={this.props.node.template}
                      fileName={createFileName(this.props.node.id, csvBtnDownloadConfig.prefix)}
                    />
                  ) : (
                    <DownloadButton
                      config={csvBtnDownloadConfig}
                      documentData={this.props.node}
                      template={this.props.node.template}
                      fileName={createFileName(this.props.node.id, csvBtnDownloadConfig.prefix)}
                    />
                  )
                }
              </div>
            </Grid>
          </Grid>
        </div>
        {
          this.props.expanded && (
            <div className="data-dictionary-node__property">
              <span
                className="data-dictionary-node__property-close"
                onClick={this.handleCloseNode}
                onKeyPress={this.handleCloseNode}
                role="button"
                tabIndex={0}
              >
                <i className="g3-icon g3-icon--sm g3-icon--cross data-dictionary-node__property-close-icon" />
              </span>
              <div className="data-dictionary-node__property-summary">
                <i>
                  <span>{this.props.node.title}</span>
                  <span> has </span>
                  <span>{Object.keys(this.props.node.properties).length}</span>
                  <span> properties. </span>
                </i>
              </div>
              <DataDictionaryPropertyTable
                properties={this.props.node.properties}
                requiredProperties={this.props.node.required}
                preferredProperties={this.props.node.preferred}
              />
            </div>
          )
        }
      </>
    );
  }
}

DataDictionaryNode.propTypes = {
  node: PropTypes.object.isRequired,
  description: PropTypes.string,
  expanded: PropTypes.bool,
  onExpandNode: PropTypes.func,
};

DataDictionaryNode.defaultProps = {
  description: '',
  expanded: false,
  onExpandNode: () => {},
};

export default DataDictionaryNode;
