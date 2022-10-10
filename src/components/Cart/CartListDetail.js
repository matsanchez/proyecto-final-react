import { useCart } from "../../context/CartContext";
import { Avatar, TableCell, TableRow, Typography, Box } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { grey, red } from "@mui/material/colors";
import ItemCountCart from "../ItemCount/ItemCountCart";

const CartListDetail = ({ item, screenQuery }) => {
  const { removeItem, increaseItems, decreaseItems } = useCart();

  const itemIncreaseCart = () => {
    item.quantity === item.stock ? msgStock(item) : increaseItems({ item });
  };
  const itemDecreaseCart = () => {
    item.quantity === 1 ? removeItem(item.id) : decreaseItems({ item });
  };

  const msgStock = (item) => {
    toast.error(`No hay mas Stock de ${item.name}`, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  if (screenQuery) {
    return (
      <TableRow>
        <TableCell>
          <Avatar src={item.pictureUrl} sx={{ width: 56, height: 56 }} />
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2">
            <strong>{item.quantity}u.</strong> x {item.name}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2">${item.price.toLocaleString()}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2">${(item.price * item.quantity).toLocaleString()}</Typography>
        </TableCell>
        <TableCell>
          <ItemCountCart
            item={item}
            increase={() => itemIncreaseCart({ item })}
            decrease={() => itemDecreaseCart({ item })}
          />
        </TableCell>
        <TableCell>
          <button onClick={() => removeItem(item.id)}>
            <DeleteForeverIcon sx={{ color: red[500], fontSize: 30 }} />
          </button>
        </TableCell>
      </TableRow>
    );
  } else {
    return (
      <>
        <TableRow>
          <TableCell className="d-flex align-items-center">
            <Avatar src={item.pictureUrl} sx={{ width: 56, height: 56 }} />
            <Box>
              <Typography variant="subtitle2">
                <strong>{item.quantity}u.</strong> x {item.name}
              </Typography>
              <Typography variant="caption" sx={{ color: grey[500] }}>
                ${item.price.toLocaleString()}c/u.{" "}
              </Typography>
              <Typography variant="caption">${(item.price * item.quantity).toLocaleString()}</Typography>
            </Box>
          </TableCell>
          <TableCell>
            <ItemCountCart
              item={item}
              increase={() => itemIncreaseCart({ item })}
              decrease={() => itemDecreaseCart({ item })}
            />
          </TableCell>
          <TableCell>
            <button onClick={() => removeItem(item.id)}>
              <DeleteForeverIcon sx={{ color: red[500], fontSize: 30 }} />
            </button>
          </TableCell>
        </TableRow>
      </>
    );
  }
};

export default CartListDetail;
