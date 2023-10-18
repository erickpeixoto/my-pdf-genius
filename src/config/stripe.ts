export const PLANS = [
  {
    name: 'Explorer',
    slug: 'explorer',
    quota: 5,  
    size: 4,
    pagesPerPdf: 100,
    price: {
      amount: 10, 
      priceIds: {
        test: 'price_1O1Zl7Fl55eurQgw2MOJ3AiS',
        production: 'price_1O1Zl7Fl55eurQgw2MOJ3AiS',
      },
    },
  },
  {
    name: 'Champion', 
    slug: 'champion',
    quota: 20,
    size: 16,
    pagesPerPdf: 1000,
    price: {
      amount: 20,
      priceIds: {
        test: 'price_1O1Zn0Fl55eurQgwoiaKHUsX',
        production: 'price_1O1Zn0Fl55eurQgwoiaKHUsX',
      },
    },
  },
  {
    name: 'Elite',  
    slug: 'elite',
    quota: 500, 
    size: 32,
    pagesPerPdf: 10000,
    price: {
      amount: 80,  
      priceIds: {
        test: 'price_1O1ZnrFl55eurQgwCKPYo7de', 
        production: 'price_1O1ZnrFl55eurQgwCKPYo7de',  
      },
    },
  },
]
