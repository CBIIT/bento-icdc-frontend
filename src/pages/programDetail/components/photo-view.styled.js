import { styled } from '@mui/material';

export const Container = styled('div')({
});


export const DescriptionAndPhotoContainer = styled('div')({
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
    marginRight: '8px'
});

export const PhotoContainer = styled('div')({
    paddingTop: '20px'
});

export const Photo = styled('img')({
    width: '462px',
    height: '316px',
});

export const VideoContainer = styled('div')({
});

export const VideoTitle = styled('h3')({
    fontFamily: 'Open Sans',
    fontWeight: '600',
    fontSize: '14px',
    color: '#00660F'
});

