const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const GALLERY_DIR = path.join(__dirname, '..', 'images', 'gallery');

const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  console.error('Error: MONGODB_URI is not defined in .env');
  process.exit(1);
}

// Schema definition (must match server.js)
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

// The 8 projects from the original gallery structure
const PROJECTS_CONFIG = [
  { title: 'Robotics Workshop', category: 'Robotics', size: 'large' },
  { title: 'Arduino & Sensors Lab', category: 'Arduino & Sensors', size: 'wide' },
  { title: 'PCB Soldering', category: 'PCB Soldering', size: 'tall' },
  { title: 'Innovation Lab Setup', category: 'IoT & Smart Devices', size: 'medium' },
  { title: 'Smart Home Project', category: 'IoT & Smart Devices', size: 'small' },
  { title: 'Competition Day', category: 'Competitions', size: 'medium' },
  { title: 'Robot Arm Build', category: 'Robotics', size: 'wide' },
  { title: 'Electronics Fundamentals', category: 'Arduino & Sensors', size: 'small' }
];

// Title templates by category (clean, no "Item XX" suffix)
const TITLES_BY_CATEGORY = {
  'Robotics': [
    'Robotics Arm Mechanism Design',
    'Autonomous Obstacle Avoidance Bot',
    'Line Follower Robot Calibration',
    'Robotics Workshop Team Assembly',
    'Gear Motor Transmission Testing',
    'Chassis Development & Assembly',
    'Robot Arm Programming Session',
    'Mobile Robot Platform Trials'
  ],
  'IoT & Smart Devices': [
    'Smart Home Automation Demo',
    'Node-RED Dashboard Configuration',
    'ESP32 WiFi Web Server Lab',
    'SteriGuard Medical IoT Assembly',
    'Smart Weather Station Prototype',
    'MQTT Broker Communication Test',
    'Smart Irrigation System Prep',
    'IoT Device Cloud Uplink Debug'
  ],
  'Arduino & Sensors': [
    'Ultrasonic Sensor Wiring & Testing',
    'Arduino LED Matrix Display Code',
    'Multi-sensor Shield Debugging',
    'LCD Display Interface Workshop',
    'Analog Signal Read Calibration',
    'Breadboard Circuit Basics',
    'Servo Motor Angle Control',
    'Buzzer Melodies & Keypad Matrix'
  ],
  'PCB Soldering': [
    'Soldering Resistors on Custom PCB',
    'Circuit Continuity Multi-meter Test',
    'PCB Layout Component Alignment',
    'Soldering Practice & Iron Safety',
    'Completed PCB Assembly Inspection',
    'Through-Hole Soldering Technique',
    'Desoldering & Troubleshooting PCBs',
    'SMD Soldering Demonstration'
  ],
  'Competitions': [
    'Innovation Lab Project Exhibition',
    'National STEM Competition Day',
    'Robot Racing Arena Trials',
    'Arduino Project Presentation',
    'Winning Team Group Photo',
    'STEM Project Design Defence',
    'Annual Tech Fest Showcase',
    'School Robotics League Matches'
  ]
};

// Date extraction helper
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function parseDateFromFilename(filename) {
  const match = filename.match(/(IMG|VID)[-_]?(\d{4})(\d{2})(\d{2})/i);
  if (match) {
    const year = match[2];
    const monthIndex = parseInt(match[3], 10) - 1;
    const day = parseInt(match[4], 10);
    if (monthIndex >= 0 && monthIndex < 12) {
      return `${MONTHS[monthIndex]} ${day}, ${year}`;
    }
  }
  return '';
}

async function seed() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoURI);
    console.log('Connected to Database. Clearing existing projects...');
    await GalleryProject.deleteMany({});
    console.log('Projects collection cleared.');

    if (!fs.existsSync(GALLERY_DIR)) {
      console.error(`Error: Gallery directory not found at ${GALLERY_DIR}`);
      process.exit(1);
    }

    const files = fs.readdirSync(GALLERY_DIR);
    const mediaFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      if (!['.jpg', '.jpeg', '.png', '.mp4'].includes(ext)) return false;
      
      // Exclude files larger than 50MB to prevent GitHub size limit errors
      const filePath = path.join(GALLERY_DIR, file);
      const stats = fs.statSync(filePath);
      if (stats.size > 50 * 1024 * 1024) {
        console.log(`Skipping large file: ${file} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
        return false;
      }
      return true;
    });

    console.log(`Found ${mediaFiles.length} media files. Distributing into ${PROJECTS_CONFIG.length} projects...`);

    // Initialize the 8 projects
    const projects = PROJECTS_CONFIG.map((config, pIndex) => {
      return {
        title: config.title,
        category: config.category,
        size: config.size,
        media: [],
        createdAt: new Date(Date.now() - (PROJECTS_CONFIG.length - pIndex) * 24 * 60 * 60 * 1000) // Staggered order
      };
    });

    // Distribute files round-robin among projects
    mediaFiles.forEach((filename, index) => {
      const pIndex = index % projects.length;
      const project = projects[pIndex];

      const ext = path.extname(filename).toLowerCase();
      const isVideo = ext === '.mp4';
      const type = isVideo ? 'video' : 'image';
      
      const titles = TITLES_BY_CATEGORY[project.category];
      const title = titles[(Math.floor(index / projects.length)) % titles.length];
      const dateStr = parseDateFromFilename(filename) || 'Jun 2023';

      project.media.push({
        path: `images/gallery/${filename}`,
        type,
        title,
        date: dateStr
      });
    });

    // Finalize covers and insert
    const finalProjects = [];
    for (const project of projects) {
      if (project.media.length === 0) continue;

      // Set the first item as the cover
      // If there's an image in the project media, prefer it as cover
      const imageMedia = project.media.find(m => m.type === 'image');
      const coverItem = imageMedia || project.media[0];

      project.coverPath = coverItem.path;
      project.coverType = coverItem.type;

      finalProjects.push(project);
    }

    console.log(`Inserting ${finalProjects.length} structured projects into MongoDB Atlas...`);
    const inserted = await GalleryProject.insertMany(finalProjects);
    console.log(`Success! Seeded ${inserted.length} projects containing ${mediaFiles.length} total media items.`);

  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Database connection closed.');
  }
}

seed();
