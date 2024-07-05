const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.set('strictQuery', false);

const Category = require('./models/Category');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  insertData();
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const categories = [
  {
    name: "beilagen",
    description: "Unsere Beilagen ergänzen jedes Gericht perfekt.",
    subcategories: [
      {
        name: "Pizzabrötchen 6 Stk",
        description: "Frisch aus dem Steinofen.",
        images: ["/assets/menu/11.jpg", "/assets/menu/12.jpg"],
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
              additional_items: ["Mais", "Brocoli", "Spinat", "Ei", "Zwiebeln", "Tomaten", "Paprika", "Oliven", "Pilze", "Ananas", "Schinken", "Salami"],
              additional_price: 1.00,
              premium_items: ["Thunfisch", "Sardellen", "Sauce Hollandaise", "Dönerfleisch", "Hirtenkäse", "Meeresfrüchte", "Krabben", "Sucuk (Türkische Knoblauchwurst)"],
              premium_price: 2.00
            }
          }
        ]
      }
    ]
  },
  {
    name: "sparmenu",
    description: "Unsere Hauptgerichte sind herzhaft und sättigend, perfekt für den großen Hunger.",
    subcategories: [
      {
        name: "sparmenus",
        description: "Unsere Sparmenus bieten eine großartige Kombination aus Geschmack und Preis.",
        images: ["/assets/menu/25.jpg", "/assets/menu/26.jpg"],
        items: [
          { nr: "142", type: "food", name: "Menü 1", zusatztoffe: [], allergene: [], description: "Döner Teller komplett + Softgetränk 0,33 L", prices: { default: 12.50 }, image: "/assets/menu/45.jpg" }
        ]
      }
    ]
  }
];

const insertData = async () => {
  try {
    await Category.deleteMany({});
    await Category.insertMany(categories);
    console.log('Data successfully inserted');
    process.exit();
  } catch (error) {
    console.error('Error inserting data:', error);
    process.exit(1);
  }
};
