export const PLANS = [
  {
    name: 'Explorer',
    slug: 'explorer',
    quota: 20,  
    pagesPerPdf: 10,
    price: {
      amount: 0, 
      priceIds: {
        test: '',
        production: '',
      },
    },
  },
  {
    name: 'Free',
    slug: 'free',
    quota: 10,
    pagesPerPdf: 5,
    price: {
      amount: 0,
      priceIds: {
        test: '',
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
      amount: 14,
      priceIds: {
        test: 'price_1NxGxFFl55eurQgwUTHRCQa6',
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
      amount: 29,  
      priceIds: {
        test: 'new_test_price_id_for_elite', 
        production: 'new_production_price_id_for_elite',  
      },
    },
  },
]
