import { React, useState, useEffect } from "react";
import Loading from "../Loading/Loading";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct } from "../../firebase/LogicApp";

const ItemDetailContainer = () => {
  const [loading, setLoading] = useState(true);
  const [prodDetail, setProdDetail] = useState({});
  const { idItem } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProductDetail = async () => {
      setLoading(true);
      const product = await getProduct(idItem);
      if (!product) {
        navigate("/PageNotFound");
      } else {
        setLoading(false);
        setProdDetail(product);
      }
    };
    getProductDetail();
  }, [idItem, navigate]);

  return <>{loading ? <Loading /> : <ItemDetail item={prodDetail} />};</>;
};

export default ItemDetailContainer;
