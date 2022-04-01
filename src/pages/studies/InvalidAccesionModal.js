import * as React from 'react';
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Typography,
  IconButton,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import SadDog from './Sad_dog.png';

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '584px',
  height: '470px',
  bgcolor: '#FFFFFF',
  border: '1.25px solid #1F344F',
  boxShadow: '0 0 29px 16px rgba(0,0,0,0,36)',
  boxSizing: 'border-box',
  borderRadius: '5px',
  p: 4,
};

const InvalidAccesionModal = () => {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={boxStyle}>
            <IconButton
              onClick={handleClose}
              style={{
                position: 'absolute',
                left: '542px',
                top: '6px',
                color: 'black',
              }}
            >
              <Close
                style={{
                  width: '15px',
                  height: '15px',
                }}
              />
            </IconButton>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              style={{
                lineHeight: '22px',
                height: '42px',
                width: '247px',
                color: '#85501F',
                fontFamily: 'Lato',
                fontSize: '20px',
                fontWeight: 'bold',
                letterSpacing: '0',
                marginLeft: '137px',
                marginTop: '32px',
              }}
            >
              Sorry! We Can't seem to find the page you're looking for...
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2 }}
              style={{
                height: '34px',
                width: '423px',
                color: '#000000',
                fontFamily: 'Nunito Sans',
                fontSize: '15px',
                letterSpacing: '0',
                lineHeight: '20px',
                marginTop: '22px',
                marginLeft: '45px',
              }}
            >
              This Accession ID is invalid. We're redirecting you to  list of valid Studies.
              Please contact your administrator for more information.
            </Typography>
            <img
              style={{
                height: '252px', width: '402px', marginTop: '46px', marginLeft: '43px',
              }}
              src={SadDog}
              alt="Sad Dog"
            />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default InvalidAccesionModal;
