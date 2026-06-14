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
    { title: 'Basic Embedded', duration: '2 Days · Hardware', open: true, topics: ['Microcontroller Fundamentals', 'GPIO Programming', 'Digital & Analog I/O', 'Sensor Integration'] },
    { title: 'Arduino Workshop', duration: '3 Days · Intensive', open: true, topics: ['Arduino Basics', 'Sensor & Actuator Control', 'Web Server Projects', 'IoT Connectivity'] },
    { title: 'Jr. IoT Innovators Workshop', duration: '2 Days · Beginner', open: true, topics: ['IoT Concepts', 'Smart Device Basics', 'WiFi & MQTT', 'Project Building'] },
    { title: 'Advanced IoT Bootcamp', duration: '7 Days · Intensive', open: true, topics: ['Advanced MQTT', 'Cloud Integration', 'Real-Time Data Processing', 'System Architecture'] },
  ],

  products: [
    { icon: '🧭', title: 'Explorer Kit', price: '₹599', description: 'Perfect starter pack for beginners. Includes basic components for your first IoT project.', tag: 'Beginner' },
    { icon: '🛠️', title: 'Inventor Kit', price: '₹1299', description: 'Intermediate kit with sensors and modules for hands-on learning and project building.', tag: 'Intermediate' },
    { icon: '💡', title: 'Innovator Kit', price: '₹1999', description: 'Advanced kit with WiFi, Bluetooth, and multiple sensors for complex IoT solutions.', tag: 'Advanced' },
    { icon: '🎯', title: 'IoT Master Kit', price: '₹2999', description: 'Professional-grade kit with all tools, modules, and documentation for complete IoT mastery.', tag: 'Professional' },
    { icon: '🤖', title: 'Mobile Robot Platform', price: 'Inquire', description: 'Custom mobile robot platform for research, hands-on learning, and autonomous robotic navigation prototyping.', tag: 'Robotics' },
    { icon: '🎹', title: 'Buzzer Melodies & Keypad Matrix Kit', price: 'Inquire', description: 'Educational component kit with multi-tone buzzers, matrix keypads, and breadboard wiring guides for sound synthesis and input control.', tag: 'Beginner' },
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
