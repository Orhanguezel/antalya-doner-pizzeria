const mongoose = require('mongoose');
const Category = require('./models/Category');

mongoose.connect('mongodb://localhost:27017/antalya-doner-pizzeria', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const categories = [
  {
    name: 'desserts',
    description: 'Unsere süßen Verführungen für den perfekten Abschluss.',
    subcategories: [
      {
        name: 'Desserts',
        description: 'Leckere Desserts für Naschkatzen.',
        images: ['../assets/menu/31.jpg', '../assets/menu/32.jpg'],
        items: [
          {
            nr: '401',
            type: 'dessert',
            name: 'Tiramisu',
            zusatztoffe: [4],
            allergene: ['a', 'g'],
            description: 'Hausgemachtes Tiramisu',
            prices: { default: 4.5 }
          },
          {
            nr: '402',
            type: 'dessert',
            name: 'Cheesecake',
            zusatztoffe: [4],
            allergene: ['a', 'g'],
            description: 'Frischkäsekuchen',
            prices: { default: 3.5 }
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
