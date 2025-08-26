import React, { useCallback, useState } from 'react';
import { Button, TextField, Box, CircularProgress } from '@mui/material';
import styled from '@emotion/styled';

const Root = styled(Box)`
  display: flex;
  align-items: stretch;
  width: 100%;
  max-width: 720px;
`;

const Input = styled(TextField)(({ theme }) => ({
  flex: '0 0 254px',
  height: '46px',
  width: 254,
  '& .MuiOutlinedInput-root': {
    height: 48,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#6b778c',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#5a657a',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
    borderWidth: 1,
  },
}));

const SearchButton = styled(Button)`
  height: 46px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  padding-left: 20px;
  padding-right: 20px;
  min-width: 112px;
`;

function SearchBar({ ...params }) {
  const {
    loading = false,
    placeholder,
    onClick,
    onEnter,
    defaultValue = '',
    disabled = false,
    buttonText = 'Search',
    className,
    ariaLabel = 'Search',
  } = params;

  const [value, setValue] = useState(defaultValue);

  const go = useCallback(() => {
    if (!loading && onClick) onClick(value);
  }, [loading, onClick, value]);

  const onKeyDown = e => {
    if (e.key === 'Enter' && !loading && onEnter) onEnter(value);
  };

  return (
    <Root className={className}>
      <Input
        {...params}
        placeholder={placeholder ?? ''}
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        aria-label={ariaLabel}
        disabled={disabled || loading}
        size="small"
        variant="outlined"
      />
      <SearchButton
        variant="contained"
        sx={{
          backgroundColor: '#3A75BD',
          fontFamily: 'Open Sans',
          fontWeight: 600,
          fontSize: '16px',
          color: '#fff',
        }}
        onClick={go}
        disabled={disabled || loading}
      >
        {loading ? <CircularProgress color="inherit" size={20} /> : buttonText}
      </SearchButton>
    </Root>
  );
}

export default SearchBar;
