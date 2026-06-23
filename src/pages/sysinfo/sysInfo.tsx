/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useQueries, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import env from '../../utils/env';
import bentoCorePackageJson from '../../../node_modules/@bento-core/all/package.json';
import styled from '@emotion/styled';
import {
  Button,
  SvgIcon,
  ButtonGroup,
  Popper,
  Grow,
  MenuList,
  Paper,
  ClickAwayListener,
  MenuItem,
} from '@mui/material';
import { TableContext, TableView, cellTypes } from '../../bento-core';
import { CustomizeCellView } from '../../components/PaginatedTable/Customize/CellView';
import { ExtendedViewConfig } from '../../components/PaginatedTable/Customize/ExtendedView';
import { themeConfig } from './theme';
import {
  downloadVersionsCsv,
  downloadVersionsJson,
  Row,
  formatNowForFilename,
} from './downloadCsv';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

type VersionResponse = { version: string };

const OPTIONS = ['Download JSON', 'Download CSV'] as const;

export const dependencyRequirements = {
  node: '20.11.1',
  npm: '10.2.4',
} as const;

export const table1 = {
  display: true,
  tableTitle: 'This study is organized as follows:',
  defaultSortField: 'name',
  defaultSortDirection: 'asc',
  extendedViewConfig: {
    download: {
      customDownload: false,
      downloadFileName: 'ICDC_ARMS_AND_COHORTS_download',
      downloadCsv: 'Download Table Contents As CSV',
    },
    manageViewColumns: { title: 'View Columns' },
  },
  columns: [
    {
      dataField: 'name',
      header: 'Name',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'currentVersion',
      header: 'Current Version',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'apiEndpoint',
      header: 'API Endpoint',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
  ],
  // noArmMessage: "This study is not divided into arms",
  // noCohortMessage: "This study is not divided into cohorts",
  // noArmsCohort: "This study is not divided into Arms or Cohorts",
  // noArmsCohort2: "This study is not currently divided into Arms or Cohorts",
} as const;

export const table2 = {
  display: true,
  tableTitle: 'This study is organized as follows:',
  defaultSortField: 'name',
  defaultSortDirection: 'asc',
  extendedViewConfig: {
    download: {
      customDownload: false,
      downloadFileName: 'ICDC_ARMS_AND_COHORTS_download',
      downloadCsv: 'Download Table Contents As CSV',
    },
    manageViewColumns: { title: 'View Columns' },
  },
  columns: [
    {
      dataField: 'name',
      header: 'Name',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'currentVersion',
      header: 'Current Version',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    // {
    //   dataField: 'apiEndpoint',
    //   header: 'API Endpoint',
    //   display: true,
    //   tooltipText: 'sort',
    //   role: cellTypes.DISPLAY,
    // },
  ],
  // noArmMessage: "This study is not divided into arms",
  // noCohortMessage: "This study is not divided into cohorts",
  // noArmsCohort: "This study is not divided into Arms or Cohorts",
  // noArmsCohort2: "This study is not currently divided into Arms or Cohorts",
} as const;

const Header = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '60px 24px 48px 24px',
  fontFamily: 'Raleway',
  fontWeight: 700,
  fontSize: '35px',
  lineHeight: '35px',
  color: '#0B3556',
});

const ActionSection = styled.div({
  display: 'flex',
  justifyContent: 'end',
  padding: '0 91px 30px 24px',
  fontFamily: 'Lato',
  fontWeight: 400,
  fontSize: '15px',
  lineHeight: '16px',
  color: '#09557B',
});

const TablesWrapper = styled.div({
  padding: '0 80px',
  display: 'flex',
  flexDirection: 'column',
  gap: '62px',
  marginBottom: '62px',
});

const TableWrapper = styled.div({
  '& .title': {
    borderTop: '2px solid #323232',
    padding: '12px 15px',
    fontFamily: 'Open Sans',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '19px',
    letterSpacing: '0%',
    color: '#000',
  },
});

