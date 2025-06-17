import React from 'react';
import {
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import styled from '@emotion/styled';

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledListItem = styled(ListItem)`
  padding: 0.5em 1em 0.5em 1em;
`;

const ListItemContent = styled.div`
  display: flex;
  gap: 1em;
  align-items: center;
`;

const ListItemCount = styled.div`
  color: #fff;
  background-color: #1977cc;
  padding: 1.2em;
  border-radius: 100%;
  height: 4em;
  width: 4em;
  text-align: center;
`;

const ListItemBody = styled(Typography)`
  color: #000;
  font-family: 'Inter';
  font-size: 1em;
  font-weight: 300;
`;

const ReadMoreButton = styled(Button)`
  color: #fff;
  background-color: #cb8311;
  width: 8em;
  align-self: end;
  margin: 1em;
  font-size: 0.8em;
  font-weight: 600;
  font-family: 'Raleway';
  border-radius: 3em;

  &:hover {
    background-color: #cb8311;
  }
`;

const StyledDialogTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 1.3em;
  height: 4.5em;
`;

const DialogParagraph = styled.p`
  font-family: 'Inter';
  font-weight: 300;
  font-size: 1.21em;
`;

const StyledDialogContent = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const StyledDialog = styled(Dialog)`
  & .MuiDialog-paperWidthSm {
    max-width: 800px;
  }
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

const NewsItem = ({
  paragraph,
  index,
  total,
  label,
  blurb,
}: {
  paragraph: string;
  index: string;
  total: string;
  label: string;
  blurb: string;
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <StyledListItem alignItems="flex-start">
        <ListItemContent>
          <ListItemCount>{`${index}/${total}`}</ListItemCount>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <ListItemText
              secondary={
                <ListItemBody variant="body2" color="text.primary">
                  {`${blurb}...`}
                </ListItemBody>
              }
            />
          </div>
        </ListItemContent>
      </StyledListItem>

      <ReadMoreButton onClick={handleClickOpen}>READ MORE</ReadMoreButton>

      <StyledDialog
        component="span"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <StyledDialogTitle>
          <DialogTitle id="customized-dialog-title">
            <Title>{`Update: ${label}`}</Title>
          </DialogTitle>
          <CloseIconButton onClick={handleClose}>
            <CloseIcon />
          </CloseIconButton>
        </StyledDialogTitle>

        <StyledDialogContent dividers>
          <DialogParagraph>{paragraph}</DialogParagraph>
        </StyledDialogContent>
      </StyledDialog>

      <Divider />
    </Container>
  );
};

export default NewsItem;
