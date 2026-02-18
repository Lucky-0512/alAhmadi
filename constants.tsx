
import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // --- SIGNATURE TRAYS (RICE) ---
  {
    id: 'm_meat_machboos_tray',
    name: 'Meat Machboos Tray | صينية مجبوس لحم',
    price: 5.250,
    category: 'Rice',
    description: 'Traditional spiced meat served over premium basmati rice with broth and maabouj.',
    imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'm_mansaf_chicken_tray',
    name: 'Mansaf Chicken Tray | صينية منسف دجاج',
    price: 4.250,
    category: 'Rice',
    description: 'Chicken cooked with Jameed (dried yogurt), served with stuffed nuts and savory broth.',
    imageUrl: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'm_mutabaq_zubaidi',
    name: 'Mutabaq Zubaidi Tray | صينية مطبق زبيدي',
    price: 7.500,
    category: 'Rice',
    description: 'Iconic Zubaidi fish atop basmati rice with traditional onion-raisin hasho garnish.',
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'm_murabian_tray',
    name: 'Murabian Tray | صينية مربين',
    price: 6.500,
    category: 'Rice',
    description: 'A coastal favorite: Spiced basmati rice cooked with fresh soft shrimp.',
    imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'm_maklouba_chicken',
    name: 'Maklouba Chicken Tray | صينية مقلوبة دجاج',
    price: 4.750,
    category: 'Rice',
    description: 'The famous "upside-down" rice dish layered with chicken and tender vegetables.',
    imageUrl: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=800'
  },

  // --- WILD FOOD (GRILLED & PRESSED) ---
  {
    id: 'm_meat_pressed',
    name: 'Meat Pressed | مضغوط لحم',
    price: 5.250,
    category: 'Grills',
    description: 'Heritage-style pressed meat cooked with luxurious basmati and secret wild spices.',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'm_chicken_press',
    name: 'Chicken Press | مضغوط دجاج',
    price: 3.250,
    category: 'Grills',
    description: 'Succulent chicken pressed with aromatic spices for a deep, smoky flavor.',
    imageUrl: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'm_grilled_tilapia',
    name: 'Grilled Tilapia | سمك بلطي مشوي',
    price: 4.250,
    category: 'Grills',
    description: 'Fresh grilled tilapia served with tahini, bread, and refreshing rocca.',
    imageUrl: 'https://images.unsplash.com/photo-1512132411229-c30391241dd8?auto=format&fit=crop&q=80&w=800'
  },

  // --- BREAKFAST BOXES ---
  {
    id: 'm_dawaa_box',
    name: 'Dawaa Sandwiches Box | بوكس سندوتشات ضوه',
    price: 6.000,
    category: 'Breakfast',
    description: 'A variety pack: Falafel, Hummus with Meat, Halloumi, and Cauliflower sandwiches.',
    imageUrl: 'https://images.unsplash.com/photo-1539136788836-5699e78bac75?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'm_ottoman_box',
    name: 'Ottoman Breakfast Box | بوكس ريوق عثماني',
    price: 8.250,
    category: 'Breakfast',
    description: 'Mushroom hamsa with cream, dill eggs, chickpeas, and a mixed cheese selection.',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'm_tarweeqa_box',
    name: 'Kuwaiti Tarweeqa Box | بوكس ترويقة كويتي',
    price: 15.500,
    category: 'Breakfast',
    description: 'The ultimate spread: Shakshuka, Musabaha, Mutabbal, and signature eggplant dip.',
    imageUrl: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?auto=format&fit=crop&q=80&w=800'
  },

  // --- SIDES & SMALL PLATES ---
  {
    id: 'm_lentil_soup',
    name: 'Lentil Soup | شوربة عدس',
    price: 0.850,
    category: 'Sides',
    description: 'Nutritious lentils mixed with vegetables and finished with fresh lemon.',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'm_fattoush_salad',
    name: 'Fattoush Salad | سلطة فتوش',
    price: 0.950,
    category: 'Sides',
    description: 'Crispy toasted bread, sumac-infused greens, and a zesty lemon dressing.',
    imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'm_hamsa_potato',
    name: 'Hamsa Potato Flower | حمسة بطاط زهرة',
    price: 2.250,
    category: 'Sides',
    description: 'Creamy mix of potatoes and cauliflower sautéed with signature dill sauce.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800'
  },

  // --- DESSERTS & EXTRAS ---
  {
    id: 'm_signature_desserts',
    name: 'Signature Desserts | حلويات الأحمدي',
    price: 2.500,
    category: 'Sweets',
    description: 'A rotation of daily fresh Kuwaiti desserts including Luqaimat.',
    imageUrl: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'm_arabic_coffee',
    name: 'Arabic Coffee | قهوة عربية',
    price: 1.500,
    category: 'Sweets',
    description: 'Premium traditional coffee prepared with aromatic cardamom.',
    imageUrl: 'https://images.unsplash.com/photo-1541173109020-9c5d8a48e169?auto=format&fit=crop&q=80&w=800'
  }
];

export const GUEST_REVIEWS = [
  {
    author: 'eris bamboo',
    rating: 5,
    date: '3 years ago',
    text: 'Amazing food, excellent service from Thomas. The buffet variety is outstanding and everything is kept fresh and warm.',
    images: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&q=80&w=400'
    ]
  },
  {
    author: 'Moh ODT',
    rating: 5,
    date: '2 years ago',
    text: 'Food is great, the ambience is so nice, the staff are super friendly and welcoming, special thanks to Thomas. I tried the Egyptian Pigeon for the first time, and it is gooood!',
    images: [
      'https://images.unsplash.com/photo-1562607349-599222440620?auto=format&fit=crop&q=80&w=400'
    ]
  },
  {
    author: 'Alansary 81',
    rating: 5,
    date: '11 months ago',
    text: 'Tabarak Allah.. Five stars! The buffet is delicious and worth the money paid for it, we tried it for breakfast and dinner and both times I liked the variety of items, and I will visit again, God willing.',
    images: [
      'https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=400'
    ]
  },
  {
    author: 'Mohamed Ismail',
    rating: 5,
    date: 'a year ago',
    text: 'Mr Bibin from the service team is friendly and all the staff are excellent, food is perfect With their general manager Mr Mohamady. A truly heritage experience.',
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400'
    ]
  }
];

export const CONTACT_WHATSAPP = '96596961300';
export const AMBIENCE_IMAGES = [
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200'
];
