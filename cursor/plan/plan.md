<!-- 065dd57f-a2ca-437f-9e6a-a07c61540da6 2f6db096-62af-424f-9ef4-4d5cbfdfa12e -->
# Platformer Portfolio Website Implementation Plan

## Project Structure

```
/app
  /page.tsx - Main page (loads GameCanvas)
  /layout.tsx - Root layout with metadata
/components
  /game
    - GameCanvas.tsx - Main game container with RAF loop
    - Player.tsx - Player character component
    - LevelSection.tsx - Themed world sections
    - SectionTrigger.tsx - Invisible triggers for sections
    - Camera.tsx - Camera logic component
    - Hud.tsx - Game HUD with section name and controls
  /ui
    - SectionModal.tsx - Animated modal for section content
    - Button.tsx - Reusable button component
    - Card.tsx - Card component for projects
    - ClassicLayout.tsx - Traditional portfolio layout
  /sections
    - AboutSection.tsx - About me content
    - SkillsSection.tsx - Skills display
    - ProjectsSection.tsx - Projects grid
    - ExperienceSection.tsx - Timeline
    - ContactSection.tsx - Contact form
/context
  - GameContext.tsx - Global game state (React Context)
  - GameProvider.tsx - Game state provider
/hooks
  - useGameEngine.ts - Game loop and physics logic
  - useKeyboard.ts - Keyboard input handler
  - useTouchControls.ts - Mobile touch controls
  - useParallax.ts - Parallax calculation hook
/game
  /types
    - index.ts - TypeScript types (Player, Section, Trigger, etc.)
  /constants
    - index.ts - Game constants (gravity, speed, section positions)
  /utils
    - collision.ts - Collision detection utilities
    - physics.ts - Physics calculations
/data
  - portfolio.ts - Portfolio content (name, bio, skills, projects, etc.)
/public
  - (optional assets)
```

## Implementation Steps

### 1. Project Setup

- Initialize Next.js 14+ with TypeScript and App Router
- Install dependencies: Tailwind CSS, Framer Motion, Zustand (for state), clsx
- Configure Tailwind with custom colors and game-themed styles
- Set up TypeScript strict mode

### 2. Core Game Types and Constants

- Define TypeScript interfaces: `Player`, `Section`, `SectionTrigger`, `GameState`, `Camera`
- Create constants for: gravity (0.5), jump velocity (-12), move speed (5), section boundaries
- Define section types: 'about', 'skills', 'projects', 'experience', 'contact'

### 3. Game State Management

- Create `GameContext` with state: player position/velocity, camera position, current section, active modal, game mode (game/classic)
- Create `GameProvider` component
- Implement actions: updatePlayer, updateCamera, setSection, openModal, toggleMode

### 4. Game Engine Hook

- Create `useGameEngine` hook with requestAnimationFrame loop
- Implement physics: gravity application, velocity updates, position updates
- Implement collision detection: ground collision, platform collision (simple AABB)
- Update camera to follow player (player centered with deadzone)
- Calculate current section based on player X position

### 5. Input Handling

- Create `useKeyboard` hook for A/D, Left/Right arrows, Space/W/Up for jump
- Create `useTouchControls` hook for mobile (left/right/jump buttons)
- Debounce input to prevent key repeat issues

### 6. Game Components

- **GameCanvas**: Container that runs game loop, renders world, handles input
- **Player**: Simple rectangle/circle with CSS-based animations (idle, run, jump states)
- **LevelSection**: Renders platforms and decorations for each section (different colors/themes)
- **SectionTrigger**: Invisible divs that detect player overlap and trigger modals
- **Camera**: Applies CSS transform to world container based on cameraX

### 7. Parallax System

- Create `useParallax` hook that calculates layer positions
- Implement 3 background layers in GameCanvas:
                - Far background (0.3x camera movement)
                - Mid ground (0.6x camera movement)
                - Foreground (1.0x camera movement)
- Use CSS transforms for smooth parallax

### 8. HUD Component

- Display current section name
- Show simple score/XP counter
- Add "Toggle Classic Mode" button
- For mobile: render touch control buttons (left, right, jump)
- Use Framer Motion for smooth transitions

### 9. Section Modals/Panels

- Create `SectionModal` component with Framer Motion animations (slide in from right, fade)
- Implement section components:
                - **AboutSection**: Name, title, location, bio bullets
                - **SkillsSection**: Grouped skill chips (Frontend, Backend, etc.)
                - **ProjectsSection**: Grid of project cards (title, description, tech, links)
                - **ExperienceSection**: Timeline with dates, companies, highlights
                - **ContactSection**: Form (name, email, message) + social links + resume download
