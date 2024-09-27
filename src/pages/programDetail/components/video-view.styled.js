import { styled } from '@mui/material';

export const Container = styled('div')({
    display: 'flex',
    justifyContent: 'space-between'
});

export const DescriptionTitle = styled('h3')({
    fontFamily: 'Open Sans',
    fontWeight: '400',
    fontSize: '17px',
    color: '#00660F'
});

export const Description = styled('p')({
    fontFamily: 'Open Sans',
    fontWeight: '400',
    fontSize: '18px',
    lineHeight: '30px',
    color: '#000000'
});


export const DescriptionContainer = styled('div')({
    maxWidth: '800px',
    marginRight: '16px'
});

export const VideoContainer = styled('div')({
    paddingTop: '20px',
    borderRadius: '8px',
    '& iframe': {
        borderRadius: '16px'
    }
});

export const Photo = styled('img')({
    maxWidth: '462px',
    maxHeight: '316px',
});

