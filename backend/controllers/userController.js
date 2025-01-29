const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');

// Benutzerregistrierung
const register = asyncHandler(async (req, res) => {
    const { username, email, password, role, phoneNumber, address } = req.body;

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
        res.status(400);
        throw new Error('Benutzer existiert bereits');
    }

    // Kullanıcı oluşturulurken adres ve telefon numarası da kaydedilmeli
    const user = await User.create({ username, email, password, role, phoneNumber, address });

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            phoneNumber: user.phoneNumber,  // Telefon numarası
            address: user.address,  // Adres
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Ungültige Benutzerdaten');
    }
});

// Benutzer-Login
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        res.status(401);
        throw new Error('E-Mail nicht gefunden');
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
        phoneNumber: user.phoneNumber || '',  // Telefon numarasını boş string olarak döndürün
        address: user.address || '',  // Adresi boş string olarak döndürün
        token: generateToken(user._id),
    });
});


// Profil abrufen
const getProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            address: user.address || '',  // Adres bilgisini boş string olarak gönderin
            phoneNumber: user.phoneNumber || '',  // Telefon numarasını boş string olarak gönderin
            profileImage: user.profileImage,
        });
    } else {
        res.status(404);
        throw new Error('Kullanıcı bulunamadı');
    }
});



// Token-Verifizierung
const verifyToken = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
        res.json({ user });
    } else {
        res.status(404);
        throw new Error('Benutzer konnte nicht verifiziert werden');
    }
});


// Alle Benutzer abrufen (Admin-Berechtigung erforderlich)
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select('-password');
    res.json(users);
});

// Benutzer blockieren (Admin-Berechtigung erforderlich)
const blockUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.isBlocked = true;
        await user.save();
        res.json({ message: 'Benutzer blockiert' });
    } else {
        res.status(404);
        throw new Error('Benutzer nicht gefunden');
    }
});

// Profil aktualisieren
const updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.address = req.body.address || user.address;
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

        if (req.file) {
            // Sadece dosya ismini kullan
            user.profileImage = req.file.filename;
        }

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        res.json({
            username: updatedUser.username,
            email: updatedUser.email,
            address: updatedUser.address,
            phoneNumber: updatedUser.phoneNumber,
            profileImage: updatedUser.profileImage
                ? `/${updatedUser.profileImage}`
                : null,
        });
    } else {
        res.status(404);
        throw new Error('Kullanıcı bulunamadı');
    }
});






// Benutzerrolle aktualisieren (Admin-Berechtigung erforderlich)
const updateUserRole = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.role = req.body.role || user.role;
        await user.save();
        res.json({ message: 'Benutzerrolle erfolgreich aktualisiert', role: user.role });
    } else {
        res.status(404);
        throw new Error('Benutzer nicht gefunden');
    }
});

// Passwort zurücksetzen
const resetPassword = asyncHandler(async (req, res) => {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        res.status(404);
        throw new Error('Benutzer nicht gefunden');
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Passwort erfolgreich aktualisiert' });
});

// Benutzer löschen (Admin-Berechtigung erforderlich)
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await User.deleteOne({ _id: user._id });
        res.json({ message: 'Benutzer erfolgreich gelöscht' });
    } else {
        res.status(404);
        throw new Error('Benutzer nicht gefunden');
    }
});

// Benutzer durch Admin aktualisieren (Admin-Berechtigung erforderlich)
const updateUserByAdmin = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        console.log('Gelen veriler:', req.body); // Güncellenen veriler

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


// Passwort vergessen
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        res.status(404);
        throw new Error('Benutzer nicht gefunden');
    }

    // TODO: Hier sollte die E-Mail zum Zurücksetzen des Passworts gesendet werden.

    res.status(200).json({
        message: 'Anfrage zum Zurücksetzen des Passworts erhalten. Bitte überprüfen Sie Ihre E-Mail.',
    });
});

// Benutzer ausloggen
const logout = asyncHandler(async (req, res) => {
    res.json({ message: 'Benutzer wurde ausgeloggt' });
});

// Alle Benutzer löschen (Admin-Berechtigung erforderlich)
const deleteAllUsers = asyncHandler(async (req, res) => {
    try {
        const result = await User.deleteMany({ role: { $ne: 'admin' } });
        res.json({ message: 'Alle nicht-Admin-Benutzer gelöscht', deletedCount: result.deletedCount });
    } catch (error) {
        res.status(500).json({ message: 'Benutzer konnten nicht gelöscht werden' });
    }
});

const createOrder = async (req, res) => {
    // Sipariş oluşturma işlemleri...
    const newOrder = await Order.create(orderData);

    // Yeni sipariş olduğunda Socket.io'ya bildirim gönderiyoruz
    const io = req.app.get('socketio');
    io.emit('new-order', newOrder);

    res.status(201).json(newOrder);
};


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
    deleteAllUsers,
    deleteUser,
    updateUserByAdmin,
    forgotPassword,
    logout,
    createOrder,
};
