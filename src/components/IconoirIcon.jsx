import apple from '../assets/iconoir/apple.svg?raw';
import arrowRight from '../assets/iconoir/arrow-right.svg?raw';
import arrowUpRight from '../assets/iconoir/arrow-up-right.svg?raw';
import box from '../assets/iconoir/box.svg?raw';
import camera from '../assets/iconoir/camera.svg?raw';
import checkCircle from '../assets/iconoir/check-circle.svg?raw';
import filter from '../assets/iconoir/filter.svg?raw';
import gamepad from '../assets/iconoir/gamepad.svg?raw';
import gift from '../assets/iconoir/gift.svg?raw';
import homeSale from '../assets/iconoir/home-sale.svg?raw';
import laptop from '../assets/iconoir/laptop.svg?raw';
import leaf from '../assets/iconoir/leaf.svg?raw';
import mail from '../assets/iconoir/mail.svg?raw';
import menu from '../assets/iconoir/menu.svg?raw';
import organicFood from '../assets/iconoir/organic-food.svg?raw';
import search from '../assets/iconoir/search.svg?raw';
import shieldCheck from '../assets/iconoir/shield-check.svg?raw';
import shirt from '../assets/iconoir/shirt.svg?raw';
import shopWindow from '../assets/iconoir/shop-window.svg?raw';
import shoppingBag from '../assets/iconoir/shopping-bag.svg?raw';
import soundHigh from '../assets/iconoir/sound-high.svg?raw';
import sparks from '../assets/iconoir/sparks.svg?raw';
import star from '../assets/iconoir/star.svg?raw';
import truck from '../assets/iconoir/truck.svg?raw';
import wristwatch from '../assets/iconoir/wristwatch.svg?raw';
import xmark from '../assets/iconoir/xmark.svg?raw';

const icons = {
  apple,
  arrowRight,
  arrowUpRight,
  box,
  camera,
  checkCircle,
  filter,
  gamepad,
  gift,
  homeSale,
  laptop,
  leaf,
  mail,
  menu,
  organicFood,
  search,
  shieldCheck,
  shirt,
  shopWindow,
  shoppingBag,
  soundHigh,
  sparks,
  star,
  truck,
  wristwatch,
  xmark
};

export function IconoirIcon({ name, size = 20, className = '', title, ...props }) {
  const svg = icons[name];
  if (!svg) return null;

  return (
    <span
      className={`iconoir-icon inline-flex shrink-0 items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      dangerouslySetInnerHTML={{ __html: svg }}
      {...props}
    />
  );
}
