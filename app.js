const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Item = require('./models/Item');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Database connection
mongoose
  .connect('mongodb://127.0.0.1:27017/NeighborhoodAssetExchange', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Database connection error:', err));

// Routes
// Home Route
app.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.render('index', { items }); // Ensure items are passed correctly
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Add a new item page (GET)
app.get('/add-item', (req, res) => {
  res.render('add-item');
});

// Handle the addition of a new item (POST)
app.post('/add-item', async (req, res) => {
  try {
    const { name, description, availableUntil } = req.body;
    const newItem = new Item({
      name,
      description,
      availableUntil: new Date(availableUntil),
    });
    await newItem.save();
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Handle borrowing an item (GET)
app.get('/borrow-item/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    // Check if the item is already borrowed
    if (item.isBorrowed) {
      return res.render('borrow-item', { 
        item, 
        message: 'This item has already been borrowed and is no longer available.' 
      });
    }

    // Mark the item as borrowed
    item.isBorrowed = true;
    await item.save();

    // Pass a success message to the view
    res.render('borrow-item', { 
      item, 
      message: 'You have successfully borrowed this item!' 
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});






// Handle deleting an item (POST)
app.post('/delete-item/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.redirect('/'); // Redirect to the home page after deleting
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
