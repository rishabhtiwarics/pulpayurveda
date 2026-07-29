import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ProductProvider } from "./store/useProductStore.jsx";
import { hydrateCart } from "./store/cartSlice";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ShopPage from "./pages/ShopPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

function useRouter() {
  const [path, setPath] = useState(window.location.pathname);
  const [search, setSearch] = useState(window.location.search);

  useEffect(() => {
    function onPop() {
      setPath(window.location.pathname);
      setSearch(window.location.search);
    }
    window.addEventListener("popstate", onPop);
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

function CurrentPage({ path, categoryParam }) {
  if (path === "/about") return <AboutPage />;
  if (path === "/contact") return <ContactPage />;
  if (path === "/shop") return <ShopPage initialCategory={categoryParam} />;
  if (path === "/cart") return <CartPage />;
  if (path === "/checkout") return <CheckoutPage />;
  if (path.startsWith("/product/")) return <ProductDetailsPage productId={decodeURIComponent(path.replace("/product/", ""))} />;
  if (path === "/login") return <LoginPage />;
  if (path === "/register") return <RegisterPage />;
  if (path === "/forgot-password") return <ForgotPasswordPage />;
  return <HomePage />;
}

export default function App() {
  const dispatch = useDispatch();
  const { path, search } = useRouter();
  const categoryParam = new URLSearchParams(search).get("category") || "all";
  const authPath = ["/login", "/register", "/forgot-password"].includes(path);

  useEffect(() => {
    dispatch(hydrateCart());
  }, [dispatch]);

  return (
    <ProductProvider>
      {!authPath && <Header />}
      <main style={{ display: "contents" }}>
        <CurrentPage path={path} categoryParam={categoryParam} />
      </main>
      {!authPath && <Footer />}
    </ProductProvider>
  );
}