import { useEffect, useRef, useState } from "react";

const videos = [
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
];

const products = [
  { name: "Virvex", price: "Rs.541", mrp: "Rs.543", poster: "https://images.pexels.com/photos/6220710/pexels-photo-6220710.jpeg?cs=srgb&fm=jpg&w=500", video: videos[0] },
  { name: "Venora", price: "Rs.457", mrp: "Rs.459", poster: "https://images.pexels.com/photos/23511158/pexels-photo-23511158.jpeg?cs=srgb&fm=jpg&w=500", video: videos[1] },
  { name: "Pressova", price: "Rs.457", mrp: "Rs.459", poster: "https://images.pexels.com/photos/32112349/pexels-photo-32112349.jpeg?cs=srgb&fm=jpg&w=500", video: videos[0] },
  { name: "Nestara", price: "Rs.457", mrp: "Rs.459", poster: "https://images.pexels.com/photos/7988011/pexels-photo-7988011.jpeg?cs=srgb&fm=jpg&w=500", video: videos[1] },
  { name: "Livera", price: "Rs.457", mrp: "Rs.459", poster: "https://images.pexels.com/photos/23512149/pexels-photo-23512149.jpeg?cs=srgb&fm=jpg&w=500", video: videos[0] },
  { name: "Femiva", price: "Rs.541", mrp: "Rs.543", poster: "https://images.pexels.com/photos/6220710/pexels-photo-6220710.jpeg?cs=srgb&fm=jpg&w=500", video: videos[1] }
];

function BrandIcon({ index }) {
  const type = index % 3;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {type === 0 && <><path d="M20 4c-9 0-16 7-16 16 9 0 16-7 16-16z" /><path d="M4 20c4-6 8-9 16-16" /></>}
      {type === 1 && <path d="M12 3c4 5 7 8.5 7 12a7 7 0 1 1-14 0c0-3.5 3-7 7-12z" />}
      {type === 2 && <><path d="M12 21V9" /><path d="M12 9C12 5 9 3 5 3c0 4 2.5 6.5 7 6" /><path d="M12 12c0-3.5 2.5-6 6-6 0 3.5-2.2 6-6 6" /></>}
    </svg>
  );
}

function MuteIcon({ muted }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      {muted ? <><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></> : <><path d="M15.5 8.5a5 5 0 0 1 0 7" /><path d="M18.5 6a9 9 0 0 1 0 12" /></>}
    </svg>
  );
}

function PlayIcon({ paused }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      {paused ? <path d="M8 5v14l11-7z" /> : <><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></>}
    </svg>
  );
}

function WatchCard({ product, index }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(false);

  function toggleSound(event) {
    event.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  function togglePlay(event) {
    event.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => { });
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  }

  return (
    <div className="a1-card">
      <div className="a1-video-box" style={{ backgroundImage: `url('${product.poster}')` }}>
        {!failed && <video ref={videoRef} className="a1-vid" src={product.video} poster={product.poster} muted loop playsInline autoPlay preload="metadata" onError={() => setFailed(true)} />}
        {!failed && (
          <div className="a1-controls">
            <button className={`a1-ctrl a1-play${paused ? " on" : ""}`} aria-label="Play or pause" onClick={togglePlay}><PlayIcon paused={paused} /></button>
            <button className={`a1-ctrl a1-sound${!muted ? " on" : ""}`} aria-label="Toggle sound" onClick={toggleSound}><MuteIcon muted={muted} /></button>
          </div>
        )}
        <div className="a1-info">
          <div className="a1-brand"><BrandIcon index={index} /></div>
          <div>
            <div className="a1-name">{product.name}</div>
            <div className="a1-price-row"><span className="a1-price">{product.price}</span><span className="a1-mrp">{product.mrp}</span></div>
          </div>
        </div>
      </div>
      <button className="a1-buy">Buy Now</button>
    </div>
  );
}

export default function WatchShop() {
  const viewportRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  function updateNav() {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    setCanPrev(viewport.scrollLeft > 4);
    setCanNext(viewport.scrollLeft < maxScroll - 4);
  }

  function move(direction) {
    const viewport = viewportRef.current;
    const card = viewport?.querySelector(".a1-card");
    if (!viewport || !card) return;
    const gap = parseFloat(getComputedStyle(viewport.querySelector(".a1-track")).gap || "0");
    viewport.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: "smooth" });
    window.setTimeout(updateNav, 350);
  }

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;
    updateNav();
    viewport.addEventListener("scroll", updateNav, { passive: true });
    window.addEventListener("resize", updateNav);
    return () => {
      viewport.removeEventListener("scroll", updateNav);
      window.removeEventListener("resize", updateNav);
    };
  }, []);

  return (
    <section className="a1-section">
      <div className="sec-head">
        <span className="eyebrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>Real Stories</span>
        <h2>Watch &amp; Shop</h2>
        <p>Hear it straight from people who use it daily - tap in, turn on the sound, shop the ritual.</p>
      </div>
      <div className="a1-wrap">
        {canPrev && <button className="a1-nav left" id="a1Left" aria-label="Previous videos" onClick={() => move(-1)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg></button>}
        {canNext && <button className="a1-nav right" id="a1Right" aria-label="Next videos" onClick={() => move(1)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg></button>}
        <div className="a1-viewport" id="a1Viewport" ref={viewportRef}>
          <div className="a1-track" id="a1Track">
            {products.map((product, index) => <WatchCard product={product} index={index} key={`${product.name}-${index}`} />)}
          </div>
        </div>
      </div>
    </section>
  );
}