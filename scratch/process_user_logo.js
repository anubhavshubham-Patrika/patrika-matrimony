const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const srcPath = 'C:/Users/Anubhav.Shubham/.gemini/antigravity/brain/7f005255-53d7-484e-bafe-f24576cd1024/.user_uploaded/media_1785930236560.png';
const targetDir = 'c:/Users/Anubhav.Shubham/Documents/Codex/Patrika Matrimony App/PatrikaMatrimony/assets';

fs.createReadStream(srcPath)
  .pipe(new PNG())
  .on('parsed', function () {
    console.log(`Original image size: ${this.width}x${this.height}`);

    // Create a new PNG with transparency
    const newPng = new PNG({ width: this.width, height: this.height });

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2;
        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];
        const a = this.data[idx + 3];

        // Crop top right "comments" black box: if x > 0.75 * width and y < 0.1 * height and r < 50 && g < 50 && b < 50
        if (x > this.width * 0.7 && y < this.height * 0.1) {
          // Check if dark box or black background
          if (r < 60 && g < 60 && b < 60) {
            newPng.data[idx] = 0;
            newPng.data[idx + 1] = 0;
            newPng.data[idx + 2] = 0;
            newPng.data[idx + 3] = 0; // transparent
            continue;
          }
          // Also text inside comments box (white text)
          if (r > 200 && g > 200 && b > 200 && y < this.height * 0.08 && x > this.width * 0.75) {
            newPng.data[idx] = 0;
            newPng.data[idx + 1] = 0;
            newPng.data[idx + 2] = 0;
            newPng.data[idx + 3] = 0;
            continue;
          }
        }

        // Background transparency: detect off-white/cream background (#FAF6F0 ~ RGB 250,246,240)
        // If R > 235, G > 230, B > 220
        if (r >= 235 && g >= 230 && b >= 215) {
          newPng.data[idx] = 0;
          newPng.data[idx + 1] = 0;
          newPng.data[idx + 2] = 0;
          newPng.data[idx + 3] = 0; // transparent background
        } else {
          newPng.data[idx] = r;
          newPng.data[idx + 1] = g;
          newPng.data[idx + 2] = b;
          newPng.data[idx + 3] = a;
        }
      }
    }

    const buffer = PNG.sync.write(newPng);

    const files = ['patrika-logo.png', 'favicon.png', 'icon.png', 'splash-icon.png'];
    files.forEach(file => {
      const dest = path.join(targetDir, file);
      fs.writeFileSync(dest, buffer);
      console.log(`Saved transparent logo to ${dest}`);
    });
  });
