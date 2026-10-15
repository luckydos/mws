const CACHE_NAME = 'work-calendar-v1';

self.addEventListener('install', (event) => {
	self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
	const url = new URL(event.request.url);

	// 1. HTTP/HTTPS 요청이 아니거나 (chrome-extension 등), GET 요청이 아니면 가로채지 않음
	if (event.request.method !== 'GET') {
		return;
	}

	// 2. Firebase / Firestore 관련 도메인은 서비스 워커가 절대 가로채지 않도록 통과(Bypass)
	if (
		url.hostname.includes('firestore.googleapis.com') ||
		url.hostname.includes('firebase') ||
		url.hostname.includes('googleapis.com') ||
		url.hostname.includes('identitytoolkit')
	) {
		return;
	}

	// 3. 일반 정적 리소스에 대해서만 네트워크 우선 호출
	event.respondWith(
		fetch(event.request).catch(() => caches.match(event.request))
	);
});