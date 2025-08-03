import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist, StaleWhileRevalidate } from "serwist";

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    {
      matcher: ({ url }) => url.pathname === "/",
      handler: new StaleWhileRevalidate({
        cacheName: "song-list",
        matchOptions: {
          ignoreSearch: true,
          ignoreMethod: true,
        },
      }),
    },
    {
      matcher: ({ url }) => url.pathname === "/song",
      handler: new StaleWhileRevalidate({
        cacheName: "song-name",
        matchOptions: {
          ignoreSearch: true,
          ignoreMethod: true,
        },
      }),
    },
    ...defaultCache,
  ],
});

const urlsToCache = ["/", "/song", "/api/songs", "/~offline"] as const;

self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all(
      urlsToCache.map((entry) => {
        const request = serwist.handleRequest({
          request: new Request(entry),
          event,
        });
        return request;
      })
    )
  );
});

serwist.addEventListeners();
