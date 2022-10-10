import "./ItemCount.css";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { ToastContainer } from "react-toastify";
import { Box, Typography } from "@mui/material";

const ItemCountCart = ({ item, increase, decrease }) => {
  return (
    <Box className="container-item-count">
      <Box className="container-counter">
        <Box className="container-buttons">
          <IndeterminateCheckBoxIcon className="Icons-counter" onClick={decrease} />
          <Typography variant="inherit" className="Icons-counter">
            {item.quantity}
          </Typography>
          <AddBoxIcon className="Icons-counter" onClick={increase} />
        </Box>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default ItemCountCart;
