import React from 'react';
import { IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Close } from '@mui/icons-material';
import styled from '@emotion/styled';

// Styled Components
const ThumbnailButton = styled.button`
  appearance: none;
  border: 0;
  background: transparent;
  height: 174px;
  width: 174px;
  flex: 0 0 174px;
  padding: 0;
  cursor: pointer;
  overflow: hidden;

  &:focus-visible {
    outline: 3px solid #2f83b7;
    outline-offset: 2px;
  }
`;

const StyledDialogTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 1.3em;
  height: 4.5em;
`;

const StyledImage = styled.img`
  height: 100%;
  width: 100%;
  display: block;
  object-fit: cover;
`;

const Title = styled.h3`
  font-weight: 600;
  font-family: 'Raleway';
  font-size: 1.3em;
`;

const CloseIconButton = styled(IconButton)`
  color: black;
  height: fit-content;
`;

const CloseIcon = styled(Close)`
  width: 1.4em;
  height: 1.4em;
`;

const StyledDialogContent = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  max-height: 70vh;

  img {
    height: auto;
    max-height: 70vh;
    object-fit: contain;
  }
`;

const DialogParagraph = styled.p`
  font-family: 'Inter';
  font-weight: 300;
  font-size: 1.21em;
`;

const StyledDialog = styled(Dialog)`
  & .MuiDialog-paperWidthSm {
    max-width: 800px;
  }
`;

const NewsViewImage = ({
  img,
  label,
  caption,
}: {
  img: string;
  label: string;
  caption?: string;
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <StyledDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <StyledDialogTitle>
          <DialogTitle id="customized-dialog-title">
            <Title>{`Image: ${label}`}</Title>
          </DialogTitle>
          <CloseIconButton onClick={handleClose}>
            <CloseIcon />
          </CloseIconButton>
        </StyledDialogTitle>

        <StyledDialogContent dividers>
          <ImageContainer>
            <StyledImage src={img} alt="icdc news" />
          </ImageContainer>
          {caption && <DialogParagraph>{caption}</DialogParagraph>}
        </StyledDialogContent>
      </StyledDialog>

      <ThumbnailButton
        aria-label={`Open image: ${label}`}
        onClick={handleClickOpen}
        type="button"
      >
        <StyledImage src={img} alt={label} />
      </ThumbnailButton>
    </>
  );
};

export default NewsViewImage;
