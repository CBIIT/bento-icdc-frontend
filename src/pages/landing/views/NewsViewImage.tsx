import React from 'react';
import { Dialog } from '@mui/material';
import styled from '@emotion/styled';
import {
  DIALOG_ID_PREFIXES,
  NEWS_COLORS,
  NEWS_COPY,
  NEWS_FONT_FAMILIES,
  NEWS_HTML_ATTRIBUTES,
  NEWS_LABEL_PREFIXES,
} from './news/constants';
import { DialogCloseButton } from './news/DialogCloseButton';

const ThumbnailButton = styled.button`
  display: block;
  width: 183px;
  min-width: 183px;
  max-width: 183px;
  height: 210px;
  min-height: 210px;
  max-height: 210px;
  flex: 0 0 183px;
  overflow: hidden;
  cursor: pointer;
  border: 0;
  padding: 0;
  background: transparent;

  &:focus-visible {
    outline: 2px solid ${NEWS_COLORS.closeControl};
    outline-offset: 2px;
  }
`;

const Thumbnail = styled.img`
  display: block;
  width: 183px;
  height: 210px;
  object-fit: cover;
`;

const ImageDialog = styled(Dialog)`
  & .MuiDialog-paper {
    width: min(1000px, calc(100% - 32px));
    max-width: 1000px;
    height: min(910px, calc(100% - 32px));
    max-height: calc(100% - 32px);
    box-sizing: border-box;
    margin: 16px;
    padding: 24px 32px;
    background: ${NEWS_COLORS.cardSurface};
    border-radius: 8px;
    box-shadow: none;
    overflow: hidden;
  }
`;

const DialogHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 24px;
  gap: 20px;
`;

const DialogTitle = styled.h2`
  margin: 0;
  color: ${NEWS_COLORS.black};
  font-family: ${NEWS_FONT_FAMILIES.raleway};
  font-size: 24px;
  font-weight: 600;
  line-height: 24px;
`;

const DialogImageContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  min-height: 0;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
`;

const DialogImage = styled.img`
  display: block;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const DialogCaption = styled.p`
  margin: 16px 0 0;
  color: ${NEWS_COLORS.secondaryText};
  font-family: ${NEWS_FONT_FAMILIES.openSans};
  font-size: 16px;
  line-height: 24px;
`;

type NewsViewImageProps = {
  img: string;
  label: string;
  alt: string;
  caption?: string;
};

const NewsViewImage = ({ img, label, alt, caption }: NewsViewImageProps) => {
  const [open, setOpen] = React.useState(false);
  const [hasImageError, setHasImageError] = React.useState(false);
  const imageLabel = alt || NEWS_COPY.imageDefaultLabel;
  const dialogTitle = `${NEWS_COPY.image}: ${label}`;
  const dialogId = `${DIALOG_ID_PREFIXES.image}-${label}`;

  if (hasImageError) return null;

  return (
    <>
      <ImageDialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby={dialogId}
        maxWidth={false}
      >
        <DialogHeader>
          <DialogTitle id={dialogId}>{dialogTitle}</DialogTitle>
          <DialogCloseButton
            aria-label={`${NEWS_LABEL_PREFIXES.close} ${dialogTitle}`}
            onClick={() => setOpen(false)}
          />
        </DialogHeader>
        <DialogImageContainer>
          <DialogImage
            src={img}
            alt={imageLabel}
            onError={() => setHasImageError(true)}
          />
        </DialogImageContainer>
        {caption && <DialogCaption>{caption}</DialogCaption>}
      </ImageDialog>

      <ThumbnailButton
        type={NEWS_HTML_ATTRIBUTES.buttonType}
        aria-label={`${NEWS_LABEL_PREFIXES.expand} ${imageLabel}`}
        onClick={() => setOpen(true)}
      >
        <Thumbnail
          src={img}
          alt={imageLabel}
          onError={() => setHasImageError(true)}
        />
      </ThumbnailButton>
    </>
  );
};

export default NewsViewImage;
