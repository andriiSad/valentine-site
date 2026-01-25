/**
 * Sound Manager Module
 * Handles sound effects with localStorage persistence for mute state
 */

const SOUND_ENABLED_KEY = 'valentine-sound-enabled';

class SoundManager {
  private boopSound: HTMLAudioElement | null = null;
  private noSound: HTMLAudioElement | null = null;
  private yeeySound: HTMLAudioElement | null = null;
  private clickSound: HTMLAudioElement | null = null;
  private clapSound: HTMLAudioElement | null = null;
  private enabled: boolean = true;
  private initialized: boolean = false;

  constructor() {
    // Load saved preference
    const saved = localStorage.getItem(SOUND_ENABLED_KEY);
    this.enabled = saved === null ? true : saved === 'true';
  }

  /**
   * Initialize audio elements (call after user interaction)
   */
  init(): void {
    if (this.initialized) return;
    
    try {
      this.boopSound = new Audio('./sfx/boop.ogg');
      this.boopSound.preload = 'auto';
      this.boopSound.volume = 0.6;
      
      this.noSound = new Audio('./sfx/no.ogg');
      this.noSound.preload = 'auto';
      this.noSound.volume = 0.5;
      
      this.yeeySound = new Audio('./sfx/yeey.ogg');
      this.yeeySound.preload = 'auto';
      this.yeeySound.volume = 0.7;
      
      this.clickSound = new Audio('./sfx/click.ogg');
      this.clickSound.preload = 'auto';
      this.clickSound.volume = 0.5;
      
      this.clapSound = new Audio('./sfx/clap.mp3');
      this.clapSound.preload = 'auto';
      this.clapSound.volume = 0.6;
      
      this.initialized = true;
    } catch (e) {
      console.warn('Could not initialize audio:', e);
    }
  }

  /**
   * Play the boop sound effect
   */
  playBoop(): void {
    if (!this.enabled || !this.boopSound) return;
    
    try {
      this.boopSound.currentTime = 0;
      this.boopSound.play().catch(() => {});
    } catch (e) {
      // Silently fail
    }
  }

  /**
   * Play the crying/no sound for No button
   */
  playError(): void {
    if (!this.enabled || !this.noSound) return;
    
    try {
      this.noSound.currentTime = 0;
      this.noSound.play().catch(() => {});
    } catch (e) {
      // Silently fail
    }
  }

  /**
   * Play the yeey/celebration sound
   */
  playYeey(): void {
    if (!this.enabled || !this.yeeySound) return;
    
    try {
      this.yeeySound.currentTime = 0;
      this.yeeySound.play().catch(() => {});
    } catch (e) {
      // Silently fail
    }
  }

  /**
   * Play the click sound effect for pets
   */
  playClick(): void {
    if (!this.enabled || !this.clickSound) return;
    
    try {
      this.clickSound.currentTime = 0;
      this.clickSound.play().catch(() => {});
    } catch (e) {
      // Silently fail
    }
  }

  /**
   * Play the applause/clapping sound for rewards
   */
  playClap(): void {
    if (!this.enabled || !this.clapSound) return;
    
    try {
      this.clapSound.currentTime = 0;
      this.clapSound.play().catch(() => {});
    } catch (e) {
      // Silently fail
    }
  }

  /**
   * Toggle sound on/off
   */
  toggle(): boolean {
    this.enabled = !this.enabled;
    localStorage.setItem(SOUND_ENABLED_KEY, String(this.enabled));
    return this.enabled;
  }

  /**
   * Check if sound is enabled
   */
  isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Set sound enabled state
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    localStorage.setItem(SOUND_ENABLED_KEY, String(this.enabled));
  }
}

// Export singleton instance
export const soundManager = new SoundManager();
