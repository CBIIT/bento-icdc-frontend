
import { styled } from '@mui/material';

export const ProgramsContainer = styled('div')({
    width: '100%',
    padding: '60px 47px 60px 47px',
});

export const ProgramsHeader = styled('div')({
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '10px solid #004C73',
});

export const IconTitleWrapper = styled('div')({
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    top: '25px',
    gap: '16px',
});

export const ClipboardIcon = styled('img')({
    width: '88px',
    height: '88px',
});

export const ProgramsTitle = styled('h2')({
    color: '#00660F',
    fontFamily: 'Raleway',
    fontWeight: '800',
    fontSize: '25px',
});

export const ProgramsContent = styled('div')({
    backgroundColor: '#ffffff',
    padding: '32px',
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
});