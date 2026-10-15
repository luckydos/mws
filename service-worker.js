const CACHE_NAME = 'work-calendar-v1';

// 설치 시 캐싱
self.addEventListener('install', (event) => {
	self.skipWaiting();
});

// 활성화 시 이전 캐시 정리
self.addEventListener('activate', (event) => {
	event.waitUntil(clients.claim());
});

// 네트워크 우선 호출 (최신 일정 데이터 우선)
self.addEventListener('fetch', (event) => {
	event.respondWith(
		fetch(event.request).catch(() => caches.match(event.request))
	);
});