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
        test: 'price_1O44DGFl55eurQgwLfBy1yKN',
        production: 'price_1O44DGFl55eurQgwLfBy1yKN',
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
        test: 'price_1O44DGFl55eurQgwLfBy1yKN', 
        production: 'price_1O44DGFl55eurQgwLfBy1yKN',  
      },
    },
  },
]
export const pricesPT = [
  {
    name: 'Explorer',
    slug: 'explorer',
    price: {
      amount: 19.9, 
    },
  },
  {
    name: 'Champion',
    slug: 'champion',
    price: {
      amount: 29.9, 
    },
  },
  {
    name: 'Elite',
    slug: 'elite',
    price: {
      amount: 99.9, 
    },
  },

];