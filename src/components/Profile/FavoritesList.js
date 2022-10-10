import React from "react";
import { Grid, Avatar, Typography, Box, Button, styled, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const FavoritesList = ({ item, addCart, removeFavorite }) => {
  return (
    <Grid key={item.id} item xs={2}>
      <Item className="d-flex align-items-center justify-content-left m-1">
        <Avatar variant="rounded" src={item.pictureUrl} sx={{ width: 150, height: 150 }} />
        <Box className="ml-4 text-left">
          <Link to={`/detail/${item.id}`}>
            <Typography>
              <strong>{item.name}</strong>
            </Typography>
          </Link>
          <Typography>${item.price.toLocaleString()}</Typography>
          <Box className="mt-3">
            <Button color="success" startIcon={<AddShoppingCartIcon />} onClick={() => addCart({ item })}>
              agregar al carrito
            </Button>
            <Button color="error" startIcon={<DeleteIcon />} onClick={() => removeFavorite(item.id)}>
              eliminar
            </Button>
          </Box>
        </Box>
      </Item>
    </Grid>
  );
};

export default FavoritesList;
