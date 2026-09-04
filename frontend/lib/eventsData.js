// frontend/lib/eventsData.js
// Loopverse Landing Page & Gallery Datasets

export const heroTiltedCards = [
  {
    id: 1,
    name: 'Tech Leaders Summit',
    caption: 'Dubai, 2023',
    tilt: '-8deg',
    bgGradient: 'linear-gradient(135deg, #9E00FE 0%, #31103f 100%)',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'MIDI, 2022',
    caption: 'May 25, 2022',
    tilt: '-3deg',
    bgGradient: 'linear-gradient(135deg, #f5693c 0%, #a0325a 100%)',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'NEW HEY!',
    caption: 'Berlin, 2023',
    tilt: '2deg',
    bgGradient: 'linear-gradient(135deg, #29725f 0%, #11362d 100%)',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'skillup',
    caption: 'Lahore, 2023',
    tilt: '7deg',
    bgGradient: 'linear-gradient(135deg, #f0befa 0%, #9E00FE 100%)',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&auto=format&fit=crop'
  },
  {
    id: 5,
    name: 'Hackathon 3.0',
    caption: 'Karachi, 2023',
    tilt: '-5deg',
    bgGradient: 'linear-gradient(135deg, #e6fab9 0%, #29725f 100%)',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&auto=format&fit=crop'
  }
];

export const loopverse1CubeFaces = [
  { title: 'loopverse 1.0 Keynote', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop' },
  { title: 'Genesis Arena', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop' },
  { title: 'Stage 01 Highlights', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop' },
  { title: 'Community Networking', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop' }
];

export const loopverse2CubeFaces = [
  { title: 'loopverse 2.0 Main Arena', image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&auto=format&fit=crop' },
  { title: 'Design Jam Stage', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&auto=format&fit=crop' },
  { title: 'Founders Panel', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&auto=format&fit=crop' },
  { title: 'Night Demo Party', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&auto=format&fit=crop' }
];

export const skillupCubeFaces = [
  { title: 'Skillup Frontend Lab', image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop' },
  { title: 'AI & Data Masterclass', image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&auto=format&fit=crop' },
  { title: 'Mentorship Circles', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&auto=format&fit=crop' },
  { title: 'Certification Ceremony', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop' }
];

export const cubeFacesData = loopverse1CubeFaces;

export const galleryCollections = [
  // Collection 0: Loopverse 1.0
  [
    { id: 1, tag: 'loopverse 1.0', tilt: -8, rotation: -8, caption: 'loopverse 1.0', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop' },
    { id: 2, tag: 'loopverse 1.0', tilt: 5, rotation: 5, caption: 'keynote session', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&auto=format&fit=crop' },
    { id: 3, tag: 'keynote', tilt: -3, rotation: -3, caption: 'stage presentation', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&auto=format&fit=crop' },
    { id: 4, tag: 'loopverse 1.0', tilt: 8, rotation: 8, caption: 'community team', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop' },
    { id: 5, tag: 'genesis', tilt: -6, rotation: -6, caption: 'afterparty vibes', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&auto=format&fit=crop' }
  ],
  // Collection 1: Loopverse 2.0
  [
    { id: 6, tag: 'loopverse 2.0', tilt: -6, rotation: -6, caption: 'workshop brainstorm', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop' },
    { id: 7, tag: 'design sprint', tilt: 4, rotation: 4, caption: 'design presentation', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&auto=format&fit=crop' },
    { id: 8, tag: 'loopverse 2.0', tilt: -3, rotation: -3, caption: 'founders panel', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&auto=format&fit=crop' },
    { id: 9, tag: 'demo night', tilt: 7, rotation: 7, caption: 'demo night live', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&auto=format&fit=crop' },
    { id: 10, tag: 'loopverse 2.0', tilt: -5, rotation: -5, caption: 'main arena stage', image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=500&auto=format&fit=crop' }
  ],
  // Collection 2: Skillup Week One
  [
    { id: 11, tag: 'skillup', tilt: -7, rotation: -7, caption: 'frontend lab', image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&auto=format&fit=crop' },
    { id: 12, tag: 'skillup', tilt: 6, rotation: 6, caption: 'AI masterclass', image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&auto=format&fit=crop' },
    { id: 13, tag: 'mentor circle', tilt: -4, rotation: -4, caption: 'mentor circles', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&auto=format&fit=crop' },
    { id: 14, tag: 'skillup', tilt: 8, rotation: 8, caption: 'coding challenge', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop' },
    { id: 15, tag: 'awards', tilt: -5, rotation: -5, caption: 'certificate ceremony', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop' }
  ],
  // Collection 3: Hackathon Series
  [
    { id: 16, tag: 'hackathon 3.0', tilt: -9, rotation: -9, caption: '48h build fest', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&auto=format&fit=crop' },
    { id: 17, tag: '48h build', tilt: 3, rotation: 3, caption: 'team hacking', image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&auto=format&fit=crop' },
    { id: 18, tag: 'pitch finale', tilt: -5, rotation: -5, caption: 'stage pitches', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&auto=format&fit=crop' },
    { id: 19, tag: 'hackathon 3.0', tilt: 7, rotation: 7, caption: 'judge review', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&auto=format&fit=crop' },
    { id: 20, tag: 'winners', tilt: -4, rotation: -4, caption: 'trophy ceremony', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&auto=format&fit=crop' }
  ],
  // Collection 4: Ambassador All-Stars
  [
    { id: 21, tag: 'ambassadors', tilt: -5, rotation: -5, caption: 'campus leaders', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop' },
    { id: 22, tag: 'all-stars', tilt: 6, rotation: 6, caption: 'all-star meetup', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&auto=format&fit=crop' },
    { id: 23, tag: 'campus leads', tilt: -3, rotation: -3, caption: 'leadership retreat', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&auto=format&fit=crop' },
    { id: 24, tag: 'ambassadors', tilt: 8, rotation: 8, caption: 'summit networking', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop' },
    { id: 25, tag: 'looplab crew', tilt: -6, rotation: -6, caption: 'crew photo', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&auto=format&fit=crop' }
  ]
];

export const galleryPhotosData = galleryCollections[0];
