export const PLANS = [
  {
    name: 'Explorer',
    slug: 'explorer',
    quota: 20,  
    pagesPerPdf: 5,
    price: {
      amount: 10, 
      priceIds: {
        test: 'price_1Nz4VfFl55eurQgwmXdadVVL',
        production: '',
      },
    },
  },
  {
    name: 'Champion', 
    slug: 'champion',
    quota: 50,
    pagesPerPdf: 25,
    price: {
      amount: 20,
      priceIds: {
        test: 'price_1Nz4WpFl55eurQgwOPnxJ5LP',
        production: '',
      },
    },
  },
  {
    name: 'Elite',  
    slug: 'elite',
    quota: 100, 
    pagesPerPdf: 50,
    price: {
      amount: 80,  
      priceIds: {
        test: 'price_1Nz4XYFl55eurQgwqgEgOHA8', 
        production: 'new_production_price_id_for_elite',  
      },
    },
  },
]
