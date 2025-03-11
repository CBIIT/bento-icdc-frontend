import React from 'react';
import { CustomDataTable } from '@bento-core/data-table';
import { getColumns } from '@bento-core/util';
import { makeStyles, Grid } from '@material-ui/core';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import env from '../../utils/env';
import bentoCorePackageJson from '../../../node_modules/@bento-core/all/package.json';
import styled from '@emotion/styled';

const TableWrapper = styled.div({
  '& th': {
    paddingLeft: '16px',
  },

  '& tbody > tr > td': {
    paddingLeft: '16px',
  },
});

export const dependencyRequirements = {
  node: '20.11.1',
  npm: '10.2.4',
};

function createRow(key, value) {
  return { key, value };
}

const useStyles = makeStyles({
  // table: {
  //     minWidth: 650,
  // },
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
        <TableWrapper>
          <CustomDataTable
            options={{
              selectableRows: 'none',
            }}
            title="Core"
            data={coreServicesData}
            columns={getColumns(coreServiceOptions, classes)}
          />
        </TableWrapper>
      </Grid>
      <Grid item xs={12} id="table_micro">
        <TableWrapper>
          <CustomDataTable
            options={{
              selectableRows: 'none',
              fixedHeader: {
                background: 'red',
              },
            }}
            title="Micro Services"
            data={microservicesData}
            columns={getColumns(microservicesOptions, classes)}
          />
        </TableWrapper>
      </Grid>
      <Grid item xs={12} id="table_env">
        <TableWrapper>
          <CustomDataTable
            options={{
              selectableRows: 'none',
            }}
            title="Environment Variables"
            data={environmentVariablesData}
            columns={getColumns(environmentVariableOptions, classes)}
          />
        </TableWrapper>
      </Grid>
      <Grid item xs={12} id="table_file">
        <TableWrapper>
          <CustomDataTable
            title="Dependencies"
            options={{
              selectableRows: 'none',
            }}
            data={dependenciesData}
            columns={getColumns(dependenciesOptions, classes)}
          />
        </TableWrapper>
      </Grid>
    </>
  );
};

export default SysInfo;
