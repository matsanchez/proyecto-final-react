import { Box, Grid, Avatar, styled, Paper, Typography } from "@mui/material";
import OrderProgress from "./OrderProgress";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const OrderList = ({ order }) => {
  return (
    <>
      <Box className="bg-light rounded-4 p-3 m-2">
        <OrderProgress />
        <Grid container columns={4}>
          {Object.values(order.items).map((item) => (
            <Grid key={item.id} item xs={2}>
              <Item className="d-flex align-items-center justify-content-center m-1">
                <Avatar variant="rounded" src={item.pictureUrl} sx={{ width: 100, height: 100 }} />
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
          ))}
        </Grid>
      </Box>
      <Box className="bg-light rounded-4 p-3 m-2">
        <Typography variant="h6">Importe Total: ${order.price.toLocaleString()}</Typography>
      </Box>
    </>
  );
};

export default OrderList;
