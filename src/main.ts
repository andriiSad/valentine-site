/**
 * Be My Valentine - Main Application
 * A romantic single-page Valentine's Day website with bunnies! 🐰💕
 */

import './style.css';
import { soundManager } from './sound';
import { confettiManager } from './confetti';
import { heartsManager } from './hearts';
import { createGallery, type Gallery } from './gallery';

// ============================================
// EXCUSES - The No button can NEVER be clicked!
// ============================================
const excuses = [
  // Winnie jokes
  "Oops! Winnie made the button run away! 🐰💨",
  "Winnie sat on the No button! It's broken now! 🐰",
  "Winnie says: 'No is not in my vocabulary!' 🐰✨",
  "Winnie just ate the No button... oops! 🐰🥕",
  "Winnie is giving you the disapproving bunny stare 👀🐰",
  "Winnie threatens to thump if you click No! 🐰💢",
  "Winnie deployed tactical cuteness! It's super effective! 🐰💕",
  "Winnie: 'I didn't hop all this way for a No!' 🐰",
  "Winnie is judging you silently... 🐰😤",
  "Winnie hid the No button under the couch! 🐰🛋️",
  
  // Winferd jokes
  "Winferd officially banned the No button! 🐇📜",
  "Winferd says this button is out of order! 🐇🔧",
  "Winferd is too distinguished for No buttons! 🐇🎩",
  "Winferd MD prescribes: Click Yes immediately! 🐇💊",
  "Winferd did the math. No doesn't add up! 🐇📊",
  "Winferd's legal team advises against clicking No! 🐇⚖️",
  
  // Miss Ma'am jokes
  "Miss Ma'am says NO to No! 🐰👑",
  "Miss Ma'am didn't approve this button! 🐰📋",
  "Miss Ma'am is not amused by your No attempts! 🐰😤",
  "Miss Ma'am demands pets, not No clicks! 🐰✨",
  "Miss Ma'am: 'Excuse me?! Try again.' 🐰💅",
  "Miss Ma'am has spoken. Yes is the only answer! 🐰👑",
  
  // General bunny jokes
  "The bunnies called a meeting. No was voted out! 🐰🐇",
  "Error 404: 'No' not found in bunny database! 💖",
  "The bunny council has rejected your No! 🐰🐰🐰",
  "Breaking news: No button officially cancelled by bunnies! 📰🐰",
  "The bunnies are watching... choose wisely! 👀🐰",
  "All three bunnies agree: Yes is better! 🐰🐇🐰",
  
  // Martha-specific (fewer)
  "Martha, the bunnies need you to say Yes! 🐰💕",
  "Think about it, Martha... 🤔💕",
  "Martha, Winnie will be sad! 🐰😢",
  "Come on Martha, you know you want to! 💖",
  
  // Andrii-specific
  "Andrii's love force field blocked this button! ✨",
  "Andrii already planned everything! Just say Yes! 🎉",
  "The power of Andrii's love compels you! ✨💕",
  
  // General fun
  "That button is shy! Try the other one! 😊",
  "This button is broken, try Yes instead! 🔧",
  "Nice try, but love always wins! 💖",
  "Plot twist: Only Yes works! 😂",
  "That button is on vacation! 🏖️",
  "Loading... just kidding, click Yes! 😄",
  "Cupid disabled this button! 💘",
  "This is a Yes-only zone! 💕",
  "Resistance is futile! 💖",
  "Fun fact: Saying Yes = 1000% more happiness! 📊",
  "I promise it'll be worth it! 🌹",
  "Think of all the chocolate we'll share! 🍫",
  "The flowers are already ordered! 💐",
  
  // Nurse-themed
  "Nurse's orders: Click Yes! 🩺💕",
  "Code Pink: Say Yes immediately! 🩷",
  "Warning: No button causes heart complications! ❤️‍🩹",
  "The stethoscope detects a Yes in your heart! 🩺💖",
  "Stat! Patient needs a Yes! 🏥",
  "Winnie RN says this button needs a prescription! 💊",
  "Miss Ma'am MD declares: No is not healthy! 🐰🩺",
];

const noButtonTexts = [
  "No 😅",
  "Still no, Martha? 🥺",
  "Really, Martha? 😢",
  "Pretty please? 🙏",
  "For Andrii? 💔",
  "Winnie is sad! 😭",
  "But... Miss Ma'am! 🐰",
  "Think again! 💕",
  "Reconsider? 🌹",
  "Winnie just did a sad binky! 🐰😿",
];

