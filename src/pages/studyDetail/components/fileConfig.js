function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${parseFloat((bytes / (1024 ** i)).toFixed(dm))} ${sizes[parseInt(i, 10)]}`;
}

export default function FileColumns() {
  return ([
    {
      name: 'studyDesignation',
      label: 'Study Designation',
      options: {
        display: false,
      },
    },
    {
      name: 'file_name',
      label: 'File Name',
      options: {
        sortDirection: 'asc',
      },
    },
    { name: 'file_type', label: 'File Type' },
    { name: 'parent', label: 'Association' },
    { name: 'file_description', label: 'Description' },
    { name: 'file_format', label: 'Format' },
    {
      name: 'file_size',
      label: 'Size',
      options: {
        customBodyRender: (bytes) => (formatBytes(bytes)),
      },
    },
    {
      name: 'uuid',
      label: 'UUID',
      options: {
        display: false,
      },
    },
    {
      name: 'md5sum',
      label: 'Md5Sum',
      options: {
        display: false,
      },
    },
  ]);
}
