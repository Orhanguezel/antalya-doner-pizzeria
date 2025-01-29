const connectDB = require('./dbConnection');
const User = require('./models/User');

const testResetToken = async () => {
    try {
        await connectDB();

        const user = await User.findOne({ email: process.env.TEST_USER_EMAIL });
        if (!user) {
            console.log('❌ User not found');
            return;
        }

        const resetToken = user.getResetPasswordToken();
        await user.save();

        console.log('✅ Password reset token:', resetToken);
    } catch (error) {
        console.error('❌ Error generating reset token:', error.message);
    } finally {
        mongoose.connection.close();
    }
};

testResetToken();