const loveMeterTexts = [
  { threshold: 0, text: "Hmm... Winnie needs more love! 🐰" },
  { threshold: 20, text: "Martha's getting warmer... 💕" },
  { threshold: 40, text: "Miss Ma'am is excited! 🐰🩺" },
  { threshold: 60, text: "Andrii's heart rate increasing! 💖💓" },
  { threshold: 80, text: "Vital signs: Winferd approves! 🩺🥰" },
  { threshold: 100, text: "MARTHA + ANDRII = MAXIMUM LOVE! 💕🩺💕" },
];

// ============================================
// DOM Elements
// ============================================
const heroSection = document.getElementById('hero-section')!;
const successSection = document.getElementById('success-section')!;

const yesBtn = document.getElementById('yes-btn')!;
const noBtn = document.getElementById('no-btn')! as HTMLButtonElement;
const noBtnText = document.getElementById('no-btn-text')!;
const soundToggle = document.getElementById('sound-toggle')!;
const soundIcon = document.getElementById('sound-icon')!;
const musicToggle = document.getElementById('music-toggle');
const musicIcon = document.getElementById('music-icon');

const excuseContainer = document.getElementById('excuse-container')!;
const excuseText = document.getElementById('excuse-text')!;

const loveMeter = document.getElementById('love-meter-fill')!;
const loveMeterText = document.getElementById('love-meter-text')!;

const heartsContainer = document.getElementById('hearts-container')!;
const bunniesContainer = document.getElementById('bunnies-container');
const sparkleContainer = document.getElementById('sparkle-container');
const confettiCanvas = document.getElementById('confetti-canvas')! as HTMLCanvasElement;

// Gallery elements
const galleryContainer = document.getElementById('gallery-container')!;
const gallerySlidesContainer = document.getElementById('gallery-slides')!;
const galleryDotsContainer = document.getElementById('gallery-dots')!;
const galleryPrevBtn = document.getElementById('gallery-prev')!;
const galleryNextBtn = document.getElementById('gallery-next')!;
const galleryPlaceholder = document.getElementById('gallery-placeholder')!;

// Interactive elements
const clickHeartsArea = document.getElementById('click-hearts');
const heartCounter = document.getElementById('heart-counter');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const surpriseContainer = document.getElementById('surprise-container');
const surpriseHint = document.getElementById('surprise-hint');

// New interactive elements
const petBunny = document.getElementById('pet-bunny');
const bunnyEmoji = document.getElementById('bunny-emoji');
const petMessage = document.getElementById('pet-message');
const petCounterEl = document.getElementById('pet-counter');
const sendHugBtn = document.getElementById('send-hug-btn');
const hugText = document.getElementById('hug-text');
const hugCounterEl = document.getElementById('hug-counter');

// ============================================
// State
// ============================================
let noAttempts = 0;
let excuseIndex = 0;
let gallery: Gallery | null = null;
let userInteracted = false;
let loveMeterValue = 50;
let heartsSent = 0;
let backgroundMusic: HTMLAudioElement | null = null;
let musicPlaying = false;
let surpriseRevealed = false;
let petCount = 0;
let hugCount = 0;

// ============================================
// Loading Screen Handler
// ============================================
function updateLoadingProgress(percent: number, status: string): void {
  const bar = document.getElementById('loading-bar');
  const statusEl = document.getElementById('loading-status');
  if (bar) bar.style.width = `${percent}%`;
  if (statusEl) statusEl.textContent = status;
}

function hideLoadingScreen(): void {
  // Show the HTML
  document.documentElement.classList.add('loaded');
  
  // Fade out loading screen
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.classList.add('fade-out');
    setTimeout(() => loadingScreen.remove(), 500);
  }
}

// Preload a single audio file
function preloadAudio(src: string): Promise<HTMLAudioElement> {
  return new Promise((resolve) => {
    const audio = new Audio();
    audio.preload = 'auto';
    
    const onReady = () => {
      console.log('✅ Audio loaded:', src);
      resolve(audio);
    };
    
    audio.addEventListener('canplaythrough', onReady, { once: true });
    audio.addEventListener('error', () => {
      console.warn('⚠️ Could not load audio:', src);
      resolve(audio); // Resolve anyway to not block loading
    }, { once: true });
    
    audio.src = src;
    audio.load();
    
    // Timeout fallback
    setTimeout(onReady, 3000);
  });
}

