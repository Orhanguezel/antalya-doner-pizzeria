const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');

// Kullanıcı kaydı
const register = asyncHandler(async (req, res) => {
    const { username, email, password, role } = req.body;

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
        res.status(400);
        throw new Error('Benutzer existiert bereits');
    }

    const user = await User.create({ username, email, password, role });
    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Ungültige Benutzerdaten');
    }
});

// Kullanıcı girişi
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        res.status(401);
        throw new Error('Email nicht gefunden');
    }

    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) {
        res.status(401);
        throw new Error('Falsches Passwort');
    }

    res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
    });
});

// Kullanıcı profilini getirme
const getProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('Kullanıcı bulunamadı');
    }
});

// Kullanıcı doğrulama (token doğrulama)
const verifyToken = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
        res.json({ user });
    } else {
        res.status(404);
        throw new Error('Kullanıcı doğrulanamadı');
    }
});

// Tüm kullanıcıları getirme (admin yetkisi gerekli)
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select('-password');
    res.json(users);
});

// Kullanıcıyı bloklama (admin yetkisi gerekli)
const blockUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.isBlocked = true;
        await user.save();
        res.json({ message: 'User blocked' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// Kullanıcı profilini güncelleme
const updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.address = req.body.address || user.address;

        if (req.file) {
            user.profileImage = `/uploads/profiles/${req.file.filename}`;
        }

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            role: updatedUser.role,
            profileImage: updatedUser.profileImage,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// Kullanıcı rolünü güncelleme (admin yetkisi gerekli)
const updateUserRole = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.role = req.body.role || user.role;
        await user.save();
        res.json({ message: 'Kullanıcı rolü başarıyla güncellendi', role: user.role });
    } else {
        res.status(404);
        throw new Error('Kullanıcı bulunamadı');
    }
});

// Şifre sıfırlama
const resetPassword = asyncHandler(async (req, res) => {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        res.status(404);
        throw new Error('Kullanıcı bulunamadı');
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Şifre başarıyla güncellendi.' });
});

// Kullanıcı silme (admin yetkisi gerekli)
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await User.deleteOne({ _id: user._id });
        res.json({ message: 'Kullanıcı başarıyla silindi' });
    } else {
        res.status(404);
        throw new Error('Kullanıcı bulunamadı');
    }
});

// Admin tarafından kullanıcı güncelleme (admin yetkisi gerekli)
const updateUserByAdmin = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
        user.address = req.body.address || user.address;
        user.blocked = req.body.blocked !== undefined ? req.body.blocked : user.blocked;

        if (req.file) {
            user.profileImage = `/uploads/profiles/${req.file.filename}`;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            phoneNumber: updatedUser.phoneNumber,
            address: updatedUser.address,
            blocked: updatedUser.blocked,
            role: updatedUser.role,
            profileImage: updatedUser.profileImage,
        });
    } else {
        res.status(404);
        throw new Error('Kullanıcı bulunamadı');
    }
});

// Şifre unutma
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        res.status(404);
        throw new Error('Kullanıcı bulunamadı');
    }

    // TODO: Şifre sıfırlama işlemi burada yapılabilir

    res.status(200).json({
        message: 'Şifre sıfırlama talebi alındı. Lütfen emailinizi kontrol edin.',
    });
});

// Kullanıcıyı çıkış yaptırma
const logout = asyncHandler(async (req, res) => {
    res.json({ message: 'User logged out' });
});

// Tüm kullanıcıları silme (admin yetkisi gerekli)
const deleteAllUsers = asyncHandler(async (req, res) => {
    try {
        const result = await User.deleteMany({ role: { $ne: 'admin' } });
        res.json({ message: 'All non-admin users deleted', deletedCount: result.deletedCount });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete users' });
    }
});

module.exports = {
    register,
    login,
    getProfile,
    verifyToken,
    getAllUsers,
    blockUser,
    updateProfile,
    updateUserRole,
    resetPassword,
    logout,
    deleteAllUsers,
    deleteUser,
    updateUserByAdmin,
    forgotPassword,
};
