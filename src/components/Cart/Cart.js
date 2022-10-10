import { Container } from "@mui/material";
import { useCart } from "../../context/CartContext";
import CartEmpty from "./CartEmpty";
import CartList from "./CartList";

const Cart = () => {
  const { cart, totalPriceCart, cartClear } = useCart();

  return (
    <Container className="mt-3 bg-dark rounded-4 p-3 shadow text-center">
      {!cart.length ? (
        <CartEmpty />
      ) : (
        <CartList cart={cart} totalPriceCart={totalPriceCart().toLocaleString()} cartClear={cartClear} />
      )}
    </Container>
  );
};

export default Cart;
