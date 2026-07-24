import { useState, useEffect } from "react";
import { ProductProvider } from "./store/useProductStore.jsx";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";

/** Minimal SPA router — no react-router-dom needed */
function useRouter() {
  const [path, setPath] = useState(window.location.pathname);
  const [search, setSearch] = useState(window.location.search);

  useEffect(() => {
    function onPop() {
      setPath(window.location.pathname);
      setSearch(window.location.search);
    }
    window.addEventListener("popstate", onPop);
    // Intercept pushState so back/forward works
    const origPush = window.history.pushState.bind(window.history);
    window.history.pushState = (...args) => {
      origPush(...args);
      setPath(window.location.pathname);
      setSearch(window.location.search);
    };
    return () => {
      window.removeEventListener("popstate", onPop);
      window.history.pushState = origPush;
    };
  }, []);

  return { path, search };
}

export default function App() {
  const { path, search } = useRouter();

  // Parse ?category= from URL for shop page
  const categoryParam = new URLSearchParams(search).get("category") || "all";

  return (
    <ProductProvider>
      <Header />
      <main style={{ display: "contents" }}>
        {path === "/shop" ? (
          <ShopPage initialCategory={categoryParam} />
        ) : (
          <HomePage />
        )}
      </main>
      <Footer />
    </ProductProvider>
  );
}
