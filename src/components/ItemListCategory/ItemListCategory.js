import * as React from "react";
import Box from "@mui/material/Box";
import Loading from "../Loading/Loading";
import ItemCategory from "./ItemCategory";
import { useEffect, useState } from "react";
import { getShowCategory } from "../../firebase/LogicApp";

const ItemListCategory = () => {
  const [loading, setLoading] = useState(true);
  const [cardCategory, setCardCategory] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      setLoading(true);
      const allCategory = await getShowCategory();
      setCardCategory(allCategory);
      setLoading(false);
    };
    getCategory();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            minWidth: 300,
            width: "100%",
            justifyContent: "center",
          }}
        >
          {cardCategory.map((_category) => {
            return <ItemCategory key={_category.id} category={_category} />;
          })}
        </Box>
      )}
    </>
  );
};

export default ItemListCategory;
