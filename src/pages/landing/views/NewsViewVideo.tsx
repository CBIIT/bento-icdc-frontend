import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import ReactPlayer from 'react-player';
import styled from '@emotion/styled';
import {
  DIALOG_IDS,
  NEWS_COPY,
  NEWS_FONT_FAMILIES,
  NEWS_LABEL_PREFIXES,
} from './news/constants';
import { DialogCloseButton } from './news/DialogCloseButton';

// Styled Components
const StyledDialogTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 1.3em;
  height: 4.5em;
`;

const Title = styled.h3`
  font-weight: 600;
  font-family: ${NEWS_FONT_FAMILIES.raleway};
  font-size: 1.3em;
`;

const StyledDialogContent = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const VideoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const DialogParagraph = styled.p`
  font-family: ${NEWS_FONT_FAMILIES.inter};
  font-weight: 300;
  font-size: 1.21em;
`;

const StyledDialog = styled(Dialog)`
  & .MuiDialog-paperWidthSm {
    max-width: 800px;
  }
`;

const NewsViewVideo = ({
  url,
  label,
  description,
}: {
  url: string;
  label: string;
  description?: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const [secondsElapsed, setSecondsElapsed] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);

  const handleClickOpen = () => {
    setPlaying(true);
    setOpen(true);
  };

  const handleClose = () => {
    setPlaying(false);
    setOpen(false);
  };

  return (
    <>
      <StyledDialog
        onClose={handleClose}
        aria-labelledby={DIALOG_IDS.video}
        open={open}
      >
        <StyledDialogTitle>
          <DialogTitle id={DIALOG_IDS.video}>
            <Title>{`${NEWS_COPY.video}: ${label}`}</Title>
          </DialogTitle>
          <DialogCloseButton
            aria-label={`${NEWS_LABEL_PREFIXES.close} ${NEWS_COPY.video}: ${label}`}
            onClick={handleClose}
          />
        </StyledDialogTitle>

        <StyledDialogContent dividers>
          <VideoContainer>
            <ReactPlayer
              playing
              onTimeUpdate={(e: React.SyntheticEvent<HTMLVideoElement>) => {
                if (!open) {
                  setSecondsElapsed(e.currentTarget.currentTime);
                }
              }}
              src={`${url}&start=${secondsElapsed}`}
              height="30em"
              width="100%"
            />
          </VideoContainer>
          {description && <DialogParagraph>{description}</DialogParagraph>}
        </StyledDialogContent>
      </StyledDialog>

      <ReactPlayer
        playing={playing}
        muted
        onPlay={handleClickOpen}
        src={url}
        height="100%"
        width="100%"
      />
    </>
  );
};

export default NewsViewVideo;
