import { img } from './utils'

// Sample menu for the UI demo. The complete project manages menu, pricing & availability from the restaurant admin panel.
export type Dish = { id: string; name: string; desc: string; price: number; veg: boolean; category: string; image: string; bestseller?: boolean; spicy?: boolean; rating: number }

export const restaurant = {
  name: 'Tandoor House',
  tagline: 'North Indian · Mughlai · Tandoor',
  rating: 4.6,
  ratings: '12K+',
  time: '30–35 min',
  costForTwo: 700,
  address: 'Sector 29, Gurugram',
  cover: img('1517248135467-4c7edcad34c4', 1800),
}

export const categories = ['Recommended', 'Starters', 'Main Course', 'Biryani & Rice', 'Breads']

export const dishes: Dish[] = [
  { id: 'butter-chicken', name: 'Butter Chicken', desc: 'Charcoal-grilled chicken simmered in a velvety tomato-butter gravy.', price: 389, veg: false, category: 'Main Course', image: img('1585937421612-70a008356fbe', 600), bestseller: true, rating: 4.8 },
  { id: 'chicken-biryani', name: 'Hyderabadi Chicken Biryani', desc: 'Dum-cooked aged basmati, saffron and tender chicken. Served with raita.', price: 349, veg: false, category: 'Biryani & Rice', image: img('1563379091339-03b21ab4a4f8', 600), bestseller: true, spicy: true, rating: 4.7 },
  { id: 'paneer-tikka', name: 'Paneer Tikka', desc: 'Cottage cheese marinated in hung curd & spices, roasted in the tandoor.', price: 299, veg: true, category: 'Starters', image: img('1567188040759-fb8a883dc6d8', 600), bestseller: true, rating: 4.6 },
  { id: 'samosa-chaat', name: 'Samosa Chaat', desc: 'Crushed samosa, chole, chutneys and crunchy sev.', price: 169, veg: true, category: 'Starters', image: img('1601050690597-df0568f70950', 600), rating: 4.5 },
  { id: 'dal-makhani', name: 'Dal Makhani', desc: 'Black lentils slow-cooked overnight with butter and cream.', price: 279, veg: true, category: 'Main Course', image: img('1631452180519-c014fe946bc7', 600), rating: 4.7 },
  { id: 'veg-biryani', name: 'Subz Dum Biryani', desc: 'Fragrant basmati layered with seasonal vegetables and mint.', price: 289, veg: true, category: 'Biryani & Rice', image: img('1588166524941-3bf61a9c41db', 600), rating: 4.4 },
  { id: 'pav-bhaji', name: 'Butter Pav Bhaji', desc: 'Mumbai-style spiced vegetable mash with butter-toasted pav, onions and lime.', price: 189, veg: true, category: 'Main Course', image: img('1606491956689-2ea866880c84', 600), rating: 4.5 },
  { id: 'tandoori-platter', name: 'Tandoori Mixed Grill', desc: 'Chicken tikka, seekh kebab and fish tikka with mint chutney.', price: 549, veg: false, category: 'Starters', image: img('1555939594-58d7cb561ad1', 600), spicy: true, rating: 4.8 },
  { id: 'garlic-naan', name: 'Garlic Butter Naan', desc: 'Fluffy tandoor-baked naan brushed with garlic butter.', price: 69, veg: true, category: 'Breads', image: img('1540189549336-e6e99c3679fe', 600), rating: 4.6 },
  { id: 'lamb-chops', name: 'Tandoori Lamb Chops', desc: 'Kashmiri-chilli marinated lamb chops with charred greens and mint chutney.', price: 499, veg: false, category: 'Starters', image: img('1504674900247-0877df9cc836', 600), rating: 4.7 },
]

export const addOns = [
  { name: 'Extra gravy', price: 49 },
  { name: 'Butter naan', price: 59 },
  { name: 'Raita', price: 39 },
  { name: 'Salad', price: 29 },
]
