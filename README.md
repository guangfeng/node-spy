Node-Spy
========

Concurrent Spider with Node.js and server-side jQuery

It features:
 * A clean, simple API from https://github.com/mikeal/spider/
 * server-side DOM & automatic jQuery insertion 
 * Configurable pool size and retries
 * Priority of requests
 * forceUTF8 mode to let spider charset detection and conversion
 * Cache in memory

Help & Forks welcomed!


Options reference
-----------------

You can pass options to the Spy() constructor  or Spy:add() method.if some option both pass add() and Spy() constructor, add() choose first!

This options list is a strict superset of mikeal's request options and will be directly passed to
the request() method.

Basic request options [method Add Only]:

 * url: String, the URL you want to crawl
 * timeout : Number, in milliseconds        (Default 60000)
 * method, xxx: All mikeal's requests options are accepted

Concurrent options [Spy() Only]:

 * maxConnections: Number, Size of the worker pool (Default 10),
 * priorityRange: Number, Range of acceptable priorities starting from 0 (Default 10),
 * priority: Number, Priority of this request (Default 5), 

Retry options [Both]:

 * retries: Number of retries if the request fails (Default 3),
 * retryTimeout: Number of milliseconds to wait before retrying (Default 10000),

Server-side DOM options [Both]:

 * jQuery: Boolean, if true creates a server-side DOM and adds jQuery (Default true)
 * jQueryUrl: String, path to the jQuery file you want to insert (Defaults to bundled jquery-1.8.1.min.js)
 * autoWindowClose: Boolean, if false you will have to close the window yourself with result.window.close(). Useful when your callback needs to continue having the window open until some async code has ran. (Default true)

Charset encoding [Both]:

 * forceUTF8: Boolean, if true will try to detect the page charset and convert it to UTF8 if necessary. Never worry about encoding anymore! (Default false),

Cache [Both]:    

 * cache: Boolean, if true stores requests in memory (Default false)
 * skipDuplicates: Boolean, if true skips URIs that were already crawled, without even calling callback() (Default false)
