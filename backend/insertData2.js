const mongoose = require('mongoose');
const Category = require('./models/Category');

mongoose.connect('mongodb://localhost:27017/antalya-doner-pizzeria', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const categories = [
  {
    name: 'pizza',
    description: 'Alle Pizzen mit Goudakäse und Oregano. Alle Pizzen auf Wunsch mit Knoblauch und scharf + 0.30€.',
    subcategories: [
      {
        name: 'Pizza',
        description: 'Verschiedene Pizza-Sorten',
        images: ['../assets/menu/8.jpg', '../assets/menu/10.jpg'],
        items: [
          {
            nr: '26',
            type: 'food',
            name: 'Margheritta',
            zusatztoffe: [1],
            allergene: ['a', 'g'],
            description: '',
            prices: { klein: 6.5, groß: 7.5 },
            extras: {
              mitKnoblauchundScharf: 0.3,
              GoudaKäse: 2.0
            }
          },
          {
            nr: '27',
            type: 'food',
            name: 'Salami',
            zusatztoffe: [1, 2, 3],
            allergene: ['a', 'g', 'i', 'j'],
            description: 'mit Salami',
            prices: { klein: 7.5, groß: 9.0 },
            extras: {
              mitKnoblauchundScharf: 0.3,
              GoudaKäse: 2.0
            }
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
