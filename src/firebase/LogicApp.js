import { collection, doc, getDoc, getDocs, query, where, addDoc } from "firebase/firestore";
import { db } from "./Init";

export const getAllProducts = async (idCategory) => {
  let refProductsCollection = [];

  if (idCategory) {
    refProductsCollection = query(collection(db, "products"), where("category", "==", idCategory));
  } else {
    refProductsCollection = collection(db, "products");
  }
  try {
    const res = await getDocs(refProductsCollection);
    const products = res.docs.map((product) => ({
      ...product.data(),
      id: product.id,
    }));
    return products;
  } catch (error) {
    console.log("Disculpe ha ocurrido un error", error);
  }
};

export const getProduct = async (idItem) => {
  const refProduct = doc(db, "products", idItem);

  try {
    const res = await getDoc(refProduct);
    if (res.exists()) {
      const product = { ...res.data(), id: res.id };
      return product;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Disculpe ha ocurrido un error", error);
  }
};

export const getShowCategory = async () => {
  let refCategoryCollection = collection(db, "category");

  try {
    const res = await getDocs(refCategoryCollection);
    const category = res.docs.map((cat) => ({
      ...cat.data(),
      id: cat.id,
    }));
    return category;
  } catch (error) {
    console.log("Disculpe ha ocurrido un error", error);
  }
};

export const setOrder = async (order) => {
  const refOrdersCollection = collection(db, "orders");
  try {
    const { id } = await addDoc(refOrdersCollection, order);
    return id;
  } catch (error) {
    console.log("Disculpe ha ocurrido un error", error);
  }
};

export const getOrder = async (idOrder) => {
  const refOrder = doc(db, "orders", idOrder);
  try {
    const res = await getDoc(refOrder);
    if (res.exists()) {
      const order = { ...res.data() };
      return order;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Disculpe ha ocurrido un error", error);
  }
};
