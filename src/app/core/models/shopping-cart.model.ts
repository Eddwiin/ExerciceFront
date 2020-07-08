enum ShoppingCartEnum {
  PERCENTAGE = 'percentage',
  MINUS = 'minus',
  SLICE = 'slice',
}

export interface Offer {
  type: ShoppingCartEnum;
  value: number;
  slicevalue?: number;
}

export interface ShoppingCartModel {
  offers: Offer[];
}