// Preload a single image
function preloadImage(src: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      console.log('✅ Image loaded:', src);
      resolve(src);
    };
    img.onerror = () => {
      console.warn('⚠️ Could not load image:', src);
      resolve(''); // Resolve empty to not block
    };
    img.src = src;
    
    // Timeout fallback
    setTimeout(() => resolve(src), 5000);
  });
}

// Discover and preload all gallery images - optimized for speed
async function discoverGalleryImages(): Promise<string[]> {
  const basePath = './photos';
  // Most common patterns only - numbered jpgs first (fastest)
  const patterns = [
    // Numbered (1.jpg, 2.jpg, etc.) - most common
    ...Array.from({ length: 12 }, (_, i) => `${basePath}/${i + 1}.jpg`),
    ...Array.from({ length: 12 }, (_, i) => `${basePath}/${i + 1}.png`),
    // Common names
    `${basePath}/image.jpg`, `${basePath}/image.png`,
    `${basePath}/photo.jpg`, `${basePath}/photo.png`,
  ];

  const found: string[] = [];
  
  // Check images with timeout for speed
  const checkImage = (src: string): Promise<string | null> => {
    return new Promise((resolve) => {
      const img = new Image();
      const timeout = setTimeout(() => resolve(null), 2000); // 2s timeout
      img.onload = () => { clearTimeout(timeout); resolve(src); };
      img.onerror = () => { clearTimeout(timeout); resolve(null); };
      img.src = src;
    });
  };
  
  const checks = await Promise.all(patterns.map(checkImage));
  
  checks.forEach(src => {
    if (src && !found.includes(src)) {
      found.push(src);
    }
  });
  
  return found.sort();
}

// Store preloaded images for gallery
let preloadedGalleryImages: string[] = [];

// Main preload function
async function preloadAllAssets(): Promise<void> {
  console.log('🚀 Starting asset preload...');
  
  // Step 1: Preload audio (30%)
  updateLoadingProgress(10, '🎵 Loading music...');
  await preloadAudio('./sfx/background.mp3');
  
  updateLoadingProgress(20, '🔊 Loading sounds...');
  await Promise.all([
    preloadAudio('./sfx/click.mp3'),
    preloadAudio('./sfx/success.mp3'),
  ]);
  
  // Step 2: Discover gallery images (50%)
  updateLoadingProgress(40, '🖼️ Finding photos...');
  preloadedGalleryImages = await discoverGalleryImages();
  console.log('📸 Found gallery images:', preloadedGalleryImages);
  
  // Step 3: Preload gallery images (80%)
  if (preloadedGalleryImages.length > 0) {
    updateLoadingProgress(50, `📷 Loading ${preloadedGalleryImages.length} photo(s)...`);
    await Promise.all(preloadedGalleryImages.map(preloadImage));
  } else {
    updateLoadingProgress(50, '📷 No photos found, using defaults...');
  }
  
  // Step 4: Final setup (100%)
  updateLoadingProgress(90, '✨ Almost ready...');
  await new Promise(resolve => setTimeout(resolve, 300));
  
  updateLoadingProgress(100, '💕 Ready!');
  console.log('✅ All assets preloaded!');
}

// ============================================
// Initialize Application
// ============================================
async function init(): Promise<void> {
  try {
    console.log('🚀 Starting initialization...');
    
    // First, preload all assets
    await preloadAllAssets();
    
    heartsManager.init(heartsContainer);
    confettiManager.init(confettiCanvas);
    heartsManager.start();
    
    if (bunniesContainer) startFloatingBunnies();
    if (sparkleContainer) startSparkles();
    
    // Create gallery with preloaded images
    gallery = createGallery({
      container: galleryContainer,
      slidesContainer: gallerySlidesContainer,
      dotsContainer: galleryDotsContainer,
      prevButton: galleryPrevBtn,
      nextButton: galleryNextBtn,
      placeholder: galleryPlaceholder,
      autoPlay: true,
      interval: 4000,
      preloadedImages: preloadedGalleryImages, // Pass preloaded images
    });
    
    setupEventListeners();
    updateSoundIcon();
    initBackgroundMusic();
    
    // Start music immediately
    startBackgroundMusic();
    
    // Hide loading screen now that everything is ready
    hideLoadingScreen();
    
    console.log('🐰💕 Be My Valentine app initialized! 💕🐰');
  } catch (error) {
    console.error('❌ Error during initialization:', error);
    // Still hide loading screen even if there's an error
    hideLoadingScreen();
  }
}

