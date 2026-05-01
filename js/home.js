/* =========================================
   HOME PAGE — JavaScript
   ========================================= */

const FEATURED_PRODUCTS = [
  { id: 1, name: 'ProAir X Wireless Earbuds', price: 89, oldPrice: 129, rating: 4.8, reviews: 1240, emoji: '🎧', badge: 'badge-violet', badgeText: 'Best Seller', cat: 'audio', desc: 'Active noise-cancellation, 36h battery, IPX5 waterproof.' },
  { id: 2, name: 'RajnishWatch Ultra Smartwatch', price: 199, oldPrice: 279, rating: 4.9, reviews: 890, emoji: '⌚', badge: 'badge-cyan', badgeText: 'New Arrival', cat: 'wearables', desc: 'Health tracking, GPS, always-on AMOLED display.' },
  { id: 3, name: 'MechaKey RGB Keyboard', price: 119, oldPrice: 159, rating: 4.7, reviews: 632, emoji: '⌨️', badge: 'badge-amber', badgeText: 'Hot Deal', cat: 'gaming', desc: 'Tactile switches, per-key RGB, aluminum frame.' },
  { id: 4, name: 'LumaCam 4K Action Cam', price: 249, oldPrice: 349, rating: 4.8, reviews: 415, emoji: '📷', badge: 'badge-green', badgeText: 'Sale', cat: 'camera', desc: '4K60fps, 30m waterproof, image stabilization.' },
];

const TESTIMONIALS = [
  { name: 'Sarah K.', tag: 'Tech Enthusiast', text: '"Rajnish is my go-to shop. The earbuds I ordered arrived in 2 days and the sound quality blew me away. Customer service is top tier!"', stars: 5, initial: 'S' },
  { name: 'Marcus T.', tag: 'Verified Buyer', text: '"Ordered a smartwatch as a gift. Packaging was gorgeous and it arrived early. The 30-day return policy gave me total peace of mind."', stars: 5, initial: 'M' },
  { name: 'Priya R.', tag: 'Gaming Pro', text: '"MechaKey keyboard is an absolute beast. Every keystroke is satisfying. Fast shipping and well-packaged. 10/10 would recommend."', stars: 5, initial: 'P' },
];

function buildFeaturedProducts() {
  const grid = document.getElementById('featured-grid');
  if (!grid) return;
  grid.innerHTML = FEATURED_PRODUCTS.map(p => `
    <div class="product-card" id="product-${p.id}" data-reveal>
      <div class="product-img" style="background:linear-gradient(135deg,rgba(124,58,237,0.15),rgba(6,182,212,0.1));">
        <span>${p.emoji}</span>
      </div>
      <div class="product-body">
        <div class="product-meta">
          <span class="badge ${p.badge}">${p.badgeText}</span>
          <span class="product-rating">⭐ ${p.rating} (${p.reviews.toLocaleString()})</span>
        </div>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-price">
          $${p.price} <span class="product-old">$${p.oldPrice}</span>
        </div>
      </div>
      <div class="product-actions">
        <button class="add-to-cart-btn" onclick="addToCart('${p.name}', ${p.price})" id="atc-${p.id}">
          🛒 Add to Cart
        </button>
      </div>
    </div>
  `).join('');
}

function buildTestimonials() {
  const grid = document.getElementById('testimonials-grid');
  if (!grid) return;
  grid.innerHTML = TESTIMONIALS.map((t, i) => `
    <div class="testimonial-card" id="testimonial-${i+1}" data-reveal>
      <div class="testimonial-stars">${'⭐'.repeat(t.stars)}</div>
      <div class="testimonial-text">${t.text}</div>
      <div class="testimonial-author">
        <div class="author-avatar">${t.initial}</div>
        <div>
          <div class="author-name">${t.name}</div>
          <div class="author-tag">${t.tag}</div>
        </div>
      </div>
    </div>
  `).join('');
}

function handleNewsletter(e) {
  e.preventDefault();
  const email = document.getElementById('nl-email').value;
  showToast(`🎉 ${email} subscribed! Welcome to Rajnish.`);
  document.getElementById('nl-form').reset();
}

document.addEventListener('DOMContentLoaded', () => {
  buildFeaturedProducts();
  buildTestimonials();
});