- Add close button and click-outside-to-close functionality
- Implement focus management and ARIA attributes

### 10. Classic Mode

- Create `ClassicLayout` component with standard vertical sections
- Use same section components but in scrollable layout
- Ensure keyboard navigation and screen reader support
- Toggle between GameCanvas and ClassicLayout based on mode

### 11. Portfolio Data

- Create `data/portfolio.ts` with placeholder content:
                - Personal info (name, title, location, bio)
                - Skills array grouped by category
                - Projects array (title, description, tech, links)
                - Experience array (role, company, date, highlights)
                - Contact info (email, LinkedIn, GitHub)
- Add clear comments for easy editing

### 12. Responsive Design

- Use Tailwind responsive breakpoints (sm, md, lg)
- Scale game canvas appropriately for mobile
- Adjust section modal sizes for mobile
- Implement mobile touch controls overlay
- Simplify level layout for smaller screens if needed

### 13. Animations and Polish

- Use Framer Motion for:
                - Section modal entrance/exit (slide + fade)
                - Staggered project cards and skill chips
                - Button hover/tap effects
                - Player animations (idle, run, jump)
- Add micro-interactions: collectible items (coins/stars) for XP
- Implement "question block" style elements that reveal fun facts

### 14. Accessibility

- Add ARIA labels to game controls
- Ensure modals have proper focus traps
- Add keyboard shortcuts documentation
- Screen reader friendly classic mode
- Proper semantic HTML

### 15. SEO

- Add metadata in `layout.tsx`: title, description, Open Graph tags
- Ensure portfolio content is in HTML (classic mode)
- Add structured data for portfolio sections
- Use semantic HTML elements

### 16. Performance Optimization

- Use React.memo for game components
- Keep game state updates in refs (only sync to React state at ~30fps)
- Optimize collision detection (only check nearby platforms)
- Lazy load section modals
- Use CSS transforms for camera (GPU accelerated)

## Key Files to Create

1. `app/page.tsx` - Main entry point
2. `app/layout.tsx` - Root layout with SEO metadata
3. `context/GameContext.tsx` - Game state management
4. `hooks/useGameEngine.ts` - Core game loop
5. `components/game/GameCanvas.tsx` - Main game container
6. `components/game/Player.tsx` - Player character
7. `components/ui/SectionModal.tsx` - Section content modal
8. `components/sections/*.tsx` - Individual section components
9. `data/portfolio.ts` - Portfolio content data
10. `game/types/index.ts` - TypeScript definitions
11. `game/constants/index.ts` - Game constants

## Technical Decisions

- **State Management**: React Context (can migrate to Zustand later if performance issues)
- **Game Loop**: requestAnimationFrame in useGameEngine hook
- **Physics**: Custom lightweight implementation (no external library)
- **Collision**: Axis-Aligned Bounding Box (AABB) for simplicity
- **Player Rendering**: CSS-based rectangle with simple animations
- **World Rendering**: CSS transforms for camera, absolute positioning for entities
- **Parallax**: CSS transforms with calculated offsets based on camera position

## Testing Considerations

- Test game mechanics on desktop (keyboard) and mobile (touch)
- Verify section triggers work correctly
- Test classic mode toggle
- Verify responsive design on multiple screen sizes
- Test accessibility with keyboard navigation and screen reader

### To-dos

- [x] Initialize Next.js project with TypeScript, Tailwind CSS, and install dependencies (Framer Motion, etc.)
- [x] Create TypeScript types and interfaces for Player, Section, GameState, Camera in game/types/index.ts
- [x] Define game constants (gravity, speed, section positions) in game/constants/index.ts
- [x] Create portfolio.ts data file with placeholder content for all sections
- [x] Implement GameContext and GameProvider for global game state management
- [x] Create useGameEngine hook with requestAnimationFrame loop, physics, and collision detection
- [x] Implement useKeyboard and useTouchControls hooks for player input
- [x] Build GameCanvas, Player, LevelSection, SectionTrigger, and Camera components
- [x] Implement parallax background system with multiple layers
- [x] Create HUD component with section display, controls, and mode toggle
- [x] Build SectionModal component with Framer Motion animations
- [x] Create AboutSection, SkillsSection, ProjectsSection, ExperienceSection, and ContactSection components
- [x] Implement ClassicLayout component for traditional portfolio view
- [x] Add responsive styles and mobile touch controls
- [x] Add Framer Motion animations, micro-interactions, and visual polish
- [x] Add accessibility features, ARIA labels, SEO metadata, and semantic HTML