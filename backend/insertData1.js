const mongoose = require('mongoose');
const Category = require('./models/Category');

mongoose.connect('mongodb://localhost:27017/antalya-doner-pizzeria', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const categories = [
  {
    name: 'hauptgerichte',
    description: 'Unsere Hauptgerichte sind herzhaft und sättigend, perfekt für den großen Hunger.',
    subcategories: [
      {
        name: 'Döner Spezialitäten',
        description: 'Drehspieß nach Döner Art aus Kalbfleisch.',
        images: ['../assets/menu/1.jpg', '../assets/menu/2.jpg'],
        items: [
          {
            nr: '1',
            type: 'food',
            name: 'Döner im Fladenbrot',
            zusatztoffe: [2, 3, 4],
            allergene: ['a', 'g', 'f', 'l', 'b'],
            description: 'mit Salat und Tzatziki',
            prices: { klein: 6.5, groß: 9.5 },
            extras: { Hirtenkäse: 0.7 }
          },
          {
            nr: '2',
            type: 'food',
            name: 'Döner Dürüm',
            zusatztoffe: [2, 3, 4],
            allergene: ['a', 'g', 'f', 'l', 'b'],
            description: 'mit Salat und Tzatziki',
            prices: { default: 7.5 },
            extras: { Hirtenkäse: 0.7 }
          },
          {
            nr: '3',
            type: 'food',
            name: 'Nuggets Döner',
            zusatztoffe: [2, 3, 4],
            allergene: ['a', 'g', 'f', 'l', 'b'],
            description: 'mit Salat und Spezial Sauce',
            prices: { default: 6.5 },
            extras: { Hirtenkäse: 0.7 }
          }
        ]
      },
      {
        name: 'Döner Überbacken',
        description: 'Alle Döner Überbacken Gerichte werden mit Pommes & Salat serviert.',
        images: ['../assets/menu/3.jpg', '../assets/menu/4.jpg'],
        items: [
          {
            nr: '11',
            type: 'food',
            name: 'Döner überbacken',
            zusatztoffe: [2, 3, 4],
            allergene: ['f'],
            description: 'mit Sahnesauce und Gouda',
            prices: { default: 10.0 }
          },
          {
            nr: '12',
            type: 'food',
            name: 'Döner überbacken',
            zusatztoffe: [2, 3, 4],
            allergene: ['f'],
            description: 'mit Rahm, Gouda und Tomatensauce',
            prices: { default: 11.5 }
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
