/* hide column from view columns list */
function updateColumns(columns, columnList) {
  const viewColumns = columns;
  const disableViewColumnsList = columnList
    .filter((column) => column.viewColumns !== undefined && !column.viewColumns);
  disableViewColumnsList.forEach((disabledColumn) => {
    const index = columns
      .findIndex((column) => column.label.toLowerCase() === disabledColumn.header.toLowerCase());
    if (index !== -1) {
      viewColumns[index].options.viewColumns = false;
    }
  });
  return viewColumns;
}

export const hasMultiStudyParticipants = (tableMeta) => {
  if (tableMeta.length === 0) {
    return false;
  }
  return true;
};

export default updateColumns;
