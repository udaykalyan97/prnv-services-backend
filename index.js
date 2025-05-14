import express from 'express';
import { imageUrls } from './src/categories.js'; // Importing imageUrls from categories.js
import dotenv from 'dotenv';
dotenv.config(); 


const app = express();

// Home Route
app.get('/', (req, res) => {
  res.send('Hello, this is a simple Express server!');
});

// Ipsum Route
app.get('/ipsum', (req, res) => {
  res.send('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
});


app.get('/all-images', (req, res) => {
  res.json(imageUrls); 
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});