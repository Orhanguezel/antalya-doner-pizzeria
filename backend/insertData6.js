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
  name: "Sparmenus",
  description: "Unsere Sparmenus bieten eine großartige Kombination aus Geschmack und Preis.",
  subcategories: [
    {
      name: "Sparmenu",
      description: "Alle Dosen Getränke + 0,25€ Pfand",
      images: ["../assets/menu/25.jpg", "../assets/menu/26.jpg"],
      items: [
        {
          nr: "142",
          type: "food",
          name: "Menü 1",
          zusatztoffe: [],
          allergene: [],
          description: "Döner Teller komplett + Softgetränk 0,33 L",
          prices: { default: 12.50 },
          image: "../assets/menu/45.jpg"
        },
        {
          nr: "143",
          type: "food",
          name: "Menü 2",
          zusatztoffe: [],
          allergene: [],
          description: "Döner überbacken + Pommes & Salat + Softgetränk 0,33 L",
          prices: { default: 12.50 },
          image: "../assets/menu/46.jpg"
        },
        {
          nr: "144",
          type: "food",
          name: "Menü 3",
          zusatztoffe: [],
          allergene: [],
          description: "Currywurst + Pommes + Softgetränk 0,33 L",
          prices: { default: 9.50 },
          image: "../assets/menu/47.jpg"
        },
        {
          nr: "145",
          type: "food",
          name: "Menü 4",
          zusatztoffe: [],
          allergene: [],
          description: "Pizza nach Wahl + Softgetränk 0,33 L",
          prices: { default: 12.50 },
          image: "../assets/menu/48.jpg"
        },
        {
          nr: "146",
          type: "food",
          name: "Menü 5",
          zusatztoffe: [],
          allergene: [],
          description: "Schnitzel nach Wahl mit Pommes & Salat + Softgetränk 0,33 L",
          prices: { default: 12.50 },
          image: "../assets/menu/49.jpg"
        },
        {
          nr: "147",
          type: "food",
          name: "Menü 6",
          zusatztoffe: [],
          allergene: [],
          description: "Lahmacun komplett + Softgetränk 0,33 L",
          prices: { default: 9.50 },
          image: "../assets/menu/50.jpg"
        },
        {
          nr: "148",
          type: "food",
          name: "Menü 7",
          zusatztoffe: [],
          allergene: [],
          description: "Döner Tasche komplett mit Pommes + Softgetränk 0,33 L",
          prices: { default: 9.50 },
          image: "../assets/menu/51.jpg"
        },
        {
          nr: "149",
          type: "food",
          name: "Menü 8",
          zusatztoffe: [],
          allergene: [],
          description: "Pide nach Wahl + Softgetränk 0,33 L",
          prices: { default: 11.00 },
          image: "../assets/menu/52.jpg"
        },
        {
          nr: "150",
          type: "food",
          name: "Menü 9",
          zusatztoffe: [],
          allergene: [],
          description: "Hamburger + Pommes + Softgetränk 0,33 L",
          prices: { default: 9.00 },
          image: "../assets/menu/53.jpg"
        },
        {
          nr: "151",
          type: "food",
          name: "Menü 10",
          zusatztoffe: [],
          allergene: [],
          description: "Falafel Teller 7 Stk. mit Pommes & Salat + Softgetränk 0,33 L",
          prices: { default: 11.00 },
          image: "../assets/menu/54.jpg"
        },
        {
          nr: "152",
          type: "food",
          name: "Menü 11",
          zusatztoffe: [],
          allergene: [],
          description: "Chicken Nuggets 6 Stk. mit Pommes + Softgetränk 0,33 L",
          prices: { default: 9.50 },
          image: "../assets/menu/55.jpg"
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