// ============================================
// Background Music - Auto-plays on first interaction
// ============================================
function initBackgroundMusic(): void {
  backgroundMusic = new Audio('./sfx/background.mp3');
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.3;
}

function startBackgroundMusic(): void {
  if (!backgroundMusic || musicPlaying) return;
  backgroundMusic.play().then(() => {
    musicPlaying = true;
    if (musicIcon) musicIcon.textContent = '🎶';
  }).catch(() => {
    // Autoplay blocked, will start on next interaction
  });
}

function toggleBackgroundMusic(): void {
  if (!backgroundMusic) return;
  
  if (musicPlaying) {
    backgroundMusic.pause();
    musicPlaying = false;
    if (musicIcon) musicIcon.textContent = '🎵';
  } else {
    backgroundMusic.play().catch(() => {});
    musicPlaying = true;
    if (musicIcon) musicIcon.textContent = '🎶';
  }
}

// ============================================
// Floating Bunnies & Nursing Emojis
// ============================================
function startFloatingBunnies(): void {
  if (!bunniesContainer) return;
  
  const floatingEmojis = ['🐰', '�'];
  let bunnyCount = 0;
  const maxBunnies = 2; // Very few bunnies
  
  function createBunny(): void {
    if (!bunniesContainer) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (bunnyCount >= maxBunnies) return;
    
    bunnyCount++;
    const bunny = document.createElement('div');
    bunny.className = 'floating-bunny';
    bunny.textContent = floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)];
    
    bunny.style.setProperty('--left', `${Math.random() * 100}%`);
    bunny.style.setProperty('--duration', `${15 + Math.random() * 10}s`);
    bunny.style.setProperty('--delay', '0s');
    
    bunny.addEventListener('animationend', () => { bunny.remove(); bunnyCount--; });
    bunniesContainer.appendChild(bunny);
  }
  
  // Start with just 1 bunny
  createBunny();
  setInterval(createBunny, 15000); // Very slow
}

// ============================================
// Sparkles
// ============================================
function startSparkles(): void {
  // Disabled for performance - sparkles cause lag
  return;
}

// ============================================
// Event Listeners
// ============================================
function setupEventListeners(): void {
  document.addEventListener('click', handleFirstInteraction, { once: true });
  document.addEventListener('keydown', handleFirstInteraction, { once: true });
  
  yesBtn.addEventListener('click', handleYesClick);
  yesBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleYesClick(); }
  });
  
  // No button - only reacts on click (moves, shrinks, fades)
  // Use a flag to prevent double-firing on touch devices
  let touchHandled = false;
  noBtn.addEventListener('touchstart', (e) => { 
    e.preventDefault(); 
    touchHandled = true;
    handleNoClick(); 
  }, { passive: false });
  noBtn.addEventListener('click', (e) => { 
    e.preventDefault(); 
    if (touchHandled) { touchHandled = false; return; } // Skip if already handled by touch
    handleNoClick(); 
  });
  noBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleNoClick(); }
  });
  
  soundToggle.addEventListener('click', handleSoundToggle);
  if (musicToggle) musicToggle.addEventListener('click', () => { soundManager.init(); toggleBackgroundMusic(); });
  if (clickHeartsArea) clickHeartsArea.addEventListener('click', (e) => handleHeartClick(e as MouseEvent));
  
  // Pet the bunny interaction
  if (petBunny) petBunny.addEventListener('click', handlePetBunny);
  
  // Send hug interaction
  if (sendHugBtn) sendHugBtn.addEventListener('click', handleSendHug);
  
  yesBtn.addEventListener('mouseenter', () => increaseLoveMeter(10));
}

function handleFirstInteraction(): void {
  if (userInteracted) return;
  userInteracted = true;
  soundManager.init();
  // Start music on first interaction (any click or keypress)
  startBackgroundMusic();
}

