enum ShoppingCartEnum {
    PERCENTAGE = 'percentage',
    MINUS = 'minus',
    SLICE = 'slice'
}

export interface ShoppingCartModel {
    offers: [
        {
            type: ShoppingCartEnum;
            value: number;
            slicevalue?: number;
        }
    ]
}