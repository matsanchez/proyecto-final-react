import React from "react";
import "./ItemCount.css";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Box, Typography } from "@mui/material";

const ItemCount = ({ stock, count, setCount }) => {
  return (
    <Box className="container-item-count">
      <Box className="container-counter">
        <Box className="container-buttons">
          <IndeterminateCheckBoxIcon
            className="Icons-counter"
            onClick={() => (count === 0 ? "" : setCount(count - 1))}
          />
          <Typography variant="inherit" className="Icons-counter">
            {count}
          </Typography>
          <AddBoxIcon className="Icons-counter" onClick={() => (stock <= count ? "" : setCount(count + 1))} />
        </Box>
      </Box>
    </Box>
  );
};

export default ItemCount;
