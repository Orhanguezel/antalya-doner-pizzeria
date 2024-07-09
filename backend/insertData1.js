const mongoose = require('mongoose');
const Category = require('./models/Category');
const Subcategory = require('./models/Subcategory');
const Item = require('./models/Item');

mongoose.connect('mongodb://localhost:27017/antalya-doner-pizzeria', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set('strictQuery', false);

const categoryData = {
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
          prices: { klein: 6.5, groß: 9.5},
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
        },
        {
          nr: '4',
          type: 'food',
          name: 'Döner Teller',
          zusatztoffe: [2, 3, 4],
          allergene: ['a', 'g', 'f', 'b'],
          description: 'mit Salat und Tzatziki',
          prices: { default: 9.5 },
          extras: { Hirtenkäse: 0.7 }
        },
        {
          nr: '5',
          type: 'food',
          name: 'Döner Teller',
          zusatztoffe: [2, 3, 4],
          allergene: ['a', 'g', 'f', 'l', 'b'],
          description: 'mit Pommes oder Reis und Tzatziki',
          prices: { default: 9.5 },
          extras: { Hirtenkäse: 0.7 }
        },
        {
          nr: '6',
          type: 'food',
          name: 'Döner Teller',
          zusatztoffe: [2, 3, 4],
          allergene: ['a', 'g', 'f', 'b'],
          description: 'mit Pommes oder Reis, Salat und Tzatziki',
          prices: { default: 11.0 },
          extras: { Hirtenkäse: 0.7 }
        },
        {
          nr: '7',
          type: 'food',
          name: 'Portion Döner',
          zusatztoffe: [2, 3, 4],
          allergene: ['g'],
          description: 'mit Zwiebeln und Tzatziki',
          prices: { klein: 9.0, groß: 11.5 },
          extras: { Hirtenkäse: 0.7 }
        },
        {
          nr: '8',
          type: 'food',
          name: 'Döner Pita',
          zusatztoffe: [2, 3, 4],
          allergene: ['f'],
          description: 'mit Rahmsauce und Gouda Käse',
          prices: { klein: 9.0, groß: 11.5 },
          extras: { Hirtenkäse: 0.7 }
        },
        {
          nr: '9',
          type: 'food',
          name: 'Pomm-Döner',
          zusatztoffe: [2, 3, 4],
          allergene: ['g', 'f', 'b'],
          description: 'mit Sauce',
          prices: { default: 6.5 }
        },
        {
          nr: '10',
          type: 'food',
          name: 'Falafel Teller',
          zusatztoffe: [],
          allergene: [],
          description: '8 Stk. mit Pommes oder Reis, Salat und Tzatziki',
          prices: { default: 10.0 }
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
        },
        {
          nr: '13',
          type: 'food',
          name: 'Döner überbacken',
          zusatztoffe: [2, 3, 4],
          allergene: ['g'],
          description: 'mit Peperoni, Zwiebeln, Gouda Hirtenkäse & Sauce Hollandaise',
          prices: { default: 11.5 }
        },
        {
          nr: '14',
          type: 'food',
          name: 'Döner überbacken',
          zusatztoffe: [2, 3, 4],
          allergene: ['g'],
          description: 'mit Spinat, Broccoli, Pilze, Gouda und Sauce Hollandaise',
          prices: { default: 11.5 }
        },
        {
          nr: '15',
          type: 'food',
          name: 'Döner überbacken',
          zusatztoffe: [2, 3, 4],
          allergene: ['g', 'f', 'b'],
          description: 'mit Peperoni, Tomaten, Zwiebeln, Gouda und Sauce Hollandaise',
          prices: { default: 11.5 }
        },
        {
          nr: '16',
          type: 'food',
          name: 'Döner überbacken',
          zusatztoffe: [2, 3, 4],
          allergene: ['g', 'f', 'b'],
          description: 'mit Schinken, Ananas, Gouda und Sauce Hollandaise',
          prices: { default: 11.5 }
        }
      ]
    },
    {
      name: 'Teigtaschen',
      description: 'Im Steinofen frisch gebacken.',
      images: ['../assets/menu/5.jpg', '../assets/menu/6.jpg'],
      items: [
        {
          nr: '18',
          type: 'food',
          name: 'Lahmacun (Türkische Pizza)',
          zusatztoffe: [2, 3, 4],
          allergene: ['a', 'g', 'f', 'l', 'b'],
          description: 'mit Salat und Tzatziki eingerollt',
          prices: { default: 7.5 }
        },
        {
          nr: '19',
          type: 'food',
          name: 'Lahmacun (Türkische Pizza)',
          zusatztoffe: [2, 3, 4],
          allergene: ['a', 'g', 'f', 'l', 'b'],
          description: 'mit Salat, Tzatziki und Dönerfleisch eingerollt',
          prices: { default: 8.5 }
        },
        {
          nr: '20',
          type: 'food',
          name: 'Kıymalı Pide',
          zusatztoffe: [1],
          allergene: ['a', 'g'],
          description: 'Teigtasche gefüllt mit Gehacktem, Gouda und Salatbeilage',
          prices: { default: 9.5 }
        },
        {
          nr: '21',
          type: 'food',
          name: 'Ispanaklı Pide',
          zusatztoffe: [1],
          allergene: ['a', 'g'],
          description: 'Teigtasche gefüllt mit Spinat, Hirtenkäse, Gouda und Salatbeilage',
          prices: { default: 9.5 }
        },
        {
          nr: '22',
          type: 'food',
          name: 'Calzone 1',
          zusatztoffe: [1, 2, 3, 4],
          allergene: ['a', 'g'],
          description: 'Teigtasche gefüllt mit Dönerfleisch, Tomaten, Zwiebeln, Gouda und Salatbeilage',
          prices: { default: 10.0 }
        },
        {
          nr: '23',
          type: 'food',
          name: 'Calzone 2',
          zusatztoffe: [2, 3],
          allergene: ['a', 'c', 'g', 'i', 'o'],
          description: 'Teigtasche gefüllt mit Peperoni, Champignons, Spinat, Gouda, Sauce Hollandaise und Salatbeilage',
          prices: { default: 10.0 }
        },
        {
          nr: '24',
          type: 'food',
          name: 'Sucuklu Pide',
          zusatztoffe: [1],
          allergene: ['a', 'g'],
          description: 'Teigtasche gefüllt mit Knoblauchwurst, Gouda und Salatbeilage',
          prices: { default: 9.5 }
        },
        {
          nr: '25',
          type: 'food',
          name: 'Peynirli Pide',
          zusatztoffe: [1],
          allergene: ['a', 'g'],
          description: 'Teigtasche gefüllt mit Hirtenkäse und Salatbeilage',
          prices: { default: 9.5 }
        },
        {
          nr: '25.1',
          type: 'food',
          name: 'Dönerli Pide',
          zusatztoffe: [1, 2, 3, 4],
          allergene: ['a', 'g'],
          description: 'Teigtasche gefüllt mit Dönerfleisch, Zwiebeln, Hirtenkäse und Salatbeilage',
          prices: { default: 10.5 }
        }
      ]
    },
    {
      name: 'Pizza',
      description: 'Alle Pizzen mit Goudakäse und Oregano. Alle Pizzen auf Wunsch mit Knoblauch und scharf + 0.30€.',
      images: ['../assets/menu/8.jpg', '../assets/menu/10.jpg'],
      items: [
        {
          nr: '26',
          type: 'food',
          name: 'Margheritta',
          zusatztoffe: [1],
          allergene: ['a', 'g'],
          description: '',
          prices: { klein: 6.5, groß: 7.5},
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
          prices: { klein: 7.5, groß: 9.0},
          extras: {
            mitKnoblauchundScharf: 0.3,
            GoudaKäse: 2.0
          }
        },
        {
          nr: '28',
          type: 'food',
          name: 'Prosciutto',
          zusatztoffe: [3, 9],
          allergene: ['a', 'i', 'j'],
          description: 'mit Schinken',
          prices: { klein: 7.5, groß: 9.0},
          extras: {
            mitKnoblauchundScharf: 0.3,
            GoudaKäse: 2.0
          }
        },
        {
          nr: '29',
          type: 'food',
          name: 'Funghi',
          zusatztoffe: [1],
          allergene: ['a', 'g'],
          description: 'mit Pilze',
          prices: { klein: 7.5, groß: 9.0},
          extras: {
            mitKnoblauchundScharf: 0.3,
            GoudaKäse: 2.0
          }
        },
        {
          nr: '30',
          type: 'food',
          name: 'Tonno',
          zusatztoffe: [1],
          allergene: ['a', 'g', 'f'],
          description: 'mit Thunfisch und Zwiebeln',
          prices: { klein: 7.5, groß: 9.5},
          extras: {
            mitKnoblauchundScharf: 0.3,
            GoudaKäse: 2.0
          }
        },
        {
          nr: '31',
          type: 'food',
          name: 'Toscana',
          zusatztoffe: [1, 2, 3],
          allergene: ['a', 'g', 'i', 'j'],
          description: 'mit Salami und Schinken',
          prices: { klein: 7.5, groß: 9.5},
          extras: {
            mitKnoblauchundScharf: 0.3,
            GoudaKäse: 2.0
          }
        },
        {
          nr: '32',
          type: 'food',
          name: 'Hawaii',
          zusatztoffe: [1, 2, 3],
          allergene: ['a', 'g', 'i', 'j'],
          description: 'mit Ananas und Schinken',
          prices: { klein: 7.5, groß: 9.5},
          extras: {
            mitKnoblauchundScharf: 0.3,
            GoudaKäse: 2.0
          }
        },
        {
          nr: '33',
          type: 'food',
          name: 'Diavollo',
          zusatztoffe: [1, 2, 3],
          allergene: ['a', 'g', 'i', 'j'],
          description: 'mit Thunfisch, Paprika, Salami, Knoblauch (scharf)',
          prices: { klein: 7.5, groß: 9.5},
          extras: {
            mitKnoblauchundScharf: 0.3,
            GoudaKäse: 2.0
          }
        },
        {
          nr: '34',
          type: 'food',
          name: 'Inferno',
          zusatztoffe: [1, 2, 3, 6],
          allergene: ['a', 'g'],
          description: 'mit Paprika, Peperoni, Oliven (scharf)',
          prices: { klein: 7.5, groß: 9.0},
          extras: {
            mitKnoblauchundScharf: 0.3,
            GoudaKäse: 2.0
          }
        },
        {
          nr: '35',
          type: 'food',
          name: 'Mafiosi',
          zusatztoffe: [1, 2, 3],
          allergene: ['a', 'g', 'i', 'j'],
          description: 'mit Salami, Thunfisch und Zwiebeln',
          prices: { klein: 7.5, groß: 9.5},
          extras: {
            mitKnoblauchundScharf: 0.3,
            GoudaKäse: 2.0
          }
        },
        {
          nr: '36',
          type: 'food',
          name: 'Broccoli',
          zusatztoffe: [1],
          allergene: ['a', 'g'],
          description: 'mit Broccoli, Paprika und Zwiebeln',
          prices: { klein: 7.5, groß: 9.5},
          extras: {
            mitKnoblauchundScharf: 0.3,
            GoudaKäse: 2.0
          }
        },
        {
          nr: '37',
          type: 'food',
          name: 'Capricciosa',
          zusatztoffe: [1, 2, 3],
          allergene: ['a', 'g', 'i', 'j'],
          description: 'mit Salami, Schinken und Pilze',
          prices: { klein: 7.5, groß: 9.5},
          extras: {
            mitKnoblauchundScharf: 0.3,
            GoudaKäse: 2.0
          }
        },
        {
          nr: '38',
          type: 'food',
          name: 'Calzone 1',
          zusatztoffe: [1, 2, 3],
          allergene: ['a', 'g', 'i', 'j'],
          description: 'Teigtasche mit Schinken, Salami und Paprika',
          prices: { klein: 7.5, groß: 9.0},
          extras: {
            mitKnoblauchundScharf: 0.3,
            GoudaKäse: 2.0
          }
        },
        {
          nr: '39',
          type: 'food',
          name: 'Vegetaria',
          zusatztoffe: [1],
          allergene: ['a', 'g'],
          description: 'mit Broccoli, Pilzen, Tomaten, Zwiebeln und Paprika',
          prices: { klein: 8.5, groß: 11.0 },
          extras: {
            mitKnoblauchundScharf: 0.3,
            GoudaKäse: 2.0
          }
        },
        {
          nr: '40',
          type: 'food',
          name: 'Pizza Döner',
          zusatztoffe: [1, 2, 3, 4],
          allergene: ['a', 'g', 'f', 'l', 'b'],
          description: 'mit Dönerfleisch, Zwiebeln und Tomaten',
          prices: { klein: 8.5, groß: 11.0 },
          extras: {
            mitKnoblauchundScharf: 0.3,
            GoudaKäse: 2.0
          }
        },
        {
          nr: '41',
          type: 'food',
          name: 'Pizza Döner',
          zusatztoffe: [1, 2, 3, 4],
          allergene: ['a', 'g', 'f', 'l', 'b'],
          description: 'mit Dönerfleisch, Hirtenkäse, Peperoni und Gouda',
          prices: { klein: 8.5, groß: 11.0 },
          extras: {
            mitKnoblauchundScharf: 0.3,
            GoudaKäse: 2.0
          }
        },
        {
          nr: '42',
          type: 'food',
          name: 'Pizza nach Art des Hauses',
          zusatztoffe: [1, 2, 3, 4],
          allergene: ['a', 'g', 'f', 'l', 'b'],
          description: 'mit Dönerfleisch, Hirtenkäse und Zwiebeln (scharf)',
          prices: { klein: 8.5, groß: 11.0 },
          extras: {
            mitKnoblauchundScharf: 0.3,
            GoudaKäse: 2.0
          }
        },
        {
          nr: '43',
          type: 'food',
          name: 'Americano',
          zusatztoffe: [1, 3, 9],
          allergene: ['a', 'i', 'j'],
          description: 'mit Schinken, Thunfisch, Ei, Champignons, Zwiebeln (scharf)',
          prices: { klein: 8.5, groß: 11.0 },
          extras: {
            mitKnoblauchundScharf: 0.3,
            GoudaKäse: 2.0
          }
        },
        {
          nr: '44',
          type: 'food',
          name: 'Scampi',
          zusatztoffe: [1],
          allergene: ['a', 'g'],
          description: 'mit Krabben und Knoblauch',
          prices: { klein: 7.5, groß: 10.0},
          extras: {
            mitKnoblauchundScharf: 0.3,
            GoudaKäse: 2.0
          }
        },
        {
          nr: '45',
          type: 'food',
          name: 'Tavera',
          zusatztoffe: [1],
          allergene: ['a', 'g'],
          description: 'mit Spinat, Hirtenkäse und Pilze',
          prices: { klein: 7.5, groß: 10.0},
          extras: {
            mitKnoblauchundScharf: 0.3,
            GoudaKäse: 2.0
          }
        },
        {
          nr: '46',
          type: 'food',
          name: 'Aldenhoven Pizza',
          zusatztoffe: [1, 2, 3],
          allergene: ['a', 'g', 'i', 'j'],
          description: 'mit Salami, Pilze, Thunfisch und Paprika',
          prices: { klein: 8.5, groß: 10.5 },
          extras: {
            mitKnoblauchundScharf: 0.3,
            GoudaKäse: 2.0
          }
        },
        {
          nr: '47',
          type: 'food',
          name: 'Siciliano',
          zusatztoffe: [1, 2, 3, 6],
          allergene: ['a', 'g', 'i', 'j'],
          description: 'mit Thunfisch, Schinken, Sardellen, Oliven und Zwiebeln',
          prices: { klein: 9.0, groß: 11.0},
          extras: {
            mitKnoblauchundScharf: 0.3,
            GoudaKäse: 2.0
          }
        },
        {
          nr: '48',
          type: 'food',
          name: 'Napolli',
          zusatztoffe: [1, 6],
          allergene: ['a', 'g'],
          description: 'mit Sardellen, Oliven und Zwiebeln',
          prices: { klein: 7.5, groß: 10.0},
          extras: {
            mitKnoblauchundScharf: 0.3,
            GoudaKäse: 2.0
          }
        },
        {
          nr: '49',
          type: 'food',
          name: 'Mozzarella',
          zusatztoffe: [1],
          allergene: ['a', 'g'],
          description: 'mit fr. Tomaten',
          prices: { klein: 7.5, groß: 10.0},
          extras: {
            mitKnoblauchundScharf: 0.3,
            GoudaKäse: 2.0
          }
        },
        {
          nr: '50',
          type: 'food',
          name: 'Gepetto',
          zusatztoffe: [1],
          allergene: ['a', 'g'],
          description: 'mit Thunfisch, Paprika und Zwiebeln',
          prices: { klein: 8.0, groß: 10.5 },
          extras: {
            mitKnoblauchundScharf: 0.3,
            GoudaKäse: 2.0
          }
        },
        {
          nr: '51',
          type: 'food',
          name: 'Mista',
          zusatztoffe: [1, 2, 3],
          allergene: ['a', 'g', 'i', 'j'],
          description: 'mit Salami, Thunfisch, Champignons und Schinken',
          prices: { klein: 8.5, groß: 11.0 },
          extras: {
            mitKnoblauchundScharf: 0.3,
            GoudaKäse: 2.0
          }
        },
        {
          nr: '52',
          type: 'food',
          name: 'Sucuklu',
          zusatztoffe: [1],
          allergene: ['a', 'g'],
          description: 'Pizza mit türk. Knoblauchwurst',
          prices: { klein: 8.5, groß: 11.0 },
          extras: {
            mitKnoblauchundScharf: 0.3,
            GoudaKäse: 2.0
          }
        },
        {
          nr: '53',
          type: 'food',
          name: 'Döner Pizza Hawaii',
          zusatztoffe: [1, 2, 3, 4],
          allergene: ['a', 'g', 'f', 'l', 'b'],
          description: 'mit Dönerfleisch, Schinken und Ananas',
          prices: { klein: 8.5, groß: 11.0 },
          extras: {
            mitKnoblauchundScharf: 0.3,
            GoudaKäse: 2.0
          }
        }
      ]
    }
  ]
};

const insertData = async () => {
  try {
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
    console.log('Category data successfully inserted');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error inserting category data:', error);
    mongoose.connection.close();
  }
};

insertData();
