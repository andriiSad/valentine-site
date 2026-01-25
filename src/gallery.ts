/**
 * Photo Gallery Module
 * Slideshow/carousel for photos from /public/photos
 */

interface GalleryOptions {
  container: HTMLElement;
  slidesContainer: HTMLElement;
  dotsContainer: HTMLElement;
  prevButton: HTMLElement;
  nextButton: HTMLElement;
  placeholder: HTMLElement;
  autoPlay?: boolean;
  interval?: number;
  preloadedImages?: string[]; // Pre-discovered images from main preloader
}

class Gallery {
  private options: GalleryOptions;
  private images: string[] = [];
  private currentIndex: number = 0;
  private autoPlayId: number | null = null;

  // Placeholder images to use if no photos are found
  private placeholderImages = [
    'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&h=600&fit=crop', // hearts
    'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop', // couple
    'https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=800&h=600&fit=crop', // roses
    'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&h=600&fit=crop', // love
    'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&h=600&fit=crop', // romantic
    'https://images.unsplash.com/photo-1545042679-3bf7c9b9a6ef?w=800&h=600&fit=crop', // hearts candy
  ];

  constructor(options: GalleryOptions) {
    this.options = {
      autoPlay: true,
      interval: 4000,
      ...options,
    };
  }

  /**
   * Preload images on page load (call this early!)
   * Now optional - main.ts handles preloading
   */
  async preload(): Promise<void> {
    // Use preloaded images if available
    if (this.options.preloadedImages && this.options.preloadedImages.length > 0) {
      this.images = this.options.preloadedImages;
      console.log('🖼️ Using preloaded images:', this.images.length);
      return;
    }
    
    console.log('🖼️ Preloading gallery images...');
    this.images = await this.discoverImages();
    
    if (this.images.length === 0) {
      // Use placeholder images if no local images found
      this.images = this.placeholderImages;
      console.log('📷 Using placeholder images');
    }
    
    // Preload all images into browser cache
    await Promise.all(this.images.map(src => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = src;
      });
    }));
    
    console.log('✅ Gallery images preloaded:', this.images.length);
  }

  /**
   * Initialize the gallery UI (call when gallery section is shown)
   */
  async init(): Promise<void> {
    // Use preloaded images from main if available
    if (this.options.preloadedImages && this.options.preloadedImages.length > 0) {
      this.images = this.options.preloadedImages;
    }
    
    // If still no images, try to discover or use placeholders
    if (this.images.length === 0) {
      await this.preload();
    }
    
    if (this.images.length > 0) {
      this.options.placeholder.style.display = 'none';
      this.createSlides();
      this.createDots();
      this.showSlide(0);
      this.setupNavigation();
      
      if (this.options.autoPlay) {
        this.startAutoPlay();;
      }
    }
  }

  /**
   * Discover images in /public/photos directory
   * Since we can't list directory contents in browser, we'll try common patterns
   */
  private async discoverImages(): Promise<string[]> {
    const extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'JPG', 'JPEG', 'PNG', 'GIF', 'WEBP'];
    const basePath = './photos'; // Works with Vite's base config
    const patterns = [
      // Try common names first
      ...extensions.map(ext => `${basePath}/image.${ext}`),
      ...extensions.map(ext => `${basePath}/photo.${ext}`),
      // Try numbered patterns (1.jpg, 2.jpg, etc.)
      ...Array.from({ length: 12 }, (_, i) => extensions.map(ext => `${basePath}/${i + 1}.${ext}`)).flat(),
      ...Array.from({ length: 12 }, (_, i) => extensions.map(ext => `${basePath}/photo${i + 1}.${ext}`)).flat(),
      ...Array.from({ length: 12 }, (_, i) => extensions.map(ext => `${basePath}/img${i + 1}.${ext}`)).flat(),
    ];

    console.log('🖼️ Discovering gallery images...');
    
    // Use Image loading to check if images exist (more reliable than HEAD requests)
    const checkImage = (src: string): Promise<string | null> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          console.log('✅ Found image:', src);
          resolve(src);
        };
        img.onerror = () => resolve(null);
        img.src = src;
      });
    };

    // Test each pattern
    const results = await Promise.all(patterns.map(checkImage));
    
    const found: string[] = [];
    results.forEach(src => {
      if (src && !found.includes(src)) {
        found.push(src);
      }
    });

    console.log('🖼️ Total images found:', found.length);
    
    // Sort found images
    return found.sort();
  }

  /**
   * Create slide elements for each image
   */
  private createSlides(): void {
    const { slidesContainer } = this.options;
    slidesContainer.innerHTML = '';

    this.images.forEach((src, index) => {
      const slide = document.createElement('div');
      slide.className = 'gallery-slide';
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-label', `Photo ${index + 1} of ${this.images.length}`);
      
      const img = document.createElement('img');
      img.src = src;
      img.alt = `Valentine memory ${index + 1}`;
      img.loading = index === 0 ? 'eager' : 'lazy';
      
      // Handle image load errors
      img.onerror = () => {
        img.src = this.placeholderImages[index % this.placeholderImages.length];
      };
      
      slide.appendChild(img);
      slidesContainer.appendChild(slide);
    });
  }

  /**
   * Create navigation dots
   */
  private createDots(): void {
    const { dotsContainer } = this.options;
    dotsContainer.innerHTML = '';

    if (this.images.length <= 1) return;

    this.images.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'gallery-dot';
      dot.setAttribute('aria-label', `Go to photo ${index + 1}`);
      dot.addEventListener('click', () => this.goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  }

  /**
   * Setup navigation buttons
   */
  private setupNavigation(): void {
    const { prevButton, nextButton } = this.options;

    if (this.images.length <= 1) {
      prevButton.classList.add('hidden');
      nextButton.classList.add('hidden');
      return;
    }

    prevButton.classList.remove('hidden');
    nextButton.classList.remove('hidden');

    prevButton.addEventListener('click', () => this.prev());
    nextButton.addEventListener('click', () => this.next());

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.isVisible()) return;
      
      if (e.key === 'ArrowLeft') {
        this.prev();
      } else if (e.key === 'ArrowRight') {
        this.next();
      }
    });

    // Pause auto-play on hover
    this.options.container.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.options.container.addEventListener('mouseleave', () => {
      if (this.options.autoPlay) this.startAutoPlay();
    });

    // Touch swipe support
    let touchStartX = 0;
    this.options.container.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    this.options.container.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          this.next();
        } else {
          this.prev();
        }
      }
    }, { passive: true });
  }

  /**
   * Check if gallery section is visible
   */
  private isVisible(): boolean {
    const section = document.getElementById('gallery-section');
    return section ? !section.classList.contains('hidden') : false;
  }

  /**
   * Show a specific slide
   */
  showSlide(index: number): void {
    const slides = this.options.slidesContainer.querySelectorAll('.gallery-slide');
    const dots = this.options.dotsContainer.querySelectorAll('.gallery-dot');

    // Wrap around
    if (index >= this.images.length) index = 0;
    if (index < 0) index = this.images.length - 1;

    this.currentIndex = index;

    // Update slides
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  /**
   * Go to a specific slide
   */
  goToSlide(index: number): void {
    this.showSlide(index);
    // Reset auto-play timer
    if (this.options.autoPlay) {
      this.stopAutoPlay();
      this.startAutoPlay();
    }
  }

  /**
   * Go to next slide
   */
  next(): void {
    this.goToSlide(this.currentIndex + 1);
  }

  /**
   * Go to previous slide
   */
  prev(): void {
    this.goToSlide(this.currentIndex - 1);
  }

  /**
   * Start auto-play
   */
  startAutoPlay(): void {
    if (this.autoPlayId) return;
    
    this.autoPlayId = window.setInterval(() => {
      if (this.isVisible()) {
        this.next();
      }
    }, this.options.interval);
  }

  /**
   * Stop auto-play
   */
  stopAutoPlay(): void {
    if (this.autoPlayId) {
      clearInterval(this.autoPlayId);
      this.autoPlayId = null;
    }
  }
}

// Export factory function
export function createGallery(options: GalleryOptions): Gallery {
  return new Gallery(options);
}

export type { Gallery };
