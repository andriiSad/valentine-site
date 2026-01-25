/**
 * Confetti Module
 * Optimized canvas-based confetti burst effect
 */

interface ConfettiParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  size: number;
  shape: number; // 0=rect, 1=circle (simplified, no hearts for perf)
  gravity: number;
  opacity: number;
}

class ConfettiManager {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: ConfettiParticle[] = [];
  private animationId: number | null = null;
  private isRunning: boolean = false;
  private lastFrameTime: number = 0;
  private readonly FRAME_INTERVAL = 1000 / 30; // 30fps cap for performance

  // Reduced color palette for fewer state changes
  private colors = [
    '#f43f5e', // rose-500
    '#ec4899', // pink-500
    '#fb7185', // rose-400
    '#ffd93d', // yellow
    '#fff',    // white
  ];

  /**
   * Initialize with canvas element
   */
  init(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.resize();
    
    // Handle window resize
    window.addEventListener('resize', () => this.resize());
  }

  /**
   * Resize canvas to window size
   */
  private resize(): void {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  /**
   * Create a confetti particle - optimized
   */
  private createParticle(x: number, y: number): ConfettiParticle {
    const angle = Math.random() * Math.PI * 2;
    const velocity = 6 + Math.random() * 8; // Reduced velocity range
    
    return {
      x,
      y,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity - 8,
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 6, // Reduced rotation
      size: 5 + Math.random() * 5, // Smaller particles
      shape: Math.random() > 0.5 ? 0 : 1, // Only rect and circle
      gravity: 0.4,
      opacity: 1,
    };
  }

  /**
   * Draw a single particle - optimized (no transforms)
   */
  private drawParticle(particle: ConfettiParticle): void {
    if (!this.ctx) return;
    
    const ctx = this.ctx;
    ctx.globalAlpha = particle.opacity;
    ctx.fillStyle = particle.color;
    
    if (particle.shape === 0) {
      // Simple rectangle - no rotation for performance
      ctx.fillRect(particle.x - particle.size / 2, particle.y - particle.size / 4, particle.size, particle.size / 2);
    } else {
      // Circle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /**
   * Update particle physics - simplified
   */
  private updateParticle(particle: ConfettiParticle): boolean {
    particle.vy += particle.gravity;
    particle.vx *= 0.98;
    particle.vy *= 0.98;
    particle.x += particle.vx;
    particle.y += particle.vy;
    
    // Fade out faster
    if (particle.y > window.innerHeight * 0.6) {
      particle.opacity -= 0.04;
    }
    
    // Remove if off screen or faded out
    return particle.y < window.innerHeight && particle.opacity > 0;
  }

  /**
   * Animation loop - throttled to 30fps
   */
  private animate = (timestamp: number): void => {
    if (!this.ctx || !this.canvas) return;
    
    // Throttle to target FPS
    const elapsed = timestamp - this.lastFrameTime;
    if (elapsed < this.FRAME_INTERVAL) {
      this.animationId = requestAnimationFrame(this.animate);
      return;
    }
    this.lastFrameTime = timestamp - (elapsed % this.FRAME_INTERVAL);
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update and draw particles
    this.particles = this.particles.filter(particle => {
      this.drawParticle(particle);
      return this.updateParticle(particle);
    });
    
    // Continue animation if particles remain
    if (this.particles.length > 0) {
      this.animationId = requestAnimationFrame(this.animate);
    } else {
      this.isRunning = false;
      this.ctx.globalAlpha = 1; // Reset alpha
    }
  };

  /**
   * Trigger a confetti burst - reduced particle count
   */
  burst(x?: number, y?: number, count: number = 40): void {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    
    // Limit total particles on screen
    if (this.particles.length > 100) {
      return;
    }
    
    const centerX = x ?? window.innerWidth / 2;
    const centerY = y ?? window.innerHeight / 3;
    
    // Create particles
    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticle(centerX, centerY));
    }
    
    // Start animation if not already running
    if (!this.isRunning) {
      this.isRunning = true;
      this.lastFrameTime = performance.now();
      this.animationId = requestAnimationFrame(this.animate);
    }
  }

  /**
   * Create multiple bursts from different positions - optimized
   */
  celebrate(): void {
    const positions = [
      { x: window.innerWidth * 0.3, y: window.innerHeight * 0.3 },
      { x: window.innerWidth * 0.7, y: window.innerHeight * 0.3 },
    ];
    
    positions.forEach((pos, index) => {
      setTimeout(() => {
        this.burst(pos.x, pos.y, 30);
      }, index * 300);
    });
  }

  /**
   * Stop and clear all confetti
   */
  clear(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.particles = [];
    this.isRunning = false;
    
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

// Export singleton instance
export const confettiManager = new ConfettiManager();
