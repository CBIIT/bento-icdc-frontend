import styled from '@emotion/styled';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import {
    Grid,
} from "@mui/material";

export const RadioInput = styled(Radio)({
    color: '#09557B',
});

export const SelectAllFilesBtn = styled(FormControlLabel)({
    '& .MuiTypography-root': {
        fontFamily: 'Lato',
        color: '#525252',
        fontSize: '16px',
        fontWeight: 400,
    },
});

export const SelectFilesBtn = styled(FormControlLabel)({
    marginRight: '30px',
    '& .MuiTypography-root': {
        fontFamily: 'Lato',
        color: '#525252',
        fontSize: '16px',
        fontWeight: 400,
    },
});

export const Container = styled(Grid)({
    padding: '30px 30px',
})

export const TableContainer = styled(Grid)({
    marginTop: '15px',
    padding: '0px 40px',
    minWidth: '1279px',
})

export const BodyWrapper = styled.div({
    background: '#EEF7FE',
    borderRadius: '20px',
    paddingTop: '9px',
    position: 'relative',
})

export const ActionsContainer = styled.div({
    width: '100%',
    minWidth: '1279px',
    textAlign: 'right',
    paddingRight: '80px',
    justifyContent: 'flex-end',
    display: 'flex',
    position: 'absolute',
    top: '20px',
    left: '43px',
})
