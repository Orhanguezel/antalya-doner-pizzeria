const mongoose = require('mongoose');
const { Category, Item } = require('./models/Category');

const categories = [
  {
    name: 'beilagen',
    description: 'Unsere Beilagen ergänzen jedes Gericht perfekt.',
    subcategories: [
      {
        name: 'Pizzabrötchen 6 Stk',
        description: 'Frisch aus dem Steinofen.',
        images: ['/assets/beilagen/11.jpg', '/assets/beilagen/12.jpg'],
        items: [
          {
            name: 'Pizzabrötchen',
            type: 'food',
            description: '8 Stück mit Kräuterbutter',
            prices: { default: 3.5 },
            allergene: ['a'],
            extras: {
              Mais: 1.0,
              Brocoli: 1.0,
              Spinat: 1.0,
              Ei: 1.0,
              Zwiebeln: 1.0,
              Tomaten: 1.0,
              Paprika: 1.0,
              Oliven: 1.0,
              Pilze: 1.0,
              Ananas: 1.0,
              Schinken: 1.0,
              Salami: 1.0,
              Thunfisch: 2.0,
              Sardellen: 2.0,
              SauceHollandaise: 2.0,
              Dönerfleisch: 2.0,
              Hirtenkäse: 2.0,
              Meeresfrüchte: 2.0,
              Krabben: 2.0,
              Sucuk: 2.0
            }
          }
        ]
      }
    ]
  }
];

const validateData = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/antalya-doner-pizzeria', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Ürünleri doğrulayın
    for (const category of categories) {
      for (const subcategory of category.subcategories) {
        for (const itemData of subcategory.items) {
          const item = new Item(itemData);
          await item.validate();
        }
      }
    }

    // Kategorileri doğrulayın
    for (const categoryData of categories) {
      const subcategories = categoryData.subcategories.map(sc => ({
        ...sc,
        items: sc.items.map(itemData => new Item(itemData)._id)
      }));

      const category = new Category({
        ...categoryData,
        subcategories
      });

      await category.validate();
    }

    console.log('All data is valid.');
    mongoose.connection.close();
  } catch (error) {
    console.error('Validation error:', error);
    mongoose.connection.close();
  }
};

validateData();
