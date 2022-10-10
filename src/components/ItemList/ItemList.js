import Item from "../Item/Item";
import { Box } from "@mui/material";

const ItemList = ({ products }) => {
  return (
    <Box className="d-flex row justify-content-center m-3">
      {products.map((prod) => {
        return <Item key={prod.id} item={prod} />;
      })}
    </Box>
  );
};

export default ItemList;
