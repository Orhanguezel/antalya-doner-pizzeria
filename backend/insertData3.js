const mongoose = require('mongoose');
const { Category, Subcategory, Item } = require('./models/Category');

mongoose.connect('mongodb://localhost:27017/antalya-doner-pizzeria', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set('strictQuery', false);

const categories = [
  {
    name: 'kinder',
    description: 'Unsere Hauptgerichte sind herzhaft und sättigend, perfekt für den großen Hunger.',
    subcategories: [
      {
        name: 'fuerKinder',
        description: 'Unsere Kindergerichte sind speziell auf die Bedürfnisse der kleinen Gäste abgestimmt.',
        images: ['/assets/menu/32.jpg', '/assets/menu/31.jpg'],
        items: [
          {
            nr: '110',
            type: 'food',
            name: 'Kinder Döner',
            zusatztoffe: [2, 3, 4],
            allergene: ['a', 'g', 'f', 'l', 'b'],
            description: 'mit Salat und Tzatziki',
            prices: { default: 4.0 }
          },
          {
            nr: '111',
            type: 'food',
            name: 'Kinder Box',
            zusatztoffe: [2, 3, 4],
            allergene: ['g', 'f', 'l', 'b'],
            description: 'mit Pommes',
            prices: { default: 7.5 }
          },
          {
            nr: '112',
            type: 'food',
            name: 'Kinder Teller',
            zusatztoffe: [2, 3, 4],
            allergene: ['a', 'g', 'f', 'l', 'b'],
            description: 'mit Pommes, Salat und Tzatziki',
            prices: { default: 9.0 }
          }
        ]
      }
    ]
  }
];

const insertData = async () => {
  try {
    for (const categoryData of categories) {
      const subcategories = [];
      for (const subcategoryData of categoryData.subcategories) {
        const items = await Item.insertMany(subcategoryData.items);
        const subcategory = {
          ...subcategoryData,
          items: items.map(item => item._id)
        };
        const subcat = new Subcategory(subcategory);
        await subcat.save();
        subcategories.push(subcat._id);
      }

      const category = new Category({
        ...categoryData,
        subcategories
      });

      await category.save();
    }
    console.log('All categories successfully inserted');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error inserting category data:', error);
    mongoose.connection.close();
  }
};

insertData();
