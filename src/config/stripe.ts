export const PLANS = [
  {
    name: 'Explorer',
    slug: 'explorer',
    quota: 20,  
    pagesPerPdf: 5,
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
    quota: 50,
    pagesPerPdf: 25,
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
    pagesPerPdf: 500,
    price: {
      amount: 80,  
      priceIds: {
        test: 'price_1O1ZnrFl55eurQgwCKPYo7de', 
        production: 'price_1O1ZnrFl55eurQgwCKPYo7de',  
      },
    },
  },
]