// ============================================
// Yes Button Handler
// ============================================
function handleYesClick(): void {
  soundManager.playClick();
  updateLoveMeter(100);
  hideSection(heroSection);
  
  setTimeout(() => {
    // Gallery is now only shown after 50 pets!
    showSection(successSection);
    soundManager.playSuccess();
    confettiManager.celebrate();
    heartsManager.burst(20);
    setTimeout(() => confettiManager.burst(), 500);
    setTimeout(() => confettiManager.burst(), 1000);
  }, 500);
}

// ============================================
// No Button Handler - Moves on click!
// ============================================
let noButtonVisible = true;

// Handle click - move the button on each click!
function handleNoClick(): void {
  if (!noButtonVisible) return;
  
  soundManager.playClick();
  showExcuse();
  noAttempts++;
  
  console.log('No button clicked! Attempt:', noAttempts);
  
  // Update text and grow Yes button
  updateNoButtonText();
  growYesButton();
  createSadBunny();
  
  // MOVE THE BUTTON - simple approach using transform
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  // Calculate random offset from original position
  const offsetX = (Math.random() - 0.5) * (viewportWidth * 0.6);
  const offsetY = (Math.random() - 0.5) * (viewportHeight * 0.4);
  
  // Calculate shrink and fade (faster - takes 10 clicks)
  const shrink = Math.max(0.3, 1 - (noAttempts * 0.07));
  const fade = Math.max(0.2, 1 - (noAttempts * 0.08));
  const rotation = (Math.random() - 0.5) * 20;
  
  // Apply transform to move the button
  noBtn.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${shrink}) rotate(${rotation}deg)`;
  noBtn.style.opacity = String(fade);
  
  // Only disappear after 10 real clicks
  if (noAttempts >= 10) {
    disappearNoButton();
  }
}

// Make the No button disappear with a fun animation!
function disappearNoButton(): void {
  noButtonVisible = false;
  soundManager.playClick();
  
  // Fun disappearing animation
  noBtn.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
  noBtn.style.transform = 'scale(0) rotate(720deg)';
  noBtn.style.opacity = '0';
  
  // Show final message
  excuseContainer.style.opacity = '1';
  excuseContainer.style.transform = 'translateY(0)';
  excuseText.textContent = "🎉 Winnie won! Martha HAS to say Yes to Andrii now! 💕🐰";
  
  // Create celebration
  confettiManager.burst();
  heartsManager.burst(10);
  
  // Remove button after animation
  setTimeout(() => {
    noBtn.style.display = 'none';
  }, 500);
}

function showExcuse(): void {
  excuseContainer.style.opacity = '1';
  excuseContainer.style.transform = 'translateY(0)';
  excuseText.textContent = excuses[excuseIndex % excuses.length];
  excuseIndex++;
  setTimeout(() => {
    excuseContainer.style.opacity = '0';
    excuseContainer.style.transform = 'translateY(4px)';
  }, 6000);
}

function updateNoButtonText(): void {
  noBtnText.textContent = noButtonTexts[Math.min(noAttempts, noButtonTexts.length - 1)];
}

function growYesButton(): void {
  // No scaling - only use glow and pulse effects to keep Yes and heart in same row
  const glowIntensity = Math.min(noAttempts * 3, 30);
  const pulseSpeed = Math.max(1.5 - (noAttempts * 0.08), 0.6);
  
  yesBtn.style.zIndex = '20';
  yesBtn.style.boxShadow = `0 0 ${glowIntensity}px ${glowIntensity / 2}px rgba(244, 63, 94, 0.6), 0 0 ${glowIntensity * 2}px ${glowIntensity}px rgba(251, 113, 133, 0.3)`;
  yesBtn.style.animation = `pulse ${pulseSpeed}s ease-in-out infinite`;
  
  // Don't scale the love meter either - keep layout stable
  const loveMeterContainer = document.getElementById('love-meter');
  if (loveMeterContainer) {
    loveMeterContainer.style.transition = 'transform 0.3s ease-out';
  }
  
  // Increase love meter with each No attempt
  increaseLoveMeter(3);
}

function createSadBunny(): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  
  const bunny = document.createElement('div');
  bunny.textContent = '🐰💔';
  bunny.style.cssText = `
    position: fixed; font-size: 2rem; pointer-events: none; z-index: 100;
    left: ${Math.random() * 80 + 10}%; top: ${Math.random() * 80 + 10}%;
    animation: heartBurst 1.5s ease-out forwards;
  `;
  document.body.appendChild(bunny);
  setTimeout(() => bunny.remove(), 1500);
}

// ============================================
// Love Meter
// ============================================
function updateLoveMeter(value: number): void {
  loveMeterValue = Math.max(0, Math.min(100, value));
  loveMeter.style.width = `${loveMeterValue}%`;
  
  for (let i = loveMeterTexts.length - 1; i >= 0; i--) {
    if (loveMeterValue >= loveMeterTexts[i].threshold) {
      loveMeterText.textContent = loveMeterTexts[i].text;
      break;
    }
  }
}

function increaseLoveMeter(amount: number): void {
  updateLoveMeter(loveMeterValue + amount);
}

// ============================================
// Heart Click Handler with Surprise Feature
// ============================================
function handleHeartClick(e: MouseEvent): void {
  heartsSent++;
  soundManager.playClick();
  
  // Update counter
  if (heartCounter) heartCounter.textContent = `Hearts sent: ${heartsSent} 💕`;
  
  // Update progress bar
  const progress = Math.min(heartsSent, 100);
  if (progressFill) progressFill.style.width = `${progress}%`;
  if (progressText) {
    if (heartsSent < 100) {
      progressText.textContent = `${heartsSent}/100 to surprise 🎁`;
    } else {
      progressText.textContent = `🎉 Surprise unlocked! 🎉`;
    }
  }
  
  // Update hint as they get closer
  if (surpriseHint && !surpriseRevealed) {
    if (heartsSent >= 75) {
      surpriseHint.textContent = "🔥 Almost there! Just a few more! 🐰💕";
    } else if (heartsSent >= 50) {
      surpriseHint.textContent = "✨ Halfway there! Keep going! 🩺💖";
    } else if (heartsSent >= 25) {
      surpriseHint.textContent = "💕 You're doing great! More love! 🐰";
    }
  }
  
  // Create visual heart
  createClickHeart(e.clientX, e.clientY);
  
  // Confetti every 10 clicks
  if (heartsSent % 10 === 0) {
    confettiManager.burst(e.clientX, e.clientY, 30);
    heartsManager.burst(5);
  }
  
  // SURPRISE at 100 clicks!
  if (heartsSent === 100 && !surpriseRevealed) {
    revealSurprise();
  }
}

function revealSurprise(): void {
  surpriseRevealed = true;
  soundManager.playSuccess();
  
  // Big celebration!
  confettiManager.celebrate();
  heartsManager.burst(20);
  
  // Show surprise container
  if (surpriseContainer) {
    surpriseContainer.classList.remove('hidden');
    surpriseContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  
  // Update hint
  if (surpriseHint) {
    surpriseHint.textContent = "🎉 You did it! Scroll down for your surprise! 🐰💕🩺";
    surpriseHint.classList.add('text-rose-600', 'font-bold');
  }
  
  // More confetti bursts
  setTimeout(() => confettiManager.burst(), 1000);
  setTimeout(() => confettiManager.burst(), 2000);
}

function createClickHeart(x: number, y: number): void {
  const hearts = ['💖', '💕', '💗', '💓', '🐰💕'];
  const heart = document.createElement('div');
  heart.className = 'heart-burst';
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1000);
}

// ============================================
// Sound Toggle
// ============================================
function handleSoundToggle(): void {
  soundManager.toggle();
  updateSoundIcon();
  if (soundManager.isEnabled()) { soundManager.init(); soundManager.playClick(); }
}

function updateSoundIcon(): void {
  soundIcon.textContent = soundManager.isEnabled() ? '🔊' : '🔇';
  soundToggle.setAttribute('aria-label', soundManager.isEnabled() ? 'Sound on - click to mute' : 'Sound off - click to unmute');
}

// ============================================
// Pet the Bunny Handler
// ============================================
const petMessages = [
  "*Winnie makes happy noises* 🐰💕",
  "Winferd loves Martha! 🥰",
  "*Miss Ma'am wiggles nose* ✨",
  "Winnie is so soft and fluffy! 🐇",
  "*Winferd hops happily* 💖",
  "Best pets ever, Martha! 🌟",
  "*Miss Ma'am purrs* 😊",
  "Winnie wants more pets! 🐰",
  "*Winferd's ears go up* 💕",
  "Nurse Martha approved! 🩺",
  "*Miss Ma'am does a binky* 🎉",
  "Martha, you're the best! 💗",
  "Winnie loves Andrii too! 🐰💕",
  "*Winferd is grateful* ✨",
];

// Infinite love messages after all surprises unlocked
const infiniteLoveMessages = [
  "No amount of clicks can express how much Andrii loves you 💕",
  "But he'll always love you more... 💖",
  "Every click = another 'I love you' from Andrii 🐰",
  "Martha, you're Andrii's whole world 🌍💕",
  "Infinity wouldn't be enough pets! ♾️🐰",
  "Andrii's love for Martha: ∞ + 1 💗",
  "Keep clicking, Andrii's love keeps growing! 📈💕",
  "You could pet Winnie forever and still... 🐰💖",
  "Andrii loves Martha more than all the bunnies! 🐰🐇🐰",
  "This is the infinite love zone! ♾️💕",
  "Martha + Andrii = Forever 💍💕",
  "No clicks will ever be enough... but keep trying! 🐰",
  "Andrii: Still loving Martha more! 💖",
  "The love counter broke... too much love! 💕🔥",
  "Error 404: Limit of love not found ♾️",
];

function handlePetBunny(): void {
  petCount++;
  soundManager.playClick();
  increaseLoveMeter(2);
  
  // Animate bunny
  if (bunnyEmoji) {
    bunnyEmoji.style.transform = 'scale(1.3) rotate(10deg)';
    setTimeout(() => {
      bunnyEmoji.style.transform = 'scale(1.1) rotate(-5deg)';
      setTimeout(() => {
        bunnyEmoji.style.transform = 'scale(1)';
      }, 150);
    }, 150);
  }
  
  // Show random message - use infinite love messages after 100 pets
  if (petMessage) {
    if (petCount > 100) {
      // Infinite love mode!
      petMessage.textContent = infiniteLoveMessages[Math.floor(Math.random() * infiniteLoveMessages.length)];
    } else {
      petMessage.textContent = petMessages[Math.floor(Math.random() * petMessages.length)];
    }
    petMessage.style.opacity = '1';
    setTimeout(() => { petMessage.style.opacity = '0.7'; }, 1500);
  }
  
  // Update counter - special display after 100
  if (petCounterEl) {
    if (petCount > 100) {
      petCounterEl.textContent = `Infinite Love Mode: ${petCount} 🐾💕`;
    } else {
      petCounterEl.textContent = `Pets: ${petCount} 🐾`;
    }
  }
  
  // Update progress bar (no spoilers!)
  const petProgressFill = document.getElementById('pet-progress-fill');
  const petProgressText = document.getElementById('pet-progress-text');
  if (petProgressFill) {
    const progress = Math.min((petCount / 100) * 100, 100);
    petProgressFill.style.width = `${progress}%`;
    // Make progress bar rainbow in infinite mode
    if (petCount > 100) {
      petProgressFill.style.background = `linear-gradient(90deg, 
        #f43f5e, #ec4899, #8b5cf6, #3b82f6, #10b981, #f59e0b, #f43f5e)`;
      petProgressFill.style.backgroundSize = '200% 100%';
      petProgressFill.style.animation = 'rainbow 2s linear infinite';
    }
  }
  if (petProgressText) {
    if (petCount < 20) {
      petProgressText.textContent = `🎁 Something special at ${20 - petCount} more pets...`;
    } else if (petCount < 50) {
      petProgressText.textContent = `✨ Another surprise at ${50 - petCount} more pets...`;
    } else if (petCount < 100) {
      petProgressText.textContent = `🎉 Big surprise at ${100 - petCount} more pets...`;
    } else {
      // Infinite love mode text
      const extraLove = petCount - 100;
      petProgressText.textContent = `♾️ Infinite Love Mode! +${extraLove} extra love 💕`;
    }
  }
  
  // Special effects at milestones
  if (petCount % 10 === 0) {
    confettiManager.burst();
    heartsManager.burst(5);
  }
  
  // Extra effects in infinite mode every 25 pets
  if (petCount > 100 && petCount % 25 === 0) {
    confettiManager.burst();
    confettiManager.burst();
    heartsManager.burst(10);
  }
  
  // Reveal the prescription at 20 pets!
  if (petCount === 20) {
    const prescriptionContainer = document.getElementById('prescription-container');
    if (prescriptionContainer) {
      prescriptionContainer.classList.remove('hidden');
      prescriptionContainer.style.animation = 'bounceIn 0.6s ease-out';
      confettiManager.burst();
      if (petMessage) {
        petMessage.textContent = "✨ You unlocked a special prescription! 🩺💕";
        petMessage.style.opacity = '1';
      }
      // Scroll to prescription
      setTimeout(() => {
        prescriptionContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }
  
  // Reveal the photo gallery at 50 pets!
  if (petCount === 50) {
    const gallerySection = document.getElementById('gallery-section');
    if (gallerySection) {
      gallerySection.classList.remove('hidden');
      gallerySection.style.animation = 'bounceIn 0.6s ease-out';
      gallery?.init(); // Initialize the gallery slideshow
      confettiManager.burst();
      confettiManager.burst(); // Extra confetti!
      heartsManager.burst(10);
      if (petMessage) {
        petMessage.textContent = "🎉 WOW! You unlocked the photo gallery! 📸💕";
        petMessage.style.opacity = '1';
      }
      // Scroll to gallery
      setTimeout(() => {
        gallerySection.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }
  
  // Reveal the Venmo surprise at 100 pets!
  if (petCount === 100) {
    const surpriseContainer = document.getElementById('surprise-container');
    if (surpriseContainer) {
      surpriseContainer.classList.remove('hidden');
      surpriseContainer.style.animation = 'bounceIn 0.6s ease-out';
      confettiManager.burst();
      confettiManager.burst();
      confettiManager.burst(); // Triple confetti!
      heartsManager.burst(15);
      if (petMessage) {
        petMessage.textContent = "💸 Cha-ching! Check your Venmo! 💕";
        petMessage.style.opacity = '1';
      }
      // Scroll to Venmo surprise
      setTimeout(() => {
        surpriseContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }
}

// ============================================
// Send Hug Handler
// ============================================
const hugMessages = [
  "Sending warm hugs across the miles! 🤗",
  "Virtual squeeze incoming! 💕",
  "Hug delivered with love! 🐰",
  "Feel the warmth? That's my hug! ✨",
  "Distance can't stop these hugs! 🤗💖",
  "Nurse-grade therapeutic hug sent! 🩺💕",
  "Wrapping you in virtual arms! 🫂",
  "This hug has healing powers! 💗",
];

function handleSendHug(): void {
  hugCount++;
  soundManager.playClick();
  increaseLoveMeter(5);
  
  // Animate button
  if (sendHugBtn) {
    sendHugBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      sendHugBtn.style.transform = 'scale(1.05)';
      setTimeout(() => {
        sendHugBtn.style.transform = 'scale(1)';
      }, 150);
    }, 100);
  }
  
  // Show random hug message (stays for 5 seconds so it can be read)
  if (hugText) {
    const originalText = 'Send Virtual Hug 🤗💕';
    hugText.textContent = hugMessages[Math.floor(Math.random() * hugMessages.length)];
    setTimeout(() => { hugText.textContent = originalText; }, 5000);
  }
  
  // Update counter
  if (hugCounterEl) hugCounterEl.textContent = `Hugs sent: ${hugCount} 🤗`;
  
  // Create floating hug emoji
  createFloatingEmoji('🤗', sendHugBtn);
  
  // Special effects
  if (hugCount % 5 === 0) {
    confettiManager.burst();
    heartsManager.burst(3);
  }
}

function createFloatingEmoji(emoji: string, sourceEl: HTMLElement | null): void {
  if (!sourceEl) return;
  
  const rect = sourceEl.getBoundingClientRect();
  const floater = document.createElement('div');
  floater.textContent = emoji;
  floater.style.cssText = `
    position: fixed;
    left: ${rect.left + rect.width / 2}px;
    top: ${rect.top}px;
    font-size: 2rem;
    pointer-events: none;
    z-index: 100;
    animation: floatUpFade 1.5s ease-out forwards;
  `;
  document.body.appendChild(floater);
  setTimeout(() => floater.remove(), 1500);
}

// ============================================
// Section Transitions
// ============================================
function hideSection(section: HTMLElement): void {
  section.classList.add('fade-out');
  setTimeout(() => { section.classList.add('hidden'); section.classList.remove('fade-out'); }, 600);
}

function showSection(section: HTMLElement): void {
  section.classList.remove('hidden');
  section.classList.add('fade-in');
  // Scroll to the very top of the page to show "Yay Martha" section
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(() => section.classList.remove('fade-in'), 600);
}

// ============================================
// Initialize
// ============================================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
