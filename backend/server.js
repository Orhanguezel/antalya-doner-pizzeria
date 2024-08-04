const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Kullanıcı modeli

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Session middleware
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const port = process.env.PORT || 5000;

// Passport Google OAuth Configuration
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.SERVER_URL}/auth/google/callback`
}, async (accessToken, refreshToken, profile, done) => {
  const { id, displayName, emails, photos } = profile;
  try {
    let user = await User.findOne({ googleId: id });
    if (!user) {
      user = new User({
        username: displayName,
        email: emails[0].value,
        profile_image: photos[0].value,
        googleId: id
      });
      await user.save();
    }
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Routes
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const itemsRouter = require('./routes/itemsRouter');
const subcategoriesRouter = require('./routes/subcategoriesRouter');

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/items', itemsRouter);
app.use('/api/subcategories', subcategoriesRouter);

// Google OAuth routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, generate JWT and send to client
    const token = jwt.sign({ id: req.user.id, role: req.user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    // Send token to client
    res.redirect(`${process.env.CLIENT_URL}/auth?token=${token}`);
  }
);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Merkezi Hata İşleme Middleware'i
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
