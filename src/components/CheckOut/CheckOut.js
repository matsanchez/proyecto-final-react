import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { Container, Typography, Box, Button } from "@mui/material";
import CheckOutForm from "./CheckOutForm";
import CheckOutResume from "./CheckOutResume";
import { setOrder } from "../../firebase/LogicApp";
import VerifiedIcon from "@mui/icons-material/Verified";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { CopyToClipboard } from "react-copy-to-clipboard";

const CheckOut = () => {
  const { cart, totalPriceCart, cartClear } = useCart();
  const [showIdOrder, setShowIdOrder] = useState();
  const [boolean, setBoolean] = useState(true);
  const [copied, setCopied] = useState(false);

  const getOrderId = async (order) => {
    const idOrder = await setOrder(order);
    setShowIdOrder(idOrder);
    setBoolean(false);
    cartClear();
  };

  return (
    <Container className="mt-3 bg-dark rounded-4 p-3 shadow text-center">
      {boolean ? (
        <>
          <Typography variant="h5" className="text-center uppercase text-white">
            checkout
          </Typography>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "column", md: "row" } }}>
            <CheckOutForm cart={cart} totalPriceCart={totalPriceCart} getOrderId={getOrderId} />
            <CheckOutResume cart={cart} totalPriceCart={totalPriceCart} />
          </Box>
        </>
      ) : (
        <Box>
          <VerifiedIcon color="success" sx={{ width: 100, height: 100 }} />
          <Typography className="text-white mt-2">Su pedido fue generado exitosamente con el codigo: </Typography>
          <CopyToClipboard text={showIdOrder}>
            <Typography variant="h4" className="bg-light justify-content-around rounded-3 mt-1 mb-1 p-2">
              {showIdOrder}
              <Button
                variant="outlined"
                size="small"
                className="mx-3"
                onClick={() => setCopied(true)}
                startIcon={<ContentCopyIcon />}
              >
                {copied ? "Copiado" : "Copiar"}
              </Button>
            </Typography>
          </CopyToClipboard>
          <Typography className="text-white">En la brevedad recibirá un correo con los pasos a seguir</Typography>
          <Typography variant="h4" className="text-white mt-3">
            Gracias por su compra!
          </Typography>
        </Box>
      )}
    </Container>
  );
};
export default CheckOut;
