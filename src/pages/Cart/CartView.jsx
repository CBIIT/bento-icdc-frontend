import React, { useContext } from "react";
import {
    ThemeProvider,
    createTheme,
} from "@material-ui/core";
import {SelectAllFilesBtn, SelectFilesBtn, Container, BodyWrapper, TableContainer, RadioInput, ActionsContainer} from "./Cart.styled";
import {
    cartTable,
    tableLayOut,
} from "../../bento/fileCentricCartWorkflowData";
import HeaderView from "./components/header/HeaderView";
import { TableContext } from "../../bento-core";
import PaginatedTableView from "../../components/PaginatedTable/TableView";
import { tblContainer, themeConfig } from "./CartTheme";
import CartThemeProvider from './CartThemeProvider';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import DropDownView from './components/dropdown/DropDownView'

const CartView = ({
    filesId = [],
    deleteAllFiles,
    deleteCartFile,
}) => {
    // if allFile radio button is true download all file with Download manifest btn
    const [allFiles, setAllFiles] = React.useState(true);
    const variables = {};

    const handleRadioChange = event => {
        const isAllSelected = event.target.value === 'true';
        setAllFiles(isAllSelected);
    };

    variables.uuids = filesId.reduce((acc, item) => {
        if (item.file_uuid) {
            acc.push(item.file_uuid);
        } else {
            acc.push(item);
        }
        return acc;
    }, []);

    const tableContext = useContext(TableContext);
    const { context } = tableContext;

    return (
        <>
            <Container container spacing={1}>
                <HeaderView filesId={filesId} />
                <TableContainer xs={12} md={12} lg={12}>
                    <BodyWrapper >
                        <ActionsContainer>
                            <FormControl>
                                <RadioGroup
                                    row
                                    name="selectAll"
                                    value={allFiles}
                                    onChange={handleRadioChange}
                                >
                                    <SelectAllFilesBtn
                                        value={true}
                                        control={<RadioInput />}
                                        label="All Files"
                                    />
                                    <SelectFilesBtn
                                        value={false}
                                        control={<RadioInput />}
                                        className="selectFilesBtn"
                                        label="Selected Files"
                                    />
                                </RadioGroup>
                            </FormControl>
                            <DropDownView filesId={filesId} allFiles={allFiles} />
                        </ActionsContainer>
                        <ThemeProvider theme={createTheme(tblContainer)}>
                            <CartThemeProvider>
                                <PaginatedTableView
                                    tableReduxActions={{
                                        deleteAllFiles,
                                        deleteCartFile,
                                    }}
                                    config={cartTable}
                                    tableLayOut={tableLayOut}
                                    activeFilters={variables}
                                    totalRowCount={filesId.length}
                                    customthemeConfig={themeConfig(context)}
                                />
                            </CartThemeProvider>
                        </ThemeProvider>
                    </BodyWrapper>
                </TableContainer>
            </Container>
        </>
    );
};

export default CartView;
