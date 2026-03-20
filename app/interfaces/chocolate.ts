export interface Chocolate {
  id: string;
  name: string;
  image: string;         // path like '/chocolates/ferrero.png'
  unit_price: number;    // cost per unit in ₡ CRC
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export type NewChocolate = Omit<Chocolate, 'id' | 'created_at' | 'updated_at'>;
