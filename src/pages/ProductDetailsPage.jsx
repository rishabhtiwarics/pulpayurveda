import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InnorHero from "../components/shop/InnorHero";
import ShopPerks from "../components/shop/ShopPerks";
import { useProducts } from "../store/useProductStore.jsx";
import { addToCart, incrementItem, openCart, selectIsInCart } from "../store/cartSlice";
import ProductCard, { CartIcon, RatingStars, titleCase } from "../components/shop/ProductCard";
import ProductCardSkeleton from "../components/shop/ProductCardSkeleton";

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5" />
      <path d="M11 18l-6-6 6-6" />
    </svg>
  );
}

function ProductGallery({ product, zoom, setZoom }) {
  const galleryRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbStart, setThumbStart] = useState(0);
  const images = product.images?.length ? product.images : [product.image];
  const activeImage = images[activeIndex] || product.image;
  const highResImage = product.highResImages?.[activeIndex] || product.highResImage || activeImage;
  const visibleThumbs = images.slice(thumbStart, thumbStart + 3);
  const canSlideThumbs = images.length > 3;

  function handleMouseMove(event) {
    const rect = galleryRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.min(100, Math.max(0, ((event.clientX - rect.left) / rect.width) * 100));
    const y = Math.min(100, Math.max(0, ((event.clientY - rect.top) / rect.height) * 100));
    setZoom((current) => current.visible && current.image === highResImage && Math.abs(current.x - x) < 0.5 && Math.abs(current.y - y) < 0.5 ? current : { visible: true, x, y, image: highResImage });
  }

  function selectThumb(index) {
    setActiveIndex(index);
    if (index < thumbStart) setThumbStart(index);
    if (index > thumbStart + 2) setThumbStart(index - 2);
  }

  return (
    <div className="product-gallery" aria-label={`${product.name} image gallery`}>
      <div className="product-gallery-main" ref={galleryRef} onMouseEnter={() => setZoom((current) => ({ ...current, visible: true, image: highResImage }))} onMouseMove={handleMouseMove} onMouseLeave={() => setZoom((current) => ({ ...current, visible: false }))}>
        <img src={activeImage} alt={product.name} loading="eager" />
        {highResImage !== activeImage && <img className="product-gallery-preload" src={highResImage} alt="" loading="lazy" aria-hidden="true" />}
        {images.length > 1 && (
          <div className="product-gallery-thumbs" aria-label="Product thumbnails">
            {canSlideThumbs && (
              <button className="product-gallery-arrow" type="button" onClick={() => setThumbStart((value) => Math.max(0, value - 1))} disabled={thumbStart === 0} aria-label="Previous thumbnails">{String.fromCharCode(8593)}</button>
            )}
            {visibleThumbs.map((image, index) => {
              const imageIndex = thumbStart + index;
              return (
                <button className={`product-gallery-thumb${activeIndex === imageIndex ? " active" : ""}`} type="button" key={`${product.id}-${image}-${imageIndex}`} onClick={() => selectThumb(imageIndex)} aria-label={`View image ${imageIndex + 1}`}>
                  <img src={image} alt="" loading="lazy" />
                </button>
              );
            })}
            {canSlideThumbs && (
              <button className="product-gallery-arrow" type="button" onClick={() => setThumbStart((value) => Math.min(images.length - 3, value + 1))} disabled={thumbStart >= images.length - 3} aria-label="Next thumbnails">{String.fromCharCode(8595)}</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default function ProductDetailsPage({ productId }) {
  const dispatch = useDispatch();
  const { products, loading } = useProducts();
  const product = useMemo(() => products.find((item) => item.id === productId), [productId, products]);
  const inCart = useSelector(selectIsInCart(productId));
  const [quantity, setQuantity] = useState(1);
  const [zoom, setZoom] = useState({ visible: false, x: 50, y: 50, image: "" });
  const [relatedVisibleCount, setRelatedVisibleCount] = useState(4);


  useEffect(() => {
    function updateRelatedVisibleCount() {
      const width = window.innerWidth;
      setRelatedVisibleCount(width > 600 && width <= 1024 ? 3 : 4);
    }
    updateRelatedVisibleCount();
    window.addEventListener("resize", updateRelatedVisibleCount);
    return () => window.removeEventListener("resize", updateRelatedVisibleCount);
  }, []);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    const sameCategory = products.filter((item) => item.id !== product.id && item.category === product.category && !item.isComboOffer);
    const fallback = products.filter((item) => item.id !== product.id && item.category !== product.category && !item.isComboOffer);
    return [...sameCategory, ...fallback].slice(0, relatedVisibleCount);
  }, [product, products, relatedVisibleCount]);
  function goBack() {
    window.history.pushState({}, "", "/shop");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleAdd() {
    if (!product) return;
    if (!inCart) dispatch(addToCart(product));
    for (let count = inCart ? 0 : 1; count < quantity; count += 1) dispatch(incrementItem(product.id));
    dispatch(openCart());
  }

  if (loading) {
    return (
      <>
        <InnorHero />
        <ShopPerks />
                <section className="product-details-section">
          <div className="product-details-wrap">
            <div className="product-detail-skeleton product-details-layout" aria-hidden="true">
              <div className="product-gallery-skeleton">
                <div className="skeleton product-gallery-main-skeleton" />
                <div className="product-gallery-thumbs-skeleton">
                  <span className="skeleton" />
                  <span className="skeleton" />
                  <span className="skeleton" />
                </div>
              </div>
              <div className="product-info-skeleton">
                <div className="product-skeleton-pills"><span className="skeleton" /><span className="skeleton" /><span className="skeleton" /></div>
                <span className="skeleton product-skeleton-eyebrow" />
                <span className="skeleton product-skeleton-title" />
                <span className="skeleton product-skeleton-title short" />
                <span className="skeleton product-skeleton-rating" />
                <span className="skeleton product-skeleton-line" />
                <span className="skeleton product-skeleton-line wide" />
                <span className="skeleton product-skeleton-price" />
                <div className="product-skeleton-purchase"><span className="skeleton" /><span className="skeleton" /></div>
                <div className="product-skeleton-actions"><span className="skeleton" /><span className="skeleton" /></div>
                <span className="skeleton product-skeleton-accordion" />
                <span className="skeleton product-skeleton-accordion" />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <InnorHero />
        <ShopPerks />
        <section className="product-details-section">
          <div className="product-details-wrap product-not-found">
            <h1>Product not found</h1>
            <button className="product-back-btn" type="button" onClick={goBack}><BackIcon />Back to shop</button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <InnorHero />
      <ShopPerks />
      <section className="product-details-section">
        <div className="product-details-wrap">
          <button className="product-back-btn" type="button" onClick={goBack}><BackIcon />Back to shop</button>
          <div className="product-details-layout">
            <ProductGallery product={product} zoom={zoom} setZoom={setZoom} />
            <article className="product-detail-panel">
              <div className="product-detail-tags" aria-label="Product highlights">
                {(product.detailBadges || product.tags || []).slice(0, 3).map((tag) => <span key={tag}>{String(tag).replace(/-/g, " ")}</span>)}
              </div>
              <p className="product-detail-cat">{product.detailCategory || `${titleCase(product.category)} Ritual`}</p>
              <h1>{product.name}</h1>
              <div className="product-detail-rating"><RatingStars value={product.rating} /><strong>{product.rating}</strong><span>({product.reviewCount || 243} reviews)</span></div>
              <p className="product-detail-short">{product.shortDescription || product.description}</p>
              <p className="product-detail-meta">{product.detailMeta || "AYURVEDIC BLEND + DAILY ROUTINE + MADE IN INDIA"}</p>
              <div className="product-detail-price"><strong>Rs.{product.discountPrice}</strong>{product.price > product.discountPrice && <span>Rs.{product.price}</span>}<small>{Math.round(((product.price - product.discountPrice) / product.price) * 100)}% off</small><em>{product.bottleSize || "60 capsules"}</em></div>
              <p className="product-detail-stock">{product.stockText || "In stock and ready to dispatch"}</p>
              <div className="product-purchase-options">
                <div className="product-purchase-row active"><span>Subscribe & save 15%<small>Delivered monthly - Free shipping</small></span><strong>Rs.{product.subscriptionPrice || Math.round(product.discountPrice * 0.85)}</strong></div>
                <div className="product-purchase-row"><span>One-time purchase</span><strong>Rs.{product.discountPrice}</strong></div>
              </div>
              <div className="product-detail-actions">
                <div className="cart-qty" aria-label="Quantity selector">
                  <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>-</button>
                  <span>{quantity}</span>
                  <button type="button" onClick={() => setQuantity((value) => Math.min(9, value + 1))}>+</button>
                </div>
                <button className="product-detail-cart" type="button" onClick={handleAdd}>
                  <CartIcon />
                  {inCart ? "Update cart" : "Add to cart"}
                </button>
              </div>
              <p className="product-dispatch-note">{product.dispatchText || "1-2 business days dispatch - COD available"}</p>

            </article>
            <div
              className={`product-zoom-panel${zoom.visible ? " show" : ""}`}
              aria-hidden="true"
              style={{ backgroundImage: `url(${zoom.image})`, backgroundPosition: `${zoom.x}% ${zoom.y}%` }}
            />          </div>
        </div>
      </section>
      <section className="product-info-full-section">
        <div className="product-details-wrap">
          <div className="product-detail-accordions product-detail-accordions-full">
            <details open><summary>Benefits</summary><ul>{(product.benefits || []).map((item) => <li key={item}>{item}</li>)}</ul></details>
            <details><summary>Active ingredients</summary><ul>{(product.activeIngredients || []).map((item) => <li key={item}>{item}</li>)}</ul></details>
            <details><summary>How to use</summary><ul>{(product.howToUse || []).map((item) => <li key={item}>{item}</li>)}</ul></details>
          </div>
        </div>
      </section>
      <section className="product-detail-banner-section" aria-label="Product details banner">
        <div className="product-details-wrap">
          <img src="/img/prodetails.jpeg" alt="Ayurvedic product details" loading="lazy" />
        </div>
      </section>
      <section className="fav-section product-related-section">
        <div className="fav-wrap">
          <div className="fav-intro">
            <div className="fav-intro-copy">
              <span className="eyebrow fav-eyebrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.2H22l-6 4.4 2.4 7.2L12 16.4 5.6 20.8 8 13.6 2 9.2h7.6z" /></svg>
                Continue your ritual
              </span>
              <h2>You may also like</h2>
            </div>
            <a href="https://laora-five.vercel.app/collections" className="fav-cta">
              View all
              <span className="fav-cta-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg></span>
            </a>
          </div>
          <div className="fav-grid" id="relatedProductsGrid">
            {relatedProducts.length ? (
              relatedProducts.map((item) => <ProductCard key={item.id} product={item} variant="grid" />)
            ) : (
              <ProductCardSkeleton variant="grid" count={relatedVisibleCount} />
            )}
          </div>
          <a href="https://laora-five.vercel.app/collections" className="fav-cta fav-mobile-cta">
            View all
            <span className="fav-cta-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg></span>
          </a>
        </div>
      </section>
    </>
  );
}
