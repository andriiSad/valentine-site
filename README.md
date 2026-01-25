# 💕 Be My Valentine

A romantic single-page Valentine's Day website built with Vite + TypeScript + Tailwind CSS.

![Valentine's Day](https://img.shields.io/badge/Valentine's-Day-ff69b4?style=for-the-badge&logo=heart&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

- 🎨 **Modern, Minimal Design** - Soft gradients, glassy cards, romantic typography
- 💘 **Interactive Hero Section** - "Will you be my Valentine?" with Yes/No buttons
- 📸 **Photo Gallery** - Automatic slideshow of your memories (supports 6-12 images)
- 🎉 **Confetti Celebration** - Canvas-based confetti burst when you click "Yes"
- 💖 **Floating Hearts** - Animated background hearts (CSS keyframes)
- 😅 **Playful "No" Button** - Dodges the cursor (accessible after 3 dodges)
- 🔊 **Sound Effects** - Click and success sounds with mute toggle
- ♿ **Accessible** - Respects `prefers-reduced-motion`, keyboard navigation
- 📱 **Responsive** - Works on mobile and desktop

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd valentine-site

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

The built files will be in the `dist/` folder.

## 📁 Adding Your Content

### Photos

Add 6-12 photos to `/public/photos/` for the gallery slideshow:

```
public/
  photos/
    1.jpg
    2.jpg
    3.png
    ...
```

Supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`

The gallery will automatically detect and display images with these naming patterns:
- `1.jpg`, `2.jpg`, etc.
- `photo1.jpg`, `photo2.jpg`, etc.
- `img1.jpg`, `img2.jpg`, etc.

If no photos are found, beautiful placeholder images from Unsplash will be used.

### Sound Effects

Add sound files to `/public/sfx/`:

```
public/
  sfx/
    click.mp3    # Short click sound for buttons
    success.mp3  # Celebration sound when "Yes" is clicked
```

Keep sounds short:
- `click.mp3`: < 1 second
- `success.mp3`: < 3 seconds

Sound effects are disabled until the user interacts with the page (browser autoplay policy).

## 🌐 Deployment

### Netlify

1. Push your code to GitHub
2. Connect your repo to [Netlify](https://netlify.com)
3. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Deploy!

### Vercel

1. Push your code to GitHub
2. Import your repo on [Vercel](https://vercel.com)
3. Vercel auto-detects Vite settings
4. Deploy!

### Cloudflare Pages

1. Push your code to GitHub
2. Connect your repo to [Cloudflare Pages](https://pages.cloudflare.com)
3. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Deploy!

### GitHub Pages

⚠️ **Important:** If deploying to `https://username.github.io/REPO_NAME/`, you need to set the base path:

1. Edit `vite.config.ts`:
   ```ts
   export default defineConfig({
     base: '/REPO_NAME/',  // Replace with your repo name
     // ...
   })
   ```

2. Build and deploy:
   ```bash
   npm run build
   ```

3. Deploy the `dist/` folder to GitHub Pages (manually or via GitHub Actions)

Example GitHub Actions workflow (`.github/workflows/deploy.yml`):

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to customize the color palette:

```js
theme: {
  extend: {
    colors: {
      rose: { ... },
      pink: { ... },
    }
  }
}
```

### Typography

The site uses:
- **Dancing Script** - Romantic cursive font (via Google Fonts)
- System fonts as fallback

### Animations

All animations respect `prefers-reduced-motion`. Customize in:
- `tailwind.config.js` - Tailwind animation utilities
- `src/style.css` - Custom keyframes

## 📄 License

MIT License - Feel free to use this for your own Valentine! 💝

## 💕 Made with Love

Built with Vite, TypeScript, and Tailwind CSS.

Happy Valentine's Day! 🌹

npm run dev
brew install cloudflared
cloudflared tunnel --url http://localhost:5173 -> get the URL from there!