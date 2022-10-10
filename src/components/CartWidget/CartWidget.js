import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, Avatar, Stack, Tooltip } from "@mui/material/";
import { pink } from "@mui/material/colors";
import { useCart } from "../../context/CartContext";

const CartWidget = () => {
  const { cart } = useCart();
  let itemsInCart = 0;

  cart.map((item) => {
    return (itemsInCart = itemsInCart + item.quantity);
  });
  return (
    <>
      <Stack>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          badgeContent={
            !cart.length ? null : (
              <Avatar
                sx={{
                  bgcolor: pink[800],
                  width: 20,
                  height: 20,
                  padding: 1.5,
                  fontSize: 15,
                }}
              >
                <p>{itemsInCart}</p>
              </Avatar>
            )
          }
        >
          <Tooltip title="Mi Carrito">
            <ShoppingCartIcon fontSize="large" />
          </Tooltip>
        </Badge>
      </Stack>
    </>
  );
};

export default CartWidget;
