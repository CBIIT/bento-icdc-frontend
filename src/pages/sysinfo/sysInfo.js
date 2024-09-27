
import React from 'react';
import { CustomDataTable } from '@bento-core/data-table';
import { getColumns } from '@bento-core/util';
import { Grid2 as Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import env from '../../utils/env';
import bentoCorePackageJson from '../../../node_modules/@bento-core/all/package.json';

export const dependencyRequirements = {
  node: '16.13.0',
  npm: '7.19.1',
};

// eslint-disable-next-line camelcase
/* function createThreeColumnRow(key, requiredValue, value) {
  return { key, requiredValue, value };
} */

function createRow(key, value) {
  return { key, value };
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const coreServiceOptions = {
  columns: [
    {
      dataField: 'key',
      header: 'Name',
    },

    {
      dataField: 'value',
      header: 'Current Version',
    },
  ],
};

const microservicesOptions = {
  columns: [
    {
      dataField: 'key',
      header: 'Name',
    },

    {
      dataField: 'value',
      header: 'Version',
    },
  ],
};

const environmentVariableOptions = {
  columns: [
    {
      dataField: 'key',
      header: 'Variable',
    },
    {
      dataField: 'value',
      header: 'Value',
    },
  ],
};

const dependenciesOptions = {
  columns: [
    {
      dataField: 'key',
      header: 'Name',
    },
    /* {
      dataField: 'requiredValue',
      header: 'Required Version',
    }, */
    {
      dataField: 'value',
      header: 'Current Version',
    },
  ],
};

const SysInfo = () => {
  const classes = useStyles();

  const { data: backendVersion } = useQuery({
    queryKey: ['backend', 'version'],
    queryFn: async () => {
      const { data } = await axios.get(env.REACT_APP_BACKEND_VERSION);
      return data.version;
    },
  });

  const { data: fileServiceVersion } = useQuery({
    queryKey: ['fileService', 'version'],
    queryFn: async () => {
      const { data } = await axios.get(env.REACT_APP_FILE_SERVICE_VERSION);
      return data.version;
    },
  });

  const { data: interoperationVersion } = useQuery({
    queryKey: ['interop', 'version'],
    queryFn: async () => {
      const { data } = await axios.get(env.REACT_APP_INTEROP_SERVICE_VERSION);
      return data.version;
    },
  });

  const coreServicesData = [
    createRow('Frontend version', env.REACT_APP_FE_VERSION),
    createRow('Backend version', backendVersion),
    createRow('Bento core', bentoCorePackageJson.version),
  ];
  const microservicesData = [
    createRow('File service version', fileServiceVersion),
    createRow('Inteoperation API version', interoperationVersion),
  ];
  const environmentVariablesData = [
    createRow('Backend API endpoint', env.REACT_APP_BACKEND_API),
    createRow('File Service API endpoint', env.REACT_APP_FILE_SERVICE_API),
    createRow('Interoperation API endpoint', env.REACT_APP_INTEROP_SERVICE_URL),
  ];
  const dependenciesData = [
    createRow('Node', dependencyRequirements.node),
    createRow('NPM', dependencyRequirements.npm),
  ];

  return (
    <>
      <Grid item xs={12} id="table_core">
        <CustomDataTable
          title="Core"
          data={coreServicesData}
          columns={getColumns(coreServiceOptions, classes)}
        />
      </Grid>
      <Grid item xs={12} id="table_micro">
        <CustomDataTable
          title="Micro Services"
          data={microservicesData}
          columns={getColumns(microservicesOptions, classes)}
        />
      </Grid>
      <Grid item xs={12} id="table_env">
        <CustomDataTable
          title="Environment Variables"
          data={environmentVariablesData}
          columns={getColumns(environmentVariableOptions, classes)}
        />
      </Grid>
      <Grid item xs={12} id="table_file">
        <CustomDataTable
          title="Dependencies"
          data={dependenciesData}
          columns={getColumns(dependenciesOptions, classes)}
        />
      </Grid>
    </>
  );
};

export default SysInfo;
