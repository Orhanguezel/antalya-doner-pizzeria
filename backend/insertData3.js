const mongoose = require('mongoose');
const Category = require('./models/Category');

mongoose.connect('mongodb://localhost:27017/antalya-doner-pizzeria', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const categories = [
  {
    name: 'getränke',
    description: 'Unsere Auswahl an Getränken, um Ihren Durst zu stillen.',
    subcategories: [
      {
        name: 'Alkoholfreie Getränke',
        description: 'Erfrischende alkoholfreie Getränke.',
        images: ['../assets/menu/21.jpg', '../assets/menu/22.jpg'],
        items: [
          {
            nr: '301',
            type: 'drink',
            name: 'Coca Cola',
            zusatztoffe: [],
            allergene: [],
            description: '0,5L Flasche',
            prices: { default: 2.5 }
          },
          {
            nr: '302',
            type: 'drink',
            name: 'Fanta',
            zusatztoffe: [],
            allergene: [],
            description: '0,5L Flasche',
            prices: { default: 2.5 }
          }
        ]
      }
    ]
  }
];

const insertData = async () => {
  try {
    await Category.insertMany(categories);
    console.log('Data successfully inserted');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error inserting data:', error);
    mongoose.connection.close();
  }
};

insertData();
