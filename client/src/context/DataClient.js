import { createContext, useEffect, useState, useRef } from "react";

const DataClient = createContext({});

export const DataClientProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

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
    amount,
    setAmount,
    quantityType,
    meatType
  ) => {
    let incrementValue = 0;
    let newUnite = "";
    console.log(quantityType);
    console.log(meatType);

    if (quantityType === "pcs") {
      incrementValue = 100;
      newUnite = "pcs";
    } else {
      incrementValue = 10;
      newUnite = "kg";
    }

    const newAmount =
      operation === "increment"
        ? amount + incrementValue
        : amount - incrementValue;

    if (
      newAmount >= 1 &&
      newAmount <= 990 &&
      (newAmount * price) / 100 < 99.99
    ) {
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
    } else if (newAmount < 1) {
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
        const height = reference.offsetHeight - 1;
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

  const footer = useRef(null);
  const productsElement = useRef(null);

  useEffect(() => {
    const clineTopElement = referenceElement.current;
    const footerElement = footer.current;
    const products = productsElement.current;

    const updateProductsHeight = () => {
      if (clineTopElement && footerElement && products) {
        const clineTopHeight = clineTopElement.offsetHeight;
        const footerHeight = footerElement.offsetHeight;
        const productsHeight =
          window.innerHeight - clineTopHeight - footerHeight;

        products.style.maxHeight = `${productsHeight - 1}px`;
        products.style.minHeight = `${productsHeight - 1}px`;
      }
    };

    updateProductsHeight();

    window.addEventListener("resize", updateProductsHeight);

    return () => {
      window.removeEventListener("resize", updateProductsHeight);
    };
  }, [products]);

  const handleOutsideBucketClick = async (event) => {
    const clickTarget = event.target;
    if (
      !clickTarget.classList.contains("cartIcon") &&
      !clickTarget.classList.contains("nav_bucket") &&
      event.target !== targetElement.current
    ) {
      document.removeEventListener("click", handleOutsideBucketClick);
      await setIsBucketVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideBucketClick);
  });

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
        footer,
        productsElement,
        products,
        setProducts,
        handleOutsideBucketClick,
      }}
    >
      {children}
    </DataClient.Provider>
  );
};

export default DataClient;
