import { Container, Box, Typography, Grid } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import FavoritesList from "./FavoritesList";

const Favorites = () => {
  const { userFavorites, removeFavorite } = useAuth();
  const { addItem, checkStock } = useCart();

  const checkStockLS = ({ item }) => {
    if (checkStock(item.id) >= item.stock) {
      showMsg("Disculpe, ya tienes la cantidad límite de compra para este producto", false);
    } else {
      addCart({ item });
    }
  };

  const showMsg = (msg, boolean) => {
    if (boolean === true) {
      toast.success(`${msg}`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(`${msg}`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const addCart = ({ item }) => {
    addItem({ ...item }, 1);
    showMsg(`Se agrego ${item.name} al carrito`, true);
  };

  return (
    <Container className="mt-3 bg-dark rounded-4 p-3 shadow text-center mb-3">
      <Box className="d-flex justify-content-between">
        <Box className="bg-light rounded-4 p-3 w-100 m-2">
          <Typography variant="h5" component="h2" className="text-center mt-2 mb-2">
            Mis Favoritos
          </Typography>
          {!userFavorites.length ? (
            <Typography>Agregá acá los productos que te gustaron para poder verlos más tarde.</Typography>
          ) : (
            <Grid container columns={{ xs: 2, md: 4 }}>
              {userFavorites.map((item) => {
                return (
                  <FavoritesList key={item.id} item={item} addCart={checkStockLS} removeFavorite={removeFavorite} />
                );
              })}
            </Grid>
          )}
        </Box>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default Favorites;
