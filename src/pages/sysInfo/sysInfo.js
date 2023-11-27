import React from 'react';
import { CustomDataTable } from '@bento-core/data-table';
import { getColumns } from '@bento-core/util';
import { makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const coreServicesData = [];
const microservicesData = [];
const environmentVariablesData = [];
const dependenciesData = [];

const coreServiceOptions = {
  columns: [
    {
      dataField: 'key',
      header: 'Name',
    },
    {
      dataField: 'requiredValue',
      header: 'Required Version',
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
      dataField: 'requiredValue',
      header: 'Required Version',
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
    {
      dataField: 'requiredValue',
      header: 'Required Version',
    },
    {
      dataField: 'value',
      header: 'Current Version',
    },
  ],
};

const SysInfo = () => {
  const classes = useStyles();
  console.log('sysInfo');

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
