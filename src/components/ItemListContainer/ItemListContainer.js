import React, { useState, useEffect } from "react";
import Loading from "../Loading/Loading";
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import { getAllProducts } from "../../firebase/LogicApp";
import { Box } from "@mui/material";

const ItemListContainer = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { idCategory } = useParams();

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const allProducts = await getAllProducts(idCategory);
      setProducts(allProducts);
      setLoading(false);
    };
    getProducts();
  }, [idCategory]);

  return (
    <>
      <Box>{loading ? <Loading /> : <ItemList products={products} />}</Box>
    </>
  );
};

export default ItemListContainer;
