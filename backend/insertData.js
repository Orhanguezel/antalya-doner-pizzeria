const mongoose = require('mongoose');
const Category = require('./models/Category');
const Subcategory = require('./models/Subcategory');
const Item = require('./models/Item');

// Kategori, alt kategori ve ürünler için veri yapısı
const categoryData = {
    name: 'Hauptgerichte',
    description: 'Ana yemekler kategorisi',
    subcategories: [
        {
            name: 'Burger',
            description: 'Burger çeşitleri',
            items: [
                {
                    nr: '001',
                    type: 'Burger',
                    name: 'Cheeseburger',
                    prices: { default: 5.99 },
                },
                {
                    nr: '002',
                    type: 'Burger',
                    name: 'Chickenburger',
                    prices: { default: 6.49 },
                },
            ],
        },
        {
            name: 'Pizza',
            description: 'Pizza çeşitleri',
            items: [
                {
                    nr: '003',
                    type: 'Pizza',
                    name: 'Margherita',
                    prices: { default: 7.99 },
                },
                {
                    nr: '004',
                    type: 'Pizza',
                    name: 'Pepperoni',
                    prices: { default: 8.99 },
                },
            ],
        },
    ],
};

// MongoDB bağlantısı
mongoose.connect('mongodb://admin:adminpassword@localhost:27017/antalya-doner-pizzeria', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: 'admin',
});


const insertData = async () => {
    try {
        // Alt kategoriler ve ürünler için referansları oluştur
        const subcategories = [];
        for (const subcategoryData of categoryData.subcategories) {
            const items = await Item.insertMany(subcategoryData.items); // Ürünleri ekle
            const subcategory = new Subcategory({
                name: subcategoryData.name,
                description: subcategoryData.description,
                items: items.map(item => item._id), // Ürün referanslarını bağla
            });
            const savedSubcategory = await subcategory.save();
            subcategories.push(savedSubcategory._id); // Alt kategori referanslarını sakla
        }

        // Ana kategoriyi oluştur ve alt kategorileri bağla
        const category = new Category({
            name: categoryData.name,
            description: categoryData.description,
            subcategories, // Alt kategorileri bağla
        });

        await category.save();
        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        mongoose.connection.close();
    }
};

insertData();
