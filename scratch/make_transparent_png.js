const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function createTransparentPngWithRibbon(width, height) {
  // Simple uncompressed RGBA PNG generator in pure JS
  const rowSize = width * 4 + 1; // 4 bytes per pixel + 1 filter byte
  const bufferSize = rowSize * height;
  const rawData = Buffer.alloc(bufferSize);

  const cx = width / 2;
  const cy = height / 2;
  const rOuter = width * 0.4;
  const rInner = width * 0.22;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter type 0 (None)

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Draw ribbon ring forming 'P' in #6B0000 (RGB: 107, 0, 0)
      const isLoop = (dist >= rInner && dist <= rOuter);
      const isStem = (x >= width * 0.2 && x <= width * 0.4 && y >= height * 0.25 && y <= height * 0.85);

      if (isLoop || isStem) {
        rawData[pxOffset + 0] = 107; // R (#6B)
        rawData[pxOffset + 1] = 0;   // G (#00)
        rawData[pxOffset + 2] = 0;   // B (#00)
        rawData[pxOffset + 3] = 255; // Alpha 100%
      } else {
        // Transparent background
        rawData[pxOffset + 0] = 0;
        rawData[pxOffset + 1] = 0;
        rawData[pxOffset + 2] = 0;
        rawData[pxOffset + 3] = 0; // Alpha 0% (Fully transparent)
      }
    }
  }

  const compressedData = zlib.deflateSync(rawData);

  // Helper for CRC32 calculation
  function crc32(buf) {
    let c = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      c ^= buf[i];
      for (let j = 0; j < 8; j++) {
        c = (c >>> 1) ^ (c & 1 ? 0xedb88320 : 0);
      }
    }
    return (c ^ 0xffffffff) >>> 0;
  }

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.alloc(4);
    const combined = Buffer.concat([typeBuf, data]);
    crcBuf.writeUInt32BE(crc32(combined), 0);
    return Buffer.concat([len, combined, crcBuf]);
  }

  // PNG Header
  const header = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR Chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // Bit depth
  ihdr[9] = 6; // Color type (RGBA)
  ihdr[10] = 0; // Compression
  ihdr[11] = 0; // Filter
  ihdr[12] = 0; // Interlace
  const ihdrChunk = makeChunk('IHDR', ihdr);

  // IDAT Chunk
  const idatChunk = makeChunk('IDAT', compressedData);

  // IEND Chunk
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([header, ihdrChunk, idatChunk, iendChunk]);
}

const pngBuffer = createTransparentPngWithRibbon(256, 256);
const assetsDir = path.join(__dirname, '..', 'assets');

fs.writeFileSync(path.join(assetsDir, 'patrika-logo.png'), pngBuffer);
fs.writeFileSync(path.join(assetsDir, 'favicon.png'), pngBuffer);
fs.writeFileSync(path.join(assetsDir, 'icon.png'), pngBuffer);
fs.writeFileSync(path.join(assetsDir, 'splash-icon.png'), pngBuffer);

console.log('Successfully generated transparent PNG assets in pure JS!');
