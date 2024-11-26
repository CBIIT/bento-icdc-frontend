import React from 'react';
import { Container } from '@material-ui/core';
import {
  AddSelectedFilesButton,
  TooltipConfig,
} from '../../../components/PaginatedTable/components/AddFilesButtons';
import { alertMessage } from '../../../bento/dashboardTabData';
import { TableLayoutTheme } from './TableLayoutTheme';
import ViewJBrowseButton from '../../JbrowseDetail/components/JBrowseViewBtn';
import { MyCartLink } from './Dashboard.styled';
import { PaginatedTableContext } from '../../../components/PaginatedTable/typed/TableContext';
import { PgTableButton } from '../../../components/PaginatedTable/typed/TableInterface';

interface AddFilesTooltipConfig {
  src: string;
  alt: string;
  arrow: boolean;
  addAllFilesText: string;
  addSelectedFilesText: string;
}

interface AddFilesButton {
  title: string;
  clsName: string;
  type: string;
  buttonType: string;
  conditional: false;
  maxFileLimit: number;
  alertMessage: string;
}

interface ComponentProps {
  queryParam: unknown;
  dataKey: string;
  addFilesRequestVariableKey: string;
  addSelectedFilesResponseKeys: string[];
  addAllFilesResponseKeys: string[];
  addAllFileQuery: string;
  addSelectedFilesQuery: string;
  activeFilters: object;
  addFilesButton: AddFilesButton;
  addFileTooltipCofig: AddFilesTooltipConfig;
  addAllFilesButtonText: string;
  addSelectedFilesButtonText: string;
  children: React.ReactNode;
}

export const TableLayout: React.FC<ComponentProps> = ({
  addFilesRequestVariableKey,
  addSelectedFilesResponseKeys,
  addAllFilesResponseKeys,
  addAllFileQuery,
  addSelectedFilesQuery,
  activeFilters,
  addFileTooltipCofig,
  addSelectedFilesButtonText,
  addAllFilesButtonText,
  children,
}) => {
  const addSelectFilesTooltipConfig: TooltipConfig = {
    src: addFileTooltipCofig.src,
    icon: addFileTooltipCofig.src,
    alt: addFileTooltipCofig.alt,
    arrow: addFileTooltipCofig.arrow,
    tooltipText: addFileTooltipCofig.addSelectedFilesText,
    toolTipText: '',
    clsName: '',
  };
  const addAllFilesTooltipConfig: TooltipConfig = {
    src: addFileTooltipCofig.src,
    icon: addFileTooltipCofig.src,
    alt: addFileTooltipCofig.alt,
    arrow: addFileTooltipCofig.arrow,
    clsName: 'add_all_file_tooltip_icon',
    tooltipText: '',
    toolTipText: addFileTooltipCofig.addAllFilesText,
  };

  // access table state
  const { context } = PaginatedTableContext();
  const { selectedRows } = context;

  return (
    <>
      <TableLayoutTheme>
        <Container maxWidth="xl">
          <AddSelectedFilesButton
            title={addAllFilesButtonText}
            clsName="add_all_button"
            dataKey={addFilesRequestVariableKey}
            responseKeys={addAllFilesResponseKeys}
            addFileQuery={addAllFileQuery}
            tooltipCofig={addAllFilesTooltipConfig}
            buttonType={PgTableButton.ADD_ALL_FILES}
            alertMessage={alertMessage}
            activeFilters={activeFilters}
          />
          <AddSelectedFilesButton
            title={addSelectedFilesButtonText}
            clsName="add_selected_button"
            dataKey={addFilesRequestVariableKey}
            responseKeys={addSelectedFilesResponseKeys}
            addFileQuery={addSelectedFilesQuery}
            tooltipCofig={addSelectFilesTooltipConfig}
            buttonType={PgTableButton.ADD_SELECTED_FILES}
            alertMessage={alertMessage}
            activeFilters={activeFilters}
          />
          <ViewJBrowseButton disable={false} selectedFileNames={selectedRows} />
        </Container>
        {children}
        <Container maxWidth="xl">
          <AddSelectedFilesButton
            title={addSelectedFilesButtonText}
            clsName="add_selected_button"
            dataKey={addFilesRequestVariableKey}
            responseKeys={addSelectedFilesResponseKeys}
            addFileQuery={addSelectedFilesQuery}
            tooltipCofig={addSelectFilesTooltipConfig}
            buttonType={PgTableButton.ADD_SELECTED_FILES}
            alertMessage={alertMessage}
            activeFilters={activeFilters}
          />
          <ViewJBrowseButton disable={false} selectedFileNames={selectedRows} />
        </Container>
        <Container maxWidth="xl">
          <MyCartLink href="#/fileCentricCart" className="go_to_cart">
            {'Go to My Files > '}
          </MyCartLink>
        </Container>
      </TableLayoutTheme>
    </>
  );
};
