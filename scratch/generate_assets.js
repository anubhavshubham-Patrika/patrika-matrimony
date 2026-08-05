const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

try {
  const size = 512;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Transparent background (do NOT fill background!)

  // Draw Ribbon P in Royal Crimson #6B0000
  ctx.save();
  ctx.scale(size / 100, size / 100);

  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const grad = ctx.createLinearGradient(0, 0, 100, 100);
  grad.addColorStop(0, '#8E0000');
  grad.addColorStop(0.5, '#6B0000');
  grad.addColorStop(1, '#4A0000');
  ctx.strokeStyle = grad;

  ctx.beginPath();
  // Loop curve
  ctx.moveTo(30, 82);
  ctx.bezierCurveTo(15, 66, 15, 38, 30, 24);
  ctx.bezierCurveTo(45, 10, 75, 8, 86, 28);
  ctx.bezierCurveTo(95, 45, 85, 68, 65, 74);
  ctx.bezierCurveTo(48, 80, 34, 70, 32, 56);
  ctx.stroke();

  ctx.restore();

  const buffer = canvas.toBuffer('image/png');
  const assetsDir = path.join(__dirname, '..', 'assets');

  fs.writeFileSync(path.join(assetsDir, 'patrika-logo.png'), buffer);
  fs.writeFileSync(path.join(assetsDir, 'favicon.png'), buffer);
  fs.writeFileSync(path.join(assetsDir, 'icon.png'), buffer);
  fs.writeFileSync(path.join(assetsDir, 'splash-icon.png'), buffer);

  console.log('Successfully generated transparent PNG assets in #6B0000 Royal Crimson');
} catch (e) {
  console.log('Canvas not available, skipping node canvas script:', e.message);
}
