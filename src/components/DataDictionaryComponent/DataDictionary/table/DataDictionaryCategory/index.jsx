/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { getCategoryColor, getCategoryIconSVG } from '../../NodeCategories/helper';
import { capitalizeFirstLetter } from '../../../utils';
import DataDictionaryNode from '../DataDictionaryNode';
import './DataDictionaryCategory.css';

class DataDictionaryCategory extends React.Component {
  render() {
    const IconSVG = getCategoryIconSVG(this.props.category);
    return (
      <div className="data-dictionary-category">
        <div className="data-dictionary-category__head" style={{ borderLeftColor: getCategoryColor(this.props.category) }}>
          <IconSVG className={`data-dictionary-category__icon ${this.props.category}`} />
          <span style={{ color: getCategoryColor(this.props.category) }}>
            {capitalizeFirstLetter(this.props.category)}
          </span>
          {
          // Fix Download buttons
          // eslint-disable-next-line max-len
          /* <span className="data-dictionary-category__download_template">Download Template</span> */
          }
        </div>
        <div className="data-dictionary-category__divider" style={{ borderLeftColor: getCategoryColor(this.props.category) }} />
        {
        this.props.nodes.map(
          (node) => (
            <DataDictionaryNode
              node={node}
              key={node.id}
              description={node.description}
              expanded={this.props.highlightingNodeID && this.props.highlightingNodeID === node.id}
              onExpandNode={this.props.onExpandNode}
            />
          ),
        )
      }
      </div>
    );
  }
}

DataDictionaryCategory.propTypes = {
  category: PropTypes.string.isRequired,
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      description: PropTypes.string,
    }),
  ).isRequired,
  highlightingNodeID: PropTypes.string,
  onExpandNode: PropTypes.func,
};

DataDictionaryCategory.defaultProps = {
  highlightingNodeID: null,
  onExpandNode: () => {},
};

export default DataDictionaryCategory;
