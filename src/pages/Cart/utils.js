/*eslint-disable*/
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { json2csv } from 'json-2-csv';

export function createFileName(fileName, format = '.csv') {
  const date = new Date();
  const yyyy = date.getFullYear();
  let dd = date.getDate();
  let mm = (date.getMonth() + 1);

  if (dd < 10) { dd = `0${dd}`; }

  if (mm < 10) { mm = `0${mm}`; }

  const todaysDate = `${yyyy}-${mm}-${dd}`;

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  if (hours < 10) { hours = `0${hours}`; }

  if (minutes < 10) { minutes = `0${minutes}`; }

  if (seconds < 10) { seconds = `0${seconds}`; }

  return `${fileName} ${todaysDate} ${hours}-${minutes}-${seconds}${format}`;
}

export const downloadCsvString = (csvString, fileName) => {
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.csv`;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url); 
}

export function convertToCSV(jsonse, comments, keysToInclude, header) {
  const objArray = typeof jsonse !== "object" ? JSON.parse(jsonse) : jsonse;

  // Start with the header row
  let csvString = header.join(",") + "\r\n";

  objArray.forEach((entry, index) => {
    let line = keysToInclude
      .map((keyName) => {
        let fieldValue = entry[keyName];

        // Check if the field value is a string and contains characters that need to be escaped.
        if (typeof fieldValue === "string") {
          fieldValue = fieldValue.replace(/"/g, '""'); // Escape double quotes

          // Enclose the field value in double quotes if it contains commas, newlines, or double quotes
          if (fieldValue.search(/("|,|\n)/g) >= 0) {
            fieldValue = `"${fieldValue}"`;
          }
        }

        return fieldValue !== null && fieldValue !== undefined
          ? fieldValue
          : "";
      })
      .join(","); // Join all fields for the row with commas

    // Add comments to the first data row
    if (index === 0 && comments) {
      let formattedComments = comments.replace(/"/g, '""');
      if (formattedComments.search(/("|,|\n)/g) >= 0) {
        formattedComments = `"${formattedComments}"`;
      }
      line += `,${formattedComments}`;
    }

    // Append the current row to the CSV string
    csvString += line + "\r\n";
  });

  return csvString;
}

export function downloadJson(tableData, comments, fileName, manifestData) {
  const jsonse = JSON.stringify(tableData);
  const csv = convertToCSV(jsonse, comments, manifestData.keysToInclude, manifestData.header);
  const exportData = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' });
  const JsonURL = window.URL.createObjectURL(exportData);
  let tempLink = '';
  tempLink = document.createElement('a');
  tempLink.setAttribute('href', JsonURL);
  tempLink.setAttribute('download', createFileName(fileName));
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
}

export const downloadJsonV2 = (tableData, comments, fileName, manifestData) => {
  const payload = tableData.map((el) => ({
    ...el,
    user_comments: comments || null
  }))
  const json2csvCallback = (err, csv) => {
    if (err) { throw err; }
    const exportData = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' });
    const JsonURL = window.URL.createObjectURL(exportData);
    let tempLink = '';
    tempLink = document.createElement('a');
    tempLink.setAttribute('href', JsonURL);
    tempLink.setAttribute('download', createFileName(fileName));
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  };

  const json2csvOptions = {
    excludeKeys: ['__typename'],
    keys: manifestData
  };
  json2csv(payload, json2csvCallback, json2csvOptions);
};

export const downloadAndZipJson = (dataArray, setLoading, studyCode) => {
  const filteredArr = dataArray.filter((el) => el.node.length !== 0);
  const processedFiles = [];
  const zip = new JSZip();

  filteredArr.forEach((dataObj) => {
    const jsonse = JSON.stringify(dataObj.node);
    const csv = convertToCSV(jsonse,
      dataObj.comments,
      dataObj.metadata.keysToInclude, dataObj.metadata.header);
    processedFiles.push({
      name: createFileName(`${dataObj.fileName}`),
      content: csv,
    });
  });

  processedFiles.forEach((file) => {
    zip.file(file.name, file.content);
  });

  zip.generateAsync({ type: 'blob' }).then((content) => {
    saveAs(content, createFileName(`ICDC_Clinical_Data-${studyCode}`, '.zip'));
  });
  if (setLoading) {
    setLoading(false);
  }
};
