import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "pulp_cart";

function readCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveCart(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Cart still works in memory if storage is unavailable.
  }
}

const initialState = {
  items: [],
  hydrated: false,
  sidebarOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrateCart(state) {
      state.items = readCart();
      state.hydrated = true;
    },
    addToCart(state, action) {
      const product = action.payload;
      if (!product?.id || state.items.some((item) => item.id === product.id)) return;
      state.items.push({
        id: product.id,
        name: product.name,
        category: product.category,
        image: product.image,
        price: Number(product.price || product.discountPrice || 0),
        discountPrice: Number(product.discountPrice || product.price || 0),
        quantity: 1,
      });
      saveCart(state.items);
    },
    incrementItem(state, action) {
      const item = state.items.find((entry) => entry.id === action.payload);
      if (item) item.quantity += 1;
      saveCart(state.items);
    },
    decrementItem(state, action) {
      const item = state.items.find((entry) => entry.id === action.payload);
      if (!item) return;
      if (item.quantity > 1) item.quantity -= 1;
      else state.items = state.items.filter((entry) => entry.id !== action.payload);
      saveCart(state.items);
    },
    removeItem(state, action) {
      state.items = state.items.filter((entry) => entry.id !== action.payload);
      saveCart(state.items);
    },
    clearCart(state) {
      state.items = [];
      saveCart(state.items);
    },
    openCart(state) {
      state.sidebarOpen = true;
    },
    closeCart(state) {
      state.sidebarOpen = false;
    },
    toggleCart(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});

export const {
  hydrateCart,
  addToCart,
  incrementItem,
  decrementItem,
  removeItem,
  clearCart,
  openCart,
  closeCart,
  toggleCart,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartHydrated = (state) => state.cart.hydrated;
export const selectCartSidebarOpen = (state) => state.cart.sidebarOpen;
export const selectCartCount = (state) => state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartSubtotal = (state) => state.cart.items.reduce((total, item) => total + item.discountPrice * item.quantity, 0);
export const selectIsInCart = (id) => (state) => state.cart.items.some((item) => item.id === id);

export default cartSlice.reducer;