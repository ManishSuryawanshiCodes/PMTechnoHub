/**
 * Site content — PM TECHNO HUBB (MongoDB-ready arrays)
 */
const PMTHUB_DATA = {
  stats: [
    { target: 100, label: 'Students Trained' },
    { target: 50, label: 'Workshops Conducted' },
    { target: 15, label: 'Schools Partnered' },
    { target: 98, label: '% Satisfaction Rate' },
  ],

  services: [
    { icon: '🏭', title: 'Industrial IoT Solutions', description: 'Mobico CPM and Machine Health Monitoring for real-time industrial intelligence.', tag: 'B2B Enterprise', accent: 'blue' },
    { icon: '🛡️', title: 'SteriGuard UV — Medical IoT', description: 'UV disinfection IoT systems for healthcare safety and facility monitoring.', tag: 'Healthcare Tech', accent: 'cyan' },
    { icon: '🤖', title: 'Robotics Education', description: 'Mechanical design, motor control, sensors, and autonomous navigation programs.', tag: 'B2C Education', accent: 'blue' },
    { icon: '📡', title: 'IoT & Smart Devices', description: 'WiFi, Bluetooth, and MQTT — smart home and environmental monitoring projects.', tag: 'B2C Education', accent: 'cyan' },
    { icon: '🧠', title: 'AI & Emerging Tech', description: 'AI fundamentals, ML basics, computer vision, and modern engineering tools.', tag: 'AI / ML', accent: 'blue' },
    { icon: '⚙️', title: 'Embedded Systems', description: 'Firmware and hardware with Arduino, ESP32, and STM32 platforms.', tag: 'Embedded Dev', accent: 'cyan' },
  ],

  workshops: [
    { title: 'IoT Smart Speaker Workshop', duration: '7 Days · Intensive', open: true, topics: ['Voice Recognition', 'Smart Device Programming', 'Wake Word Detection', 'Cloud Integration'] },
    { title: 'Robotics Workshop', duration: '3 Days · Intensive', open: true, topics: ['Robot Design', 'Motor Control', 'Sensor Integration', 'Obstacle Avoidance'] },
    { title: 'Arduino, ESP32 & IoT Workshop', duration: '2 / 3 / 7 Days', open: true, topics: ['Microcontroller Basics', 'Sensors & Actuators', 'WiFi & Web Servers', 'MQTT Protocols'] },
    { title: 'Basic Electronics Workshop', duration: '2 Days · Hardware', open: true, topics: ['Breadboarding', 'Ohm\'s Law', 'LED & Motor Circuits', 'Soldering Basics'] },
  ],

  products: [
    { icon: '📡', title: 'ESP32 Dev Kit Bundle', description: 'ESP32 module with sensors starter pack for IoT prototypes.', tag: 'IoT Hardware' },
    { icon: '🤖', title: 'Line-Follower Robot Kit', description: 'Chassis, motors, IR sensors, and Arduino-compatible controller.', tag: 'Robotics' },
    { icon: '🔊', title: 'Smart Speaker IoT Module', description: 'Voice-enabled board from our 7-day Smart Speaker workshop.', tag: 'Workshop Kit' },
    { icon: '🛡️', title: 'SteriGuard UV Controller', description: 'Medical-grade UV disinfection IoT controller.', tag: 'Medical IoT' },
    { icon: '⚡', title: 'Basic Electronics Lab Kit', description: 'Breadboard, components, multimeter, and soldering essentials.', tag: 'Education' },
    { icon: '🏭', title: 'Machine Health Monitor Node', description: 'Vibration and temperature node for predictive maintenance.', tag: 'B2B IoT' },
  ],

  galleryProjects: [
    { title: 'Robotics Workshop', size: 'large', cover: 'images/gallery/robotics.jpg', images: ['images/gallery/robotics.jpg', 'images/gallery/robot-arm.jpg', 'images/gallery/motor-demo.jpg'] },
    { title: 'Arduino & Sensors Lab', size: 'wide', cover: 'images/gallery/arduino.jpg', images: ['images/gallery/arduino.jpg', 'images/gallery/electronics.jpg'] },
    { title: 'PCB Soldering', size: 'tall', cover: 'images/gallery/pcb-solder.jpg', images: ['images/gallery/pcb-solder.jpg', 'images/gallery/electronics.jpg'] },
    { title: 'Innovation Lab Setup', size: 'medium', cover: 'images/gallery/innovation-lab.jpg', images: ['images/gallery/innovation-lab.jpg', 'images/gallery/competition.jpg'] },
    { title: 'Smart Home Project', size: 'small', cover: 'images/gallery/smart-home.jpg', images: ['images/gallery/smart-home.jpg'] },
    { title: 'Competition Day', size: 'medium', cover: 'images/gallery/competition.jpg', images: ['images/gallery/competition.jpg', 'images/gallery/robotics.jpg'] },
    { title: 'Robot Arm Build', size: 'wide', cover: 'images/gallery/robot-arm.jpg', images: ['images/gallery/robot-arm.jpg', 'images/gallery/robotics.jpg', 'images/gallery/motor-demo.jpg'] },
    { title: 'Electronics Fundamentals', size: 'small', cover: 'images/gallery/electronics.jpg', images: ['images/gallery/electronics.jpg', 'images/gallery/pcb-solder.jpg'] },
  ],

  whyChoose: [
    { icon: '🛠️', title: '100% Hands-On Training', cert: false },
    { icon: '🏗️', title: 'Real Industry Projects', cert: false },
    { icon: '🎓', title: 'Expert Mentorship', cert: false },
    { icon: '📜', title: 'Certification Programs', cert: true },
    { icon: '🌐', title: 'Community Support', cert: false },
    { icon: '📍', title: 'Pune-Based Experts', cert: false },
    { icon: '🔬', title: 'Latest Tech Stack', cert: false },
    { icon: '🚀', title: 'Future-Ready Skills', cert: false },
  ],
};
