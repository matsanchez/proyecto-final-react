import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { Box, IconButton, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { pink } from "@mui/material/colors";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ItemCount from "../ItemCount/ItemCount";
import CustomizedBreadcrumbs from "../NavBar/Breadcrumbs";
import ItemModal from "./ItemModal";
import "react-toastify/dist/ReactToastify.css";
import "./ItemDetail.css";

const ItemDetail = ({ item }) => {
  const { id, name, price, stock, sold, description, measurement, trademark, category } = item;
  const { addItem, checkStock } = useCart();
  const { addFavorites, removeFavorite, userFavorites, tempFavorites, user } = useAuth();
  const [count, setCount] = useState(1);
  const [btnOptions, setBtnOptions] = useState(true);
  const [btnFavorite, setBtnFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    tempFavorites(item.id) && setBtnFavorite(true);
  }, [userFavorites, tempFavorites, item.id]);

  const checkFavorite = () => {
    if (!user) {
      navigate("/login");
    } else if (addFavorites(item) === false) {
      removeFavorite(item.id);
      setBtnFavorite(false);
    } else {
      addFavorites(item);
      setBtnFavorite(true);
    }
  };

  const emptyCart = (msg) => {
    toast.error(`${msg}`, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  const checkStockLS = (count) => {
    if (checkStock(id) >= stock) {
      emptyCart("Disculpe, ya tienes la cantidad límite de compra para este producto");
    } else {
      onAdd(count);
    }
  };

  const onAdd = (count) => {
    setBtnOptions(false);
    addItem({ ...item }, count);
    toast.success(`Agregaste ${count} ${name}`, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <Box className="detail-container">
      <CustomizedBreadcrumbs navigation={item} />
      <Box className="details" key={id}>
        <Box className="detail-img">
          <ItemModal item={item} />
        </Box>
        <Box className="box">
          <Box className="d-flex align-items-center justify-content-between">
            <span>Vendidos: {sold}</span>
            <IconButton onClick={() => checkFavorite()}>
              {btnFavorite ? <FavoriteIcon sx={{ color: pink[500] }} /> : <FavoriteBorderIcon />}
            </IconButton>
          </Box>

          <Box className="row">
            <h2>{name}</h2>

            <span>${price}</span>
          </Box>
          <Typography variant="inherit">{description}</Typography>
          <Box className="detail-expand">
            <Typography variant="inherit">
              <strong>Categoria:</strong> {category}
            </Typography>
            <Typography variant="inherit">
              <strong>Marca:</strong> {trademark}
            </Typography>
            <Typography variant="inherit">
              <strong>Medidas:</strong> Ancho-({measurement.width}cm) / Alto-(
              {measurement.height}cm)
            </Typography>
          </Box>
          {btnOptions ? (
            <>
              <Box className="d-flex align-items-center">
                <Typography variant="inherit">Cantidad:</Typography>
                <ItemCount stock={checkStock(id) ? stock - checkStock(id) : stock} count={count} setCount={setCount} />
                <span>Stock: {stock} Disponible</span>
              </Box>
              <button
                className="detail-btn-cart"
                onClick={() => (count === 0 ? emptyCart("Ingrese la cantidad por favor!") : checkStockLS(count))}
              >
                Agregar al carrito
              </button>
              {Boolean(checkStock(id)) && (
                <ListItem disablePadding className="mt-2">
                  <ListItemIcon>
                    <CommentIcon sx={{ color: pink[500] }} />
                    <ListItemText
                      className="mx-1"
                      primary={"Ya tienes " + checkStock(id) + " u. agregados en el carrito"}
                    />
                  </ListItemIcon>
                </ListItem>
              )}
            </>
          ) : (
            <>
              <Link to="/">
                <button className="btn-cart">Ver Catalogo</button>
              </Link>
              <Link to="/cart">
                <button className="btn-cart">Ir al carrito</button>
              </Link>
            </>
          )}
        </Box>
        <ToastContainer />
      </Box>
    </Box>
  );
};

export default ItemDetail;
