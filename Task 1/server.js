const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let items = [];
let nextId = 1;

// Routes
app.get('/api/items', (req, res) => {
  res.json(items);
});

app.get('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(item => item.id === id);
  
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  res.json(item);
});

app.post('/api/items', (req, res) => {
  const { title, description, category } = req.body;
  
  if (!title || !description || !category) {
    return res.status(400).json({ 
      error: 'Title, description, and category are required' 
    });
  }
  
  const newItem = {
    id: nextId++,
    title: title.trim(),
    description: description.trim(),
    category: category.trim(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, category } = req.body;
  
  const itemIndex = items.findIndex(item => item.id === id);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  if (!title || !description || !category) {
    return res.status(400).json({ 
      error: 'Title, description, and category are required' 
    });
  }
  
  items[itemIndex] = {
    ...items[itemIndex],
    title: title.trim(),
    description: description.trim(),
    category: category.trim(),
    updatedAt: new Date().toISOString()
  };
  
  res.json(items[itemIndex]);
});

app.delete('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(item => item.id === id);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  const deletedItem = items.splice(itemIndex, 1)[0];
  res.json(deletedItem);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});