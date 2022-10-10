import { createContext, useEffect, useState, useContext } from "react";

export const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("No hay provider");
  return context;
};

export const CartProvider = ({ children }) => {
  const cartLS = JSON.parse(localStorage.getItem("cart") || "[]");
  const [cart, setCart] = useState(cartLS);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addItem = (item, count) => {
    isInCart(item.id)
      ? setCart(
          cart.map((_item) => {
            if (_item.id === item.id) {
              _item.quantity += count;
            }
            return _item;
          })
        )
      : setCart([...cart, { ...item, quantity: count }]);
  };

  const increaseItems = ({ item }) => {
    let cartTemp = [];
    cartTemp = cart.reduce((acc, _item) => {
      if (item.id !== _item.id) {
        return acc.concat(_item);
      } else {
        return acc.concat({ ..._item, quantity: _item.quantity + 1 });
      }
    }, []);
    setCart(cartTemp);
  };

  const decreaseItems = ({ item }) => {
    if (item.quantity === 1) {
      return removeItem(item.id);
    } else {
      let cartTemp = [];
      cartTemp = cart.reduce((acc, _item) => {
        if (item.id !== _item.id) {
          return acc.concat(_item);
        } else {
          return acc.concat({ ..._item, quantity: _item.quantity - 1 });
        }
      }, []);
      setCart(cartTemp);
    }
  };

  const isInCart = (id) => {
    return cart.some((_item) => _item.id === id);
  };

  const removeItem = (id) => {
    setCart(cart.filter((_item) => _item.id !== id));
  };

  const cartClear = () => {
    setCart([]);
  };

  const totalPriceCart = () => {
    return cart.reduce((item, _item) => {
      return item + _item.quantity * _item.price;
    }, 0);
  };

  const checkStock = (id) => {
    const item = cart.find((_item) => _item.id === id);
    if (item) {
      return item.quantity;
    }
    return 0;
  };

  return (
    <CartContext.Provider
      value={{
        addItem,
        cartClear,
        cart,
        removeItem,
        totalPriceCart,
        increaseItems,
        decreaseItems,
        checkStock,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
