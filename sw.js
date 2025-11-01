const CACHE_NAME = 'ZhiHan_ZhenHan-v2';
const ASSETS_TO_CACHE = [
  '/ZhiHan_ZhenHan/',
  '/ZhiHan_ZhenHan/index.html',
  '/ZhiHan_ZhenHan/images/zh192.png',
  '/ZhiHan_ZhenHan/images/zh512.png',
  '/ZhiHan_ZhenHan/images/cover.jpg',
  '/ZhiHan_ZhenHan/images/1.jpg',
  '/ZhiHan_ZhenHan/images/2.jpg',
  '/ZhiHan_ZhenHan/images/3.jpg',
  '/ZhiHan_ZhenHan/images/4.jpg',
  '/ZhiHan_ZhenHan/images/5.jpg',
  '/ZhiHan_ZhenHan/images/6.jpg',
  '/ZhiHan_ZhenHan/images/7.jpg',
  '/ZhiHan_ZhenHan/images/8.jpg',
  '/ZhiHan_ZhenHan/images/banner1.png',
  '/ZhiHan_ZhenHan/images/book.jpg',
  '/ZhiHan_ZhenHan/images/clothes.jpg',
  '/ZhiHan_ZhenHan/images/GP.jpg',
  '/ZhiHan_ZhenHan/images/guest.jpg',
  '/ZhiHan_ZhenHan/images/qr1.jpg',
  '/ZhiHan_ZhenHan/images/qr2.jpg',
  '/ZhiHan_ZhenHan/images/venue1.jpg',
  '/ZhiHan_ZhenHan/images/venue2.jpg',
  '/ZhiHan_ZhenHan/images/zhen.jpg',
  '/ZhiHan_ZhenHan/images/zhi.jpg',

  // *** External CDN Assets to Cache for Offline Use ***
  
  // JavaScript Libraries
  'https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.3.0/exceljs.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js',
  'https://cdn.jsdelivr.net/npm/add-to-calendar-button@2', // This is the main script URL
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/aos@2.3.1/dist/aos.js',
  'https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js',
  // 'https://unpkg.com/feather-icons', // Note: This one might be a redirect, ensure you use the final URL if possible.
  'https://unpkg.com/feather-icons@4.29.2/dist/feather.min.js',

  // CSS Files (Styles and Fonts)
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://unpkg.com/aos@2.3.1/dist/aos.css',
  
  // Google Fonts CSS and the Actual Font Files
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
  'https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap'
  // The service worker will fetch and cache the *actual font files* when it sees these CSS URLs

];

// Install the service worker and cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate the service worker and clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Serve cached assets when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});