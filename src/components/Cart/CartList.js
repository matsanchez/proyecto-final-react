import {
  Table,
  TableContainer,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  Typography,
  Button,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CartListDetail from "./CartListDetail";
import { Link } from "react-router-dom";
import { pink } from "@mui/material/colors";

const Cart = ({ cart, totalPriceCart, cartClear }) => {
  const theme = useTheme();
  const screenQuery = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box>
      <Typography variant="h5" className="text-center uppercase text-white mt-2 mb-2">
        Detalle de tu carrito
      </Typography>
      <Box className="bg-light rounded-4 p-2">
        <TableContainer>
          <Table>
            {screenQuery && (
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Producto</TableCell>
                  <TableCell>Precio Unitario</TableCell>
                  <TableCell>Precio Total</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
            )}
            <TableBody>
              {cart.map((item) => {
                return <CartListDetail key={item.id} item={item} screenQuery={screenQuery} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box className="bg-dark p-2 text-center">
        <>
          <Typography variant="h5" className="mb-3 mt-3 text-white">
            Importe Total: ${totalPriceCart}
          </Typography>
          <Link to="/checkout">
            <Button
              variant="contained"
              sx={{
                bgcolor: pink[600],
                "&:hover": { bgcolor: pink[800] },
              }}
            >
              Confirmar Compra
            </Button>
          </Link>
          <Button color="error" startIcon={<DeleteIcon />} onClick={cartClear}>
            Vaciar Carrito
          </Button>
        </>
      </Box>
    </Box>
  );
};

export default Cart;
