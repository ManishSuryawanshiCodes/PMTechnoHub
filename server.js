const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security and optimization middleware
app.use(compression());
app.use(cors());
app.use(express.json());

// Set basic security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');
  next();
});

// MongoDB connection
const mongoURI = process.env.MONGODB_URI;
console.log('Connecting to MongoDB Atlas...');
mongoose.connect(mongoURI)
  .then(() => console.log('Successfully connected to MongoDB Atlas.'))
  .catch(err => {
    console.error('Error connecting to MongoDB Atlas:', err.message);
    console.log('Server will continue running in static-fallback mode.');
  });

// Schema definition for Gallery Projects (containing multiple media files)
const galleryProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  size: { type: String, default: 'medium' },
  coverPath: { type: String, required: true },
  coverType: { type: String, enum: ['image', 'video'], required: true },
  media: [{
    path: { type: String, required: true },
    type: { type: String, enum: ['image', 'video'], required: true },
    title: { type: String, required: true },
    date: { type: String, default: '' }
  }],
  createdAt: { type: Date, default: Date.now }
});

const GalleryProject = mongoose.model('GalleryProject', galleryProjectSchema);

// API route to get all gallery projects
app.get('/api/gallery', async (req, res) => {
  try {
    const projects = await GalleryProject.find().sort({ createdAt: 1 });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching gallery projects:', error);
    res.status(500).json({ error: 'Failed to fetch gallery projects from database' });
  }
});

// Serve static assets from project root with aggressive caching for optimization
app.use(express.static(path.join(__dirname), {
  maxAge: '1d', // Cache static assets for 1 day
  etag: true,
  lastModified: true
}));

// Fallback to index.html for undefined routes (SPA-style, though we have static pages)
app.get('*', (req, res) => {
  // If requesting a missing file/asset, return 404, otherwise serve index.html
  if (req.path.includes('.')) {
    return res.status(404).send('Not Found');
  }
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`  PM TECHNO HUBB Server is running on port ${PORT}`);
  console.log(`  Local URL: http://localhost:${PORT}`);
  console.log(`===================================================`);
});
