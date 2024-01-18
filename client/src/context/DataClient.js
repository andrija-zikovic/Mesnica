import { createContext, useEffect, useState, useRef } from "react";

const DataClient = createContext({});

export const DataClientProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const deleteItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const calculateQuantity = (newAmount, newUnite) => {
    return newAmount / 100;
  };

  const handleAmountChange = (
    operation,
    id,
    title,
    price,
    selectedUnit,
    amount,
    setAmount
  ) => {
    const incrementValue = selectedUnit === "plusOne" ? 1 : 10;
    const newAmount =
      operation === "increment"
        ? amount + incrementValue
        : amount - incrementValue;
    const newUnite = "kg";

    if (newAmount >= 1) {
      setAmount(newAmount);

      // Create an item object
      const item = {
        id: id,
        description: title,
        price: price,
        "tax-rate": 5,
        quantity: calculateQuantity(newAmount, newUnite),
        unit: newUnite,
      };

      if (cartItems.length === 0) {
        setCartItems([item]);
      } else {
        // If the cart is not empty, check if the item is already in the cart
        const existingItemIndex = cartItems.findIndex(
          (cartItem) => cartItem.id === id
        );

        if (existingItemIndex !== -1) {
          // If the item is in the cart, update its quantity
          const updatedCartItems = [...cartItems];
          updatedCartItems[existingItemIndex] = item;
          setCartItems(updatedCartItems);
        } else {
          // If not in the cart, add it
          setCartItems([...cartItems, item]);
        }
      }
    } else {
      const updatedCartItems = cartItems.filter(
        (cartItem) => cartItem.id !== id
      );
      setCartItems(updatedCartItems);
      setAmount(0);
    }
  };

  const referenceElement = useRef(null);
  const targetElement = useRef(null);

  const [bucketVisibleCheck, setBucketVisibleCheck] = useState(false);

  useEffect(() => {
    const reference = referenceElement.current;
    const target = targetElement.current;

    if (reference && target) {
      const updateTop = () => {
        const height = reference.offsetHeight;
        target.style.top = `${height}px`;
      };

      // Initialize with the current height
      updateTop();

      // Create a resize observer to observe reference element
      const resizeObserver = new ResizeObserver(() => {
        updateTop();
      });

      resizeObserver.observe(reference);

      // Cleanup function
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [bucketVisibleCheck, referenceElement, targetElement]);

  const [isBucketVisible, setIsBucketVisible] = useState(false);

  const toggleBucketVisibility = () => {
    setIsBucketVisible((prevState) => !prevState);
    setBucketVisibleCheck((prevState) => !prevState);
  };

  return (
    <DataClient.Provider
      value={{
        cartItems,
        setCartItems,
        deleteItem,
        clearCart,
        handleAmountChange,
        referenceElement,
        targetElement,
        bucketVisibleCheck,
        setBucketVisibleCheck,
        isBucketVisible,
        setIsBucketVisible,
        toggleBucketVisibility,
      }}
    >
      {children}
    </DataClient.Provider>
  );
};

export default DataClient;
