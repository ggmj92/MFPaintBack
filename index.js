const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const dbConnection = require('./config/config');
const routes = require('./routes/apiRoutes');
const adminRoutes = require('./routes/userRoutes');
const admin = require('firebase-admin');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

// Configure environment variables
dotenv.config();

// Set up constants
const PORT = process.env.PORT || 3000;

// Initialize express app
const app = express();

app.use(cors());

// Set up middleware
app.use((err, req, res, next) => {
  console.log('Request headers:', req.headers);
  console.log('Request query:', req.query);
  console.error(err.stack);
  res.status(500).send('Something broke!');
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({
  extended: true
}));

// Set up static files
app.use(express.static('public'));

// Set up routes
app.use('/', routes);

// Set up auth routes
app.use('/user', userRoutes);

// Set up admin routes
app.use('/admin', adminRoutes);

// Connect to database
dbConnection();

// Start the server
app.listen(PORT, () => {
  console.log(`Express listening on port http://localhost:${PORT}`);
});