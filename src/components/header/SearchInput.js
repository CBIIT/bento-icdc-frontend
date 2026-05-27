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
    borderColor: theme?.palette?.primary?.main ?? '#1976d2',
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

function SearchBar({
  loading = false,
  placeholder = '',
  onClick,
  onEnter,
  defaultValue = '',
  disabled = false,
  buttonText = 'Search',
  className,
  ariaLabel = 'Search',
}) {
  const [value, setValue] = useState(defaultValue);

  const isDisabled = disabled || loading;

  const go = useCallback(() => {
    if (!isDisabled && onClick) onClick(value);
  }, [isDisabled, onClick, value]);

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !isDisabled && onEnter) {
      e.preventDefault();
      onEnter(value);
    }
  };

  return (
    <Root className={className}>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        inputProps={{ 'aria-label': ariaLabel }}
        disabled={isDisabled}
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
          textTransform: 'none',
        }}
        onClick={go}
        disabled={isDisabled}
      >
        {loading ? <CircularProgress color="inherit" size={20} /> : buttonText}
      </SearchButton>
    </Root>
  );
}

export default SearchBar;
