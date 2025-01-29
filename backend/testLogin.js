const connectDB = require('./dbConnection');
const User = require('./models/User');

const testLogin = async () => {
    try {
        await connectDB();

        const user = await User.findOne({ email: process.env.TEST_USER_EMAIL });
        if (!user) {
            console.log('❌ User not found');
            return;
        }

        const isMatch = await user.matchPassword(process.env.TEST_USER_PASSWORD);
        if (!isMatch) {
            console.log('❌ Invalid credentials');
            return;
        }

        console.log('✅ Login successful:', user);
    } catch (error) {
        console.error('❌ Error logging in:', error.message);
    } finally {
        mongoose.connection.close();
    }
};

testLogin();
