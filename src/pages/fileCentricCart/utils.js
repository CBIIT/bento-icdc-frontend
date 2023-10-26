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

export function convertToCSV(jsonse, comments, keysToInclude, header) {
  const objArray = jsonse;
  const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
  let str = header.join(',');
  array.map((entry, index) => {
    let line = '';
    keysToInclude.map((keyName) => {
      if (line !== '') line += ',';
      let columnResult = entry[keyName];
      if (typeof columnResult === 'string') columnResult.replace(/"/g, '""');
      if (typeof columnResult === 'string' && columnResult.search(/("|,|\n)/g) >= 0) columnResult = `"${columnResult}"`;
      line += columnResult !== null ? columnResult : ' ';
      return line;
    });
    if (index === 0) {
      // str = header.join(',');
      let commentResult = comments.replace(/"/g, '""');
      if (commentResult.search(/("|,|\n)/g) >= 0) commentResult = `"${commentResult}"`;
      str += `\r\n${line},${commentResult}\r\n`;
    } else {
      str += `${line}\r\n`;
    }
    return str;
  });
  return str;
}

export const downloadJson = (tableData, comments, fileName, manifestData) => {
  const payload = tableData.map((el) => ({
    ...el,
    user_comments: comments || ''
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
  setLoading(false);
};
