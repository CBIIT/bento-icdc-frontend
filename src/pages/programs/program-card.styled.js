
import React from 'react';
import { styled, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export const ProgramCardContainer = styled('div')({
    border: '1px solid #CFCFCF',
    borderLeft: '5px solid #00660F',
    margin: '10px 0',
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        borderBottom: '1px solid #6ea368',
        borderRight: '1px solid #6ea368',
    }
});

export const ProgramHeader = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#00660F',
    color: '#fff',
    padding: '10px 16px',
    height: '44px'
});

export const ProgramTitle = styled('h3')({
    fontFamily: 'Lato',
    fontWeight: '500',
    fontSize: '19px',
    color: '#ffffff',
});

export const StudiesCount = styled('span')({
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: '17px',
    color: '#ffffff',
    cursor: 'pointer',
    '&:hover': {
        color: '#9bdfa6'
    }
});

export const ProgramBody = styled('span')({
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: '42px',
});

export const ProgramImage = styled('img')({
    margin: '2px 0 0 8px',
    height: '158px',
    objectFit: 'cover',
});

export const ProgramDescription = styled('p')({
    alignSelf: 'flex-start',
    margin: '0px',
    fontFamily: 'Open Sans',
    fontWeight: '400',
    fontSize: '18px',
    lineHeight: '30px',
    width: '80%',
    color: '#000'
});


export const ProgramDescriptionActionWrapper = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '42px',
    alignSelf: 'flex-start',
    padding: '24px 0px 0px 32px'
});

export const ActionWrapper = styled('div')({
    display: 'flex',
    gap: '36px',
});

export const ActionButtonOne = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: '16px',
        padding: '9px 15px',
        border: '1px solid #1A8CCB',
        borderRadius: '8px',
        lineHeight: 1.5,
        backgroundColor: '#125B82',
        color: '#fff',
        height: '38px',
        fontFamily: "Lato",
        /*'&:hover': {
          backgroundColor: '#0069d9',
          borderColor: '#0062cc',
          boxShadow: 'none',
        },
        '&:active': {
          boxShadow: 'none',
          backgroundColor: '#0062cc',
          borderColor: '#005cbf',
        },
        '&:focus': {
          boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },*/
    },
})(Button);

export const ActionButtonTwo = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontWeight: '400',
        fontSize: '16px',
        height: '38px',
        borderRadius: '8px',
        padding: '9px 15px',
        lineHeight: '16px',
        backgroundColor: '#F5F5F5',
        color: '#125B82',
        border: '1.5px solid #125B82',
        //borderColor: '#0063cc',
        fontFamily: "Lato",
        /*'&:hover': {
          backgroundColor: '#0069d9',
          borderColor: '#0062cc',
          boxShadow: 'none',
        },
        '&:active': {
          boxShadow: 'none',
          backgroundColor: '#0062cc',
          borderColor: '#005cbf',
        },
        '&:focus': {
          boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },*/
    },
})(Button);



