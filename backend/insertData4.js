const mongoose = require('mongoose');
const Category = require('./models/Category');

mongoose.connect('mongodb://localhost:27017/antalya-doner-pizzeria', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const categories = [
  {
    name: 'sparmenu',
    description: 'Unsere Sparmenus bieten eine großartige Kombination aus Geschmack und Preis.',
    subcategories: [
      {
        name: 'sparmenus',
        description: 'Unsere Hauptgerichte sind herzhaft und sättigend, perfekt für den großen Hunger.',
        images: ['../assets/menu/25.jpg', '../assets/menu/26.jpg'],
        items: [
          {
            nr: '142',
            type: 'food',
            name: 'Menü 1',
            zusatztoffe: [],
            allergene: [],
            description: 'Döner Teller komplett + Softgetränk 0,33 L',
            prices: { default: 12.5 },
            image: '../assets/menu/45.jpg',
            extras: { additional_items: [], premium_items: [] }
          },
          {
            nr: '143',
            type: 'food',
            name: 'Menü 2',
            zusatztoffe: [],
            allergene: [],
            description: 'Döner überbacken + Pommes & Salat + Softgetränk 0,33 L',
            prices: { default: 12.5 },
            image: '../assets/menu/46.jpg',
            extras: { additional_items: [], premium_items: [] }
          },
          {
            nr: '144',
            type: 'food',
            name: 'Menü 3',
            zusatztoffe: [],
            allergene: [],
            description: 'Currywurst + Pommes + Softgetränk 0,33 L',
            prices: { default: 9.5 },
            image: '../assets/menu/47.jpg',
            extras: { additional_items: [], premium_items: [] }
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
