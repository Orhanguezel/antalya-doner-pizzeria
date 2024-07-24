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

const categoryData = {
    name: "Beilagen",
    description: "Unsere Beilagen ergänzen jedes Gericht perfekt.",
    subcategories: [
      {
        name: "Pizzabrötchen 6 Stk",
        description: "Frisch aus dem Steinofen.",
        images: ["/assets/menu/15.jpg", "/assets/menu/17.jpg"],
        items: [
          {
            nr: "55",
            type: "food",
            name: "Pizzabrötchen",
            zusatztoffe: [],
            allergene: ["a"],
            description: "8 Stück mit Kräuterbutter",
            prices: { default: 3.50 },
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
          },
          {
            nr: "56",
            type: "food",
            name: "Gefüllte Pizzabrötchen",
            zusatztoffe: [1],
            allergene: ["a", "g"],
            description: "mit Gouda",
            prices: { default: 5.50 },
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
          },
          {
            nr: "57",
            type: "food",
            name: "Gefüllte Pizzabrötchen",
            zusatztoffe: [1],
            allergene: ["a", "g"],
            description: "mit Thunfisch und Gouda",
            prices: { default: 6.50 },
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
          },
          {
            nr: "58",
            type: "food",
            name: "Gefüllte Pizzabrötchen",
            zusatztoffe: [1, 2, 3],
            allergene: ["a", "g", "i", "j"],
            description: "mit Schinken oder Salami und Gouda",
            prices: { default: 6.50 },
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
          },
          {
            nr: "59",
            type: "food",
            name: "Gefüllte Pizzabrötchen",
            zusatztoffe: [1, 2, 3, 4],
            allergene: ["a", "g", "f", "l", "b"],
            description: "mit Dönerfleisch, Gouda und Zwiebeln",
            prices: { default: 6.50 },
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
          },
          {
            nr: "60",
            type: "food",
            name: "Gefüllte Pizzabrötchen",
            zusatztoffe: [1],
            allergene: ["a", "g"],
            description: "mit türk. Knoblauchwurst und Gouda",
            prices: { default: 6.50 },
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
              Sucuk: 2.0 }
          }
        ]

      },
      {
        name: "Schnitzelgerichte",
        description: "Alle Schnitzelgerichte werden mit Pommes & Salat serviert.",
        images: ["/assets/menu/18.jpg", "/assets/menu/19.jpg"],
        items: [
          {
            nr: "62",
            type: "food",
            name: "Jägerschnitzel",
            zusatztoffe: [2, 4],
            allergene: ["a", "b", "i", "j"],
            description: "mit Salat, Pommes oder Reis",
            prices: { default: 11.50 }
          },
          {
            nr: "63",
            type: "food",
            name: "Zigeunerschnitzel",
            zusatztoffe: [1, 2, 8],
            allergene: ["a", "j"],
            description: "mit Salat, Pommes oder Reis",
            prices: { default: 11.50 }
          },
          {
            nr: "64",
            type: "food",
            name: "Schnitzel Wiener Art",
            zusatztoffe: [],
            allergene: ["a"],
            description: "mit Salat, Pommes oder Reis",
            prices: { default: 10.50 }
          },
          {
            nr: "65",
            type: "food",
            name: "Rahmschnitzel",
            zusatztoffe: [9],
            allergene: ["a", "g", "f", "i"],
            description: "mit Salat, Pommes oder Reis",
            prices: { default: 11.50 }
          },
          {
            nr: "66",
            type: "food",
            name: "Champignons-Rahm Schnitzel",
            zusatztoffe: [9],
            allergene: ["a", "g", "f", "i"],
            description: "mit Salat, Pommes oder Reis",
            prices: { default: 12.00 }
          },
          {
            nr: "67",
            type: "food",
            name: "Putenschnitzel",
            zusatztoffe: [],
            allergene: ["a", "o"],
            description: "mit Salat, Pommes oder Reis",
            prices: { default: 10.50 }
          },
          {
            nr: "68",
            type: "food",
            name: "Hawaischnitzel",
            zusatztoffe: [3, 9],
            allergene: ["a", "g", "f", "i", "j"],
            description: "mit Ananas, Schinken, Käse überbacken, Sahne, Salat, Pommes oder Reis",
            prices: { default: 12.00 }
          },
          {
            nr: "69",
            type: "food",
            name: "Gemüseschnitzel",
            zusatztoffe: [9],
            allergene: ["a", "g", "f", "i"],
            description: "mit Broccoli, Champignons, Paprika, Gouda, Sahne, Salat, Pommes oder Reis",
            prices: { default: 13.00 }
          },
          {
            nr: "70",
            type: "food",
            name: "Zwiebelschnitzel",
            zusatztoffe: [],
            allergene: ["a"],
            description: "mit Salat, Pommes oder Reis",
            prices: { default: 13.00 }
          },
          {
            nr: "71",
            type: "food",
            name: "Schnitzel überbacken",
            zusatztoffe: [1, 2, 3],
            allergene: ["a", "c", "g", "i", "o"],
            description: "mit Peperoni, Zwiebel, Sauce Hollandaise, Salat, Pommes oder Reis",
            prices: { default: 12.50 }
          },
          {
            nr: "72",
            type: "food",
            name: "Bologneseschnitzel",
            zusatztoffe: [],
            allergene: ["a"],
            description: "mit Bolognese, Salat, Pommes oder Reis",
            prices: { default: 11.50 }
          },
          {
            nr: "73",
            type: "food",
            name: "Gemüseschnitzel",
            zusatztoffe: [9],
            allergene: ["a", "g", "f", "i"],
            description: "mit Broccoli, Champignons, Paprika, Salat, Pommes oder Reis",
            prices: { default: 12.50 }
          }
        ]
      },
      {
        name: "Wurst & Pommes",
        description: "Klassische Würstchen mit knusprigen Pommes.",
        images: ["/assets/menu/23.jpg", "/assets/menu/24.jpg"],
        items: [
          {
            nr: "74",
            type: "food",
            name: "Pommes Frites",
            zusatztoffe: [],
            allergene: [],
            description: "",
            prices: { klein: 3.00, groß: 3.50 }
          },
          {
            nr: "75",
            type: "food",
            name: "Bratrolle",
            zusatztoffe: [1, 3, 4],
            allergene: ["a", "c", "f", "i", "j", "p"],
            description: "",
            prices: { default: 2.50 }
          },
          {
            nr: "76",
            type: "food",
            name: "Bratrolle Spezial",
            zusatztoffe: [1, 3, 4],
            allergene: ["a", "c", "f", "i", "j", "p"],
            description: "",
            prices: { default: 4.00 }
          },
          {
            nr: "77",
            type: "food",
            name: "Bratwurst",
            zusatztoffe: [3, 4, 9],
            allergene: ["i", "j"],
            description: "",
            prices: { default: 3.00 }
          },
          {
            nr: "78",
            type: "food",
            name: "Currywurst",
            zusatztoffe: [1, 2, 3],
            allergene: ["i", "j"],
            description: "",
            prices: { default: 4.00 }
          },
          {
            nr: "79",
            type: "food",
            name: "Zigeunerwurst",
            zusatztoffe: [1, 2, 3, 4, 8, 9],
            allergene: ["i", "j"],
            description: "",
            prices: { default: 5.00 }
          },
          {
            nr: "791",
            type: "food",
            name: "Jäger",
            zusatztoffe: [2, 3, 4, 9],
            allergene: ["a", "b", "i", "j"],
            description: "",
            prices: { default: 5.00 }
          },
          {
            nr: "80",
            type: "food",
            name: "Reis",
            zusatztoffe: [],
            allergene: [],
            description: "",
            prices: { klein: 4.00, groß: 5.00 }
          },
          {
            nr: "81",
            type: "food",
            name: "Chicken Nuggets",
            zusatztoffe: [],
            allergene: ["a"],
            description: "(form nuggets) 7 Stück mit Pommes",
            prices: { default: 7.50 }
          },
          {
            nr: "82",
            type: "food",
            name: "Bramscheibe",
            zusatztoffe: [1, 4],
            allergene: ["a", "c", "f", "g", "o"],
            description: "",
            prices: { default: 2.50 }
          },
          {
            nr: "83",
            type: "food",
            name: "Hamburger",
            zusatztoffe: [2, 9],
            allergene: ["a", "c", "j", "k", "o"],
            description: "mit Pommes",
            prices: { default: 7.50 }
          },
          {
            nr: "84",
            type: "food",
            name: "Cheeseburger",
            zusatztoffe: [2, 9],
            allergene: ["a", "c", "j", "k", "o"],
            description: "",
            prices: { default: 5.00 }
          },
          {
            nr: "85",
            type: "food",
            name: "Kroketten",
            zusatztoffe: [1, 9],
            allergene: ["a", "g"],
            description: "6 Stück",
            prices: { default: 4.00 }
          },
          {
            nr: "851",
            type: "food",
            name: "Falafel",
            zusatztoffe: [],
            allergene: [],
            description: "6 Stück mit Tzatziki",
            prices: { default: 5.00 }
          }
        ]
      },
      {
        name: "Pasta al Forno",
        description: "Hausgemachte Pasta frisch aus dem Ofen.",
        images: ["/assets/menu/25.jpg", "/assets/menu/26.jpg"],
        items: [
          {
            nr: "91",
            type: "food",
            name: "Spaghetti Napoli",
            zusatztoffe: [],
            allergene: ["a", "c"],
            description: "mit Tomatensauce",
            prices: { default: 7.50 },
            extras: { auchÜberbacken: 2.00 }
          },
          {
            nr: "92",
            type: "food",
            name: "Spaghetti Bolognese",
            zusatztoffe: [],
            allergene: ["a", "c"],
            description: "mit Hackfleischsauce",
            prices: { default: 8.50 },
            extras: { auchÜberbacken: 2.00 }
          },
          {
            nr: "93",
            type: "food",
            name: "Spaghetti con Tonno",
            zusatztoffe: [],
            allergene: ["a", "c", "d"],
            description: "mit Thunfisch, Zwiebeln, Tomatensauce und Knoblauch",
            prices: { default: 9.50 },
            extras: { auchÜberbacken: 2.00 }
          },
          {
            nr: "94",
            type: "food",
            name: "Spaghetti Carbonara",
            zusatztoffe: [1, 3, 12],
            allergene: ["a", "c"],
            description: "mit gek. Schinken, Ei, Sauce Hollandaise",
            prices: { default: 8.90 },
            extras: { auchÜberbacken: 2.00 }
          },
          {
            nr: "95",
            type: "food",
            name: "Spaghetti Siciliana",
            zusatztoffe: [],
            allergene: ["a", "c"],
            description: "mit Paprika, Zwiebeln, Oliven, scharf, Tomatensauce",
            prices: { default: 9.50 },
            extras: { auchÜberbacken: 2.00 }
          }
        ]
      },
      {
        name: "Tortellini",
        description: "Frisch und lecker.",
        images: ["/assets/menu/27.jpg", "/assets/menu/28.jpg"],
        items: [
          {
            nr: "100",
            type: "food",
            name: "Tortellini Bolognese",
            zusatztoffe: [],
            allergene: ["a", "c"],
            description: "in Hackfleischsauce",
            prices: { default: 9.50 },
            extras: { auchÜberbacken: 2.00 }
          },
          {
            nr: "101",
            type: "food",
            name: "Tortellini alla Panna",
            zusatztoffe: [1, 2, 3, 12],
            allergene: [],
            description: "gekochter Schinken, Spinat, in scharfer Tomaten-Sahnesauce",
            prices: { default: 9.90 },
            extras: { auchÜberbacken: 2.00 }
          },
          {
            nr: "102",
            type: "food",
            name: "Tortellini alla Pepe",
            zusatztoffe: [1, 3, 12],
            allergene: [],
            description: "gekochter Schinken, Gouda, Sahnesauce",
            prices: { default: 10.50 },
            extras: { auchÜberbacken: 2.00 }
          },
          {
            nr: "103",
            type: "food",
            name: "Tortellini Portofino",
            zusatztoffe: [],
            allergene: ["a", "c"],
            description: "Paprika, Zwiebeln, Oliven, scharf, Knoblauch, Tomatensauce",
            prices: { default: 10.50 },
            extras: { auchÜberbacken: 2.00 }
          }
        ]
      },
      {
        name: "Maccaroni",
        description: "Ein echter Klassiker.",
        images: ["/assets/menu/29.jpg", "/assets/menu/30.jpg"],
        items: [
          {
            nr: "106",
            type: "food",
            name: "Maccheroni Bolognese",
            zusatztoffe: [],
            allergene: ["a", "c"],
            description: "in Hackfleischsauce",
            prices: { default: 8.50 },
            extras: { auchÜberbacken: 2.00 }
          },
          {
            nr: "107",
            type: "food",
            name: "Maccheroni Arrabiata",
            zusatztoffe: [1, 3, 12],
            allergene: [],
            description: "gekochter Schinken, Zwiebeln, Knoblauch, Sauce Hollandaise",
            prices: { default: 9.50 },
            extras: { auchÜberbacken: 2.00 }
          },
          {
            nr: "108",
            type: "food",
            name: "Maccheroni dello Zio",
            zusatztoffe: [],
            allergene: ["a", "c"],
            description: "Hühnerbrustfilet, Paprika, Oliven, Knoblauch, scharfe Tomatensauce",
            prices: { default: 10.50 },
            extras: { auchÜberbacken: 2.00 }
          },
          {
            nr: "109",
            type: "food",
            name: "Maccheroni alla Pepe",
            zusatztoffe: [],
            allergene: ["a", "c"],
            description: "Paprika, Broccoli, Champignons, scharf, Knoblauch, Sauce Hollandaise",
            prices: { default: 10.50 },
            extras: { auchÜberbacken: 2.00 }
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