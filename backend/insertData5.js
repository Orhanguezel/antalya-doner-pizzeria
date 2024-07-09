const mongoose = require('mongoose');
const Category = require('./models/Category');
const Subcategory = require('./models/Subcategory');
const Item = require('./models/Item');

mongoose.connect('mongodb://localhost:27017/antalya-doner-pizzeria', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set('strictQuery', false);

const categories = [
  {
    name: 'Getränke',
    description: 'Unsere Auswahl an Getränken.',
    subcategories: [
      {
        name: 'Alkoholische Getränke',
        description: 'Unsere Auswahl an alkoholischen Getränken.',
        images: ['../assets/menu/38.jpg', '../assets/menu/39.jpg'],
        items: [
          {
            nr: '123',
            type: 'drink',
            name: 'Malzbier',
            zusatztoffe: [],
            allergene: [],
            description: '0,33L',
            prices: { default: 2.50 },
           
          },
          {
            nr: '124',
            type: 'drink',
            name: 'Durstlöscher',
            zusatztoffe: [],
            allergene: [],
            description: '(versch. Sorten) 0,5L',
            prices: { default: 1.90 }
          },
          {
            nr: '125',
            type: 'drink',
            name: 'Bitburger',
            zusatztoffe: [],
            allergene: [],
            description: 'Früh Kölsch 0,33L',
            prices: { default: 2.00 }
          },
          {
            nr: '126',
            type: 'drink',
            name: 'Bitburger',
            zusatztoffe: [],
            allergene: [],
            description: 'Früh Kölsch 0,5L',
            prices: { default: 2.50 }
          },
          {
            nr: '127',
            type: 'drink',
            name: 'Efes Pilsener',
            zusatztoffe: [],
            allergene: [],
            description: '0,5L',
            prices: { default: 2.50 }
          }
        ]
      },
      {
        name: 'Alkoholfreie Getränke',
        description: 'Unsere Auswahl an alkoholfreien Getränken.',
        images: ['../assets/menu/42.jpg', '../assets/menu/43.jpg'],
        items: [
          {
            nr: '128',
            type: 'drink',
            name: 'Cola',
            zusatztoffe: [1, 10],
            allergene: [],
            description: 'Cola 0,33L',
            prices: { default: 2.00 },
          },
          {
            nr: '129',
            type: 'drink',
            name: 'Cola Light',
            zusatztoffe: [1, 2, 4, 5, 10],
            allergene: [],
            description: 'Cola Light 0,33L',
            prices: { default: 2.00 }
          },
          {
            nr: '130',
            type: 'drink',
            name: 'Fanta',
            zusatztoffe: [],
            allergene: [],
            description: 'Fanta 0,33L',
            prices: { default: 2.00 }
          },
          {
            nr: '131',
            type: 'drink',
            name: 'Sprite',
            zusatztoffe: [],
            allergene: [],
            description: 'Sprite 0,33L',
            prices: { default: 2.00 }
          },
          {
            nr: '132',
            type: 'drink',
            name: 'Eistee',
            zusatztoffe: [],
            allergene: [],
            description: 'Eistee 0,33L',
            prices: { default: 2.00 }
          },
          {
            nr: '133',
            type: 'drink',
            name: 'Cola',
            zusatztoffe: [1, 10],
            allergene: [],
            description: 'Cola 1,0L',
            prices: { default: 3.00 }
          },
          {
            nr: '134',
            type: 'drink',
            name: 'Cola Light',
            zusatztoffe: [1, 2, 4, 5, 10],
            allergene: [],
            description: 'Cola Light 1,0L',
            prices: { default: 3.00 }
          },
          {
            nr: '135',
            type: 'drink',
            name: 'Fanta',
            zusatztoffe: [],
            allergene: [],
            description: 'Fanta 1,0L',
            prices: { default: 3.00 }
          },
          {
            nr: '136',
            type: 'drink',
            name: 'Sprite',
            zusatztoffe: [],
            allergene: [],
            description: 'Sprite 1,0L',
            prices: { default: 3.00 }
          },
          {
            nr: '137',
            type: 'drink',
            name: 'Mineralwasser',
            zusatztoffe: [],
            allergene: [],
            description: '1,0L',
            prices: { default: 2.50 }
          },
          {
            nr: '138',
            type: 'drink',
            name: 'Uludag',
            zusatztoffe: [],
            allergene: [],
            description: '(Türkische Brause) 0,33L',
            prices: { default: 2.00 }
          },
          {
            nr: '139',
            type: 'drink',
            name: 'Ayran',
            zusatztoffe: [],
            allergene: [],
            description: '0,25L',
            prices: { default: 1.90 }
          },
          {
            nr: '140',
            type: 'drink',
            name: 'Tasse Kaffee',
            zusatztoffe: [],
            allergene: [],
            description: 'Tasse Kaffee',
            prices: { default: 2.50 }
          },
          {
            nr: '141',
            type: 'drink',
            name: 'Tee',
            zusatztoffe: [],
            allergene: [],
            description: 'Tee',
            prices: { default: 1.50 }
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
