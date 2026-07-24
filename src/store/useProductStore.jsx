import { createContext, useContext, useEffect, useReducer } from "react";
import productsData from "../data/products.json";

const ProductContext = createContext(null);

const initialState = {
  products: [],
  categories: [],
  comboOffer: null,
  loading: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOADED":
      return {
        ...state,
        products: action.products,
        categories: action.categories,
        comboOffer: action.comboOffer,
        loading: false,
      };
    default:
      return state;
  }
}

export function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let cancelled = false;
    // Simulate 300ms network latency so skeletons are visible
    const timer = setTimeout(() => {
      if (!cancelled) {
        dispatch({
          type: "LOADED",
          products: productsData.products,
          categories: productsData.categories,
          comboOffer: productsData.comboOffer,
        });
      }
    }, 300);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return (
    <ProductContext.Provider value={state}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
