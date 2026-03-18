# 🎮 Ujjwal's Portfolio - Mario Game Edition

An interactive portfolio website designed as a classic Super Mario Bros. game where visitors can explore my professional background by breaking boxes and discovering content.

## 🎯 Overview

This is a unique portfolio website that combines the nostalgia of classic Mario games with modern web development. Instead of a traditional portfolio layout, visitors navigate through a Mario-style game world, breaking boxes to reveal information about education, work experience, projects, skills, and contact details

## ✨ Features

### Game Features
- **Interactive Mario Character**: Control Mario with keyboard or touch controls
- **Breakable Boxes**: Jump into boxes from below to break them and reveal content
- **6 Content Sections**: About, Education, Work Experience, Projects, Skills, and Contact
- **Animated Box Breaking**: Visual blast animation when boxes are broken
- **Background Music**: Classic Mario-style background music (can be toggled)
- **Sound Effects**: Break sound effects when boxes are destroyed
- **Parallax Scrolling**: Smooth scrolling background with clouds and road
- **Dynamic Instructions**: Context-aware control instructions

### Mobile Features
- **Touch Controls**: Dedicated mobile buttons (← ↑ →) for movement and jumping
- **Swipe Gestures**: 
  - Swipe up to jump
  - Touch left/right sides of screen to move
- **Responsive Design**: Fully optimized for mobile devices
- **Centered Layout**: Mobile-optimized centered dialog boxes and welcome text
- **Touch-Friendly**: Large touch targets and disabled text selection

### Portfolio Content
- **About Section**: Professional introduction and summary
- **Education**: Academic background and achievements
- **Work Experience**: Professional experience and roles
- **Projects**: Showcase of notable projects
- **Skills**: Technical skills and competencies
- **Contact**: Ways to get in touch

## 🛠️ Technologies Used

- **React 18.2.0**: Modern React with hooks
- **CSS3**: Custom animations, responsive design, and pixel-perfect styling
- **HTML5 Audio**: Background music and sound effects
- **JavaScript ES6+**: Modern JavaScript features

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PersonalWeb
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The game will automatically reload when you make changes

## 🎮 How to Play

### Desktop Controls
- **Arrow Keys** or **A/D**: Move left/right
- **Up Arrow** or **W/Space**: Jump
- **Click boxes from below**: Break boxes to reveal content
- **Sound Toggle**: Click the speaker icon to mute/unmute

### Mobile Controls
- **← → Buttons**: Move left/right
- **↑ Button**: Jump
- **Touch Zones**: Touch left/right sides of screen to move
- **Swipe Up**: Jump gesture
- **Center Arrow**: Tap the up arrow on the road to jump

## 📁 Project Structure

```
PersonalWeb/
├── public/
│   ├── 1.png, 2.png, 3.png    # Mario sprite frames
│   ├── break.mp3              # Break sound effect
│   ├── song.mp3               # Background music
│   ├── cloud.png              # Cloud sprite
│   ├── coin.png               # Coin sprite
│   ├── mario.png              # Mario sprite
│   ├── road.png               # Road background
│   └── index.html             # HTML template
├── src/
│   ├── components/
│   │   ├── MarioGame.js       # Main game component
│   │   ├── MarioGame.css      # Game styles
│   │   ├── PortfolioSection.js # Portfolio content component
│   │   ├── PortfolioSection.css # Portfolio styles
│   │   └── ErrorBoundary.js   # Error handling
│   ├── App.js                 # Main app component
│   ├── App.css                # App styles
│   ├── index.js               # Entry point
│   └── index.css              # Global styles
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## 🎨 Key Components

### MarioGame.js
The main game component that handles:
- Character movement and physics
- Box collision detection
- Game state management
- Audio controls
- Touch and keyboard input handling
- Responsive layout management

### PortfolioSection.js
Displays portfolio content when boxes are broken:
- Dynamic content rendering based on section type
- Responsive dialog box
- Smooth animations
- Mobile-optimized scrolling

## 🚀 Building for Production

1. **Create production build**
   ```bash
   npm run build
   ```

2. **The build folder contains optimized files**
   - Static assets
   - Minified JavaScript and CSS
   - Production-ready HTML

3. **Deploy the build folder**
   - The `build` folder can be deployed to any static hosting service
   - Compatible with:
     - Google Cloud Buildpacks
     - Netlify
     - Vercel
     - GitHub Pages
     - AWS S3 + CloudFront

## 📱 Mobile Optimization

- **Responsive Breakpoints**:
  - Tablet: `max-width: 768px`
  - Mobile: `max-width: 480px`
- **Touch Optimization**:
  - Large touch targets (minimum 44px)
  - Disabled text selection
  - Smooth scrolling
  - Touch gesture support
- **Performance**:
  - Optimized animations
  - Efficient rendering
  - Audio preloading

## 🎯 Game Mechanics

- **Gravity**: Realistic gravity simulation
- **Jump Physics**: Authentic Mario-style jumping
- **Collision Detection**: Precise box collision detection
- **World Scrolling**: Smooth horizontal scrolling
- **Box Breaking**: Animated blast effects with particles

## 🔧 Customization

### Adding New Content
1. Edit `PortfolioSection.js` to add new sections
2. Update `MarioGame.js` to add new boxes
3. Adjust box positions in the `boxes` array

### Changing Assets
- Replace sprites in the `public/` folder
- Update references in component files
- Maintain aspect ratios for best results

### Styling
- Modify CSS files for visual changes
- Adjust colors, fonts, and animations
- Update responsive breakpoints as needed

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Notes

- **Audio Autoplay**: Mobile browsers require user interaction before audio can play. The game handles this automatically.
- **Performance**: Optimized for 60fps gameplay on modern devices
- **Accessibility**: Includes ARIA labels and keyboard navigation support

## 🔗 Links

- **Alternative Portfolio**: [ujworks.xyz](https://ujworks.xyz) (accessible via "Don't Love Mario?" button)

## 📄 License

This project is private and proprietary.

## 👨‍💻 Author

**Ujjwal Jain**
- Software Engineer from West Lafayette, USA
- 6+ years building distributed systems and cloud-native applications

---

**Enjoy exploring the portfolio! Break some boxes and discover the content! 🎮✨**

