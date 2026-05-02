export const AFFILIATE_LINKS = {
  women: 'https://amzn.to/49i1dfp',
  men: 'https://amzn.to/4tkBavC',
  kids: 'https://amzn.to/4tOtUJn',
  tech: 'https://amzn.to/3ORkkGr',
  audio: 'https://amzn.to/4n61KqK',
  wearables: 'https://amzn.to/4urUFTW',
  gaming: 'https://amzn.to/4uo3jTg',
  lifestyle: 'https://amzn.to/4tSOM2e',
  camera: 'https://amzn.to/4cYPOSN',
  groceries: 'https://amzn.to/49pGiam',
  dryFruits: 'https://amzn.to/4n6UVoM'
};

export const categories = [
  {
    id: 'women',
    label: "Women's Shop",
    shortLabel: 'Women',
    description: 'Dresses, ethnic wear and everyday styles.',
    href: AFFILIATE_LINKS.women,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=900&q=85&auto=format&fit=crop'
  },
  {
    id: 'men',
    label: "Men's Shop",
    shortLabel: 'Men',
    description: 'Shirts, kurtas, activewear and accessories.',
    href: AFFILIATE_LINKS.men,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=900&q=85&auto=format&fit=crop'
  },
  {
    id: 'kids',
    label: "Kids' Shop",
    shortLabel: 'Kids',
    description: 'Clothing and essentials for little shoppers.',
    href: AFFILIATE_LINKS.kids,
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=900&q=85&auto=format&fit=crop'
  },
  {
    id: 'groceries',
    label: 'Groceries',
    shortLabel: 'Groceries',
    description: 'Pantry staples, daily essentials and snacks.',
    href: AFFILIATE_LINKS.groceries,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=85&auto=format&fit=crop'
  },
  {
    id: 'dry-fruits',
    label: 'Dry Fruits',
    shortLabel: 'Dry Fruits',
    description: 'Almonds, cashews, dates and gift packs.',
    href: AFFILIATE_LINKS.dryFruits,
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=900&q=85&auto=format&fit=crop'
  },
  {
    id: 'tech',
    label: 'Tech & Gadgets',
    shortLabel: 'Tech',
    description: 'Useful devices and everyday accessories.',
    href: AFFILIATE_LINKS.tech,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&q=85&auto=format&fit=crop'
  },
  {
    id: 'audio',
    label: 'Audio',
    shortLabel: 'Audio',
    description: 'Headphones, earbuds, speakers and mics.',
    href: AFFILIATE_LINKS.audio,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=85&auto=format&fit=crop'
  },
  {
    id: 'wearables',
    label: 'Wearables',
    shortLabel: 'Wearables',
    description: 'Smartwatches, bands and fitness tech.',
    href: AFFILIATE_LINKS.wearables,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=85&auto=format&fit=crop'
  },
  {
    id: 'gaming',
    label: 'Gaming',
    shortLabel: 'Gaming',
    description: 'Controllers, keyboards, mice and headsets.',
    href: AFFILIATE_LINKS.gaming,
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=900&q=85&auto=format&fit=crop'
  },
  {
    id: 'lifestyle',
    label: 'Lifestyle',
    shortLabel: 'Lifestyle',
    description: 'Home, wellness and daily utility picks.',
    href: AFFILIATE_LINKS.lifestyle,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=900&q=85&auto=format&fit=crop'
  },
  {
    id: 'camera',
    label: 'Camera & Photo',
    shortLabel: 'Camera',
    description: 'Cameras, tripods, lenses and creator tools.',
    href: AFFILIATE_LINKS.camera,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=900&q=85&auto=format&fit=crop'
  }
];

const byId = Object.fromEntries(categories.map((category) => [category.id, category]));

export const categoryFilters = [
  { id: 'all', label: 'All' },
  ...categories.map((category) => ({ id: category.id, label: category.shortLabel }))
];

