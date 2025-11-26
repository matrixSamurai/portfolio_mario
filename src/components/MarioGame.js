import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './MarioGame.css';
import PortfolioSection from './PortfolioSection';

// Mario sprite images for walking animation
const MARIO_SPRITES = ['/1.png', '/2.png', '/3.png'];

/**
 * MarioGame Component - Breakable Boxes Edition
 * 
 * Mario breaks boxes to reveal portfolio content:
 * - Walk and jump to break boxes
 * - Boxes contain: Projects, Education, Experience
 * - Content appears when box is broken
 */
const MarioGame = () => {
  // Game state
  const [marioWorldX, setMarioWorldX] = useState(0);
  const [marioY, setMarioY] = useState(() => {
    // Initialize with a reasonable default based on typical screen height
    return typeof window !== 'undefined' ? Math.floor(window.innerHeight * 0.80) : 864;
  });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isJumping] = useState(false);
  const [facingRight, setFacingRight] = useState(true);
  const [brokenBoxes, setBrokenBoxes] = useState(new Set());
  const [activeContent, setActiveContent] = useState(null);
  const [keys, setKeys] = useState({});
  const keysRef = useRef({}); // Ref to track keys for event handlers
  const [scrollOffset, setScrollOffset] = useState(0);
  const [marioSpriteFrame, setMarioSpriteFrame] = useState(0);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080,
  });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [audioUnlocked, setAudioUnlocked] = useState(false); // Track if audio is unlocked for mobile
  const [score, setScore] = useState(0); // Score counter
  const [hasStarted, setHasStarted] = useState(false); // Track if game has started (player moved)

  // Refs for stable values across renders
  const gameRef = useRef(null);
  const velocityRef = useRef({ x: 0, y: 0 });
  const isJumpingRef = useRef(false);
  const facingRightRef = useRef(true);
  const animationFrameRef = useRef(null);
  const lastTimeRef = useRef(0);
  const audioRef = useRef(null);
  const isPlayingRef = useRef(false);
  const breakSoundRef = useRef(null);
  const keyPressTimeRef = useRef({}); // Track when keys were first pressed
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 }); // Track touch start for swipe gestures
  const currentVelocityXRef = useRef(0); // Current horizontal velocity for smooth acceleration
  const lastJumpTimeRef = useRef(0); // Track when last jump occurred to prevent double jumps

  // Game constants - tuned for authentic Mario Bros feel
  // Make gravity noticeably stronger so jumps feel weighty but still readable
  const GRAVITY = 2;           // Higher gravity = quicker fall
  const JUMP_POWER = -8;         // Strong jump to reach the boxes cleanly
  const MAX_JUMP_HEIGHT = 130;   // Moderate apex to keep jump snappy
  const MOVE_SPEED = 0.4; // Character movement speed (pixels per millisecond for smooth movement)
  const ACCELERATION = 0.003; // Acceleration rate for smooth start (higher = faster acceleration)
  const DECELERATION = 0.004; // Deceleration rate for smooth stop (higher = faster stop)
  const MARIO_WIDTH = 96; // Larger Mario sprite
  const MARIO_HEIGHT = 96;
  const MARIO_SCREEN_X = 150;
  const JUMP_COOLDOWN = 300; // Minimum time between jumps in milliseconds
  
  // Calculate ground level - top of the road where Mario stands
  const groundLevel = useMemo(() => {
    // Ground should be at bottom 15% of screen (85% from top)
    // This makes the road smaller and gives more space for gameplay
    return Math.floor(windowSize.height * 0.85);
  }, [windowSize.height]);

  // Calculate world width to end right after the last box (contact)
  // Last box (contact) is at windowSize.width * 1.6 (or more on mobile with spacing)
  const worldWidth = useMemo(() => {
    const isMobile = windowSize.width <= 768;
    const extraSpacing = isMobile ? windowSize.width * 0.15 : 0;
    const lastBoxPosition = windowSize.width * 1.6 + (extraSpacing * 5);
    const lastBoxWidth = 80; // boxSize
    return lastBoxPosition + lastBoxWidth + 50; // End right after contact box with minimal buffer
  }, [windowSize.width]);

  // Breakable boxes - 6 perfect square boxes (closer together)
  const boxes = useMemo(() => {
    const baseHeight = groundLevel;
    const boxSize = 80; // Perfect square - same width and height
    // Add more spacing between boxes on mobile
    const isMobile = windowSize.width <= 768;
    const extraSpacing = isMobile ? windowSize.width * 0.15 : 0; // Add 15% extra spacing between boxes on mobile
    
    return [
      { 
        id: 'about',
        left: windowSize.width * 0.1,
        top: baseHeight - (isMobile ? 220 : 260), // Slightly lower on mobile to avoid overlap with resume panel
        width: boxSize,
        height: boxSize,
        label: 'ABOUT',
        type: 'question'
      },
      { 
        id: 'education',
        left: windowSize.width * 0.4 + extraSpacing,
        top: baseHeight - (isMobile ? 220 : 260),
        width: boxSize,
        height: boxSize,
        label: 'EDUCATION',
        type: 'question'
      },
      { 
        id: 'experience',
        left: windowSize.width * 0.7 + (extraSpacing * 2),
        top: baseHeight - (isMobile ? 200 : 240),
        width: boxSize,
        height: boxSize,
        label: 'WORK EXP',
        type: 'brick'
      },
      { 
        id: 'projects',
        left: windowSize.width * 1.0 + (extraSpacing * 3),
        top: baseHeight - (isMobile ? 220 : 260),
        width: boxSize,
        height: boxSize,
        label: 'PROJECTS',
        type: 'question'
      },
      { 
        id: 'skills',
        left: windowSize.width * 1.3 + (extraSpacing * 4),
        top: baseHeight - (isMobile ? 200 : 240),
        width: boxSize,
        height: boxSize,
        label: 'SKILLS',
        type: 'brick'
      },
      { 
        id: 'contact',
        left: windowSize.width * 1.6 + (extraSpacing * 5),
        top: baseHeight - (isMobile ? 220 : 260),
        width: boxSize,
        height: boxSize,
        label: 'CONTACT',
        type: 'question'
      },
    ];
  }, [windowSize.width, groundLevel]);

  // Platform definitions - Removed (no brown horizontal lines)
  const platforms = useMemo(() => {
    return [];
  }, []);

  // Parallax scroll speeds
  const cloudScrollSpeed = 0.25;
  const groundScrollSpeed = 1.0;
  const boxScrollSpeed = 1.0;

  // Pipe position - place after the last box ("contact"), with some extra spacing
  const pipeWorldX = useMemo(() => {
    const contactBox = boxes.find(box => box.id === 'contact');
    if (!contactBox) {
      // Fallback: near the end of the world
      const marginFromEnd = 200;
      return Math.max(0, worldWidth - marginFromEnd);
    }
    const extraGap = windowSize.width * 0.1; // 10% of screen width after the contact box
    return contactBox.left + contactBox.width + extraGap;
  }, [boxes, worldWidth, windowSize.width]);

  // Starting pipe near the very beginning of the world, sitting on the road
  const startingPipeWorldX = useMemo(() => {
    // More negative so the pipe sits almost at the extreme left of the screen
    return -140;
  }, []);

  // Grass patches on the road after the 2nd box (education) and 5th box (skills)
  const grassWorldXs = useMemo(() => {
    const positions = [];
    const secondBox = boxes[1]; // education
    const fifthBox = boxes[4];  // skills

    if (secondBox) {
      positions.push(secondBox.left + secondBox.width * 0.8);
    }
    if (fifthBox) {
      positions.push(fifthBox.left + fifthBox.width * 0.8);
    }
    return positions;
  }, [boxes]);

  // Grass2 patches on the road after the 1st box (about) and just before the 4th box (projects)
  const grass2WorldXs = useMemo(() => {
    const positions = [];
    const firstBox = boxes[0]; // about
    const fourthBox = boxes[3]; // projects

    if (firstBox) {
      positions.push(firstBox.left + firstBox.width * 0.8);
    }
    if (fourthBox) {
      positions.push(fourthBox.left - fourthBox.width * 0.8);
    }
    return positions;
  }, [boxes]);

  // Initialize Mario position
  useEffect(() => {
    if (groundLevel > 0) {
      setMarioY(groundLevel);
      velocityRef.current.y = 0;
      isJumpingRef.current = false;
    }
  }, [groundLevel]);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio('/song.mp3');
    audioRef.current.loop = true; // Loop the song
    audioRef.current.volume = 0.7; // Set volume to 70%
    audioRef.current.preload = 'auto'; // Preload audio for better mobile support
    
    // Initialize break sound - try common audio formats
    // Note: User mentioned "break.png" but that's an image extension, trying audio formats
    breakSoundRef.current = new Audio('/break.mp3');
    breakSoundRef.current.volume = 0.8;
    breakSoundRef.current.preload = 'auto';
    // If break.mp3 fails, try other formats
    breakSoundRef.current.addEventListener('error', () => {
      breakSoundRef.current = new Audio('/break.wav');
      breakSoundRef.current.volume = 0.8;
      breakSoundRef.current.preload = 'auto';
      breakSoundRef.current.addEventListener('error', () => {
        breakSoundRef.current = new Audio('/break.ogg');
        breakSoundRef.current.volume = 0.8;
        breakSoundRef.current.preload = 'auto';
        breakSoundRef.current.addEventListener('error', () => {
          // If all fail, try the exact name user mentioned (though it's unlikely to work as audio)
          breakSoundRef.current = new Audio('/break.png');
          breakSoundRef.current.volume = 0.8;
        });
      });
    });
    
    return () => {
      // Cleanup: pause and remove audio when component unmounts
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (breakSoundRef.current) {
        breakSoundRef.current.pause();
        breakSoundRef.current = null;
      }
    };
  }, []);

  // Unlock audio on first user interaction (required for mobile browsers)
  useEffect(() => {
    const unlockAudio = async () => {
      if (audioUnlocked || !audioRef.current) return;
      
      try {
        // Try to play and immediately pause to unlock audio context
        await audioRef.current.play();
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setAudioUnlocked(true);
      } catch (error) {
        // Audio unlock failed, will try again on next interaction
        console.log('Audio unlock attempt:', error);
      }
    };

    const handleUserInteraction = () => {
      unlockAudio();
      // Remove listeners after first successful unlock
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('touchend', handleUserInteraction);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };

    // Listen for any user interaction
    document.addEventListener('touchstart', handleUserInteraction, { once: true, passive: true });
    document.addEventListener('touchend', handleUserInteraction, { once: true, passive: true });
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('keydown', handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('touchend', handleUserInteraction);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, [audioUnlocked]);

  // Play music when Mario starts moving (keep playing once started)
  useEffect(() => {
    const isMoving = velocity.x !== 0;
    
    if (isMoving && !isPlayingRef.current && audioRef.current && soundEnabled && audioUnlocked) {
      // Start playing when Mario starts moving (only if audio is unlocked)
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            isPlayingRef.current = true;
          })
          .catch(error => {
            // Handle autoplay restrictions
            console.log('Audio play failed:', error);
            // Try to unlock audio if it failed
            if (!audioUnlocked) {
              audioRef.current.play().then(() => {
                setAudioUnlocked(true);
                isPlayingRef.current = true;
              }).catch(() => {});
            }
          });
      }
    }
    // Don't pause when Mario stops - keep music playing
  }, [velocity.x, soundEnabled, audioUnlocked]);

  // Control music based on sound toggle
  useEffect(() => {
    if (audioRef.current) {
      if (soundEnabled && isPlayingRef.current) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [soundEnabled]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Touch zone and swipe gesture handling
  useEffect(() => {
    const unlockAudioOnTouch = async () => {
      if (!audioUnlocked && audioRef.current) {
        try {
          await audioRef.current.play();
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          setAudioUnlocked(true);
        } catch (error) {
          // Audio unlock failed, will try again
        }
      }
    };

    const handleTouchStart = (e) => {
      // Unlock audio on first touch
      unlockAudioOnTouch();
      
      // Don't interfere with button clicks or dialog box
      if (e.target.closest('.mobile-button, .sound-toggle, .portfolio-section, .section-panel, .panel-body')) {
        return;
      }

      // Prevent text selection on mobile
      if (window.getSelection) {
        window.getSelection().removeAllRanges();
      }
      if (document.selection) {
        document.selection.empty();
      }

      const touch = e.touches[0];
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const touchX = touch.clientX;
      const touchY = touch.clientY;
      
      touchStartRef.current = { x: touchX, y: touchY, time: Date.now() };
      
      // Only activate touch zones in the middle area (not near buttons)
      // Left side of screen (first 30%) - move left
      if (touchX < screenWidth * 0.3 && touchY > screenHeight * 0.3) {
        setTouchControls(prev => ({ ...prev, left: true }));
      }
      // Right side of screen (last 30%) - move right
      else if (touchX > screenWidth * 0.7 && touchY > screenHeight * 0.3) {
        setTouchControls(prev => ({ ...prev, right: true }));
      }
    };

    const handleTouchMove = (e) => {
      // Don't prevent default if touching dialog box - allow scrolling
      if (e.target.closest('.portfolio-section, .section-panel, .panel-body')) {
        return; // Allow natural scrolling
      }
      
      // Prevent default to avoid scrolling only if not on buttons or dialog
      if (!e.target.closest('.mobile-button, .sound-toggle')) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e) => {
      // Don't interfere with button clicks or dialog box
      if (e.target.closest('.mobile-button, .sound-toggle, .portfolio-section, .section-panel, .panel-body')) {
        return;
      }

      const touch = e.changedTouches[0];
      if (!touch) return;
      
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touchStartRef.current.y - touch.clientY; // Negative because Y increases downward
      const deltaTime = Date.now() - touchStartRef.current.time;
      
      // Detect swipe up gesture (minimum 50px upward movement in less than 300ms)
      if (deltaY > 50 && deltaTime < 300 && Math.abs(deltaX) < 100) {
        // Trigger jump
        setTouchControls(prev => ({ ...prev, jump: true }));
        setTimeout(() => {
          setTouchControls(prev => ({ ...prev, jump: false }));
        }, 100);
      }
      
      // Clear touch zone controls
      setTouchControls(prev => ({ ...prev, left: false, right: false }));
    };

    const gameElement = gameRef.current;
    if (gameElement) {
      gameElement.addEventListener('touchstart', handleTouchStart, { passive: false });
      gameElement.addEventListener('touchmove', handleTouchMove, { passive: false });
      gameElement.addEventListener('touchend', handleTouchEnd, { passive: false });
    }

    return () => {
      if (gameElement) {
        gameElement.removeEventListener('touchstart', handleTouchStart);
        gameElement.removeEventListener('touchmove', handleTouchMove);
        gameElement.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [audioUnlocked]);

  // Touch controls state
  const [touchControls, setTouchControls] = useState({
    left: false,
    right: false,
    jump: false,
  });

  // Update keysRef when keys state changes
  useEffect(() => {
    keysRef.current = keys;
  }, [keys]);

  // Keyboard input handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Handle spacebar - can be ' ', 'Spacebar', or check e.code === 'Space'
      const key = e.key === ' ' || e.key === 'Spacebar' || e.code === 'Space' ? ' ' : e.key;
      
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', ' ', 'a', 'A', 'd', 'D', 'w', 'W'].includes(key) || e.code === 'Space') {
        e.preventDefault();
      }
      
      // Track when key was first pressed (only if not already pressed)
      if (!keysRef.current[key]) {
        keyPressTimeRef.current[key] = Date.now();
        // Also track alternative key names for arrow keys
        if (key === 'ArrowLeft' || key === 'a' || key === 'A') {
          keyPressTimeRef.current['ArrowLeft'] = keyPressTimeRef.current['ArrowLeft'] || Date.now();
          keyPressTimeRef.current['a'] = keyPressTimeRef.current['a'] || Date.now();
          keyPressTimeRef.current['A'] = keyPressTimeRef.current['A'] || Date.now();
        }
        if (key === 'ArrowRight' || key === 'd' || key === 'D') {
          keyPressTimeRef.current['ArrowRight'] = keyPressTimeRef.current['ArrowRight'] || Date.now();
          keyPressTimeRef.current['d'] = keyPressTimeRef.current['d'] || Date.now();
          keyPressTimeRef.current['D'] = keyPressTimeRef.current['D'] || Date.now();
        }
      }
      
      // Store spacebar as ' ' for consistent detection
      setKeys(prev => ({ ...prev, [key]: true }));
    };

    const handleKeyUp = (e) => {
      // Handle spacebar - can be ' ', 'Spacebar', or check e.code === 'Space'
      const key = e.key === ' ' || e.key === 'Spacebar' || e.code === 'Space' ? ' ' : e.key;
      
      // Remove key press time tracking
      delete keyPressTimeRef.current[key];
      // Also remove alternative key names
      if (key === 'ArrowLeft' || key === 'a' || key === 'A') {
        delete keyPressTimeRef.current['ArrowLeft'];
        delete keyPressTimeRef.current['a'];
        delete keyPressTimeRef.current['A'];
      }
      if (key === 'ArrowRight' || key === 'd' || key === 'D') {
        delete keyPressTimeRef.current['ArrowRight'];
        delete keyPressTimeRef.current['d'];
        delete keyPressTimeRef.current['D'];
      }
      
      setKeys(prev => {
        const newKeys = { ...prev };
        delete newKeys[key];
        return newKeys;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []); // Empty dependency array - use refs to track state

  // Sync touch controls with keyboard keys
  useEffect(() => {
    if (touchControls.left) {
      // Track touch press time
      if (!keyPressTimeRef.current['ArrowLeft']) {
        keyPressTimeRef.current['ArrowLeft'] = Date.now();
      }
      setKeys(prev => ({ ...prev, 'ArrowLeft': true }));
    } else {
      delete keyPressTimeRef.current['ArrowLeft'];
      setKeys(prev => {
        const newKeys = { ...prev };
        delete newKeys['ArrowLeft'];
        return newKeys;
      });
    }
    
    if (touchControls.right) {
      // Track touch press time
      if (!keyPressTimeRef.current['ArrowRight']) {
        keyPressTimeRef.current['ArrowRight'] = Date.now();
      }
      setKeys(prev => ({ ...prev, 'ArrowRight': true }));
    } else {
      delete keyPressTimeRef.current['ArrowRight'];
      setKeys(prev => {
        const newKeys = { ...prev };
        delete newKeys['ArrowRight'];
        return newKeys;
      });
    }
    
    // Handle jump with cooldown to prevent double jumps
    if (touchControls.jump) {
      const currentTime = Date.now();
      if (currentTime - lastJumpTimeRef.current >= JUMP_COOLDOWN) {
        setKeys(prev => ({ ...prev, ' ': true }));
        lastJumpTimeRef.current = currentTime;
        // Clear jump state immediately after setting it to prevent multiple triggers
        setTimeout(() => {
          setTouchControls(prev => ({ ...prev, jump: false }));
        }, 50);
      }
    } else {
      setKeys(prev => {
        const newKeys = { ...prev };
        delete newKeys[' '];
        return newKeys;
      });
    }
  }, [touchControls]);

  // Check if a key is pressed
  const isKeyPressed = useCallback((key) => {
    return keys[key] === true;
  }, [keys]);

  // Helper to trigger a single jump from on-screen buttons (independent of touchControls)
  // We just simulate a brief Space key press; the main game loop already enforces jump cooldown.
  const triggerJump = useCallback(() => {
    setKeys(prev => ({ ...prev, ' ': true }));
    setTimeout(() => {
      setKeys(prev => {
        const newKeys = { ...prev };
        delete newKeys[' '];
        return newKeys;
      });
    }, 120);
  }, []);

  // Check box collision and break
  const checkBoxCollision = useCallback((x, y, boxes) => {
    const marioLeft = x;
    const marioRight = x + MARIO_WIDTH;
    const marioBottom = y; // Y is the bottom position (top of road)
    const marioTop = y - MARIO_HEIGHT; // Top is above bottom

    for (const box of boxes) {
      if (brokenBoxes.has(box.id)) continue;

      const boxLeft = box.left;
      const boxRight = box.left + box.width;
      const boxTop = box.top;
      const boxBottom = box.top + box.height;

      // Check if Mario is hitting box from below (jumping into it)
      if (marioRight > boxLeft && marioLeft < boxRight) {
        // Hitting from below - Mario's top hits box bottom
        if (marioTop <= boxBottom + 10 && marioTop >= boxBottom - 10 && marioBottom > boxBottom) {
          return { hitBox: box, fromBelow: true };
        }
        // Landing on top - Mario's bottom lands on box top
        if (marioBottom <= boxTop + 5 && marioBottom >= boxTop - 5 && velocityRef.current.y <= 0) {
          return { hitBox: box, fromTop: true };
        }
      }
    }
    return null;
  }, [brokenBoxes]);

  // Check platform collision
  const checkPlatformCollision = useCallback((x, y, platforms) => {
    const marioLeft = x;
    const marioRight = x + MARIO_WIDTH;
    const marioBottom = y; // Y is bottom position (top of road)
    for (const platform of platforms) {
      if (marioRight > platform.left && marioLeft < platform.right) {
        // Mario's bottom lands on platform top
        if (marioBottom <= platform.top + 5 && marioBottom >= platform.top - 15 && velocityRef.current.y <= 0) {
          return { onPlatform: true, platformTop: platform.top };
        }
      }
    }
    return { onPlatform: false, platformTop: groundLevel };
  }, [groundLevel]);

  // Mario walking animation - cycle through sprites
  useEffect(() => {
    // Use a threshold to detect meaningful movement (accounting for smooth acceleration)
    const isMoving = Math.abs(velocity.x) > 0.01 && !isJumping;
    if (isMoving) {
      const walkInterval = setInterval(() => {
        setMarioSpriteFrame(prev => (prev + 1) % MARIO_SPRITES.length);
      }, 150); // Change sprite every 150ms for walking animation
      return () => clearInterval(walkInterval);
    } else {
      setMarioSpriteFrame(0); // Reset to first frame when idle or jumping
    }
  }, [velocity.x, isJumping]);

  // Main game loop
  useEffect(() => {
    const gameLoop = (currentTime) => {
      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      if (deltaTime > 100) {
        animationFrameRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      setMarioWorldX(prevWorldX => {
        let newWorldX = prevWorldX;
        let currentVelocityX = currentVelocityXRef.current;
        let newFacingRight = facingRightRef.current;

        // Horizontal movement input detection
        const leftKey = isKeyPressed('ArrowLeft') || isKeyPressed('a') || isKeyPressed('A');
        const rightKey = isKeyPressed('ArrowRight') || isKeyPressed('d') || isKeyPressed('D');
        
        // Calculate target velocity based on input
        let targetVelocityX = 0;
        if (leftKey) {
          targetVelocityX = -MOVE_SPEED;
          newFacingRight = false;
        } else if (rightKey) {
          targetVelocityX = MOVE_SPEED;
          newFacingRight = true;
        }
        
        // Smooth acceleration/deceleration
        if (targetVelocityX !== 0) {
          // Accelerate towards target velocity
          if (currentVelocityX < targetVelocityX) {
            currentVelocityX = Math.min(targetVelocityX, currentVelocityX + ACCELERATION * deltaTime);
          } else if (currentVelocityX > targetVelocityX) {
            currentVelocityX = Math.max(targetVelocityX, currentVelocityX - ACCELERATION * deltaTime);
          }
        } else {
          // Decelerate when no input
          if (currentVelocityX > 0) {
            currentVelocityX = Math.max(0, currentVelocityX - DECELERATION * deltaTime);
          } else if (currentVelocityX < 0) {
            currentVelocityX = Math.min(0, currentVelocityX + DECELERATION * deltaTime);
          }
        }
        
        // Update position based on velocity and deltaTime for frame-rate independence
        newWorldX += currentVelocityX * deltaTime;
        newWorldX = Math.max(0, Math.min(worldWidth - MARIO_WIDTH, newWorldX));
        
        // Mark game as started when player first moves
        if (Math.abs(currentVelocityX) > 0.01 && !hasStarted) {
          setHasStarted(true);
        }
        
        // Store current velocity for next frame
        currentVelocityXRef.current = currentVelocityX;

        const newScrollOffset = MARIO_SCREEN_X - newWorldX;
        setScrollOffset(newScrollOffset);

        // Restore boxes when Mario moves past them in either direction
        // Restore box when Mario moves forward past the box's right edge OR backward past the box's left edge
        let boxToRestore = null;
        setBrokenBoxes(prev => {
          const newBrokenBoxes = new Set(prev);
          let shouldUpdate = false;
          
          boxes.forEach(box => {
            if (newBrokenBoxes.has(box.id)) {
              const boxLeft = box.left;
              const boxRight = box.left + box.width;
              const marioLeft = newWorldX;
              const marioRight = newWorldX + MARIO_WIDTH;
              const buffer = 50; // Buffer distance for smooth restoration
              
              // Restore when Mario has moved forward past the box (Mario left edge > box right edge + buffer)
              // OR when Mario has moved backward past the box (Mario right edge < box left edge - buffer)
              const movedForwardPast = marioLeft > boxRight + buffer;
              const movedBackwardPast = marioRight < boxLeft - buffer;
              
              if (movedForwardPast || movedBackwardPast) {
                newBrokenBoxes.delete(box.id);
                shouldUpdate = true;
                // Track which box was restored to close its content panel
                if (activeContent === box.id) {
                  boxToRestore = box.id;
                }
              }
            }
          });
          
          return shouldUpdate ? newBrokenBoxes : prev;
        });
        
        // Close content panel if the active box was restored
        if (boxToRestore) {
          setActiveContent(null);
        }

        // Update Y position
        setMarioY(prevY => {
          let newY = prevY;
          let newVelocityY = velocityRef.current.y;
          
          // Check box collision first
          const boxCollision = checkBoxCollision(newWorldX, prevY, boxes);
          if (boxCollision && boxCollision.fromBelow && newVelocityY < 0) {
            // Break the box! (Mario jumping up into it)
            if (!brokenBoxes.has(boxCollision.hitBox.id)) {
              setBrokenBoxes(prev => new Set([...prev, boxCollision.hitBox.id]));
              setActiveContent(boxCollision.hitBox.id);
              // Increment score when box is broken
              setScore(prev => prev + 1);
              // Bounce Mario down slightly
              newVelocityY = 2;
              // Play break sound
              if (breakSoundRef.current && soundEnabled) {
                breakSoundRef.current.currentTime = 0; // Reset to start
                breakSoundRef.current.play().catch(error => {
                  console.log('Break sound play failed:', error);
                });
              }
            }
          }

          // Check platform collision
          const collision = checkPlatformCollision(newWorldX, prevY, platforms);
          const currentPlatformTop = collision.platformTop;
          const onPlatform = collision.onPlatform;

          // Jumping - Check if Mario can jump (on ground or platform)
          // Mario can jump if he's on the ground (within 15px tolerance) or on a platform, and not already jumping
          // Use more lenient ground detection
          const isOnGround = prevY >= groundLevel - 15 && prevY <= groundLevel + 10;
          const isOnPlatform = onPlatform || (prevY >= currentPlatformTop - 15 && prevY <= currentPlatformTop + 10);
          const canJump = !isJumpingRef.current && (isOnGround || isOnPlatform);
          
          // Check for jump keys: ArrowUp, W, or Spacebar (space key is ' ')
          const jumpPressed = isKeyPressed('ArrowUp') || 
                             isKeyPressed('w') || 
                             isKeyPressed('W') || 
                             isKeyPressed(' ') || 
                             isKeyPressed('Spacebar');
          
          // Add cooldown check to prevent double jumps
          const currentTime = Date.now();
          const canJumpWithCooldown = canJump && (currentTime - lastJumpTimeRef.current >= JUMP_COOLDOWN);
          
          if (jumpPressed && canJumpWithCooldown) {
            newVelocityY = JUMP_POWER; // Negative = jump up (Y decreases)
            isJumpingRef.current = true;
            velocityRef.current.y = JUMP_POWER; // Update ref immediately
            lastJumpTimeRef.current = currentTime; // Update last jump time
            // Clear jump key immediately to prevent multiple jumps
            setKeys(prev => {
              const newKeys = { ...prev };
              delete newKeys[' '];
              delete newKeys['ArrowUp'];
              delete newKeys['w'];
              delete newKeys['W'];
              return newKeys;
            });
          }

          // Apply gravity - Always apply when in the air (not on ground/platform)
          // Check if Mario is on ground/platform first
          const isOnGroundOrPlatform = prevY <= currentPlatformTop + 10 && newVelocityY >= 0;
          
          if (!isOnGroundOrPlatform) {
            // In the air - always apply gravity
            if (newVelocityY < 0) {
              // Jumping up - apply gravity to slow down the jump
              newVelocityY -= GRAVITY;
            } else {
              // Falling down or at peak - apply gravity to accelerate fall
              newVelocityY -= GRAVITY;
            }
          } else {
            // Land on platform/ground
            newVelocityY = 0;
            isJumpingRef.current = false;
            newY = currentPlatformTop;
            velocityRef.current.y = 0; // Update ref
          }

          newY += newVelocityY; // Add velocity (negative = up, positive = down)
          
          // Limit maximum jump height - don't let Mario jump higher than coin boxes
          const minY = groundLevel - MAX_JUMP_HEIGHT; // Minimum Y (highest position)
          if (newY < minY && newVelocityY < 0) {
            // Hit max jump height - stop upward movement, gravity will pull down next frame
            newY = minY;
            newVelocityY = 0; // Stop upward velocity
            isJumpingRef.current = false;
            // Note: Gravity will be applied on next frame since we're now in the air
          }
          
          // Check platform collision after movement
          const finalCollision = checkPlatformCollision(newWorldX, newY, platforms);
          let finalPlatformTop = finalCollision.platformTop;
          
          // Only land on platform if falling down (positive velocity)
          if (finalCollision.onPlatform && newVelocityY >= 0) {
            finalPlatformTop = finalCollision.platformTop;
            newVelocityY = 0;
            isJumpingRef.current = false;
            newY = finalPlatformTop;
            velocityRef.current.y = 0;
          }
          
          // Ensure Mario doesn't fall through the ground - only when falling (positive velocity)
          if (newY > groundLevel && newVelocityY >= 0 && !onPlatform) {
            newY = groundLevel;
            newVelocityY = 0;
            isJumpingRef.current = false;
            velocityRef.current.y = 0;
          }
          
          // Boundary checks - Y is bottom position, higher Y = lower on screen
          // Only prevent going below ground when falling, allow going above when jumping
          if (newVelocityY >= 0) {
            newY = Math.max(finalPlatformTop, newY); // Can't go below platform/ground when falling
          }
          newY = Math.min(windowSize.height, newY); // Can't go below screen
          
          // Update velocity ref for next frame
          velocityRef.current.y = newVelocityY;
          
          // Update velocity ref
          velocityRef.current = { x: currentVelocityXRef.current, y: newVelocityY };
          facingRightRef.current = newFacingRight;
          
          setVelocity({ x: currentVelocityXRef.current, y: newVelocityY });
          setFacingRight(newFacingRight);

          return newY;
        });

        return newWorldX;
      });

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    lastTimeRef.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    keys,
    worldWidth,
    platforms,
    boxes,
    isKeyPressed,
    checkBoxCollision,
    checkPlatformCollision,
    brokenBoxes,
    activeContent,
    windowSize.width,
    windowSize.height,
    hasStarted,
    touchControls,
    JUMP_POWER,
    GRAVITY,
    MAX_JUMP_HEIGHT,
    groundLevel,
    soundEnabled,
  ]);

  // Memoize cloud positions with random vertical and horizontal positions,
  // ensuring some clouds are visible when the game first starts.
  const cloudPositions = useMemo(() => {
    // Number of clouds scales with world width so they keep appearing as you move
    const basePerScreen = 8; // target clouds per screen-width of world
    const screensInWorld = Math.max(1, worldWidth / Math.max(1, windowSize.width));
    const numClouds = Math.round(basePerScreen * screensInWorld);
    const positions = [];

    // Ensure a few clouds appear within the initial viewport when the game loads
    const guaranteedCloudXs = [
      windowSize.width * 0.2,
      windowSize.width * 0.5,
      windowSize.width * 0.8,
    ];

    guaranteedCloudXs.forEach(x => {
      const y = windowSize.height * (0.15 + Math.random() * 0.25);
      positions.push({ left: x, top: y });
    });

    // Generate remaining clouds across the entire world width
    for (let i = positions.length; i < numClouds; i++) {
      const randomX = Math.random() * worldWidth; // spread across world
      const randomY = windowSize.height * (0.10 + Math.random() * 0.40);
      positions.push({ left: randomX, top: randomY });
    }
    
    // Sort by X position to ensure they scroll naturally
    return positions.sort((a, b) => a.left - b.left);
  }, [windowSize.width, windowSize.height, worldWidth]);

  return (
    <div 
      className="mario-game" 
      ref={gameRef}
      role="application"
      aria-label="Ujjwal Portfolio Game"
      tabIndex={0}
    >
      {/* Sky background with cloud.png sprites */}
      <div 
        className="sky" 
        style={{ 
          transform: `translate3d(${scrollOffset * cloudScrollSpeed}px, 0, 0)`,
          width: `${worldWidth + windowSize.width}px`, // Extend sky to always cover screen
          left: '0px', // Always start from left edge
        }}
        aria-hidden="true"
      >
        {cloudPositions.map((position, index) => (
          <img
            key={`cloud-${index}`}
            src={`${process.env.PUBLIC_URL || ''}/cloud.png`}
            alt=""
            className="cloud"
            style={{ 
              left: `${position.left}px`,
              top: `${position.top}px`,
              position: 'absolute',
              imageRendering: 'pixelated',
            }}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Ground with coin pattern - Multiple coins placed together */}
      <div 
        className="ground coin-container" 
        style={{ 
          transform: `translate3d(${scrollOffset * groundScrollSpeed}px, 0, 0)`,
          width: `${worldWidth + windowSize.width + Math.abs(scrollOffset * groundScrollSpeed)}px`, // Extend to always cover screen
          left: `${-Math.abs(scrollOffset * groundScrollSpeed)}px`, // Extend left to ensure coins start from screen edge at x=0
          bottom: 0,
          height: `${windowSize.height - groundLevel}px`, // Height is now 15% of screen
          backgroundImage: `url(${process.env.PUBLIC_URL || ''}/coin.png)`,
          backgroundRepeat: 'repeat',
          backgroundSize: '60px 60px', // Size of each coin
          backgroundPosition: `${Math.abs(scrollOffset * groundScrollSpeed) % 60}px 0`, // Adjust background position to keep coin pattern aligned
          backgroundColor: '#8B4513', // Brown ground color
        }}
        aria-hidden="true"
      />

      {/* Starting pipe sitting on the road near the beginning */}
      {/* Starting pipe sitting on the road near the beginning */}
      <div
        className="pipe-wrapper"
        style={{
          transform: `translate3d(${scrollOffset * groundScrollSpeed}px, 0, 0)`,
          left: `${startingPipeWorldX}px`,
          bottom: `${windowSize.height - groundLevel}px`,
          position: 'absolute',
          zIndex: 150,
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL || ''}/pipe.png`}
          alt="Warp pipe at start"
          className="pipe"
        />
      </div>

      {/* Grass patches attached to the road after specific boxes */}
      {grassWorldXs.map((x, index) => (
        <div
          key={`grass-${index}`}
          className="grass-wrapper"
          style={{
            transform: `translate3d(${scrollOffset * groundScrollSpeed}px, 0, 0)`,
            left: `${x}px`,
            bottom: `${windowSize.height - groundLevel}px`,
            position: 'absolute',
            zIndex: 120,
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL || ''}/grass.png`}
            alt="Grass"
            className="grass"
          />
        </div>
      ))}

      {/* Grass2 patches attached to the road after box 1 and before box 4 */}
      {grass2WorldXs.map((x, index) => (
        <div
          key={`grass2-${index}`}
          className="grass-wrapper"
          style={{
            transform: `translate3d(${scrollOffset * groundScrollSpeed}px, 0, 0)`,
            left: `${x}px`,
            bottom: `${windowSize.height - groundLevel}px`,
            position: 'absolute',
            zIndex: 120,
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL || ''}/grass2.png`}
            alt="Grass"
            className="grass2"
          />
        </div>
      ))}

      {/* End pipe sitting on the road, after the last box */}
      <div
        className="pipe-wrapper"
        style={{
          transform: `translate3d(${scrollOffset * groundScrollSpeed}px, 0, 0)`,
          left: `${pipeWorldX}px`,
          bottom: `${windowSize.height - groundLevel}px`,
          position: 'absolute',
          zIndex: 150,
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL || ''}/pipe.png`}
          alt="Warp pipe"
          className="pipe"
        />
      </div>

      {/* Thanks banner sitting on the road right after the last pipe */}
      <div
        className="thanks-wrapper"
        style={{
          transform: `translate3d(${scrollOffset * groundScrollSpeed}px, 0, 0)`,
          left: `${pipeWorldX + 150}px`,
          bottom: `${windowSize.height - groundLevel}px`,
          position: 'absolute',
          zIndex: 140,
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL || ''}/thanks.png`}
          alt="Thanks for playing"
          className="thanks"
        />
      </div>


      {/* UI Layer - Top Container for Score and Welcome */}
      <div className="ui-layer-top">
        {/* Score Display */}
        <div 
          className="score-display"
          aria-label={`Score: ${score}`}
        >
          <div className="score-text">SCORE: {score}</div>
        </div>

        {/* Welcome Text - always visible; moves left when a box is broken and info dialog appears */}
        <div 
          className={`welcome-text ${activeContent ? 'game-started' : ''}`}
        >
          <h1 className="mario-welcome">WELCOME TO UJJWAL'S DEN</h1>
          <p className="mario-subtitle">
            {activeContent ? (
              <>
                Jump into boxes
                <br />
                to break them!
              </>
            ) : (
              'Jump into boxes to break them!'
            )}
          </p>
        </div>
      </div>

      {/* Arrow key indicators on the road */}
      <div 
        className="arrow-indicators"
        style={{
          position: 'absolute',
          bottom: `${(windowSize.height - groundLevel) / 2}px`,
          left: '30px',
          right: '30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'auto',
          zIndex: 400,
        }}
        aria-hidden="true"
      >
        <div 
          className="arrow-key left-arrow mobile-jump-arrow"
          onTouchStart={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Unlock audio on button press
            if (!audioUnlocked && audioRef.current) {
              try {
                audioRef.current.play().catch(() => {});
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                setAudioUnlocked(true);
              } catch (error) {}
            }
            setTouchControls(prev => ({ ...prev, left: true }));
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setTouchControls(prev => ({ ...prev, left: false }));
          }}
          onTouchCancel={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setTouchControls(prev => ({ ...prev, left: false }));
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Unlock audio on button press
            if (!audioUnlocked && audioRef.current) {
              try {
                audioRef.current.play().catch(() => {});
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                setAudioUnlocked(true);
              } catch (error) {}
            }
            setTouchControls(prev => ({ ...prev, left: true }));
          }}
          onMouseUp={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setTouchControls(prev => ({ ...prev, left: false }));
          }}
          onMouseLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setTouchControls(prev => ({ ...prev, left: false }));
          }}
        >
          ←
        </div>
        <div 
          className="arrow-key up-arrow mobile-jump-arrow"
          onTouchStart={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            // Unlock audio on button press
            if (!audioUnlocked && audioRef.current) {
              try {
                await audioRef.current.play();
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                setAudioUnlocked(true);
              } catch (error) {}
            }
            triggerJump();
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onTouchCancel={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onMouseDown={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            // Unlock audio on button press
            if (!audioUnlocked && audioRef.current) {
              try {
                await audioRef.current.play();
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                setAudioUnlocked(true);
              } catch (error) {}
            }
            triggerJump();
          }}
          onMouseUp={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onMouseLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          ↑
        </div>
        <div 
          className="arrow-key right-arrow mobile-jump-arrow"
          onTouchStart={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Unlock audio on button press
            if (!audioUnlocked && audioRef.current) {
              try {
                audioRef.current.play().catch(() => {});
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                setAudioUnlocked(true);
              } catch (error) {}
            }
            setTouchControls(prev => ({ ...prev, right: true }));
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setTouchControls(prev => ({ ...prev, right: false }));
          }}
          onTouchCancel={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setTouchControls(prev => ({ ...prev, right: false }));
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Unlock audio on button press
            if (!audioUnlocked && audioRef.current) {
              try {
                audioRef.current.play().catch(() => {});
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                setAudioUnlocked(true);
              } catch (error) {}
            }
            setTouchControls(prev => ({ ...prev, right: true }));
          }}
          onMouseUp={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setTouchControls(prev => ({ ...prev, right: false }));
          }}
          onMouseLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setTouchControls(prev => ({ ...prev, right: false }));
          }}
        >
          →
        </div>
      </div>

      {/* Breakable Boxes - Perfect Square with Coin Image */}
      {boxes.map((box) => {
        const isBroken = brokenBoxes.has(box.id);
        return (
          <div
            key={box.id}
            className="mario-box-wrapper"
            style={{
              transform: `translate3d(${scrollOffset * boxScrollSpeed}px, 0, 0)`,
              left: `${box.left}px`,
              bottom: `${windowSize.height - box.top - box.height}px`,
              width: `${box.width}px`,
              height: `${box.height}px`,
              position: 'absolute',
            }}
          >
            <div
              className={`mario-box ${isBroken ? 'broken' : ''}`}
              style={{
                width: '100%',
                height: '100%',
                minWidth: `${box.width}px`,
                minHeight: `${box.height}px`,
                maxWidth: `${box.width}px`,
                maxHeight: `${box.height}px`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label={`${box.label} box`}
            >
              {!isBroken && (
                <>
                    <img
                      src={`${process.env.PUBLIC_URL || ''}/coin.png`}
                      alt=""
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        imageRendering: 'pixelated',
                      }}
                      aria-hidden="true"
                    />
                  <div className="box-label">{box.label}</div>
                </>
              )}
              {isBroken && <div className="box-particles" />}
            </div>
          </div>
        );
      })}

      {/* Mario character - Using sprite images with walking animation */}
      <div
        className={`mario ${facingRight ? 'facing-right' : 'facing-left'} ${isJumping ? 'jumping' : velocity.x !== 0 ? 'running' : 'idle'}`}
        style={{
          left: `${MARIO_SCREEN_X}px`,
          bottom: `${windowSize.height - marioY}px`, // Position bottom of Mario at marioY (top of road)
          width: `${MARIO_WIDTH}px`,
          height: `${MARIO_HEIGHT}px`,
        }}
        role="img"
        aria-label="Mario character"
      >
        <img 
          src={isJumping ? MARIO_SPRITES[0] : velocity.x !== 0 ? MARIO_SPRITES[marioSpriteFrame] : MARIO_SPRITES[0]}
          alt="Mario" 
          className="mario-sprite"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            imageRendering: 'pixelated',
          }}
        />
      </div>

      {/* Portfolio Content - appears when box is broken */}
      {activeContent && (
        <PortfolioSection 
          section={activeContent} 
          onClose={() => setActiveContent(null)}
        />
      )}

      {/* Controls Instructions - Show when no portfolio section is open and either no boxes broken or Mario is back at start */}
      {!activeContent && (() => {
        // Check if first box (about) has been broken
        const firstBoxBroken = brokenBoxes.has('about');
        // Check if Mario is at the starting position (within 200px of x=0 for easier trigger)
        const isAtStart = marioWorldX <= 200;
        // Show instructions if: no boxes broken yet, OR Mario is back at start
        const shouldShowInstructions = !firstBoxBroken || isAtStart;
        
        // Detect if mobile device
        const isMobile = windowSize.width <= 768;
        
        return shouldShowInstructions ? (
          <div className="instructions-overlay">
            <div className="instructions" role="note" aria-label="Game controls">
              <h3>🎮 Controls</h3>
              {isMobile ? (
                <>
                  <p>Touch right side of the screen to move forward</p>
                  <p>Touch left side of the screen to move backward</p>
                  <p>Swipe up anywhere on the screen to jump and break boxes</p>
                </>
              ) : (
                <>
                  <p>← → Arrow Keys or A/D to move</p>
                  <p>↑ Arrow Key or W/Space to jump</p>
                  <p>Jump into boxes from below to break them!</p>
                </>
              )}
            </div>
          </div>
        ) : null;
      })()}

      {/* Sound Toggle Button - Top Right */}
      <button
        className="sound-toggle"
        onClick={() => setSoundEnabled(!soundEnabled)}
        aria-label={soundEnabled ? 'Mute sound' : 'Unmute sound'}
        title={soundEnabled ? 'Mute sound' : 'Unmute sound'}
      >
        {soundEnabled ? '🔊' : '🔇'}
      </button>

      {/* Mobile Touch Controls - Bottom Right */}
      <div className="mobile-controls">
        <button
          className="mobile-button mobile-left"
          onTouchStart={(e) => {
            e.preventDefault(); // Prevent default touch behavior
            e.stopPropagation();
            // Unlock audio on button press
            if (!audioUnlocked && audioRef.current) {
              try {
                audioRef.current.play().catch(() => {});
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                setAudioUnlocked(true);
              } catch (error) {}
            }
            setTouchControls(prev => ({ ...prev, left: true }));
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setTouchControls(prev => ({ ...prev, left: false }));
          }}
          onMouseDown={(e) => {
            if (e.type === 'mousedown') { // Only handle if not triggered by touch
               setTouchControls(prev => ({ ...prev, left: true }));
            }
          }}
          onMouseUp={(e) => {
             setTouchControls(prev => ({ ...prev, left: false }));
          }}
          onMouseLeave={(e) => {
             setTouchControls(prev => ({ ...prev, left: false }));
          }}
          aria-label="Move left"
        >
          ←
        </button>
        <button
          className="mobile-button mobile-jump"
          onTouchStart={async (e) => {
            e.preventDefault();
            // Unlock audio on button press
            if (!audioUnlocked && audioRef.current) {
              try {
                await audioRef.current.play();
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                setAudioUnlocked(true);
              } catch (error) {}
            }
            triggerJump();
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            triggerJump();
          }}
          onMouseUp={() => {}}
          onMouseLeave={() => {}}
          aria-label="Jump"
        >
          ↑
        </button>
        <button
          className="mobile-button mobile-right"
          onTouchStart={(e) => {
            e.preventDefault(); // Prevent default touch behavior
            e.stopPropagation();
            // Unlock audio on button press
            if (!audioUnlocked && audioRef.current) {
              try {
                audioRef.current.play().catch(() => {});
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                setAudioUnlocked(true);
              } catch (error) {}
            }
            setTouchControls(prev => ({ ...prev, right: true }));
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setTouchControls(prev => ({ ...prev, right: false }));
          }}
          onMouseDown={(e) => {
            if (e.type === 'mousedown') { // Only handle if not triggered by touch
               setTouchControls(prev => ({ ...prev, right: true }));
            }
          }}
          onMouseUp={(e) => {
             setTouchControls(prev => ({ ...prev, right: false }));
          }}
          onMouseLeave={(e) => {
             setTouchControls(prev => ({ ...prev, right: false }));
          }}
          aria-label="Move right"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default MarioGame;
