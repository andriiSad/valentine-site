/**
 * Sound Manager Module
 * Handles sound effects with localStorage persistence for mute state
 */

const SOUND_ENABLED_KEY = 'valentine-sound-enabled';

class SoundManager {
  private clickSound: HTMLAudioElement | null = null;
  private successSound: HTMLAudioElement | null = null;
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
      this.clickSound = new Audio('./sfx/click.mp3');
      this.clickSound.preload = 'auto';
      this.clickSound.volume = 0.5;
      
      this.successSound = new Audio('./sfx/success.mp3');
      this.successSound.preload = 'auto';
      this.successSound.volume = 0.7;
      
      this.initialized = true;
    } catch (e) {
      console.warn('Could not initialize audio:', e);
    }
  }

  /**
   * Play the click sound effect
   */
  playClick(): void {
    if (!this.enabled || !this.clickSound) return;
    
    try {
      this.clickSound.currentTime = 0;
      this.clickSound.play().catch(() => {
        // Silently fail if audio can't play
      });
    } catch (e) {
      // Ignore errors
    }
  }

  /**
   * Play the success sound effect
   */
  playSuccess(): void {
    if (!this.enabled || !this.successSound) return;
    
    try {
      this.successSound.currentTime = 0;
      this.successSound.play().catch(() => {
        // Silently fail if audio can't play
      });
    } catch (e) {
      // Ignore errors
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
