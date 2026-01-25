/**
 * Floating Hearts Background Module
 * Creates animated floating hearts in the background
 */

class HeartsManager {
  private container: HTMLElement | null = null;
  private hearts: HTMLElement[] = [];
  private intervalId: number | null = null;
  private maxHearts = 2; // Minimal hearts for performance
  private reducedMotion = false;

  private heartEmojis = ['💕', '💖', '❤️'];

  /**
   * Initialize the hearts manager
   */
  init(container: HTMLElement): void {
    this.container = container;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Listen for changes to motion preference
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      this.reducedMotion = e.matches;
      if (this.reducedMotion) {
        this.stop();
        this.clearHearts();
      } else {
        this.start();
      }
    });
  }

  /**
   * Create a single floating heart
   */
  private createHeart(): HTMLElement | null {
    if (!this.container || this.reducedMotion) return null;
    
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    
    // Random heart emoji
    heart.textContent = this.heartEmojis[Math.floor(Math.random() * this.heartEmojis.length)];
    
    // Random properties
    const left = Math.random() * 100;
    const duration = 6 + Math.random() * 8; // 6-14 seconds
    const delay = Math.random() * 2;
    const size = 1 + Math.random() * 1.5; // 1-2.5rem
    const sway = Math.random() > 0.5;
    
    heart.style.setProperty('--left', `${left}%`);
    heart.style.setProperty('--duration', `${duration}s`);
    heart.style.setProperty('--delay', `${delay}s`);
    heart.style.fontSize = `${size}rem`;
    
    if (sway) {
      heart.classList.add('sway');
    }
    
    // Remove heart after animation completes
    heart.addEventListener('animationend', () => {
      this.removeHeart(heart);
    });
    
    return heart;
  }

  /**
   * Add a heart to the container
   */
  private addHeart(): void {
    if (!this.container || this.hearts.length >= this.maxHearts || this.reducedMotion) return;
    
    const heart = this.createHeart();
    if (heart) {
      this.container.appendChild(heart);
      this.hearts.push(heart);
    }
  }

  /**
   * Remove a heart from the container
   */
  private removeHeart(heart: HTMLElement): void {
    const index = this.hearts.indexOf(heart);
    if (index > -1) {
      this.hearts.splice(index, 1);
    }
    heart.remove();
  }

  /**
   * Start creating hearts periodically
   */
  start(): void {
    if (this.reducedMotion || this.intervalId) return;
    
    // Create initial heart (just 1)
    setTimeout(() => this.addHeart(), 2000);
    
    // Continue creating hearts (very slow - every 10 seconds)
    this.intervalId = window.setInterval(() => {
      this.addHeart();
    }, 10000);
  }

  /**
   * Stop creating new hearts
   */
  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Clear all existing hearts
   */
  clearHearts(): void {
    this.hearts.forEach(heart => heart.remove());
    this.hearts = [];
  }

  /**
   * Burst of hearts (for celebration)
   */
  burst(count: number = 5): void {
    if (this.reducedMotion) return;
    
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const heart = this.createHeart();
        if (heart && this.container) {
          // Override position for burst effect
          heart.style.setProperty('--left', `${30 + Math.random() * 40}%`);
          heart.style.setProperty('--duration', `${3 + Math.random() * 3}s`);
          heart.style.setProperty('--delay', '0s');
          this.container.appendChild(heart);
          this.hearts.push(heart);
        }
      }, i * 100);
    }
  }
}

// Export singleton instance
export const heartsManager = new HeartsManager();
