import React from "react";
import { Avatar, styled, Paper, Typography, Box, Grid } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const CheckOutResume = ({ cart, totalPriceCart }) => {
  return (
    <Box sx={{ width: { xs: "97%", md: "50%" } }} className="bg-light rounded-4 p-3 m-2">
      <Typography>Resumen de Productos</Typography>
      <Grid container columns={4}>
        {cart.map((item) => {
          return (
            <Grid key={item.id} item xs={2}>
              <Item className="d-flex align-items-center justify-content-left m-1">
                <Avatar variant="rounded" src={item.pictureUrl} sx={{ width: 56, height: 56 }} />
                <Box className="ml-4">
                  <p>
                    <strong>
                      {item.quantity} x {item.name}
                    </strong>
                  </p>
                  <p>${item.price.toLocaleString()} c/u.</p>
                </Box>
              </Item>
            </Grid>
          );
        })}
      </Grid>
      <Box>
        <Typography variant="h5" className="mt-1">
          Importe Total: ${totalPriceCart().toLocaleString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default CheckOutResume;
