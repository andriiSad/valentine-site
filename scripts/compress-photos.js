/**
 * Photo Compression Script for Valentine Site
 * 
 * Usage: npm run compress-photos
 * 
 * This script will:
 * 1. Find all images in /public/photos/raw/
 * 2. Compress them to max 1200x1200, quality 85
 * 3. Save as numbered JPGs (1.jpg, 2.jpg, etc.) in /public/photos/
 * 4. Keep originals in /raw/ folder
 * 
 * Supported formats: jpg, jpeg, png, gif, webp
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RAW_DIR = path.join(__dirname, '../public/photos/raw');
const OUTPUT_DIR = path.join(__dirname, '../public/photos');
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
const MAX_SIZE = 1200;
const QUALITY = 85;

async function compressPhotos() {
  console.log('🖼️  Valentine Photo Compressor');
  console.log('================================\n');

  // Create raw directory if it doesn't exist
  if (!fs.existsSync(RAW_DIR)) {
    fs.mkdirSync(RAW_DIR, { recursive: true });
    console.log(`📁 Created ${RAW_DIR}`);
    console.log('   Put your photos in this folder and run again!\n');
    return;
  }

  // Get all image files from raw directory
  const files = fs.readdirSync(RAW_DIR)
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return SUPPORTED_EXTENSIONS.includes(ext);
    })
    .sort();

  if (files.length === 0) {
    console.log('📷 No images found in /public/photos/raw/');
    console.log('   Add your photos there and run again!\n');
    console.log('   Supported formats: jpg, jpeg, png, gif, webp');
    return;
  }

  console.log(`📷 Found ${files.length} image(s) to compress:\n`);

  // Process each image
  let outputNumber = 1;
  
  for (const file of files) {
    const inputPath = path.join(RAW_DIR, file);
    const outputPath = path.join(OUTPUT_DIR, `${outputNumber}.jpg`);
    
    try {
      const inputStats = fs.statSync(inputPath);
      const inputSizeKB = (inputStats.size / 1024).toFixed(1);
      
      // Compress image
      await sharp(inputPath)
        .resize(MAX_SIZE, MAX_SIZE, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ quality: QUALITY })
        .toFile(outputPath);
      
      const outputStats = fs.statSync(outputPath);
      const outputSizeKB = (outputStats.size / 1024).toFixed(1);
      const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(0);
      
      console.log(`✅ ${file}`);
      console.log(`   → ${outputNumber}.jpg (${inputSizeKB}KB → ${outputSizeKB}KB, saved ${savings}%)`);
      
      outputNumber++;
    } catch (error) {
      console.log(`❌ ${file} - Error: ${error.message}`);
    }
  }

  console.log('\n================================');
  console.log(`🎉 Done! ${outputNumber - 1} photos ready in /public/photos/`);
  console.log('   Gallery will show: 1.jpg, 2.jpg, etc.');
}

compressPhotos().catch(console.error);