export const products = [
  {
    id: 1,
    name: 'UltraBook Pro 15',
    category: 'tech',
    badge: 'Best Seller',
    rating: 4.9,
    reviews: 880,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&q=85&auto=format&fit=crop',
    description: 'Premium laptop picks for work, study and entertainment.',
    affiliateUrl: AFFILIATE_LINKS.tech
  },
  {
    id: 2,
    name: 'Fast Wireless Chargers',
    category: 'tech',
    badge: 'Useful Pick',
    rating: 4.7,
    reviews: 2100,
    image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=900&q=85&auto=format&fit=crop',
    description: 'Qi-compatible charging pads and compact desk chargers.',
    affiliateUrl: AFFILIATE_LINKS.tech
  },
  {
    id: 3,
    name: 'Ergonomic Mouse Collection',
    category: 'tech',
    badge: 'Work Setup',
    rating: 4.8,
    reviews: 640,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=900&q=85&auto=format&fit=crop',
    description: 'Silent, accurate and comfortable mice for daily use.',
    affiliateUrl: AFFILIATE_LINKS.tech
  },
  {
    id: 4,
    name: 'USB-C Hubs & Adapters',
    category: 'tech',
    badge: 'Desk Essential',
    rating: 4.6,
    reviews: 1350,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=900&q=85&auto=format&fit=crop',
    description: 'Multiport hubs for laptops, tablets and travel kits.',
    affiliateUrl: AFFILIATE_LINKS.tech
  },
  {
    id: 5,
    name: 'Wireless Earbuds',
    category: 'audio',
    badge: 'Popular',
    rating: 4.8,
    reviews: 1240,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=85&auto=format&fit=crop',
    description: 'Compact earbuds with noise control and long battery life.',
    affiliateUrl: AFFILIATE_LINKS.audio
  },
  {
    id: 6,
    name: 'Bluetooth Speakers',
    category: 'audio',
    badge: 'Weekend Pick',
    rating: 4.7,
    reviews: 530,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=900&q=85&auto=format&fit=crop',
    description: 'Portable speakers for home, travel and small gatherings.',
    affiliateUrl: AFFILIATE_LINKS.audio
  },
  {
    id: 7,
    name: 'USB Microphones',
    category: 'audio',
    badge: 'Creator Pick',
    rating: 4.9,
    reviews: 760,
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=900&q=85&auto=format&fit=crop',
    description: 'Plug-and-play microphones for meetings and creators.',
    affiliateUrl: AFFILIATE_LINKS.audio
  },
  {
    id: 8,
    name: 'Over-Ear Headphones',
    category: 'audio',
    badge: 'Premium',
    rating: 4.8,
    reviews: 420,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=900&q=85&auto=format&fit=crop',
    description: 'Comfort-focused headphones for calls, music and travel.',
    affiliateUrl: AFFILIATE_LINKS.audio
  },
  {
    id: 9,
    name: 'Smartwatch Collection',
    category: 'wearables',
    badge: 'New Season',
    rating: 4.9,
    reviews: 890,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=85&auto=format&fit=crop',
    description: 'Watches for health tracking, calls and daily convenience.',
    affiliateUrl: AFFILIATE_LINKS.wearables
  },
  {
    id: 10,
    name: 'Fitness Bands',
    category: 'wearables',
    badge: 'Fitness',
    rating: 4.6,
    reviews: 1820,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=900&q=85&auto=format&fit=crop',
    description: 'Lightweight bands for steps, heart rate and sleep tracking.',
    affiliateUrl: AFFILIATE_LINKS.wearables
  },
  {
    id: 11,
    name: 'Health Smart Rings',
    category: 'wearables',
    badge: 'Premium',
    rating: 4.8,
    reviews: 310,
    image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=900&q=85&auto=format&fit=crop',
    description: 'Minimal wearable picks for wellness and sleep insights.',
    affiliateUrl: AFFILIATE_LINKS.wearables
  },
  {
    id: 12,
    name: 'Smart Glasses',
    category: 'wearables',
    badge: 'Future Tech',
    rating: 4.5,
    reviews: 180,
    image: 'https://images.unsplash.com/photo-1617802690658-1173a812650d?w=900&q=85&auto=format&fit=crop',
    description: 'Hands-free entertainment and wearable display options.',
    affiliateUrl: AFFILIATE_LINKS.wearables
  },
  {
    id: 13,
    name: 'Mechanical Keyboards',
    category: 'gaming',
    badge: 'Top Rated',
    rating: 4.7,
    reviews: 632,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900&q=85&auto=format&fit=crop',
    description: 'Responsive keyboards for gaming and productivity setups.',
    affiliateUrl: AFFILIATE_LINKS.gaming
  },
  {
    id: 14,
    name: 'Wireless Controllers',
    category: 'gaming',
    badge: 'Console Ready',
    rating: 4.8,
    reviews: 940,
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=900&q=85&auto=format&fit=crop',
    description: 'Comfortable controllers for PC and console play.',
    affiliateUrl: AFFILIATE_LINKS.gaming
  },
  {
    id: 15,
    name: 'Gaming Mice',
    category: 'gaming',
    badge: 'Fast Pick',
    rating: 4.9,
    reviews: 1500,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=900&q=85&auto=format&fit=crop',
    description: 'Lightweight, accurate mice for fast competitive control.',
    affiliateUrl: AFFILIATE_LINKS.gaming
  },
  {
    id: 16,
    name: 'Gaming Headsets',
    category: 'gaming',
    badge: 'Immersive',
    rating: 4.7,
    reviews: 720,
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=900&q=85&auto=format&fit=crop',
    description: 'Clear voice chat, cushioned comfort and surround sound.',
    affiliateUrl: AFFILIATE_LINKS.gaming
  },
  {
    id: 17,
    name: 'Air Purifiers',
    category: 'lifestyle',
    badge: 'Home Care',
    rating: 4.8,
    reviews: 540,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=900&q=85&auto=format&fit=crop',
    description: 'Cleaner air picks for bedrooms, living rooms and offices.',
    affiliateUrl: AFFILIATE_LINKS.lifestyle
  },
  {
    id: 18,
    name: 'Desk Organisers',
    category: 'lifestyle',
    badge: 'Organised Home',
    rating: 4.6,
    reviews: 1200,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85&auto=format&fit=crop',
    description: 'Storage and desk accessories for cleaner workspaces.',
    affiliateUrl: AFFILIATE_LINKS.lifestyle
  },
  {
    id: 19,
    name: 'Sunrise Alarm Lamps',
    category: 'lifestyle',
    badge: 'Wellness',
    rating: 4.7,
    reviews: 870,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a35253a22?w=900&q=85&auto=format&fit=crop',
    description: 'Soft lighting picks for bedtime and morning routines.',
    affiliateUrl: AFFILIATE_LINKS.lifestyle
  },
  {
    id: 20,
    name: 'Smart Bottles',
    category: 'lifestyle',
    badge: 'Daily Habit',
    rating: 4.5,
    reviews: 2300,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=900&q=85&auto=format&fit=crop',
    description: 'Hydration reminders and insulated bottles for travel.',
    affiliateUrl: AFFILIATE_LINKS.lifestyle
  },
  {
    id: 21,
    name: 'Action Cameras',
    category: 'camera',
    badge: 'Travel',
    rating: 4.8,
    reviews: 415,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=900&q=85&auto=format&fit=crop',
    description: 'Compact cameras for travel, action and daily memories.',
    affiliateUrl: AFFILIATE_LINKS.camera
  },
  {
    id: 22,
    name: 'Mini Drones',
    category: 'camera',
    badge: 'Creator Gear',
    rating: 4.7,
    reviews: 260,
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=900&q=85&auto=format&fit=crop',
    description: 'Aerial camera picks for hobbyists and creators.',
    affiliateUrl: AFFILIATE_LINKS.camera
  },
  {
    id: 23,
    name: 'Mobile Lens Kits',
    category: 'camera',
    badge: 'Creator Kit',
    rating: 4.6,
    reviews: 680,
    image: 'https://images.unsplash.com/photo-1617048986542-de3b1e1e8d46?w=900&q=85&auto=format&fit=crop',
    description: 'Wide-angle and macro options for phone photography.',
    affiliateUrl: AFFILIATE_LINKS.camera
  },
  {
    id: 24,
    name: 'Tripods & Stands',
    category: 'camera',
    badge: 'Steady Shot',
    rating: 4.8,
    reviews: 490,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&q=85&auto=format&fit=crop',
    description: 'Tripods for cameras, phones, lights and home studios.',
    affiliateUrl: AFFILIATE_LINKS.camera
  },
  {
    id: 25,
    name: "Women's Dresses",
    category: 'women',
    badge: "Women's Pick",
    rating: 4.8,
    reviews: 1240,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=900&q=85&auto=format&fit=crop',
    description: 'Dresses, kurtis, sarees and tops for everyday wear.',
    affiliateUrl: AFFILIATE_LINKS.women
  },
  {
    id: 26,
    name: "Women's Ethnic Wear",
    category: 'women',
    badge: 'Festive',
    rating: 4.7,
    reviews: 980,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&q=85&auto=format&fit=crop',
    description: 'Lehengas, anarkalis and salwar suits for occasions.',
    affiliateUrl: AFFILIATE_LINKS.women
  },
  {
    id: 27,
    name: "Women's Western Tops",
    category: 'women',
    badge: 'New Arrivals',
    rating: 4.6,
    reviews: 760,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=900&q=85&auto=format&fit=crop',
    description: 'Casual tops, formal shirts and easy outfit builders.',
    affiliateUrl: AFFILIATE_LINKS.women
  },
  {
    id: 28,
    name: "Men's Formal Shirts",
    category: 'men',
    badge: "Men's Pick",
    rating: 4.8,
    reviews: 1450,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=900&q=85&auto=format&fit=crop',
    description: 'Crisp office and occasion shirts for daily rotation.',
    affiliateUrl: AFFILIATE_LINKS.men
  },
  {
    id: 29,
    name: "Men's Ethnic Wear",
    category: 'men',
    badge: 'Festival Ready',
    rating: 4.7,
    reviews: 830,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=85&auto=format&fit=crop',
    description: 'Kurtas, sherwanis and traditional sets for celebrations.',
    affiliateUrl: AFFILIATE_LINKS.men
  },
  {
    id: 30,
    name: "Men's Casual & Sports",
    category: 'men',
    badge: 'Active Wear',
    rating: 4.6,
    reviews: 1100,
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=900&q=85&auto=format&fit=crop',
    description: 'T-shirts, joggers, hoodies and comfortable daily wear.',
    affiliateUrl: AFFILIATE_LINKS.men
  },
  {
    id: 31,
    name: "Kids' Clothing Sets",
    category: 'kids',
    badge: "Kids' Pick",
    rating: 4.9,
    reviews: 2100,
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=900&q=85&auto=format&fit=crop',
    description: 'Bright, durable clothing sets for children.',
    affiliateUrl: AFFILIATE_LINKS.kids
  },
  {
    id: 32,
    name: "Kids' Ethnic Wear",
    category: 'kids',
    badge: 'Celebration',
    rating: 4.7,
    reviews: 640,
    image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=900&q=85&auto=format&fit=crop',
    description: 'Traditional outfits for family events and festivals.',
    affiliateUrl: AFFILIATE_LINKS.kids
  },
  {
    id: 33,
    name: 'Baby & Toddler Essentials',
    category: 'kids',
    badge: 'Soft Picks',
    rating: 4.8,
    reviews: 890,
    image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=900&q=85&auto=format&fit=crop',
    description: 'Rompers, sleepsuits and baby wardrobe essentials.',
    affiliateUrl: AFFILIATE_LINKS.kids
  },
  {
    id: 34,
    name: 'Daily Groceries',
    category: 'groceries',
    badge: 'Daily Needs',
    rating: 4.7,
    reviews: 1800,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=85&auto=format&fit=crop',
    description: 'Rice, atta, oils, spices, snacks and kitchen staples.',
    affiliateUrl: AFFILIATE_LINKS.groceries
  },
  {
    id: 35,
    name: 'Premium Dry Fruits',
    category: 'dry-fruits',
    badge: 'Healthy Pick',
    rating: 4.8,
    reviews: 1320,
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=900&q=85&auto=format&fit=crop',
    description: 'Almonds, cashews, raisins, dates and festive gift packs.',
    affiliateUrl: AFFILIATE_LINKS.dryFruits
  }
].map((product) => ({
  ...product,
  categoryLabel: byId[product.category]?.label ?? product.category,
  categoryShortLabel: byId[product.category]?.shortLabel ?? product.category,
  priceLabel: 'View on Amazon'
}));

export const featuredProducts = products.filter((product) =>
  [34, 35, 25, 28, 5, 9, 13, 21].includes(product.id)
);
