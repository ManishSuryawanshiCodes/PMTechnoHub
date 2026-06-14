const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  console.error('Error: MONGODB_URI is not defined in .env');
  process.exit(1);
}

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

const PROJECTS_DATA = [
  {
    title: 'EMBEDDED IoT',
    category: 'EMBEDDED IoT',
    size: 'large',
    media: [
      { path: 'images/gallery/IMG20211223150621.jpg', type: 'image', title: 'Robotics Arm Mechanism Design', date: 'Dec 23, 2021' },
      { path: 'images/gallery/IMG20220217112105.jpg', type: 'image', title: 'Smart Home Automation Demo', date: 'Feb 17, 2022' },
      { path: 'images/gallery/IMG20220806133859.jpg', type: 'image', title: 'Node-RED Dashboard Configuration', date: 'Aug 6, 2022' },
      { path: 'images/gallery/IMG20220216091538.jpg', type: 'image', title: 'Soldering Resistors on Custom PCB', date: 'Feb 16, 2022' },
      { path: 'images/gallery/IMG20221220175240.jpg', type: 'image', title: 'PCB Layout Component Alignment', date: 'Dec 20, 2022' },
      { path: 'images/gallery/IMG20230706161523.jpg', type: 'image', title: 'Robotics Workshop Team Assembly', date: 'Jul 6, 2023' }
    ]
  },
  {
    title: 'COLLEGE PROJECTS',
    category: 'COLLEGE PROJECTS',
    size: 'wide',
    media: [
      { path: 'images/gallery/IMG20220525213755.jpg', type: 'image', title: 'Autonomous Obstacle Avoidance Bot', date: 'May 25, 2022' },
      { path: 'images/gallery/IMG20221125172021.jpg', type: 'image', title: 'Line Follower Robot Calibration', date: 'Nov 25, 2022' },
      { path: 'images/gallery/IMG20230514190305.jpg', type: 'image', title: 'Robotics Workshop Team Assembly', date: 'May 14, 2023' },
      { path: 'images/gallery/IMG_20230612_131717.jpg', type: 'image', title: 'Robot Arm Programming Session', date: 'Jun 12, 2023' },
      { path: 'images/gallery/IMG20220526150634.jpg', type: 'image', title: 'Arduino LED Matrix Display Code', date: 'May 26, 2022' },
      { path: 'images/gallery/IMG20221125172028.jpg', type: 'image', title: 'Multi-sensor Shield Debugging', date: 'Nov 25, 2022' },
      { path: 'images/gallery/VID-20220518-WA0000.mp4', type: 'video', title: 'Servo Motor Angle Control', date: 'May 18, 2022' },
      { path: 'images/gallery/IMG20220601224927.jpg', type: 'image', title: 'Node-RED Dashboard Configuration', date: 'Jun 1, 2022' },
      { path: 'images/gallery/IMG20230224184202.jpg', type: 'image', title: 'ESP32 WiFi Web Server Lab', date: 'Feb 24, 2023' },
      { path: 'images/gallery/VID-20220526-WA0020.mp4', type: 'video', title: 'Smart Irrigation System Prep', date: 'May 26, 2022' },
      { path: 'images/gallery/IMG20230224221958.jpg', type: 'image', title: 'ESP32 WiFi Web Server Lab', date: 'Feb 24, 2023' },
      { path: 'images/gallery/IMG20231102155050.jpg', type: 'image', title: 'MQTT Broker Communication Test', date: 'Nov 2, 2023' },
      { path: 'images/gallery/VID-20220610-WA0008.mp4', type: 'video', title: 'Smart Irrigation System Prep', date: 'Jun 10, 2022' },
      { path: 'images/gallery/IMG20220531155324.jpg', type: 'image', title: 'Circuit Continuity Multi-meter Test', date: 'May 31, 2022' },
      { path: 'images/gallery/IMG20230611153327.jpg', type: 'image', title: 'Soldering Practice & Iron Safety', date: 'Jun 11, 2023' },
      { path: 'images/gallery/VID-20220518-WA0011.mp4', type: 'video', title: 'Desoldering & Troubleshooting PCBs', date: 'May 18, 2022' },
      { path: 'images/gallery/VID_20211021193833.mp4', type: 'video', title: 'SMD Soldering Demonstration', date: 'Oct 21, 2021' },
      { path: 'images/gallery/IMG20220519195647.jpg', type: 'image', title: 'Robotics Arm Mechanism Design', date: 'May 19, 2022' },
      { path: 'images/gallery/IMG20221016000723.jpg', type: 'image', title: 'Autonomous Obstacle Avoidance Bot', date: 'Oct 16, 2022' },
      { path: 'images/gallery/IMG20230317214654.jpg', type: 'image', title: 'Line Follower Robot Calibration', date: 'Mar 17, 2023' },
      { path: 'images/gallery/VID20220607124714.mp4', type: 'video', title: 'Robot Arm Programming Session', date: 'Jun 7, 2022' },
      { path: 'images/gallery/IMG20220510201314.jpg', type: 'image', title: 'Innovation Lab Project Exhibition', date: 'May 10, 2022' },
      { path: 'images/gallery/IMG20220810094335.jpg', type: 'image', title: 'National STEM Competition Day', date: 'Aug 10, 2022' },
      { path: 'images/gallery/IMG20230225145228.jpg', type: 'image', title: 'Robot Racing Arena Trials', date: 'Feb 25, 2023' },
      { path: 'images/gallery/IMG20230706142821.jpg', type: 'image', title: 'Arduino Project Presentation', date: 'Jul 6, 2023' },
      { path: 'images/gallery/VID-20220610-WA0013.mp4', type: 'video', title: 'Annual Tech Fest Showcase', date: 'Jun 10, 2022' },
      { path: 'images/gallery/IMG20220525201247.jpg', type: 'image', title: 'Ultrasonic Sensor Wiring & Testing', date: 'May 25, 2022' },
      { path: 'images/gallery/IMG20221016000735.jpg', type: 'image', title: 'Arduino LED Matrix Display Code', date: 'Oct 16, 2022' },
      { path: 'images/gallery/IMG20230514152701.jpg', type: 'image', title: 'Multi-sensor Shield Debugging', date: 'May 14, 2023' },
      { path: 'images/gallery/IMG20230821152603.jpg', type: 'image', title: 'LCD Display Interface Workshop', date: 'Aug 21, 2023' },
      { path: 'images/gallery/VID20230224221850.mp4', type: 'video', title: 'Servo Motor Angle Control', date: 'Feb 24, 2023' }
    ]
  },
  {
    title: 'INDUSTRIAL AUTOMATION',
    category: 'INDUSTRIAL AUTOMATION',
    size: 'tall',
    media: [
      { path: 'images/gallery/IMG20230905172210.jpg', type: 'image', title: 'Gear Motor Transmission Testing', date: 'Sep 5, 2023' },
      { path: 'images/gallery/IMG20231004105318.jpg', type: 'image', title: 'Chassis Development & Assembly', date: 'Oct 4, 2023' },
      { path: 'images/gallery/IMG20230907180133.jpg', type: 'image', title: 'Analog Signal Read Calibration', date: 'Sep 7, 2023' },
      { path: 'images/gallery/IMG20231004105334.jpg', type: 'image', title: 'Breadboard Circuit Basics', date: 'Oct 4, 2023' },
      { path: 'images/gallery/IMG20230907180308.jpg', type: 'image', title: 'Smart Weather Station Prototype', date: 'Sep 7, 2023' },
      { path: 'images/gallery/IMG20231102155042.jpg', type: 'image', title: 'MQTT Broker Communication Test', date: 'Nov 2, 2023' },
      { path: 'images/gallery/IMG20230907180317.jpg', type: 'image', title: 'Smart Weather Station Prototype', date: 'Sep 7, 2023' },
      { path: 'images/gallery/IMG20230907180304.jpg', type: 'image', title: 'Completed PCB Assembly Inspection', date: 'Sep 7, 2023' },
      { path: 'images/gallery/IMG20231102155031.jpg', type: 'image', title: 'Through-Hole Soldering Technique', date: 'Nov 2, 2023' },
      { path: 'images/gallery/IMG20230911173320.jpg', type: 'image', title: 'Gear Motor Transmission Testing', date: 'Sep 11, 2023' },
      { path: 'images/gallery/IMG20231110155250.jpg', type: 'image', title: 'Chassis Development & Assembly', date: 'Nov 10, 2023' },
      { path: 'images/gallery/IMG20230907180326.jpg', type: 'image', title: 'Winning Team Group Photo', date: 'Sep 7, 2023' },
      { path: 'images/gallery/IMG20231106131808.jpg', type: 'image', title: 'STEM Project Design Defence', date: 'Nov 6, 2023' },
      { path: 'images/gallery/IMG20230918155548.jpg', type: 'image', title: 'Analog Signal Read Calibration', date: 'Sep 18, 2023' },
      { path: 'images/gallery/IMG20231204151832.jpg', type: 'image', title: 'Breadboard Circuit Basics', date: 'Dec 4, 2023' }
    ]
  },
  {
    title: 'HOME AUTOMATION',
    category: 'HOME AUTOMATION',
    size: 'medium',
    media: [
      { path: 'images/gallery/IMG_20230612_131717.jpg', type: 'image', title: 'Robot Arm Programming Session', date: 'Jun 12, 2023' },
      { path: 'images/gallery/IMG20230611153014.jpg', type: 'image', title: 'LCD Display Interface Workshop', date: 'Jun 11, 2023' },
      { path: 'images/gallery/IMG20230706141406.jpg', type: 'image', title: 'SteriGuard Medical IoT Assembly', date: 'Jul 6, 2023' },
      { path: 'images/gallery/IMG20230611153327.jpg', type: 'image', title: 'Soldering Practice & Iron Safety', date: 'Jun 11, 2023' }
    ]
  },
  {
    title: 'ROBOTICS',
    category: 'ROBOTICS',
    size: 'small',
    media: [
      { path: 'images/gallery/IMG20230612131543.jpg', type: 'image', title: 'SteriGuard Medical IoT Assembly', date: 'Jun 12, 2023' }
    ]
  }
];

async function seed() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoURI);
    console.log('Connected to Database. Clearing existing projects...');
    await GalleryProject.deleteMany({});
    console.log('Projects collection cleared.');

    // Finalize covers and insert
    const finalProjects = PROJECTS_DATA.map((proj, pIndex) => {
      // Set the first image/media as cover
      const imageMedia = proj.media.find(m => m.type === 'image');
      const coverItem = imageMedia || proj.media[0];
      
      return {
        ...proj,
        coverPath: coverItem.path,
        coverType: coverItem.type,
        createdAt: new Date(Date.now() - (PROJECTS_DATA.length - pIndex) * 24 * 60 * 60 * 1000)
      };
    });

    console.log(`Inserting ${finalProjects.length} structured projects into MongoDB Atlas...`);
    const inserted = await GalleryProject.insertMany(finalProjects);
    console.log(`Success! Seeded ${inserted.length} projects.`);

  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Database connection closed.');
  }
}

seed();
