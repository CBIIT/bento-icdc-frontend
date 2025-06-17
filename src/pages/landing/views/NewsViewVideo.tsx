import React from 'react';
import { IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material';
import ReactPlayer from 'react-player/youtube';
import { Close } from '@mui/icons-material';
import styled from '@emotion/styled';

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

const VideoContainer = styled.div`
  display: flex;
  justify-content: center;
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

const NewsViewVideo = ({
  url,
  label,
  description,
}: {
  url: string;
  label: string;
  description: string;
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
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <StyledDialogTitle>
          <DialogTitle id="customized-dialog-title">
            <Title>{`Video: ${label}`}</Title>
          </DialogTitle>
          <CloseIconButton onClick={handleClose}>
            <CloseIcon />
          </CloseIconButton>
        </StyledDialogTitle>

        <StyledDialogContent dividers>
          <VideoContainer>
            <ReactPlayer
              playing
              onProgress={({ playedSeconds }) =>
                open || setSecondsElapsed(playedSeconds)
              }
              url={`${url}&start=${secondsElapsed}`}
              height="30em"
              width="100%"
            />
          </VideoContainer>
          <DialogParagraph>{description}</DialogParagraph>
        </StyledDialogContent>
      </StyledDialog>

      <ReactPlayer
        playing={playing}
        muted
        onPlay={handleClickOpen}
        url={url}
        height="100%"
        width="100%"
      />
    </>
  );
};

export default NewsViewVideo;
