import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrandLogo } from './components/BrandLogo.jsx';
import { IconoirIcon } from './components/IconoirIcon.jsx';
import { categories, categoryFilters, featuredProducts, products } from './data/catalog.js';
import { downloadAnalyticsWorkbook, trackEvent, unlockAnalyticsDashboard } from './lib/analytics.js';
import './styles.css';

const routes = [
  { id: 'home', label: 'Home', hash: '#/' },
  { id: 'products', label: 'Products', hash: '#/products' },
  { id: 'about', label: 'About', hash: '#/about' },
  { id: 'contact', label: 'Contact', hash: '#/contact' }
];

const legalRoutes = [
  { label: 'Privacy Policy', hash: '#/privacy-policy' },
  { label: 'Affiliate Disclosure', hash: '#/affiliate-disclosure' }
];

function normalizeRoute(hash) {
  const current = hash || '#/';
  if (current === '#') return '/';
  return current.replace(/^#/, '') || '/';
}

function useHashRoute() {
  const [route, setRoute] = useState(normalizeRoute(window.location.hash));

  useEffect(() => {
    const handle = () => setRoute(normalizeRoute(window.location.hash));
    window.addEventListener('hashchange', handle);
    if (!window.location.hash) window.history.replaceState(null, '', '#/');
    return () => window.removeEventListener('hashchange', handle);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [route]);

  return route;
}

function externalProps() {
  return {
    target: '_blank',
    rel: 'sponsored noopener noreferrer'
  };
}

function affiliateTrackingProps(payload) {
  return {
    ...externalProps(),
    onClick: () => trackEvent('affiliate_click', payload)
  };
}

function Header({ route }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [route]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/92 backdrop-blur-xl">
      <div className="container-page flex h-20 items-center justify-between">
        <a href="#/" className="flex items-center gap-3" aria-label="Rajnish Store home">
          <BrandLogo />
        </a>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Main navigation">
          {routes.map((item) => (
            <a
              key={item.id}
              href={item.hash}
              className={`nav-link ${route === item.hash.replace('#', '') ? 'nav-link-active' : ''}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href="#/affiliate-disclosure" className="fine-link">
            Affiliate disclosure
          </a>
          <a href="#/products" className="btn-primary">
            Browse products <IconoirIcon name="arrowRight" size={16} />
          </a>
        </div>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-charcoal md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <IconoirIcon name={open ? 'xmark' : 'menu'} size={20} />
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-white md:hidden">
          <nav className="container-page grid gap-2 py-5" aria-label="Mobile navigation">
            {[...routes, ...legalRoutes].map((item) => (
              <a key={item.hash} href={item.hash} className="rounded-xl px-4 py-3 text-sm font-bold text-charcoal hover:bg-wheat">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <div className="flex items-center gap-3">
              <BrandLogo />
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate">
              A clean affiliate storefront for practical Amazon finds across fashion, electronics, groceries and home essentials.
            </p>
            <p className="mt-4 rounded-xl bg-wheat px-4 py-3 text-xs leading-6 text-slate">
              As an affiliate site, we may earn a commission from qualifying purchases at no extra cost to you.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <FooterColumn title="Shop">
              <a href="#/products">All products</a>
              {categories.map((category) => (
                <a
                  key={category.id}
                  href={category.href}
                  {...affiliateTrackingProps({
                    label: `Footer: ${category.label}`,
                    href: category.href,
                    category: category.id
                  })}
                >
                  {category.label}
                </a>
              ))}
            </FooterColumn>
            <FooterColumn title="Company">
              {routes.map((item) => (
                <a key={item.hash} href={item.hash}>
                  {item.label}
                </a>
              ))}
            </FooterColumn>
            <FooterColumn title="Legal">
              {legalRoutes.map((item) => (
                <a key={item.hash} href={item.hash}>
                  {item.label}
                </a>
              ))}
              <a href="#/contact">Questions</a>
            </FooterColumn>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs font-semibold text-slate sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Rajnish Store. All rights reserved.</span>
          <span>Affiliate-first shopping experience. No cart, no checkout, no hidden fees.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-extrabold uppercase tracking-[0.16em] text-charcoal">{title}</h3>
      <div className="grid gap-3 text-sm font-semibold text-slate [&_a:hover]:text-saffronDark">{children}</div>
    </div>
  );
}

function AffiliateButton({ href, children, className = 'btn-primary' }) {
  return (
    <a
      href={href}
      className={className}
      {...affiliateTrackingProps({
        label: typeof children === 'string' ? children : 'Affiliate CTA',
        href
      })}
    >
      {children}
      <IconoirIcon name="arrowUpRight" size={16} />
    </a>
  );
}

function DisclosureCallout() {
  return (
    <div className="surface-card flex flex-col gap-4 bg-mist p-5 sm:flex-row sm:items-start">
      <IconoirIcon name="shieldCheck" size={24} className="mt-1 text-mint" />
      <div>
        <p className="font-bold text-charcoal">Affiliate transparency</p>
        <p className="mt-1 text-sm leading-6 text-slate">
          Rajnish Store curates Amazon links. When you buy after clicking, we may earn a small commission without changing your purchase price.
        </p>
      </div>
    </div>
  );
}

function TrustStrip() {
  const items = [
    { icon: 'shieldCheck', title: 'Clear affiliate links', copy: 'Every external shopping button opens Amazon directly.' },
    { icon: 'truck', title: 'Amazon fulfilment', copy: 'Delivery, returns and pricing are handled by Amazon.' },
    { icon: 'checkCircle', title: 'Useful categories', copy: 'Fashion, groceries, tech and home picks in one place.' }
  ];

  return (
    <section className="border-y border-line bg-white">
      <div className="container-page grid gap-4 py-8 md:grid-cols-3">
        {items.map((item) => {
          return (
            <div key={item.title} className="flex gap-4 rounded-2xl bg-paper p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-charcoal text-white">
                <IconoirIcon name={item.icon} size={19} />
              </span>
              <div>
                <p className="font-bold text-charcoal">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-slate">{item.copy}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CategoryGrid({ compact = false }) {
  return (
    <div className={`grid gap-4 ${compact ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
      {categories.map((category) => (
        <a
          key={category.id}
          href={category.href}
          className="group overflow-hidden rounded-2xl border border-line bg-white shadow-card transition hover:-translate-y-1 hover:shadow-soft"
          {...affiliateTrackingProps({
            label: `Category card: ${category.label}`,
            href: category.href,
            category: category.id
          })}
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-wheat">
            <img
              src={category.image}
              alt={category.label}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <div className="p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="flex items-center gap-2 text-lg font-extrabold text-charcoal">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-wheat text-saffronDark">
                  <IconoirIcon name={category.icon} size={18} />
                </span>
                {category.label}
              </h3>
              <IconoirIcon name="arrowUpRight" size={17} className="mt-1 text-slate transition group-hover:text-saffron" />
            </div>
            <p className="mt-2 text-sm leading-6 text-slate">{category.description}</p>
            <span className="mt-4 inline-flex rounded-full bg-wheat px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-saffronDark">
              Shop Amazon
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <article className="surface-card group flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-[4/3] overflow-hidden bg-wheat">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(event) => {
            event.currentTarget.style.display = 'none';
          }}
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-extrabold text-charcoal shadow-card">
          {product.badge}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-[0.14em] text-slate">
          <span>{product.categoryShortLabel}</span>
          <span className="inline-flex items-center gap-1 text-saffronDark">
            <IconoirIcon name="star" size={14} />
            {product.rating}
          </span>
        </div>
        <h3 className="text-lg font-extrabold leading-tight text-charcoal">{product.name}</h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate">{product.description}</p>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
          <span className="text-sm font-bold text-mint">{product.priceLabel}</span>
          <a
            href={product.affiliateUrl}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-charcoal px-4 py-2 text-xs font-bold text-white transition hover:bg-saffronDark"
            {...affiliateTrackingProps({
              label: `Product: ${product.name}`,
              href: product.affiliateUrl,
              category: product.category,
              productId: product.id
            })}
          >
            Open
            <IconoirIcon name="arrowUpRight" size={14} />
          </a>
        </div>
      </div>
    </article>
  );
}

function Hero() {
  const spotlight = categories.slice(0, 5);
  return (
    <section className="container-page grid gap-10 pb-16 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-24 lg:pt-18">
      <div>
        <span className="eyebrow">
          <IconoirIcon name="sparks" size={14} />
          Curated Amazon finds for India
        </span>
        <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[0.95] tracking-tight text-charcoal sm:text-6xl lg:text-7xl">
          A cleaner way to shop useful everyday finds.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate">
          Rajnish Store brings fashion, tech, groceries, dry fruits and lifestyle picks into one calm, professional Amazon affiliate storefront.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#/products" className="btn-primary">
            Explore all products <IconoirIcon name="arrowRight" size={17} />
          </a>
          <a href="#/affiliate-disclosure" className="btn-secondary">
            How affiliate links work
          </a>
        </div>
        <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
          {[
            ['35+', 'Curated picks'],
            ['11', 'Categories'],
            ['0', 'Checkout friction']
          ].map(([value, label]) => (
            <div key={label} className="rounded-2xl border border-line bg-white p-4">
              <p className="font-display text-3xl font-bold text-charcoal">{value}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-slate">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="surface-card overflow-hidden p-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {spotlight.map((category, index) => (
            <a
              key={category.id}
              href={category.href}
              className={`group relative overflow-hidden rounded-2xl bg-wheat ${index === 0 ? 'sm:col-span-2' : ''}`}
              {...affiliateTrackingProps({
                label: `Hero category: ${category.label}`,
                href: category.href,
                category: category.id
              })}
            >
              <img
                src={category.image}
                alt={category.label}
                loading="lazy"
                className={`w-full object-cover transition duration-500 group-hover:scale-105 ${index === 0 ? 'h-60' : 'h-36'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                  <IconoirIcon name={category.icon} size={15} />
                  Shop category
                </p>
                <p className="mt-1 text-xl font-extrabold">{category.label}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <section className="container-page py-16 lg:py-24">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">Browse</span>
            <h2 className="section-title mt-4">Shop by category</h2>
          </div>
          <p className="section-copy">
            Direct category links for the collections shoppers visit most, from groceries and dry fruits to fashion and gadgets.
          </p>
        </div>
        <CategoryGrid />
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="container-page">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow">Trending</span>
              <h2 className="section-title mt-4">Popular Amazon finds</h2>
            </div>
            <a href="#/products" className="btn-secondary">
              View full catalog <IconoirIcon name="arrowRight" size={16} />
            </a>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 lg:py-24">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div className="surface-card overflow-hidden bg-charcoal p-8 text-white lg:p-12">
            <span className="inline-flex rounded-full border border-white/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white/70">
              Essentials
            </span>
            <h2 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl">Grocery and dry-fruit picks for everyday Indian homes.</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/72">
              Keep daily shopping practical with direct Amazon links for pantry staples, healthy snacks and gifting packs.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <AffiliateButton href={categories.find((item) => item.id === 'groceries').href}>Shop groceries</AffiliateButton>
              <AffiliateButton href={categories.find((item) => item.id === 'dry-fruits').href} className="btn-secondary border-white/20 bg-white text-charcoal hover:bg-wheat">
                Shop dry fruits
              </AffiliateButton>
            </div>
          </div>
          <DisclosureCallout />
        </div>
      </section>
    </>
  );
}

function ProductsPage() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sort, setSort] = useState('featured');

  const visibleProducts = useMemo(() => {
    const search = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      const matchesSearch =
        !search ||
        [product.name, product.description, product.categoryLabel, product.badge]
          .join(' ')
          .toLowerCase()
          .includes(search);
      return matchesCategory && matchesSearch;
    });

    return [...filtered].sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'reviews') return b.reviews - a.reviews;
      if (sort === 'name') return a.name.localeCompare(b.name);
      return a.id - b.id;
    });
  }, [activeCategory, query, sort]);

  return (
    <main>
      <PageHero
        eyebrow="Products"
        title="Curated Amazon catalog"
        copy="Search and filter direct affiliate picks. Every product opens Amazon in a new tab for current pricing, availability and delivery details."
      />

      <section className="container-page pb-16 lg:pb-24">
        <div className="surface-card mb-8 grid gap-4 p-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <label className="flex items-center gap-3 rounded-2xl border border-line bg-paper px-4 py-3">
            <IconoirIcon name="search" size={19} className="text-slate" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search fashion, groceries, headphones..."
              className="w-full bg-transparent text-sm font-semibold text-charcoal outline-none placeholder:text-slate"
              aria-label="Search products"
            />
          </label>
          <label className="flex items-center gap-3 rounded-2xl border border-line bg-paper px-4 py-3">
            <IconoirIcon name="filter" size={18} className="text-slate" />
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="bg-transparent text-sm font-bold text-charcoal outline-none"
              aria-label="Sort products"
            >
              <option value="featured">Featured order</option>
              <option value="rating">Top rated</option>
              <option value="reviews">Most reviewed</option>
              <option value="name">Name A-Z</option>
            </select>
          </label>
          <div className="flex flex-wrap gap-2 lg:col-span-2">
            {categoryFilters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveCategory(filter.id)}
                className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                  activeCategory === filter.id
                    ? 'border-charcoal bg-charcoal text-white'
                    : 'border-line bg-white text-slate hover:border-charcoal hover:text-charcoal'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-5 flex items-center justify-between gap-4 text-sm text-slate">
          <p>
            Showing <strong className="text-charcoal">{visibleProducts.length}</strong> products
          </p>
          <a href="#/affiliate-disclosure" className="fine-link">
            Affiliate disclosure
          </a>
        </div>

        {visibleProducts.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="surface-card py-16 text-center">
            <p className="font-display text-3xl font-bold text-charcoal">No matching products</p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate">Try a different category or search term.</p>
            <button
              className="btn-secondary mt-6"
              type="button"
              onClick={() => {
                setQuery('');
                setActiveCategory('all');
              }}
            >
              Reset filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

function PageHero({ eyebrow, title, copy }) {
  return (
    <section className="container-page pb-10 pt-12 lg:pb-14 lg:pt-18">
      <span className="eyebrow">{eyebrow}</span>
      <h1 className="mt-5 max-w-4xl font-display text-5xl font-bold leading-none tracking-tight text-charcoal sm:text-6xl">{title}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-slate">{copy}</p>
    </section>
  );
}

function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About"
        title="A focused affiliate storefront, built for practical shopping."
        copy="Rajnish Store is designed around one simple promise: make useful Amazon categories easier to browse without pretending to be a full checkout platform."
      />
      <section className="container-page grid gap-6 pb-16 lg:grid-cols-3 lg:pb-24">
        {[
          ['Curated, not cluttered', 'We group products into meaningful categories so shoppers can move quickly from interest to Amazon.'],
          ['India-focused browsing', 'Fashion, groceries, dry fruits and everyday tech are presented for common Indian household needs.'],
          ['Transparent affiliate model', 'The store earns through qualifying purchases, with no extra cost added by this website.']
        ].map(([title, copy]) => (
          <div key={title} className="surface-card p-7">
            <IconoirIcon name="checkCircle" size={26} className="text-mint" />
            <h2 className="mt-5 text-xl font-extrabold text-charcoal">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate">{copy}</p>
          </div>
        ))}
      </section>
    </main>
  );
}

function ContactPage() {
  const [secretClicks, setSecretClicks] = useState(0);
  const [showCodePrompt, setShowCodePrompt] = useState(false);
  const [code, setCode] = useState('');
  const [dashboardCode, setDashboardCode] = useState('');
  const [dashboard, setDashboard] = useState(null);
  const [dashboardError, setDashboardError] = useState('');
  const [dashboardLoading, setDashboardLoading] = useState(false);

  function handleSecretContextMenu(event) {
    event.preventDefault();
    const next = secretClicks + 1;
    setSecretClicks(next);
    if (next >= 4) {
      setShowCodePrompt(true);
      setSecretClicks(0);
      trackEvent('admin_dashboard_trigger', { label: 'Rajnish Shops right click sequence' });
    }
  }

  async function handleDashboardUnlock(event) {
    event.preventDefault();
    setDashboardError('');
    setDashboardLoading(true);
    try {
      const enteredCode = code.trim();
      const data = await unlockAnalyticsDashboard(enteredCode);
      setDashboard(data);
      setDashboardCode(enteredCode);
      setShowCodePrompt(false);
      setCode('');
      trackEvent('admin_dashboard_unlocked', { label: 'Analytics dashboard opened' });
    } catch (error) {
      setDashboardError(error.message);
    } finally {
      setDashboardLoading(false);
    }
  }

  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Questions, corrections or partnership ideas?"
        copy="Reach out if an affiliate link needs updating, a category should be added, or you want to suggest useful Amazon collections."
      />
      <section className="container-page grid gap-6 pb-16 lg:grid-cols-[0.85fr_1.15fr] lg:pb-24">
        <div className="surface-card p-7">
          <IconoirIcon name="mail" size={28} className="text-saffronDark" />
          <h2 className="mt-5 text-2xl font-extrabold text-charcoal">Email</h2>
          <a
            href="mailto:rajoyadav1419@gmail.com"
            className="mt-3 block text-lg font-bold text-saffronDark"
            onClick={() => trackEvent('contact_click', { label: 'Contact email', href: 'mailto:rajoyadav1419@gmail.com' })}
          >
            rajoyadav1419@gmail.com
          </a>
          <p className="mt-5 text-sm leading-7 text-slate">
            For best results, include the page name, product/category name, and the link you want us to check.
          </p>
        </div>
        <div className="surface-card p-7">
          <h2 className="text-2xl font-extrabold text-charcoal">Helpful details</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              ['Affiliate updates', 'Send the old and new Amazon short link.'],
              ['Category requests', 'Share category name, audience and target link.'],
              ['Product issues', 'Mention the product card and what looks wrong.'],
              ['Disclosure questions', 'Ask anything about how this affiliate site earns.']
            ].map(([title, copy]) => (
              <div key={title} className="rounded-2xl border border-line bg-paper p-5">
                <p className="font-bold text-charcoal">{title}</p>
                <p className="mt-2 text-sm leading-6 text-slate">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page pb-16 lg:pb-24">
        <button
          type="button"
          onContextMenu={handleSecretContextMenu}
          className="surface-card flex w-full items-center justify-between gap-5 p-6 text-left transition hover:-translate-y-1 hover:shadow-soft"
          aria-label="Rajnish Shops analytics access"
        >
          <span className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-charcoal text-white">
              <IconoirIcon name="shopWindow" size={23} />
            </span>
            <span>
              <span className="block text-xl font-extrabold text-charcoal">Rajnish Shops</span>
              <span className="block text-sm text-slate">Internal owner access point</span>
            </span>
          </span>
          <span className="hidden rounded-full bg-wheat px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-slate sm:inline-flex">
            Owner tools
          </span>
        </button>
      </section>

      {showCodePrompt && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-charcoal/50 px-5 backdrop-blur-sm">
          <form onSubmit={handleDashboardUnlock} className="w-full max-w-md rounded-3xl border border-line bg-white p-6 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-saffronDark">Analytics access</p>
                <h2 className="mt-2 text-2xl font-extrabold text-charcoal">Enter dashboard code</h2>
              </div>
              <button type="button" className="rounded-full border border-line p-2 text-slate hover:text-charcoal" onClick={() => setShowCodePrompt(false)}>
                <IconoirIcon name="xmark" size={18} />
              </button>
            </div>
            <input
              value={code}
              onChange={(event) => setCode(event.target.value)}
              className="mt-6 w-full rounded-2xl border border-line bg-paper px-4 py-3 text-sm font-bold text-charcoal outline-none focus:border-saffron"
              placeholder="Enter code"
              autoFocus
            />
            {dashboardError && <p className="mt-3 text-sm font-semibold text-red-700">{dashboardError}</p>}
            <button type="submit" className="btn-primary mt-5 w-full" disabled={dashboardLoading}>
              {dashboardLoading ? 'Checking...' : 'Open analytics dashboard'}
            </button>
            <p className="mt-4 text-xs leading-5 text-slate">
              This dashboard is only available when the analytics server is running with stored event data.
            </p>
          </form>
        </div>
      )}

      {dashboard && (
        <AnalyticsDashboard
          code={dashboardCode}
          data={dashboard}
          onClose={() => {
            setDashboard(null);
            setDashboardCode('');
          }}
        />
      )}
    </main>
  );
}

function formatLocation(location = {}) {
  const parts = [location.city, location.region, location.country].filter(Boolean);
  return parts.length ? parts.join(', ') : location.status === 'local' ? 'Local network' : 'Unknown';
}

function AnalyticsDashboard({ code, data, onClose }) {
  const [exportLoading, setExportLoading] = useState(false);
  const [exportError, setExportError] = useState('');
  const summary = data.summary || {};
  const events = data.events || [];

  async function handleWorkbookDownload() {
    setExportError('');
    setExportLoading(true);
    try {
      await downloadAnalyticsWorkbook(code);
      trackEvent('admin_dashboard_export', { label: 'Analytics XLSX downloaded' });
    } catch (error) {
      setExportError(error.message);
    } finally {
      setExportLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto bg-charcoal/55 px-4 py-6 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl rounded-3xl border border-line bg-white shadow-soft">
        <div className="sticky top-0 z-10 flex flex-col gap-4 border-b border-line bg-white/95 p-5 backdrop-blur md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-saffronDark">Owner analytics</p>
            <h2 className="mt-1 text-3xl font-extrabold text-charcoal">Rajnish Store access dashboard</h2>
            <p className="mt-1 text-sm text-slate">
              Last updated: {summary.lastUpdated ? new Date(summary.lastUpdated).toLocaleString() : 'Now'}
              {summary.workbook ? ` | Database: ${summary.workbook}` : ''}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={handleWorkbookDownload} className="btn-primary" disabled={exportLoading}>
              <IconoirIcon name="download" size={16} />
              {exportLoading ? 'Preparing...' : 'Download XLSX'}
            </button>
            <button type="button" onClick={onClose} className="btn-secondary">
              Close
            </button>
          </div>
        </div>

        {exportError && <p className="mx-5 mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{exportError}</p>}

        <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ['Events', summary.totalEvents || 0],
            ['Page views', summary.pageViews || 0],
            ['Clicks', summary.clicks || 0],
            ['Unique IPs', summary.uniqueIps || 0],
            ['Visitors', summary.uniqueVisitors || 0]
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-line bg-paper p-4">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate">{label}</p>
              <p className="mt-2 font-display text-3xl font-bold text-charcoal">{value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-5 p-5 pt-0 lg:grid-cols-[0.85fr_1.35fr]">
          <section className="rounded-2xl border border-line bg-paper p-5">
            <h3 className="text-lg font-extrabold text-charcoal">Top clicked links</h3>
            <div className="mt-4 grid gap-3">
              {(summary.topLinks || []).length ? (
                summary.topLinks.map((link) => (
                  <div key={`${link.href}-${link.label}`} className="rounded-xl bg-white p-4">
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-bold text-charcoal">{link.label || 'Unknown link'}</p>
                      <span className="rounded-full bg-wheat px-3 py-1 text-xs font-bold text-saffronDark">{link.clicks} clicks</span>
                    </div>
                    {link.href && <p className="mt-2 break-all text-xs text-slate">{link.href}</p>}
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate">No link clicks recorded yet.</p>
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-line bg-white">
            <div className="border-b border-line p-5">
              <h3 className="text-lg font-extrabold text-charcoal">Recent access and click events</h3>
              <p className="mt-1 text-sm text-slate">IP, approximate location, time, route and clicked link data.</p>
            </div>
            <div className="max-h-[620px] overflow-auto">
              <table className="min-w-[980px] w-full text-left text-sm">
                <thead className="sticky top-0 bg-wheat text-xs uppercase tracking-[0.14em] text-slate">
                  <tr>
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">IP</th>
                    <th className="px-4 py-3">Location</th>
                    <th className="px-4 py-3">Page</th>
                    <th className="px-4 py-3">Link / Action</th>
                    <th className="px-4 py-3">Device</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {events.map((event) => (
                    <tr key={event.id} className="align-top">
                      <td className="px-4 py-3 font-semibold text-charcoal">{new Date(event.receivedAt).toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-paper px-3 py-1 text-xs font-bold text-charcoal">{event.type}</span>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-charcoal">{event.ip}</td>
                      <td className="px-4 py-3 text-slate">
                        <p className="font-semibold text-charcoal">{formatLocation(event.location)}</p>
                        <p className="text-xs">{event.location?.isp || event.location?.timezone || ''}</p>
                      </td>
                      <td className="px-4 py-3 text-slate">{event.path || '-'}</td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-charcoal">{event.label || '-'}</p>
                        {event.href && <p className="mt-1 max-w-[260px] break-all text-xs text-slate">{event.href}</p>}
                      </td>
                      <td className="px-4 py-3 max-w-[280px] text-xs text-slate">{event.userAgent || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!events.length && <p className="p-5 text-sm text-slate">No analytics events recorded yet.</p>}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy Policy"
      intro="Rajnish Store is an affiliate website with lightweight owner analytics. We keep data collection focused on visits, link clicks and contact actions."
      sections={[
        ['Information we collect', 'We may receive basic contact details if you email us. When the analytics server is enabled, we also record visit and click events including IP address, approximate IP-based location, browser user agent, page route, timestamp and clicked affiliate link details.'],
        ['Affiliate and third-party links', 'External Amazon links may use affiliate tracking handled by Amazon or its affiliate systems. Their privacy policies apply after you leave this site. Public IP addresses may also be checked with an IP-location lookup service to estimate city, region and country.'],
        ['Cookies and analytics', 'This site uses a local visitor identifier in browser storage to group events and a server-side analytics log to help the owner understand traffic and link clicks. The site does not require shopper accounts, payment details or cart storage.'],
        ['Contact', 'For privacy questions, email rajoyadav1419@gmail.com.']
      ]}
    />
  );
}

function AffiliateDisclosurePage() {
  return (
    <LegalPage
      eyebrow="Disclosure"
      title="Affiliate Disclosure"
      intro="Some links on Rajnish Store are sponsored affiliate links. If you click and make a qualifying purchase, we may earn a commission at no additional cost to you."
      sections={[
        ['How links work', 'Product and category buttons open Amazon in a new tab. Amazon controls pricing, availability, shipping, returns and checkout.'],
        ['Editorial independence', 'Categories and products are selected to be useful for shoppers, not to create a checkout experience on this website.'],
        ['No extra cost', 'Affiliate commissions are paid by the merchant or affiliate network. Your purchase price should not increase because you used our link.'],
        ['Questions', 'For link or disclosure questions, contact rajoyadav1419@gmail.com.']
      ]}
    />
  );
}

function LegalPage({ eyebrow, title, intro, sections }) {
  return (
    <main>
      <PageHero eyebrow={eyebrow} title={title} copy={intro} />
      <section className="container-page grid gap-6 pb-16 lg:grid-cols-[260px_1fr] lg:pb-24">
        <aside className="surface-card h-fit p-5 lg:sticky lg:top-28">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate">On this page</p>
          <div className="mt-4 grid gap-2">
            {sections.map(([heading]) => (
              <a key={heading} href={`#${heading.toLowerCase().replaceAll(' ', '-')}`} className="rounded-xl px-3 py-2 text-sm font-bold text-slate hover:bg-wheat hover:text-charcoal">
                {heading}
              </a>
            ))}
          </div>
        </aside>
        <article className="surface-card p-6 sm:p-8 lg:p-10">
          {sections.map(([heading, copy]) => (
            <section key={heading} id={heading.toLowerCase().replaceAll(' ', '-')} className="border-b border-line py-7 first:pt-0 last:border-b-0 last:pb-0">
              <h2 className="text-2xl font-extrabold text-charcoal">{heading}</h2>
              <p className="mt-3 text-base leading-8 text-slate">{copy}</p>
            </section>
          ))}
        </article>
      </section>
    </main>
  );
}

function NotFoundPage() {
  return (
    <main className="container-page py-24 text-center">
      <p className="font-display text-5xl font-bold text-charcoal">Page not found</p>
      <p className="mx-auto mt-4 max-w-lg text-slate">The page you tried to open is not available. Browse the current Rajnish Store instead.</p>
      <a href="#/" className="btn-primary mt-8">
        Back to home
      </a>
    </main>
  );
}

function App() {
  const route = useHashRoute();
  const routeMap = {
    '/': <HomePage />,
    '/products': <ProductsPage />,
    '/about': <AboutPage />,
    '/contact': <ContactPage />,
    '/privacy-policy': <PrivacyPage />,
    '/affiliate-disclosure': <AffiliateDisclosurePage />
  };

  useEffect(() => {
    trackEvent('page_view', { path: route, label: `Route: ${route}` });
  }, [route]);

  return (
    <div className="page-shell">
      <Header route={route} />
      {routeMap[route] || <NotFoundPage />}
      <Footer />
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
