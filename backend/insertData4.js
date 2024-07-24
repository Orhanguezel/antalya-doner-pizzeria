require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');
const Subcategory = require('./models/Subcategory');
const Item = require('./models/Item');

// .env dosyasından MongoDB bağlantı URI'sini alıyoruz
const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error('MONGO_URI is not defined in .env file');
}

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


mongoose.set('strictQuery', false);

const categories = [
  {
    name: 'Salate und Saucen',
    description: 'Unsere Hauptgerichte sind herzhaft und sättigend, perfekt für den großen Hunger.',
    subcategories: [
      {
        name: 'Salate',
        description: 'Frische Salate und köstliche Saucen, die jedes Gericht ergänzen.',
        images: ['/assets/menu/34.jpg', '/assets/menu/35.jpg'],
        items: [
          {
            nr: '113',
            type: 'food',
            name: 'Hawaii Salat',
            zusatztoffe: [2, 3, 4],
            allergene: ['a', 'g', 'f', 'l', 'b'],
            description: 'Eisbergsalat, Tomaten, Gurken, Schinken, Gouda, Ananas',
            prices: { klein: 7.0, groß: 9.5 }
          },
          {
            nr: '114',
            type: 'food',
            name: 'Capricciosa Salat',
            zusatztoffe: [2, 3, 4],
            allergene: ['a', 'g', 'f', 'l', 'b'],
            description: 'Eisbergsalat, Tomaten, Gurken, Schinken, Thunfisch, Zwiebeln, Ei',
            prices: { klein: 7.0, groß: 9.5 }
          },
          {
            nr: '115',
            type: 'food',
            name: 'Bauern Salat',
            zusatztoffe: [2, 3, 4],
            allergene: ['a', 'g', 'f', 'l', 'b'],
            description: 'Eisbergsalat, Tomaten, Gurken, Peperoni, Hirtenkäse',
            prices: { klein: 7.0, groß: 9.5 }
          },
          {
            nr: '116',
            type: 'food',
            name: 'Mista Salat',
            zusatztoffe: [2, 3, 4],
            allergene: ['a', 'g', 'f', 'l', 'b'],
            description: 'Eisbergsalat, Tomaten, Gurken, Paprika, Gouda, Zwiebeln',
            prices: { klein: 7.0, groß: 9.5 }
          },
          {
            nr: '117',
            type: 'food',
            name: 'Thunfisch Salat',
            zusatztoffe: [2, 3, 4],
            allergene: ['a', 'g', 'f', 'l', 'b'],
            description: 'Eisbergsalat, Tomaten, Gurken, Paprika, Gouda, Zwiebeln',
            prices: { klein: 7.0, groß: 9.5 }
          },
          {
            nr: '118',
            type: 'food',
            name: 'Mozzarella Salat',
            zusatztoffe: [2, 3, 4],
            allergene: ['a', 'g', 'f', 'l', 'b'],
            description: 'Eisbergsalat, Tomaten, Gurken, Oliven, Peperoni, Mozzarella',
            prices: { klein: 7.0, groß: 9.5 }
          },
          {
            nr: '119',
            type: 'food',
            name: 'Insalata dello Chef',
            zusatztoffe: [2, 3, 4],
            allergene: ['a', 'g', 'f', 'l', 'b'],
            description: 'Eisbergsalat, gek. Schinken, Hähnchenfleisch, Mais, Tomaten',
            prices: { klein: 7.5, groß: 10.0 }
          },
          {
            nr: '120',
            type: 'food',
            name: 'Insalata alla Cesa',
            zusatztoffe: [2, 3, 4],
            allergene: ['a', 'g', 'f', 'l', 'b'],
            description: 'Eisbergsalat, gek. Schinken, Thunfisch, Gouda, Tomaten',
            prices: { klein: 7.5, groß: 9.5 }
          },
          {
            nr: '121',
            type: 'food',
            name: 'Gemischter Salat',
            zusatztoffe: [2, 3, 4],
            allergene: ['a', 'g', 'f', 'l', 'b'],
            description: 'Eisbergsalat, Tomaten, Gurken, Kraut, Zwiebeln',
            prices: { klein: 7.0, groß: 9.5 }
          },
          {
            nr: '122',
            type: 'food',
            name: 'Döner Salat',
            zusatztoffe: [2, 3, 4],
            allergene: ['a', 'g', 'f', 'l', 'b'],
            description: 'Dönerfleisch, Eisbergsalat, Tomaten, Gurken, Kraut, Zwiebeln, Hirtenkäse',
            prices: { klein: 7.5, groß: 10.5 }
          }
        ]
      },
      {
        name: 'Saucen',
        description: 'Sie können zusätzlich zu allen Gerichten bestellt werden',
        images: ['/assets/menu/13.jpg', '/assets/menu/12.jpg'],
        items: [
          {
            nr: '86',
            type: 'food',
            name: 'Champignons, Rahmsauce',
            zusatztoffe: [9],
            allergene: ['a', 'f', 'g', 'i'],
            description: 'Rahmsauce',
            prices: { aufPommes: 1.5, kleineSchale: 2.5, großeSchale: 3.9 }
          },
          {
            nr: '87',
            type: 'food',
            name: 'Jägersauce',
            zusatztoffe: [1, 2, 8],
            allergene: ['j'],
            description: 'Jägersauce',
            prices: { aufPommes: 1.5, kleineSchale: 2.5, großeSchale: 3.9 }
          },
          {
            nr: '87.1',
            type: 'food',
            name: 'Zigeunersauce',
            zusatztoffe: [2, 4],
            allergene: ['a', 'b', 'i', 'j'],
            description: 'Zigeunersauce',
            prices: { aufPommes: 1.5, kleineSchale: 2.5, großeSchale: 3.9 }
          },
          {
            nr: '88',
            type: 'food',
            name: 'Ketchup',
            zusatztoffe: [1, 2, 8],
            allergene: ['j'],
            description: 'Ketchup',
            prices: { aufPommes: 1.0, kleineSchale: 2.0, großeSchale: 2.5 }
          },
          {
            nr: '88.1',
            type: 'food',
            name: 'Mayonnaise',
            zusatztoffe: [1, 2],
            allergene: ['a', 'f', 'j'],
            description: 'Mayonnaise',
            prices: { aufPommes: 1.0, kleineSchale: 2.0, großeSchale: 2.5 }
          },
          {
            nr: '88.2',
            type: 'food',
            name: 'Currysauce',
            zusatztoffe: [1, 2],
            allergene: ['j'],
            description: 'Currysauce',
            prices: { aufPommes: 1.0, kleineSchale: 2.0, großeSchale: 2.5 }
          },
          {
            nr: '89',
            type: 'food',
            name: 'Tzatziki',
            zusatztoffe: [],
            allergene: ['g'],
            description: 'Tzatziki',
            prices: { kleineSchale: 2.5, großeSchale: 3.0 }
          },
          {
            nr: '89.1',
            type: 'food',
            name: 'Cocktailsauce',
            zusatztoffe: [1, 2, 8],
            allergene: ['a', 'c', 'f', 'j'],
            description: 'Cocktailsauce',
            prices: { kleineSchale: 2.5, großeSchale: 3.0 }
          },
          {
            nr: '90',
            type: 'food',
            name: 'Scharf, Peperoni',
            zusatztoffe: [2, 3],
            allergene: [],
            description: 'Peperoni',
            prices: { kleineSchale: 2.5, großeSchale: 3.0 }
          },
          {
            nr: '90.1',
            type: 'food',
            name: 'Hirtenkäse',
            zusatztoffe: [1],
            allergene: ['g'],
            description: 'Hirtenkäse',
            prices: { aufPommes: 0.5, kleineSchale: 3.5, großeSchale: 4.9 }
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
