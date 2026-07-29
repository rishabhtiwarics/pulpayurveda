import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useProducts } from "../../store/useProductStore.jsx";
import ProductCard from "../shop/ProductCard";
import ProductCardSkeleton from "../shop/ProductCardSkeleton";
import CartSidebar from "../cart/CartSidebar";
import { openCart, selectCartCount } from "../../store/cartSlice";

const demoUser = {
  name: "Aarav Mehta",
  email: "aarav.mehta@gmail.com",
  image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?cs=srgb&fm=jpg&w=160"
};

function Logo() {
  return (
    <a href="/" className="logo-pill" aria-label="Pulp Ayurveda">
      <img src="/img/logo.png" alt="Pulp Ayurveda" />
    </a>
  );
}

function AccountIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
    </svg>
  );
}

function SocialLinks() {
  return (
    <div className="soc-row sidebar-soc">
      <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg></a>
      <a href="#" aria-label="TikTok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M14 4v10.5a3.5 3.5 0 11-3-3.46" /><path d="M14 4c0 2.5 2 4 4 4" /></svg></a>
      <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="6" width="18" height="12" rx="3" /><path d="M11 10l4 2-4 2z" fill="currentColor" stroke="none" /></svg></a>
    </div>
  );
}

function Announcement() {
  const [active, setActive] = useState(0);
  const messages = [
    "New moon ritual bundle just dropped - 15% off this week only",
    "Free shipping on all orders above Rs.399",
    "Loved by 10,000+ mindful customers",
    "Pure, handcrafted Ayurveda - delivered to your door"
  ];

  useEffect(() => {
    const timer = setInterval(() => setActive((value) => (value + 1) % messages.length), 4200);
    return () => clearInterval(timer);
  }, [messages.length]);

  return (
    <div className="announcement" id="announcement">
      <div className="wrap">
        <span className="ann-text-wrap" id="annTextWrap">
          {messages.map((message, index) => (
            <span key={message} className={`ann-msg${index === active ? " active" : ""}`}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none" }}>
                {index === 0 && <><rect x="3" y="8" width="18" height="13" rx="2" /><path d="M12 8v13" /><path d="M3 12h18" /><path d="M7.5 8a2.5 2.5 0 110-5c3 0 4.5 5 4.5 5" /><path d="M16.5 8a2.5 2.5 0 100-5c-3 0-4.5 5-4.5 5" /></>}
                {index === 1 && <><rect x="1" y="7" width="14" height="10" rx="2" /><path d="M15 11h4l3 3v3h-7z" /><circle cx="6" cy="19" r="2" /><circle cx="18" cy="19" r="2" /></>}
                {index === 2 && <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" />}
                {index === 3 && <><circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.6 2.6L16.5 9" /></>}
              </svg>
              {message}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

function SearchPanel({ open, onClose, inputRef, panelRef, onMouseEnter, onMouseLeave }) {
  const { products, loading } = useProducts();
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    return products.filter((product) => !product.isComboOffer && product.name.toLowerCase().includes(term));
  }, [query, products]);

  return (
    <div ref={panelRef} className={`search-panel${open ? " open" : ""}`} id="searchPanel" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="wrap search-panel-inner">
        <div className="search-panel-head">
          <h4>Search Products</h4>
          <button className="close-search" id="closeSearch" aria-label="Close search" onClick={onClose}>&times;</button>
        </div>
        <div className="search-field-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.5" y2="16.5" /></svg>
          <input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} type="text" placeholder="Search herbs, blends, rituals..." id="searchInput" />
        </div>
        <div className="search-results-row">
          {loading && query.trim() ? (
            <ProductCardSkeleton variant="search" count={3} />
          ) : query.trim() && filteredProducts.length ? (
            filteredProducts.slice(0, 5).map((product) => (
              <ProductCard key={product.id} product={product} variant="search" />
            ))
          ) : query.trim() ? (
            <div className="search-empty">No products found</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function DesktopNav({ shopOpen, setShopOpen, closeUserMenu }) {
  const { categories, loading } = useProducts();
  const currentPath = window.location.pathname;
  const [hovering, setHovering] = useState(false);
  const shopCloseTimer = useRef(null);
  const open = shopOpen || hovering;

  function openShopMenu() {
    clearTimeout(shopCloseTimer.current);
    setHovering(true);
    closeUserMenu();
  }

  function scheduleShopClose() {
    clearTimeout(shopCloseTimer.current);
    shopCloseTimer.current = setTimeout(() => setHovering(false), 220);
  }

  return (
    <nav className="nav-desktop">
      <a href="/" className={currentPath === "/" ? "active" : ""}>Home</a>
      <div
        className={`nav-shop${open ? " open" : ""}`}
        id="navShop"
        onMouseEnter={openShopMenu}
        onMouseLeave={scheduleShopClose}
      >
        <a href="/shop" className={`nav-shop-toggle${currentPath === "/shop" ? " active" : ""}`} onClick={() => { closeUserMenu(); }}>
          Shop
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
        </a>
        <div className="nav-shop-panel" onMouseEnter={openShopMenu} onMouseLeave={scheduleShopClose}>
          <div className="wrap nav-shop-panel-inner">
            <div className="nav-shop-panel-head">
              <h4>Shop by Category</h4>
              <a href="/shop" className="nav-shop-viewall">View all products
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
              </a>
            </div>
            <div className="nav-shop-grid">
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <div key={`nav-skel-${i}`} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <div className="skeleton" style={{ width: "56px", height: "56px", borderRadius: "50%" }} />
                    <div className="skeleton skeleton-line" style={{ width: "52px", height: "12px" }} />
                  </div>
                ))
              ) : (
                categories.map((cat) => (
                  <a href={`/shop?category=${cat.id}`} key={cat.id}>
                    <img src={cat.image} alt={cat.name} />
                    <span>{cat.name}</span>
                  </a>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <a href="/#about">About</a>
      <a href="/#contact">Contact</a>
    </nav>
  );
}

function UserMenu({ loggedIn, setLoggedIn, open, setOpen, onMouseEnter, onMouseLeave }) {
  function handleLogout() {
    window.localStorage.removeItem("pulp-auth-logged-in");
    setLoggedIn(false);
    setOpen(false);
  }

  return (
    <div className={`user-menu${open ? " open" : ""}`} id="userMenu" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="wrap user-menu-inner">
        <div className="user-menu-head">
          <h4>Account</h4>
          <p className="user-menu-note">{loggedIn ? "Signed in" : "Login to manage orders"}</p>
        </div>
        {loggedIn ? (
          <div className="user-profile">
            <img src={demoUser.image} alt={demoUser.name} />
            <div><strong>{demoUser.name}</strong><small>{demoUser.email}</small></div>
            <div className="user-menu-actions logged-in">
              <a className="btn-solid user-auth-action" href="/profile" onClick={() => setOpen(false)}>
                <AccountIcon />
                Profile
              </a>
              <button className="btn-outline user-menu-logout" onClick={handleLogout}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" /></svg>
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="user-menu-actions">
            <a className="btn-solid user-auth-action" href="/login" onClick={() => setOpen(false)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><path d="M10 17l5-5-5-5" /><path d="M15 12H3" /></svg>Login</a>
            <a className="btn-outline user-auth-action" href="/register" onClick={() => setOpen(false)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M19 8v6" /><path d="M22 11h-6" /></svg>Register</a>
          </div>
        )}
      </div>
    </div>
  );
}
function Sidebar({ open, onClose, loggedIn, setLoggedIn }) {
  const { categories, loading } = useProducts();
  const currentPath = window.location.pathname;
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <>
      <div className={`overlay${open ? " show" : ""}`} id="overlay" onClick={onClose}></div>
      <aside className={`sidebar${open ? " open" : ""}`} id="sidebar" aria-hidden={!open}>
        <div className="sidebar-top">
          <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
            <img src="/img/logo.png" alt="Pulp Ayurveda" />
          </div>
          <button className="sidebar-close" id="closeSidebar" aria-label="Close menu" onClick={onClose}>&times;</button>
        </div>
        <div className="sidebar-main">
          <nav className="sidebar-nav">
            <a href="/" onClick={onClose}>Home</a>
            <div className="sidebar-accordion">
              <div className="sidebar-accordion-head">
                <a href="/shop" className={`sidebar-accordion-toggle${currentPath === "/shop" ? " active" : ""}`} onClick={onClose}>Shop</a>
                <button className="sidebar-accordion-arrow" id="shopAccordionToggle" type="button" aria-expanded={accordionOpen} aria-label="Toggle shop categories" onClick={() => setAccordionOpen((value) => !value)}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="accordion-chevron"><polyline points="6 9 12 15 18 9" /></svg>
                </button>
              </div>
              <div className={`sidebar-accordion-panel${accordionOpen ? " open" : ""}`} id="shopAccordionPanel">
                {loading ? (
                  Array.from({ length: 8 }).map((_, i) => (
                    <div key={`sb-skel-${i}`} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 0" }}>
                      <div className="skeleton" style={{ width: "36px", height: "36px", borderRadius: "50%", flexShrink: 0 }} />
                      <div className="skeleton skeleton-line" style={{ width: "80px", height: "12px" }} />
                    </div>
                  ))
                ) : (
                  categories.map((cat) => (
                    <a href={`/shop?category=${cat.id}`} key={cat.id} onClick={onClose}>
                      <img src={cat.image} alt={cat.name} />{cat.name}
                    </a>
                  ))
                )}
              </div>
            </div>
            <a href="/#about" onClick={onClose}>About</a>
            <a href="/#contact" onClick={onClose}>Contact</a>
          </nav>
          <div className="sidebar-promo">
            <div className="tag">Just for you</div>
            <p>Get a free ritual guide when you sign up - no strings attached.</p>
          </div>
          <div className="sidebar-auth" id="authArea">
            {loggedIn ? (
              <>
                <div className="user-chip">
                  <span className="avatar">A</span>
                  <div className="user-info"><strong>{demoUser.name}</strong><small>{demoUser.email}</small></div>
                </div>
                <button className="btn-solid full" type="button" onClick={onClose}>Profile</button>
                <button className="btn-outline full" onClick={() => { window.localStorage.removeItem("pulp-auth-logged-in"); setLoggedIn(false); }}>Log out</button>
              </>
            ) : (
              <>
                <a className="btn-solid full" href="/login" onClick={onClose} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><path d="M10 17l5-5-5-5" /><path d="M15 12H3" /></svg>
                  Log in
                </a>
                <p className="signup-line">New here? <a href="/register" onClick={onClose}>Create an account</a></p>
              </>
            )}
          </div>        </div>
        <div className="sidebar-footer">
          <SocialLinks />
          <span className="sidebar-copy">&copy; 2026 Pulp Ayurveda</span>
        </div>
      </aside>
    </>
  );
}

export default function Header() {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(() => window.localStorage.getItem("pulp-auth-logged-in") === "true");
  const inputRef = useRef(null);
  const userWrapRef = useRef(null);
  const searchPanelRef = useRef(null);
  const searchCloseTimer = useRef(null);
  const userCloseTimer = useRef(null);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", sidebarOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [sidebarOpen]);

  useEffect(() => {
    if (searchOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 250);
      return () => clearTimeout(timer);
    }
  }, [searchOpen]);

  useEffect(() => {
    function setPanelTop() {
      const headerEl = document.querySelector(".site-header");
      if (headerEl) document.documentElement.style.setProperty("--shop-panel-top", `${headerEl.getBoundingClientRect().bottom}px`);
    }
    function handleClick(event) {
      if (userWrapRef.current && !userWrapRef.current.contains(event.target)) setUserMenuOpen(false);
      if (!event.target.closest?.("#navShop")) setShopOpen(false);
      if (!event.target.closest?.("#searchPanel") && !event.target.closest?.("#searchToggle")) setSearchOpen(false);
    }
    function handleKey(event) {
      if (event.key === "Escape") {
        setSidebarOpen(false);
        setSearchOpen(false);
        setUserMenuOpen(false);
        setShopOpen(false);
      }
    }
    setPanelTop();
    window.addEventListener("resize", setPanelTop);
    window.addEventListener("scroll", setPanelTop, { passive: true });
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("resize", setPanelTop);
      window.removeEventListener("scroll", setPanelTop);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  function closeUserMenu() {
    clearTimeout(userCloseTimer.current);
    setUserMenuOpen(false);
  }

  function openUserMenu() {
    clearTimeout(userCloseTimer.current);
    setUserMenuOpen(true);
    setShopOpen(false);
    setSearchOpen(false);
  }

  function scheduleUserMenuClose() {
    clearTimeout(userCloseTimer.current);
    userCloseTimer.current = setTimeout(() => setUserMenuOpen(false), 220);
  }

  function openSearchDropdown() {
    clearTimeout(searchCloseTimer.current);
    setSearchOpen(true);
    setShopOpen(false);
    setUserMenuOpen(false);
  }

  function scheduleSearchClose() {
    clearTimeout(searchCloseTimer.current);
    searchCloseTimer.current = setTimeout(() => setSearchOpen(false), 250);
  }

  function closeSearchDropdown() {
    clearTimeout(searchCloseTimer.current);
    setSearchOpen(false);
  }

  return (
    <>
      <Announcement />
      <header className="site-header">
        <div className="header-inner">
          <Logo />
          <DesktopNav shopOpen={shopOpen} setShopOpen={setShopOpen} closeUserMenu={closeUserMenu} />
          <div className="header-actions">
            <button className="icon-btn search-toggle" id="searchToggle" aria-label="Search" aria-expanded={searchOpen} aria-controls="searchPanel" onMouseEnter={openSearchDropdown} onMouseLeave={scheduleSearchClose} onClick={() => { searchOpen ? closeSearchDropdown() : openSearchDropdown(); }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.5" y2="16.5" /></svg>
            </button>
            <button className="icon-btn header-cart-btn" type="button" aria-label="Open cart" onClick={() => { dispatch(openCart()); setUserMenuOpen(false); setSearchOpen(false); setShopOpen(false); }}>
              <CartIcon />
              {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
            </button>
            <div
              className="user-menu-wrap"
              id="userMenuWrap"
              ref={userWrapRef}
              onMouseEnter={openUserMenu}
              onMouseLeave={scheduleUserMenuClose}
            >
              <button className={`icon-btn user-btn${loggedIn ? " logged-in" : ""}`} id="userBtn" aria-label="Account" aria-expanded={userMenuOpen} aria-controls="userMenu" onClick={(event) => { event.stopPropagation(); setUserMenuOpen((value) => !value); setShopOpen(false); setSearchOpen(false); }}>
                {loggedIn ? <img src={demoUser.image} alt={demoUser.name} /> : <AccountIcon />}
              </button>
              <UserMenu loggedIn={loggedIn} setLoggedIn={setLoggedIn} open={userMenuOpen} setOpen={setUserMenuOpen} onMouseEnter={openUserMenu} onMouseLeave={scheduleUserMenuClose} />
            </div>
            <button className="burger" id="burgerBtn" aria-label="Open menu" aria-expanded={sidebarOpen} aria-controls="sidebar" onClick={() => { setSidebarOpen(true); setUserMenuOpen(false); setSearchOpen(false); }}>
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>
      <SearchPanel open={searchOpen} onClose={closeSearchDropdown} inputRef={inputRef} panelRef={searchPanelRef} onMouseEnter={openSearchDropdown} onMouseLeave={scheduleSearchClose} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <CartSidebar />
    </>
  );
}
