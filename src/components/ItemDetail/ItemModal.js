import { useState } from "react";
import { IconButton, Box, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 8,
};

const ItemModal = ({ item }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <img src={item.pictureUrl} alt={item.name} onClick={handleOpen} style={{ cursor: "zoom-in" }} />
      <Modal open={open} onClose={handleClose}>
        <Box sx={styleModal}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[800],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box>
            <img
              src={item.pictureUrl}
              alt={item.name}
              style={{ cursor: "zoom-out", margin: "auto" }}
              onClick={handleClose}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ItemModal;
