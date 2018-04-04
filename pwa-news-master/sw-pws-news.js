(function(){
    'use strict'

    var CACHE_SHELL='pwa-news-shell-v1';
    var FILES_SHELL=[
        '/',
        '/css/core.css',
        '/css/main.css',
        '/js/api.js',
        '/image/placeholder-image.png',
        '/libary/jquery-3.3.1.min.js',
        '/libary/moment.min.js'
    ];
    var API = '';
    var CACHE_DATA = 'pw';
    self.addEventListener('install',function(event){
        event.waitUntil(
            self.caches.open(CACHE_SHELL)
            .then(function(cache){
                return cache.addAll(FILES_SHELL);
            })
        )

    });

    self.addEventListener('fetch', function(event){
        if(event.request.url.indexOf(API) === -1){
        event.respondWith(
            caches.match(event.request)
            .then(function(response){
                if(response){
                    return response;
                }
                return fetch(event.request);
            })
        )
    }else{
        event.respondWith(
            self.fetch(event.request)
            .then(function(response){
                return caches.open(CACHE_DATA).then(function(){
                    cache.put(event.request.url, response.clone())
                    return response;
                });
            }).catch(function(){
                return caches.match(event.request);
            });
            }
        )
    }
    });



}());
