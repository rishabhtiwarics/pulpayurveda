const data = [
  { img: 47, name: 'Ritu Sharma', text: 'Digestion has never felt this steady since switching.', stars: 5 },
  { img: 12, name: 'Aman Verma', text: 'My father takes the immunity tonic every morning now.', stars: 5 },
  { img: 53, name: 'Dhiresh Battacherjee', text: 'Left pills for this juice — thank you for the product.', stars: 5 },
  { img: 32, name: 'Priya Nair', text: 'Authentic ingredients, you can taste the difference.', stars: 4 },
  { img: 14, name: 'Suresh Iyer', text: 'Fast delivery, packaging keeps everything fresh.', stars: 5 },
  { img: 23, name: 'Meera Das', text: 'Two months in and my energy levels are so much better.', stars: 5 },
];

export default function PulpTestimonials() {
  const repeated = [...data, ...data];

  return (
    <section className="pulp-testimonials-section">
      <div className="pulp-testimonials-head wrap">
        <span className="eyebrow">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.2H22l-6 4.4 2.4 7.2L12 16.4 5.6 20.8 8 13.6 2 9.2h7.6z" /></svg>
          Testimonials
        </span>
        <h2>Loved By Thousands</h2>
        <p>A rolling look at what customers are saying, right now.</p>
           <div className="pulp-testimonials-strip">
        <div className="wrap">
          <div className="pulp-testimonials-track" id="pulpTestimonialsTrack" aria-hidden="false">
            {repeated.map((d, i) => (
              <div className="pulp-testimonial-card" key={`pulp-t-${i}`} aria-hidden={i >= data.length ? 'true' : 'false'}>
                <img src={`https://i.pravatar.cc/100?img=${d.img}`} alt={d.name} />
                <div className="pulp-testimonial-content">
                  <strong>{d.name}</strong>
                  <p>{d.text}</p>
                  <span className="pulp-testimonial-rating">{String.fromCharCode(9733).repeat(d.stars)}{String.fromCharCode(9734).repeat(5-d.stars)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
   
    </section>
  );
}
