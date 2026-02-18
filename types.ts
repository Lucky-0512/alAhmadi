
export type Category = 'All' | 'Rice' | 'Grills' | 'Breakfast' | 'Sides' | 'Sweets';

export interface MenuItem {
  id: string;
  name: string;
  price: number | 'On Selection';
  category: Category;
  description: string;
  imageUrl: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface OrderDetails {
  name: string;
  pickupTime: string;
}
