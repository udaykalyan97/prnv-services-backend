import express from 'express';
import { imageUrls } from './src/category_images.js'; // Importing imageUrls from categories.js
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config(); 

const PORT_NUM = process.env.PORT; 
const app = express();

// Home Route
app.get('/', (req, res) => {
  res.send('Hello, this is a simple Express server!');
});

// Ipsum Route
app.get('/ipsum', (req, res) => {
  res.send('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
});


app.use('/image', express.static('src/assets/category_images/images'));

// Start Server
app.listen(PORT_NUM, () => {
  console.log(`Server is running on http://localhost:${PORT_NUM}`);
});