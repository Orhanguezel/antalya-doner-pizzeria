const connectDB = require('./dbConnection');
const User = require('./models/User');

const createTestUser = async () => {
    try {
        await connectDB();

        const existingUser = await User.findOne({ email: process.env.TEST_USER_EMAIL });
        if (existingUser) {
            console.log('✅ Test user already exists:', existingUser);
            return;
        }

        const testUser = new User({
            name: 'Test User',
            email: process.env.TEST_USER_EMAIL,
            password: process.env.TEST_USER_PASSWORD,
            role: 'user',
            address: '123 Test Street',
            phoneNumber: '1234567890',
        });

        await testUser.save();
        console.log('✅ Test user created successfully:', testUser);
    } catch (error) {
        console.error('❌ Error creating test user:', error);
    } finally {
        mongoose.connection.close();
    }
};

createTestUser();
