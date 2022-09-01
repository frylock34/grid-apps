async function start_service_worker() {
    const version = 53;
    function debug() {
        console.log(`[${version}]`, ...arguments);
    }

    // install service worker
    debug('service worker registration', { gapp: self.gapp.version });

    try {
        // const reg = await navigator.serviceWorker.register("/src/moto/service.js?013", { scope: "/" });
        const reg = await navigator.serviceWorker.register("/code/service.js?"+version, { scope: "/" });
        if (reg.installing) {
            debug('service worker installing');
        } else if (reg.waiting) {
            debug('service worker waiting');
        } else if (reg.active) {
            debug('service worker active');
        } else {
            debug({ service_worker: reg });
        }
        navigator.serviceWorker.controller.postMessage('ctrl message');
    } catch (err) {
        debug('service worker registration failed');
    }
}
if (navigator.serviceWorker) start_service_worker();
