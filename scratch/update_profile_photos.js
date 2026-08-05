const fs = require('fs');
const path = require('path');

const profilesPath = 'c:/Users/Anubhav.Shubham/Documents/Codex/Patrika Matrimony App/PatrikaMatrimony/src/data/profiles.json';

// Curated high-res Indian portraits (Brides, Grooms, Ethnic Wear, Formal Attire)
const femaleIndianPhotos = [
  'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&auto=format&fit=crop&q=80',
];

const maleIndianPhotos = [
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
];

const profiles = JSON.parse(fs.readFileSync(profilesPath, 'utf8'));

profiles.forEach((p, idx) => {
  if (p.gender === 'Female') {
    p.profilePhotoURL = femaleIndianPhotos[idx % femaleIndianPhotos.length];
    p.galleryPhotoURLs = [
      femaleIndianPhotos[(idx + 1) % femaleIndianPhotos.length],
      femaleIndianPhotos[(idx + 2) % femaleIndianPhotos.length],
    ];
  } else {
    p.profilePhotoURL = maleIndianPhotos[idx % maleIndianPhotos.length];
    p.galleryPhotoURLs = [
      maleIndianPhotos[(idx + 1) % maleIndianPhotos.length],
      maleIndianPhotos[(idx + 2) % maleIndianPhotos.length],
    ];
  }
  // Ensure realistic match score
  if (!p.matchScore || p.matchScore < 70) {
    p.matchScore = 82 + (idx % 16);
  }
});

fs.writeFileSync(profilesPath, JSON.stringify(profiles, null, 2), 'utf8');
console.log(`Successfully updated ${profiles.length} profiles with high-resolution Indian portrait photos!`);
