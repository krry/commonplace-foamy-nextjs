if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let i=Promise.resolve();return a[e]||(i=new Promise((async i=>{if("document"in self){const a=document.createElement("script");a.src=e,document.head.appendChild(a),a.onload=i}else importScripts(e),i()}))),i.then((()=>{if(!a[e])throw new Error(`Module ${e} didn’t register its module`);return a[e]}))},i=(i,a)=>{Promise.all(i.map(e)).then((e=>a(1===e.length?e[0]:e)))},a={require:Promise.resolve(i)};self.define=(i,s,c)=>{a[i]||(a[i]=Promise.resolve().then((()=>{let a={};const n={uri:location.origin+i.slice(1)};return Promise.all(s.map((i=>{switch(i){case"exports":return a;case"module":return n;default:return e(i)}}))).then((e=>{const i=c(...e);return a.default||(a.default=i),a}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/b4BfBrZc9uzKPi7pVWWsm/_buildManifest.js",revision:"b4BfBrZc9uzKPi7pVWWsm"},{url:"/_next/static/b4BfBrZc9uzKPi7pVWWsm/_ssgManifest.js",revision:"b4BfBrZc9uzKPi7pVWWsm"},{url:"/_next/static/chunks/1606726a.9e44c9a0cdbbb15a13a5.js",revision:"b4BfBrZc9uzKPi7pVWWsm"},{url:"/_next/static/chunks/193.f1e02f68f8704f1ae49c.js",revision:"b4BfBrZc9uzKPi7pVWWsm"},{url:"/_next/static/chunks/288-743645f3402fe62d987a.js",revision:"b4BfBrZc9uzKPi7pVWWsm"},{url:"/_next/static/chunks/390-322ce4e08c2970c845fc.js",revision:"b4BfBrZc9uzKPi7pVWWsm"},{url:"/_next/static/chunks/432.c4ebb1a8078cd7a82616.js",revision:"b4BfBrZc9uzKPi7pVWWsm"},{url:"/_next/static/chunks/544-93f4c3153824c43f66c5.js",revision:"b4BfBrZc9uzKPi7pVWWsm"},{url:"/_next/static/chunks/545f34e4-77dd787b5701bd4b63a5.js",revision:"b4BfBrZc9uzKPi7pVWWsm"},{url:"/_next/static/chunks/679-1f3a3fa34c8a0fd235e8.js",revision:"b4BfBrZc9uzKPi7pVWWsm"},{url:"/_next/static/chunks/75fc9c18.7fe7324870a208952888.js",revision:"b4BfBrZc9uzKPi7pVWWsm"},{url:"/_next/static/chunks/829-6d28a66b2bf3943d0641.js",revision:"b4BfBrZc9uzKPi7pVWWsm"},{url:"/_next/static/chunks/868-4af0785b45e8d622462e.js",revision:"b4BfBrZc9uzKPi7pVWWsm"},{url:"/_next/static/chunks/928-3d15b4ae0eaec889bfa3.js",revision:"b4BfBrZc9uzKPi7pVWWsm"},{url:"/_next/static/chunks/995-ec9f7fd9638c9d04c3cf.js",revision:"b4BfBrZc9uzKPi7pVWWsm"},{url:"/_next/static/chunks/bee240a3.7e35ef5ec8a63504f79e.js",revision:"b4BfBrZc9uzKPi7pVWWsm"},{url:"/_next/static/chunks/f65a48b9.7f426d24f5a67bd87560.js",revision:"b4BfBrZc9uzKPi7pVWWsm"},{url:"/_next/static/chunks/framework-7673b675d0553dc06e87.js",revision:"b4BfBrZc9uzKPi7pVWWsm"},{url:"/_next/static/chunks/main-671d7573aad2fd1f3d95.js",revision:"b4BfBrZc9uzKPi7pVWWsm"},{url:"/_next/static/chunks/pages/%5B...slug%5D-c17744355b1d4ee72250.js",revision:"b4BfBrZc9uzKPi7pVWWsm"},{url:"/_next/static/chunks/pages/404-75f50e8f28ff2345b7fa.js",revision:"b4BfBrZc9uzKPi7pVWWsm"},{url:"/_next/static/chunks/pages/_app-849e1daf05c524d39205.js",revision:"b4BfBrZc9uzKPi7pVWWsm"},{url:"/_next/static/chunks/pages/_error-df6f2194198c75e1b17b.js",revision:"b4BfBrZc9uzKPi7pVWWsm"},{url:"/_next/static/chunks/pages/admin/%5B...slug%5D-475902f9034f785aea33.js",revision:"b4BfBrZc9uzKPi7pVWWsm"},{url:"/_next/static/chunks/pages/all-notes-9f8e168658255ccac2cc.js",revision:"b4BfBrZc9uzKPi7pVWWsm"},{url:"/_next/static/chunks/pages/index-b20df1dc1fc7d76a1374.js",revision:"b4BfBrZc9uzKPi7pVWWsm"},{url:"/_next/static/chunks/pages/patch-front-matter-fdcc3290358f2f220b79.js",revision:"b4BfBrZc9uzKPi7pVWWsm"},{url:"/_next/static/chunks/pages/terms-b2dcf21afade24257baf.js",revision:"b4BfBrZc9uzKPi7pVWWsm"},{url:"/_next/static/chunks/pages/terms/%5Bterm%5D-8b72a8160c3ea4afea75.js",revision:"b4BfBrZc9uzKPi7pVWWsm"},{url:"/_next/static/chunks/polyfills-bba4e3ae2a1f646feca8.js",revision:"b4BfBrZc9uzKPi7pVWWsm"},{url:"/_next/static/chunks/webpack-762bf5834dde04bc12c4.js",revision:"b4BfBrZc9uzKPi7pVWWsm"},{url:"/_next/static/css/bacc921737bba2c0344f.css",revision:"b4BfBrZc9uzKPi7pVWWsm"},{url:"/docs/An Introduction to Digital Philosophy.pdf",revision:"df5949c4212e49abdf2be68b8e628827"},{url:"/docs/Calculating Space - Konrad Zuse.pdf",revision:"fdf0cce3d0714bf626c2e2dab340fd39"},{url:"/docs/Notes on Sheldrake - Science Set Free.html",revision:"1fc7514259a365a968e46cd5efe7ef8b"},{url:"/docs/Notes on Unified Reality Theory The Evolution of Existence into Experience.html",revision:"2a2413351f5fa7e9a93ffee307ba2289"},{url:"/docs/Ollie and the Well of Being.gdoc",revision:"ce222c2ce4de91488ebf93604a246c9e"},{url:"/docs/Ollie and the Well of Being.pdf",revision:"8345b045a9699659aec77f05ee9abf7a"},{url:'/docs/Reading "My Big Toe, Awakening, Discovery, Inner Workings: A Trilogy Unifying Philosophy, Physics, and Metaphysics".gdoc',revision:"dab5fe6d2553967d58f004334761a7bb"},{url:"/docs/Reading the Kybalion - A Study of The Hermetic Philosophy- Notebook.html",revision:"10a87b90193f0dc912c931b4ac6f5a3c"},{url:"/docs/Sciurch_V1(4).pdf",revision:"dbfaaf7ce00a6e9906df412fe6697c23"},{url:"/docs/Sciurch_V1(5).pdf",revision:"07aa658f6b0d5c32af1eeba5f7560cdb"},{url:"/docs/Sciurch_V1-I Ching.pdf",revision:"03298e1681458aeb8e5a4f7519bba838"},{url:"/docs/Sciurch_V1-Lun Yu - Analects of Confucius.pdf",revision:"27e97dbc1355e7ca79ccbd230bd7f833"},{url:"/docs/Sciurch_V1-Tao Te Ching.pdf",revision:"80624d7d149f83eb5d07fa350bcffcbd"},{url:"/docs/Spin-Mediated Consciousness - Huping Hu and Maoxin Wu.pdf",revision:"6bf845f84e607d5594112a31b77a6825"},{url:"/docs/The Physical World as a Virtual Reality - Brian Whitworth.pdf",revision:"59167354ed09b3cd34809e13425dcabb"},{url:"/docs/The Well of Being (edited by Luis).gdoc",revision:"6078ed0f6bbde2dbad9780a32451dc83"},{url:"/docs/The Well of Being, print01.pdf",revision:"6680c2c5da9a0ace20d719f930fc4665"},{url:"/docs/The Well of Being, print02.pdf",revision:"2943052255d1b3f6cf6e2e80c862d2d2"},{url:"/docs/The emergence of the physical world from information processing - Brian Whitworth.pdf",revision:"e65d20f3f6db6553d3962e775ab65e93"},{url:"/docs/YesChef.pdf",revision:"34f268639982a7c6b489d0124776e5df"},{url:"/docs/commonplace.svg",revision:"b933cacf662462dc101a3098c9832527"},{url:"/docs/constructor theory of life - chiara marletto.pdf",revision:"be06273ff15cc88a70a37673882cd1de"},{url:"/docs/the simulation argument - nick bostrom.pdf",revision:"81e2bc940f5ac2d6de158a848ab8e533"},{url:"/favicons/browserconfig.xml",revision:"a4481f947e4584f2760ba19063d6dbf8"},{url:"/favicons/favicon-114x114.png",revision:"f610791e383a1f53acb549a500f4ad07"},{url:"/favicons/favicon-120x120.png",revision:"937d24ee2774d56a8b503b8cb0647a43"},{url:"/favicons/favicon-128x128.png",revision:"5bbad5bc8aaa87a0496718ce8aac1e60"},{url:"/favicons/favicon-144x144.png",revision:"da1519e5cc6c5c22331d13d5ec87d2de"},{url:"/favicons/favicon-150x150.png",revision:"fc6437e7d886ae571aad5a24d055e553"},{url:"/favicons/favicon-152x152.png",revision:"cccc20a72cd23af31a07463adda6ce73"},{url:"/favicons/favicon-16x16.png",revision:"37b1f839b33faf3ad6217df7b0b2608f"},{url:"/favicons/favicon-180x180.png",revision:"f16584b9756f16363595da1a7326ed80"},{url:"/favicons/favicon-192x192.png",revision:"e63a598e77351ad39b75229e6b84da49"},{url:"/favicons/favicon-310x310.png",revision:"aef0f3e525547d93ecacf3447341f503"},{url:"/favicons/favicon-32x32.png",revision:"0af528f32ba5ce3de30b14a5b31cd738"},{url:"/favicons/favicon-384x384.png",revision:"298d314335071782ad72d2330ed0368e"},{url:"/favicons/favicon-512x512.png",revision:"829ecdc6d1063c7f35e781e466a726a1"},{url:"/favicons/favicon-57x57.png",revision:"0c9cb521062786b94c853787e503d7aa"},{url:"/favicons/favicon-60x60.png",revision:"549b9a73d15d8d0a5f7fa78eb896aa37"},{url:"/favicons/favicon-70x70.png",revision:"5ee6c6ebf60011c614cf81dbe7e4661a"},{url:"/favicons/favicon-72x72.png",revision:"e6616d128ee2fa2624c2931e1bcd67de"},{url:"/favicons/favicon-76x76.png",revision:"92c0a4ae5717496aa7b5823146c47bce"},{url:"/favicons/favicon-96x96.png",revision:"2e42bae3c219b4ee6a0a9f135e58f183"},{url:"/favicons/favicon.ico",revision:"7f91bd4a0d2a2a85913b2c0fc0e1bc9d"},{url:"/favicons/manifest.json",revision:"445766b82b0f0368a4cd8e73bb40df41"},{url:"/feed.xml",revision:"4a7cc370d39b5000e86fa2a70a0da83a"},{url:"/fonts/recursive.woff2",revision:"ed8af16461534156ecebcf3f0362b8a8"},{url:"/images/2021-03-05-10-16-02.png",revision:"8e84bd4b8a4dae4822010517736a8f66"},{url:"/images/2021-03-05-10-43-55.png",revision:"c13a3fcf7d0046beabba2be6e0c87949"},{url:"/images/Chuck_Close's_Big_Self_Portrait.jpg",revision:"63b1f9055313086145f1286d3c0ca6f6"},{url:"/images/Hoffman-conscious-agents.png",revision:"2ef27cb8d5892d4c770cfd6337928304"},{url:"/images/Hulk_Hogan_Wrestlemanix_IX.jpg",revision:"f3241d1deeb6c62fab03350821a94089"},{url:"/images/IaaI-lotus.png",revision:"642cf118f9a3d629b9782347cc9593fa"},{url:"/images/Standard_Model_of_Elementary_Particles.png",revision:"84d88ccfa5374374a0c954fd61692a10"},{url:"/images/Stone-of-Davasko.jpg",revision:"d118aa5280ebad518175ed3914ccb920"},{url:"/images/The_Hindu_Kush_and_Passes_Between_the_Kabul_and_Oxus_WDL475.png",revision:"22595758ab1b291a9f30c5649faa359d"},{url:"/images/book-club-header-shall-we-begin.jpg",revision:"b435b0490b98a04bba6eb8c695523f83"},{url:"/images/book-club-header-shall-we-begin.png",revision:"00a2231edac0782e867f2ca0beaf24a6"},{url:"/images/butter-postulate.png",revision:"1d634537c43baa536bd3813ac9a84809"},{url:"/images/constellation-logo.svg",revision:"aac988431b85796457e9f9123b22a7b5"},{url:"/images/daily schedule.png",revision:"32978024d0e6eb4ec2fc3de86b9c8685"},{url:"/images/dudeinlimo2.jpg",revision:"e82d687e3b01cb4e5e6381309e6c4f37"},{url:"/images/excalidrawn.png",revision:"74b678b3a6bcd13306bfc8947e300756"},{url:"/images/excalidrawn.svg",revision:"c86d0e8e67ab908e44f00ba5887e413c"},{url:"/images/fall-of-icarus.jpg",revision:"2cab442a16ef0a6e69581d97da96b35d"},{url:"/images/hindu-kush-from-apollo-9.jpg",revision:"2e3bbb80c97bc2cc12e1d1852ab598ba"},{url:"/images/i-care-about-this-alot.png",revision:"9eca26f83842c6438695a910e3c8cdf2"},{url:"/images/image_0.png",revision:"a391c05edbcebcd8dc27b0b8e7e8dfba"},{url:"/images/image_picker8275955174599326002.jpg",revision:"a51b39131c0b3db2c4d2c57f22177ad7"},{url:"/images/information integration theory feedback loop.png",revision:"d971fa385acc6d888420ce4fc81eeda3"},{url:"/images/le-sigh.gif",revision:"0ff6f505c9a225cc1d8cf40c60d5424f"},{url:"/images/lotus.jpg",revision:"3ac13702812ab92ba1a0d50c497e9ac7"},{url:"/images/lotus.webp",revision:"db64538356697e9e0fe9968af8666c66"},{url:"/images/luis-del-rio-camacho-43059-unsplash.jpg",revision:"c4b704ee5d626a8db5b118e5af6185b4"},{url:"/images/macbook bros.jpg",revision:"190b8cde060d2cba6bb2342dad4ae797"},{url:"/images/matrix_goo_pods.jpg",revision:"d0af3a3a51ef4f167c64dfe1568e5e3f"},{url:"/images/not-a-plumbus.jpg",revision:"8cb2f83b0878da82c2006ec6cfee2c8a"},{url:"/images/pando-landscape.jpg",revision:"2418c863c0d87ef1b03f477fcaf0a6fe"},{url:"/images/service battery.png",revision:"b29fb6e51c14ff4865ee5d7624ae1400"},{url:"/images/the-treachery-of-images-this-is-not-a-pipe-1948.jpg",revision:"f1a02f68083921ea9d7f8b9acec4d844"},{url:"/images/where-shall-we-begin.jpg",revision:"2cd3c5505151c92fb770aeb10b5f73f9"},{url:"/images/yijing-cast.png",revision:"a2efc511212fa741940807b7f8346e73"},{url:"/logos/bagua.png",revision:"c8fe196946ab4ee14ac09ec64a3f6b20"},{url:"/logos/bloock.png",revision:"1c7a3f21b3a08c539c2be71a74fc7c7a"},{url:"/logos/bloor050.png",revision:"16ff92bcc82e0e6ef485838e8cfdd587"},{url:"/logos/logo-commonplace-side-indigo.svg",revision:"faead30d99d4dbcb95b16dee9592eec9"},{url:"/logos/logo-commonplace-side.svg",revision:"a3b77e2a734af051bde31c9f8ac6e1f0"},{url:"/logos/logo-commonplace-walk.svg",revision:"977f3b3915541856da8b8a1e3d8fd594"},{url:"/logos/logo-commonplace-wordmark.svg",revision:"819f2c4b80eafa70b705bebf595393ff"},{url:"/logos/logo-commonplace.svg",revision:"b933cacf662462dc101a3098c9832527"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:i,event:a,state:s})=>i&&"opaqueredirect"===i.type?new Response(i.body,{status:200,statusText:"OK",headers:i.headers}):i}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const i=e.pathname;return!i.startsWith("/api/auth/")&&!!i.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
