/* === AMAZON AFFILIATE LINKS === */
const TECH_LINK      = 'https://amzn.to/42I2xoh';
const AUDIO_LINK     = 'https://amzn.to/4n61KqK';
const WEARABLE_LINK  = 'https://amzn.to/4nahVn2';
const GAMING_LINK    = 'https://amzn.to/4uo3jTg';
const LIFESTYLE_LINK = 'https://amzn.to/4cZp197';
const CAMERA_LINK    = 'https://amzn.to/4n1jfby';
const WOMENS_LINK    = 'https://amzn.to/49i1dfp';
const MENS_LINK      = 'https://amzn.to/4wkHC8y';
const KIDS_LINK      = 'https://amzn.to/4tOtUJn';

const ALL_PRODUCTS = [
  // Tech
  { id:1,  name:'UltraBook Pro 15',         price:1299, oldPrice:1599, rating:4.9, reviews:880,  img:'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80', cat:'tech',      badge:'badge-violet', badgeText:'Best Seller', desc:'Intel i9, 32GB RAM, 4K OLED display.',                        affiliateUrl:TECH_LINK,      ctaText:'Buy on Amazon →' },
  { id:2,  name:'RajnishPad Wireless Charger',  price:49,  oldPrice:79,   rating:4.7, reviews:2100, img:'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=400&q=80', cat:'tech',      badge:'badge-green',  badgeText:'Sale',        desc:'15W fast charge, Qi compatible, sleek design.',               affiliateUrl:TECH_LINK,      ctaText:'Buy on Amazon →' },
  { id:3,  name:'PixelMouse Pro',           price:79,  oldPrice:109,  rating:4.8, reviews:640,  img:'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80', cat:'tech',      badge:'badge-cyan',   badgeText:'New',         desc:'8000 DPI, silent clicks, ergonomic shape.',                   affiliateUrl:TECH_LINK,      ctaText:'Buy on Amazon →' },
  { id:4,  name:'SmartHub 7-in-1 USB-C',   price:59,  oldPrice:89,   rating:4.6, reviews:1350, img:'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&q=80', cat:'tech',      badge:'badge-amber',  badgeText:'Hot',         desc:'HDMI 4K, 3x USB-A, SD card reader.',                         affiliateUrl:TECH_LINK,      ctaText:'Buy on Amazon →' },
  // Audio
  { id:5,  name:'ProAir X Earbuds',         price:89,  oldPrice:129,  rating:4.8, reviews:1240, img:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80', cat:'audio',     badge:'badge-violet', badgeText:'Best Seller', desc:'ANC, 36h battery, IPX5 waterproof.',                          affiliateUrl:AUDIO_LINK,     ctaText:'Buy on Amazon →' },
  { id:6,  name:'BassBlast Speaker',        price:149, oldPrice:199,  rating:4.7, reviews:530,  img:'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80', cat:'audio',     badge:'badge-amber',  badgeText:'Hot Deal',    desc:'360° sound, 24h playtime, waterproof.',                       affiliateUrl:AUDIO_LINK,     ctaText:'Buy on Amazon →' },
  { id:7,  name:'StudioMic USB',            price:109, oldPrice:149,  rating:4.9, reviews:760,  img:'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&q=80', cat:'audio',     badge:'badge-green',  badgeText:'Top Rated',   desc:'Cardioid condenser, 192kHz, plug & play.',                    affiliateUrl:AUDIO_LINK,     ctaText:'Buy on Amazon →' },
  { id:8,  name:'SonicWrap Headphones',     price:199, oldPrice:279,  rating:4.8, reviews:420,  img:'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80', cat:'audio',     badge:'badge-cyan',   badgeText:'New',         desc:'Planar magnetic drivers, 50mm, foldable.',                    affiliateUrl:AUDIO_LINK,     ctaText:'Buy on Amazon →' },
  // Wearables
  { id:9,  name:'RajnishWatch Ultra',           price:199, oldPrice:279,  rating:4.9, reviews:890,  img:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80', cat:'wearables', badge:'badge-cyan',   badgeText:'New Arrival', desc:'Health tracking, GPS, AMOLED.',                              affiliateUrl:WEARABLE_LINK,  ctaText:'Buy on Amazon →' },
  { id:10, name:'FitBand Pro X',            price:69,  oldPrice:99,   rating:4.6, reviews:1820, img:'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&q=80', cat:'wearables', badge:'badge-green',  badgeText:'Sale',        desc:'Heart rate, SpO2, 14-day battery.',                          affiliateUrl:WEARABLE_LINK,  ctaText:'Buy on Amazon →' },
  { id:11, name:'SmartRing Health',         price:299, oldPrice:399,  rating:4.8, reviews:310,  img:'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&q=80', cat:'wearables', badge:'badge-violet', badgeText:'Premium',     desc:'Continuous health monitoring, titanium.',                    affiliateUrl:WEARABLE_LINK,  ctaText:'Buy on Amazon →' },
  { id:12, name:'AR Glasses Lite',          price:449, oldPrice:599,  rating:4.5, reviews:180,  img:'https://images.unsplash.com/photo-1617802690658-1173a812650d?w=400&q=80', cat:'wearables', badge:'badge-amber',  badgeText:'Featured',    desc:'25° FoV, 3h battery, lightweight 35g.',                      affiliateUrl:WEARABLE_LINK,  ctaText:'Buy on Amazon →' },
  // Gaming
  { id:13, name:'MechaKey RGB Keyboard',   price:119, oldPrice:159,  rating:4.7, reviews:632,  img:'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80', cat:'gaming',    badge:'badge-amber',  badgeText:'Hot Deal',    desc:'Tactile switches, per-key RGB, aluminum.',                   affiliateUrl:GAMING_LINK,    ctaText:'Buy on Amazon →' },
  { id:14, name:'ProPad Elite Controller', price:89,  oldPrice:119,  rating:4.8, reviews:940,  img:'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&q=80', cat:'gaming',    badge:'badge-violet', badgeText:'Best Seller', desc:'Hall-effect sticks, 40h battery, PC+Console.',               affiliateUrl:GAMING_LINK,    ctaText:'Buy on Amazon →' },
  { id:15, name:'TrackX Gaming Mouse',     price:69,  oldPrice:99,   rating:4.9, reviews:1500, img:'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&q=80', cat:'gaming',    badge:'badge-green',  badgeText:'Top Rated',   desc:'16000 DPI, 7 buttons, ultralight 58g.',                      affiliateUrl:GAMING_LINK,    ctaText:'Buy on Amazon →' },
  { id:16, name:'SuroundX Gaming Headset', price:99,  oldPrice:139,  rating:4.7, reviews:720,  img:'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&q=80', cat:'gaming',    badge:'badge-cyan',   badgeText:'New',         desc:'7.1 surround, memory foam, retractable mic.',                affiliateUrl:GAMING_LINK,    ctaText:'Buy on Amazon →' },
  // Lifestyle
  { id:17, name:'AirPurify Pro',           price:179, oldPrice:249,  rating:4.8, reviews:540,  img:'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80', cat:'lifestyle', badge:'badge-green',  badgeText:'Eco Pick',    desc:'HEPA H13, 600sqft coverage, app-controlled.',                affiliateUrl:LIFESTYLE_LINK, ctaText:'Buy on Amazon →' },
  { id:18, name:'DeskOrganizer Bamboo',    price:39,  oldPrice:59,   rating:4.6, reviews:1200, img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', cat:'lifestyle', badge:'badge-amber',  badgeText:'Sale',        desc:'Sustainable bamboo, 6 compartments.',                        affiliateUrl:LIFESTYLE_LINK, ctaText:'Buy on Amazon →' },
  { id:19, name:'LightBar Sunrise Alarm',  price:89,  oldPrice:119,  rating:4.7, reviews:870,  img:'https://images.unsplash.com/photo-1513506003901-1e6a35253a22?w=400&q=80', cat:'lifestyle', badge:'badge-violet', badgeText:'Featured',    desc:'Gradual sunrise, Spotify, 20 sound modes.',                  affiliateUrl:LIFESTYLE_LINK, ctaText:'Buy on Amazon →' },
  { id:20, name:'HydroTrack Smart Bottle', price:49,  oldPrice:69,   rating:4.5, reviews:2300, img:'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80', cat:'lifestyle', badge:'badge-cyan',   badgeText:'Popular',     desc:'LED hydration reminder, 600ml, BPA-free.',                   affiliateUrl:LIFESTYLE_LINK, ctaText:'Buy on Amazon →' },
  // Camera
  { id:21, name:'LumaCam 4K Action',       price:249, oldPrice:349,  rating:4.8, reviews:415,  img:'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&q=80', cat:'camera',    badge:'badge-green',  badgeText:'Sale',        desc:'4K60fps, 30m waterproof, stabilization.',                    affiliateUrl:CAMERA_LINK,    ctaText:'Buy on Amazon →' },
  { id:22, name:'SnapDrone Mini 4K',       price:399, oldPrice:549,  rating:4.7, reviews:260,  img:'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&q=80', cat:'camera',    badge:'badge-violet', badgeText:'Premium',     desc:'4K HDR, 30min flight, obstacle avoidance.',                  affiliateUrl:CAMERA_LINK,    ctaText:'Buy on Amazon →' },
  { id:23, name:'VlogKit Wide-Angle Lens', price:79,  oldPrice:109,  rating:4.6, reviews:680,  img:'https://images.unsplash.com/photo-1617048986542-de3b1e1e8d46?w=400&q=80', cat:'camera',    badge:'badge-amber',  badgeText:'Hot',         desc:'17mm equivalent, 4K compatible, clip-on.',                   affiliateUrl:CAMERA_LINK,    ctaText:'Buy on Amazon →' },
  { id:24, name:'TripodFlex Carbon',       price:119, oldPrice:159,  rating:4.8, reviews:490,  img:'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80', cat:'camera',    badge:'badge-cyan',   badgeText:'New',         desc:'Carbon fibre, 2kg load, 180° ball head.',                    affiliateUrl:CAMERA_LINK,    ctaText:'Buy on Amazon →' },
  // Women's Fashion
  { id:25, name:"Women's Dresses",          price:null, oldPrice:null, rating:4.8, reviews:1240, img:'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80', cat:'women-fashion', badge:'badge-pink',   badgeText:"Women's Pick",  desc:'Sarees, kurtis, dresses & tops — everyday wear to party outfits.', affiliateUrl:WOMENS_LINK, ctaText:'Shop on Amazon →', priceLabel:'View on Amazon' },
  { id:26, name:"Women's Ethnic Wear",      price:null, oldPrice:null, rating:4.7, reviews:980,  img:'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80', cat:'women-fashion', badge:'badge-pink',   badgeText:'Trending',       desc:'Lehengas, anarkalis & salwar suits curated for every occasion.', affiliateUrl:WOMENS_LINK, ctaText:'Shop on Amazon →', priceLabel:'View on Amazon' },
  { id:27, name:"Women's Western Tops",     price:null, oldPrice:null, rating:4.6, reviews:760,  img:'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80', cat:'women-fashion', badge:'badge-cyan',   badgeText:'New Arrivals',   desc:'Casual and formal tops, blouses & shirts in premium fabrics.', affiliateUrl:WOMENS_LINK, ctaText:'Shop on Amazon →', priceLabel:'View on Amazon' },
  // Men's Fashion
  { id:28, name:"Men's Formal Shirts",      price:null, oldPrice:null, rating:4.8, reviews:1450, img:'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80', cat:'men-fashion', badge:'badge-blue',   badgeText:"Men's Pick",    desc:'Crisp formal & semi-formal shirts for office and events.', affiliateUrl:MENS_LINK, ctaText:'Shop on Amazon →', priceLabel:'View on Amazon' },
  { id:29, name:"Men's Ethnic Wear",        price:null, oldPrice:null, rating:4.7, reviews:830,  img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', cat:'men-fashion', badge:'badge-violet', badgeText:'Trending',       desc:'Kurtas, sherwanis & dhoti sets for festive and wedding looks.', affiliateUrl:MENS_LINK, ctaText:'Shop on Amazon →', priceLabel:'View on Amazon' },
  { id:30, name:"Men's Casual & Sports",    price:null, oldPrice:null, rating:4.6, reviews:1100, img:'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&q=80', cat:'men-fashion', badge:'badge-green',  badgeText:'Active Wear',    desc:'T-shirts, joggers, track pants & hoodies for everyday comfort.', affiliateUrl:MENS_LINK, ctaText:'Shop on Amazon →', priceLabel:'View on Amazon' },
  // Kids' Fashion
  { id:31, name:"Kids' Clothing Set",       price:null, oldPrice:null, rating:4.9, reviews:2100, img:'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&q=80', cat:'kids-fashion', badge:'badge-amber', badgeText:"Kids' Pick",    desc:'Fun & colourful clothing sets for boys and girls (2–12 yrs).', affiliateUrl:KIDS_LINK, ctaText:'Shop on Amazon →', priceLabel:'View on Amazon' },
  { id:32, name:"Kids' Ethnic Wear",        price:null, oldPrice:null, rating:4.7, reviews:640,  img:'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&q=80', cat:'kids-fashion', badge:'badge-pink',   badgeText:'Festival Ready', desc:'Tiny lehengas, sherwanis & traditional sets for celebrations.', affiliateUrl:KIDS_LINK, ctaText:'Shop on Amazon →', priceLabel:'View on Amazon' },
  { id:33, name:"Baby & Toddler Essentials",price:null, oldPrice:null, rating:4.8, reviews:890,  img:'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400&q=80', cat:'kids-fashion', badge:'badge-cyan',   badgeText:'Adorable',       desc:'Rompers, sleepsuits & accessories for 0–3 year olds.', affiliateUrl:KIDS_LINK, ctaText:'Shop on Amazon →', priceLabel:'View on Amazon' },
];

let filtered = [...ALL_PRODUCTS];
let activeCat = 'all';
let searchQuery = '';
let sortBy = 'featured';

function renderProducts() {
  let list = ALL_PRODUCTS.filter(p => {
    const matchCat = activeCat === 'all' || p.cat === activeCat;
    const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery) || p.desc.toLowerCase().includes(searchQuery);
    return matchCat && matchSearch;
  });

  if (sortBy === 'price-asc')  list.sort((a,b) => comparePrices(a, b, 'asc'));
  if (sortBy === 'price-desc') list.sort((a,b) => comparePrices(a, b, 'desc'));
  if (sortBy === 'rating')     list.sort((a,b) => b.rating - a.rating);
  if (sortBy === 'newest')     list.sort((a,b) => b.id - a.id);

  const grid = document.getElementById('products-grid');
  const empty = document.getElementById('empty-state');
  const cnt   = document.getElementById('count-label');

  cnt.textContent = list.length;

  if (!list.length) {
    grid.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  grid.innerHTML = list.map((p, i) => {
    const hasPrice = Number.isFinite(p.price);
    const hasOldPrice = Number.isFinite(p.oldPrice);
    const save = hasPrice && hasOldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : null;
    const priceHtml = hasPrice
      ? `<span class="p-price-now">$${p.price}</span>
            ${hasOldPrice ? `<span class="p-price-old">$${p.oldPrice}</span>` : ''}
            ${save ? `<span class="p-save">-${save}%</span>` : ''}`
      : `<span class="p-price-now">${p.priceLabel || 'View offer'}</span>`;
    const actionHtml = p.affiliateUrl
      ? `<a class="p-add-btn p-link-btn" href="${p.affiliateUrl}" target="_blank" rel="sponsored noopener noreferrer" id="add-${p.id}">${p.ctaText || 'Shop Now'}</a>`
      : `<button class="p-add-btn" onclick="addToCart('${p.name.replace(/'/g,"\\'")}', ${p.price})" id="add-${p.id}">
            🛒 Add to Cart
          </button>`;
    return `
      <div class="p-card" id="p-card-${p.id}" style="animation-delay:${i * 0.04}s">
        <div class="p-img">${p.img ? `<img src="${p.img}" alt="${p.name}" loading="lazy" />` : (p.emoji||'🛒')}</div>
        <div class="p-body">
          <div class="p-meta">
            <span class="badge ${p.badge}">${p.badgeText}</span>
            <span class="p-rating">⭐ ${p.rating}</span>
          </div>
          <div class="p-name">${p.name}</div>
          <div class="p-desc">${p.desc}</div>
          <div class="p-price">
            ${priceHtml}
          </div>
        </div>
        <div class="p-actions">
          ${actionHtml}
        </div>
      </div>`;
  }).join('');
}

function comparePrices(a, b, direction) {
  const aHasPrice = Number.isFinite(a.price);
  const bHasPrice = Number.isFinite(b.price);

  if (!aHasPrice && !bHasPrice) return 0;
  if (!aHasPrice) return 1;
  if (!bHasPrice) return -1;

  return direction === 'asc' ? a.price - b.price : b.price - a.price;
}

function resetFilters() {
  activeCat = 'all';
  searchQuery = '';
  sortBy = 'featured';
  document.getElementById('search-input').value = '';
  document.getElementById('sort-select').value = 'featured';
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  document.querySelector('[data-cat="all"]').classList.add('active');
  renderProducts();
}

document.addEventListener('DOMContentLoaded', () => {
  // Check URL params for category
  const params = new URLSearchParams(location.search);
  const urlCat = params.get('cat');
  if (urlCat) {
    activeCat = urlCat;
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    const btn = document.querySelector(`[data-cat="${urlCat}"]`);
    if (btn) btn.classList.add('active');
  }

  renderProducts();

  // Filter pills
  document.querySelectorAll('.pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      activeCat = btn.dataset.cat;
      renderProducts();
    });
  });

  // Search
  document.getElementById('search-input').addEventListener('input', e => {
    searchQuery = e.target.value.trim().toLowerCase();
    renderProducts();
  });

  // Sort
  document.getElementById('sort-select').addEventListener('change', e => {
    sortBy = e.target.value;
    renderProducts();
  });
});
