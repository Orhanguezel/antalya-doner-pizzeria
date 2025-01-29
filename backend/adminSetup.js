const connectDB = require('./dbConnection');
const User = require('./models/User');

const createAdmin = async () => {
    try {
        await connectDB();

        const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });
        if (existingAdmin) {
            console.log('✅ Admin already exists:', existingAdmin);
            return;
        }

        const admin = new User({
            name: 'Admin',
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
            role: 'admin',
        });

        await admin.save();
        console.log('✅ Admin created successfully:', admin);
    } catch (error) {
        console.error('❌ Error creating admin:', error);
    } finally {
        mongoose.connection.close();
    }
};

createAdmin();
