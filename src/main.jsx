import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Filter,
  Mail,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Truck,
  X
} from 'lucide-react';
import { categories, categoryFilters, featuredProducts, products } from './data/catalog.js';
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

function Header({ route }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [route]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/92 backdrop-blur-xl">
      <div className="container-page flex h-20 items-center justify-between">
        <a href="#/" className="flex items-center gap-3" aria-label="Rajnish Store home">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-charcoal text-white">
            <Store size={20} strokeWidth={2.4} />
          </span>
          <span>
            <span className="block font-display text-2xl font-bold leading-none tracking-tight text-charcoal">Rajnish</span>
            <span className="block text-xs font-bold uppercase tracking-[0.2em] text-slate">Amazon Finds</span>
          </span>
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
            Browse products <ArrowRight size={16} />
          </a>
        </div>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-charcoal md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
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
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-charcoal text-white">
                <Store size={20} />
              </span>
              <div>
                <p className="font-display text-2xl font-bold text-charcoal">Rajnish Store</p>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate">Curated for India</p>
              </div>
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
                <a key={category.id} href={category.href} {...externalProps()}>
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
    <a href={href} className={className} {...externalProps()}>
      {children}
      <ExternalLink size={16} />
    </a>
  );
}

function DisclosureCallout() {
  return (
    <div className="surface-card flex flex-col gap-4 bg-mist p-5 sm:flex-row sm:items-start">
      <ShieldCheck className="mt-1 shrink-0 text-mint" size={24} />
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
    { icon: ShieldCheck, title: 'Clear affiliate links', copy: 'Every external shopping button opens Amazon directly.' },
    { icon: Truck, title: 'Amazon fulfilment', copy: 'Delivery, returns and pricing are handled by Amazon.' },
    { icon: CheckCircle2, title: 'Useful categories', copy: 'Fashion, groceries, tech and home picks in one place.' }
  ];

  return (
    <section className="border-y border-line bg-white">
      <div className="container-page grid gap-4 py-8 md:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="flex gap-4 rounded-2xl bg-paper p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-charcoal text-white">
                <Icon size={19} />
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
          {...externalProps()}
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
              <h3 className="text-lg font-extrabold text-charcoal">{category.label}</h3>
              <ExternalLink className="mt-1 shrink-0 text-slate transition group-hover:text-saffron" size={17} />
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
            <Star size={14} fill="currentColor" strokeWidth={0} />
            {product.rating}
          </span>
        </div>
        <h3 className="text-lg font-extrabold leading-tight text-charcoal">{product.name}</h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate">{product.description}</p>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
          <span className="text-sm font-bold text-mint">{product.priceLabel}</span>
          <AffiliateButton href={product.affiliateUrl} className="inline-flex items-center justify-center gap-2 rounded-full bg-charcoal px-4 py-2 text-xs font-bold text-white transition hover:bg-saffronDark">
            Open
          </AffiliateButton>
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
          <Sparkles size={14} />
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
            Explore all products <ArrowRight size={17} />
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
              {...externalProps()}
            >
              <img
                src={category.image}
                alt={category.label}
                loading="lazy"
                className={`w-full object-cover transition duration-500 group-hover:scale-105 ${index === 0 ? 'h-60' : 'h-36'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Shop category</p>
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
              View full catalog <ArrowRight size={16} />
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
            <Search size={19} className="text-slate" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search fashion, groceries, headphones..."
              className="w-full bg-transparent text-sm font-semibold text-charcoal outline-none placeholder:text-slate"
              aria-label="Search products"
            />
          </label>
          <label className="flex items-center gap-3 rounded-2xl border border-line bg-paper px-4 py-3">
            <Filter size={18} className="text-slate" />
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
            <CheckCircle2 className="text-mint" size={26} />
            <h2 className="mt-5 text-xl font-extrabold text-charcoal">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate">{copy}</p>
          </div>
        ))}
      </section>
    </main>
  );
}

function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Questions, corrections or partnership ideas?"
        copy="Reach out if an affiliate link needs updating, a category should be added, or you want to suggest useful Amazon collections."
      />
      <section className="container-page grid gap-6 pb-16 lg:grid-cols-[0.85fr_1.15fr] lg:pb-24">
        <div className="surface-card p-7">
          <Mail className="text-saffronDark" size={28} />
          <h2 className="mt-5 text-2xl font-extrabold text-charcoal">Email</h2>
          <a href="mailto:rajoyadav1419@gmail.com" className="mt-3 block text-lg font-bold text-saffronDark">
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
    </main>
  );
}

function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy Policy"
      intro="Rajnish Store is a static affiliate website. We keep data collection minimal and use third-party destinations only when you choose to open an external Amazon link."
      sections={[
        ['Information we collect', 'We may receive basic contact details if you email us. The website itself does not run a custom account system, payment system or checkout.'],
        ['Affiliate and third-party links', 'External Amazon links may use affiliate tracking handled by Amazon or its affiliate systems. Their privacy policies apply after you leave this site.'],
        ['Cookies and analytics', 'If analytics are added in the future, they should be disclosed here before launch. The current React rebuild does not require shopper accounts or cart storage.'],
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
