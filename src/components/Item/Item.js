import { useEffect, useState } from "react";
import { Card, CardMedia, Typography, CardContent, Button } from "@mui/material";
import { IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAuth } from "../../context/AuthContext";
import { pink } from "@mui/material/colors";
import "./Item.css";

const Item = ({ item }) => {
  const { addFavorites, removeFavorite, userFavorites, tempFavorites, user } = useAuth();
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

  return (
    <Card
      className="card"
      sx={{ maxWidth: { xs: 200, sm: 250, md: 270 }, textAlign: "center", margin: 1, position: "relative" }}
    >
      <IconButton className="position-absolute top-2 end-0" onClick={() => checkFavorite()}>
        {btnFavorite ? <FavoriteIcon sx={{ color: pink[500] }} /> : <FavoriteBorderIcon />}
      </IconButton>
      <Link to={`/detail/${item.id}`}>
        <CardMedia component="img" alt={item.name} height="140" image={item.pictureUrl} />
        <CardContent className="p-1 mb-1">
          <Typography variant="subtitle">{item.name}</Typography>
        </CardContent>
        <Button
          fullWidth
          sx={{
            bgcolor: pink[600],
            "&:hover": { bgcolor: pink[800] },
          }}
          size="small"
          variant="contained"
          className="mb-2 text-white"
        >
          Ver detalle
        </Button>
      </Link>
    </Card>
  );
};

export default Item;
