import { useEffect, useMemo, useState } from "react";

const slides = [
  ["/img/herobnner3.jpeg", "Pulp Ayurveda hero banner 1"],
  ["/img/herobnner1.jpeg", "Pulp Ayurveda hero banner 2"]
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const reduceMotion = useMemo(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const timer = setInterval(() => setCurrent((value) => (value + 1) % slides.length), 4000);
    return () => clearInterval(timer);
  }, [reduceMotion]);

  return (
    <section className="hero">
      <div className="slider" id="slider">
        {slides.map(([src, alt], index) => (
          <div className={`slide${index === current ? " active" : ""}`} key={src}>
            <img src={src} alt={alt} />
          </div>
        ))}
        <div className="slider-dots" id="sliderDots">
          {slides.slice(0, 3).map(([, alt], index) => (
            <button key={alt} className={index === current % Math.min(slides.length, 3) ? "active" : ""} aria-label={`Go to slide ${index + 1}`} onClick={() => setCurrent(index)} />
          ))}
        </div>
      </div>
    </section>
  );
}