const VERSION_QUERIES = [
  { key: ['backend', 'version'] as const, url: 'REACT_APP_BACKEND_VERSION' },
  {
    key: ['fileService', 'version'] as const,
    url: 'REACT_APP_FILE_SERVICE_VERSION',
  },
  {
    key: ['interop', 'version'] as const,
    url: 'REACT_APP_INTEROP_SERVICE_VERSION',
  },
] as const;

const isAxiosUrlDefined = (v?: string): v is string =>
  typeof v === 'string' && v.length > 0;

const SysInfo: React.FC = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(1);
  const { context } = useContext(TableContext);

  const [backendRes, fileServiceRes, interOpRes] = useQueries<
    UseQueryResult<string, unknown>[]
  >({
    queries: VERSION_QUERIES.map(({ key, url }) => ({
      queryKey: key,
      queryFn: async () => {
        const endpoint = (env as Record<string, string | undefined>)[url];
        if (!isAxiosUrlDefined(endpoint)) return '';
        const { data } = await axios.get<VersionResponse>(endpoint);
        return data.version ?? '';
      },
    })),
  });

  const coreMicroServicesTable: Row[] = useMemo(
    () => [
      {
        name: 'Frontend',
        currentVersion: env.REACT_APP_FE_VERSION ?? '',
        apiEndpoint: 'NA',
      },
      {
        name: 'Backend',
        currentVersion: backendRes?.data ?? '',
        apiEndpoint: env.REACT_APP_BACKEND_API,
      },
      {
        name: 'Bento Core',
        currentVersion: bentoCorePackageJson.version ?? '',
        apiEndpoint: 'NA',
      },
    ],
    [backendRes?.data]
  );

  const extendedMicroServicesTable: Row[] = useMemo(
    () => [
      {
        name: 'File',
        currentVersion: fileServiceRes?.data ?? '',
        apiEndpoint: env.REACT_APP_FILE_SERVICE_API,
      },
      {
        name: 'Interoperation',
        currentVersion: interOpRes?.data ?? '',
        apiEndpoint: env.REACT_APP_INTEROP_SERVICE_URL,
      },
    ],
    [fileServiceRes?.data, interOpRes?.data]
  );

  const dependenciesTable: Row[] = useMemo(
    () => [
      {
        name: 'Node',
        currentVersion: dependencyRequirements.node,
      },
      {
        name: 'NPM',
        currentVersion: dependencyRequirements.npm,
      },
    ],
    []
  );

  const handleClick = useCallback(() => {
    const option = OPTIONS[selectedIndex];
    if (option === 'Download CSV') {
      downloadVersionsCsv(
        coreMicroServicesTable,
        extendedMicroServicesTable,
        dependenciesTable,
        `ICDC-Systems-Info-${formatNowForFilename()}.csv`
      );
    } else if (option === 'Download JSON') {
      downloadVersionsJson(
        coreMicroServicesTable,
        extendedMicroServicesTable,
        dependenciesTable,
        `ICDC-Systems-Info-${formatNowForFilename()}.json`
      );
    }
  }, [
    selectedIndex,
    coreMicroServicesTable,
    extendedMicroServicesTable,
    dependenciesTable,
  ]);

  const handleMenuItemClick = useCallback(
    (_event: React.MouseEvent<HTMLElement>, index: number) => {
      setSelectedIndex(index);
      setOpen(false);
    },
    []
  );

  const handleToggle = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  const handleClose = useCallback((event: MouseEvent | TouchEvent) => {
    if (
      anchorRef.current &&
      event.target instanceof Node &&
      anchorRef.current.contains(event.target)
    ) {
      return;
    }
    setOpen(false);
  }, []);

  const initTblState = useCallback(
    (initialState: any, tableConfig: any) => ({
      ...initialState,
      title: tableConfig.tableTitle,
      columns: CustomizeCellView(tableConfig),
      selectedRows: [],
      // tableMsg: table1?.noArmsCohort ?? undefined,
      sortBy: tableConfig.defaultSortField,
      groupBy: tableConfig.groupBy,
      sortOrder: tableConfig.defaultSortDirection,
      rowsPerPage: 25,
      dataKey: tableConfig.dataKey,
      extendedViewConfig: ExtendedViewConfig(tableConfig),
      page: 0,
    }),
    []
  );

  return (
    <>
      <Header>ICDC Systems Info</Header>
      <ActionSection>
        <React.Fragment>
          <ButtonGroup
            variant="contained"
            ref={anchorRef as any}
            aria-label="Button group with a nested menu"
          >
            <Button
              sx={{
                background: '#fff',
                color: '#09557B',
                fontFamily: 'Lato',
                fontWeight: 400,
                fontSize: '15px',
                lineHeight: '16px',
                letterSpacing: '0%',
                border: '1px solid #0B3556',
              }}
              onClick={handleClick}
            >
              {OPTIONS[selectedIndex]}
            </Button>
            <Button
              size="small"
              aria-controls={open ? 'split-button-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-label="select download format"
              aria-haspopup="menu"
              onClick={handleToggle}
              sx={{
                backgroundColor: '#0B3556',
              }}
            >
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
          <Popper
            sx={{ zIndex: 1 }}
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList id="split-button-menu" autoFocusItem>
                      {OPTIONS.map((option, index) => (
                        <MenuItem
                          key={option}
                          selected={index === selectedIndex}
                          onClick={event => handleMenuItemClick(event, index)}
                        >
                          <div
                            style={{
                              display: 'grid',
                              gap: '8px',
                              gridTemplateColumns: '80% 20%',
                              margin: 'auto',
                            }}
                          >
                            <div
                              style={{
                                fontFamily: 'Lato',
                                fontWeight: 400,
                                fontSize: '15px',
                                lineHeight: '16px',
                                letterSpacing: '0%',
                                color: '#09557B',
                              }}
                            >
                              {option}
                            </div>
                            <SvgIcon>
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_1070_11)">
                                  <path
                                    d="M11.0525 12.2105V4.10526H9.05249V12.2105L6.42091 9.6842L5.05249 11.0526L9.99986 16L14.9472 11.0526L13.5788 9.6842L11.0525 12.2105Z"
                                    fill="#09557B"
                                  />
                                  <path
                                    d="M16.9473 0.105255H3.05259C1.36838 0.105255 0.105225 1.36841 0.105225 3.05262V16.9474C0.105225 18.6316 1.36838 19.8947 3.05259 19.8947H16.9473C18.6315 19.8947 19.8947 18.6316 19.8947 16.9474V3.05262C19.8947 1.36841 18.6315 0.105255 16.9473 0.105255ZM18 16.9474C18 17.5789 17.5789 17.8947 17.0526 17.8947H3.05259C2.42101 17.8947 2.10522 17.4737 2.10522 16.9474V3.05262C2.10522 2.42104 2.42101 2.10526 3.05259 2.10526H16.9473C17.5789 2.10526 17.8947 2.52631 17.8947 3.05262V16.9474H18Z"
                                    fill="#09557B"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_1070_11">
                                    <rect width="20" height="20" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </SvgIcon>
                          </div>
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </React.Fragment>
      </ActionSection>

      <TablesWrapper>
        <TableWrapper>
          <div className="title">Core Microservices</div>
          <TableView
            initState={() => initTblState({}, table1)}
            tblRows={coreMicroServicesTable}
            totalRowCount={coreMicroServicesTable.length}
            server={false}
            themeConfig={{ ...themeConfig(context) }}
          />
        </TableWrapper>

        <TableWrapper>
          <div className="title">Extended Microservices</div>
          <TableView
            initState={() => initTblState({}, table1)}
            tblRows={extendedMicroServicesTable}
            totalRowCount={extendedMicroServicesTable.length}
            server={false}
            themeConfig={{ ...themeConfig(context) }}
          />
        </TableWrapper>

        <TableWrapper>
          <div className="title">Dependencies</div>
          <TableView
            initState={() => initTblState({}, table2)}
            tblRows={dependenciesTable}
            totalRowCount={dependenciesTable.length}
            server={false}
            themeConfig={{ ...themeConfig(context) }}
          />
        </TableWrapper>
      </TablesWrapper>
    </>
  );
};

export default SysInfo;
