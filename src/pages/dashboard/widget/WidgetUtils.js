/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */

import {
  transformInitialDataForSunburst,
} from '@bento-core/util';

/**
 * Removes empty subjects from donut data.
 *
 * @param {object} data
 * @returns {object} filtered data
 */
const removeEmptyCountFromDonutData = (data) => data.filter((item) => item.count !== 0);

/**
 * Returns the widgets data formatted as key:dataset pairs
 *
 * @param {object} data
 * @param {object} custodianConfig
 * @return {object} formatted data
 */
export function formatWidgetData(data, custodianConfig) {
  const formatted = custodianConfig.reduce((acc, widget) => {
    const {
      type, dataName, datatable_level1_field, datatable_level2_field,
      datatable_level1_colors, datatable_level2_colors,
    } = widget;
    const dataset = type === 'sunburst'
      ? transformInitialDataForSunburst(data[dataName], datatable_level1_field, datatable_level2_field, 'studies', datatable_level1_colors, datatable_level2_colors)
      : removeEmptyCountFromDonutData(data[dataName]);

    return { ...acc, [dataName]: dataset };
  }, {});

  return formatted;
}
