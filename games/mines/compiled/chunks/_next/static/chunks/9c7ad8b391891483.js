(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document?document.currentScript: void 0, 38447, (e, t, r) => {
  "use strict"; Object.defineProperty(r, "__esModule", {
    value: !0
  }); var n = {
    getDeploymentId: function() {
      return o
    }, getDeploymentIdQueryOrEmptyString: function() {
      return a
    }
  }; for(var i in n)Object.defineProperty(r, i, {
    enumerable: !0, get: n[i]
  }); function o() {
    return!1
  }
  function a() {
    return""
  }
}, 2879, (e, t, r) => {
  "use strict"; r._ = function(e) {
    return e && e.__esModule?e: {
      default: e
    }
  }
}, 887602, (e, t, r) => {
  "use strict"; function n(e) {
    if("function" != typeof WeakMap)return null; var t = new WeakMap, r = new WeakMap; return(n = function(e) {
      return e?r: t
    })(e)
  }
  r._ = function(e, t) {
    if(!t && e && e.__esModule)return e; if(null === e || "object" != typeof e && "function" != typeof e)return {
      default: e
    }; var r = n(t); if(r && r.has(e))return r.get(e); var i = {
      __proto__: null
    }, o = Object.defineProperty && Object.getOwnPropertyDescriptor; for(var a in e)if("default" !== a && Object.prototype.hasOwnProperty.call(e, a)) {
      var s = o?Object.getOwnPropertyDescriptor(e, a): null; s && (s.get || s.set)?Object.defineProperty(i, a, s): i[a] = e[a]
    }
    return i.default = e, r && r.set(e, i), i
  }
}, 231647, (e, t, r) => {
  "use strict"; Object.defineProperty(r, "__esModule", {
    value: !0
  }), Object.defineProperty(r, "HeadManagerContext", {
    enumerable: !0, get: function() {
      return n
    }
  }); let n = e.r(2879)._(e.r(389959)).default.createContext( {

  })
}, 344267, (e, t, r) => {
  "use strict"; Object.defineProperty(r, "__esModule", {
    value: !0
  }), Object.defineProperty(r, "warnOnce", {
    enumerable: !0, get: function() {
      return n
    }
  }); let n = e => {

  }
}, 469105, (e, t, r) => {
  "use strict"; Object.defineProperty(r, "__esModule", {
    value: !0
  }), Object.defineProperty(r, "RouterContext", {
    enumerable: !0, get: function() {
      return n
    }
  }); let n = e.r(2879)._(e.r(389959)).default.createContext(null)
}, 577288, (e, t, r) => {
  "use strict"; Object.defineProperty(r, "__esModule", {
    value: !0
  }); var n = {
    DecodeError: function() {
      return _
    }, MiddlewareNotFoundError: function() {
      return M
    }, MissingStaticPage: function() {
      return y
    }, NormalizeError: function() {
      return b
    }, PageNotFoundError: function() {
      return v
    }, SP: function() {
      return g
    }, ST: function() {
      return h
    }, WEB_VITALS: function() {
      return o
    }, execOnce: function() {
      return a
    }, getDisplayName: function() {
      return d
    }, getLocationOrigin: function() {
      return c
    }, getURL: function() {
      return l
    }, isAbsoluteUrl: function() {
      return u
    }, isResSent: function() {
      return f
    }, loadGetInitialProps: function() {
      return p
    }, normalizeRepeatedSlashes: function() {
      return m
    }, stringifyError: function() {
      return S
    }
  }; for(var i in n)Object.defineProperty(r, i, {
    enumerable: !0, get: n[i]
  }); let o = ["CLS", "FCP", "FID", "INP", "LCP", "TTFB"]; function a(e) {
    let t, r = !1; return(...n) => (r || (r = !0, t = e(...n)), t)
  }
  let s = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/, u = e => s.test(e); function c() {
    let {
      protocol: e, hostname: t, port: r
    }
    = window.location; return`${e}//${t}${r?":"+r:""}`
  }
  function l() {
    let {
      href: e
    }
    = window.location, t = c(); return e.substring(t.length)
  }
  function d(e) {
    return"string" == typeof e?e: e.displayName || e.name || "Unknown"
  }
  function f(e) {
    return e.finished || e.headersSent
  }
  function m(e) {
    let t = e.split("?"); return t[0].replace(/\\/g, "/").replace(/\/\/+/g, "/") + (t[1]?`?${t.slice(1).join("?")}`: "")
  }
  async function p(e, t) {
    let r = t.res || t.ctx && t.ctx.res; if(!e.getInitialProps)return t.ctx && t.Component? {
      pageProps: await p(t.Component, t.ctx)
    }
    : {

    }; let n = await e.getInitialProps(t); if(r && f(r))return n; if(!n)throw Object.defineProperty(Error(`"${d(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`), "__NEXT_ERROR_CODE", {
      value: "E394", enumerable: !1, configurable: !0
    }); return n
  }
  let g = "u">typeof performance, h = g && ["mark", "measure", "getEntriesByName"].every(e => "function" == typeof performance[e]); class _ extends Error {

  }
  class b extends Error {

  }
  class v extends Error {
    constructor(e) {
      super(), this.code = "ENOENT", this.name = "PageNotFoundError", this.message = `Cannot find module for page: ${e}`
    }
  }
  class y extends Error {
    constructor(e, t) {
      super(), this.message = `Failed to load static file for page: ${e} ${t}`
    }
  }
  class M extends Error {
    constructor() {
      super(), this.code = "ENOENT", this.message = "Cannot find the middleware module"
    }
  }
  function S(e) {
    return JSON.stringify( {
      message: e.message, stack: e.stack
    })
  }
}, 177044, (e, t, r) => {
  t.exports = e.r(770740)
}, 187742, e => {
  "use strict"; var t = e.i(389959); function r() {
    let[e, r] = (0, t.useState)( {
      width: 0, height: 0
    }); function n() {
      r( {
        width: window.innerWidth, height: window.innerHeight
      })
    }
    return(0, t.useEffect)(() => (window.addEventListener("resize", n), n(), () => {
      window.removeEventListener("resize", n)
    }), []), e
  }
  e.s(["default", () => r])
}, 129076, (e, t, r) => {
  "use strict"; Object.defineProperty(r, "__esModule", {
    value: !0
  }); var n = {
    VALID_LOADERS: function() {
      return o
    }, imageConfigDefault: function() {
      return a
    }
  }; for(var i in n)Object.defineProperty(r, i, {
    enumerable: !0, get: n[i]
  }); let o = ["default", "imgix", "cloudinary", "akamai", "custom"], a = {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], imageSizes: [32, 48, 64, 96, 128, 256, 384], path: "/_next/image", loader: "default", loaderFile: "", domains: [], disableStaticImages: !1, minimumCacheTTL: 14400, formats: ["image/webp"], maximumRedirects: 3, maximumResponseBody: 5e7, dangerouslyAllowLocalIP: !1, dangerouslyAllowSVG: !1, contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;", contentDispositionType: "attachment", localPatterns: void 0, remotePatterns: [], qualities: [75], unoptimized: !1
  }
}, 891710, (e, t, r) => {
  "use strict"; Object.defineProperty(r, "__esModule", {
    value: !0
  }), Object.defineProperty(r, "ImageConfigContext", {
    enumerable: !0, get: function() {
      return o
    }
  }); let n = e.r(2879)._(e.r(389959)), i = e.r(129076), o = n.default.createContext(i.imageConfigDefault)
}, 201695, (e, t, r) => {
  "use strict"; Object.defineProperty(r, "__esModule", {
    value: !0
  }); var n = {
    AppRouterContext: function() {
      return a
    }, GlobalLayoutRouterContext: function() {
      return u
    }, LayoutRouterContext: function() {
      return s
    }, MissingSlotContext: function() {
      return l
    }, TemplateContext: function() {
      return c
    }
  }; for(var i in n)Object.defineProperty(r, i, {
    enumerable: !0, get: n[i]
  }); let o = e.r(2879)._(e.r(389959)), a = o.default.createContext(null), s = o.default.createContext(null), u = o.default.createContext(null), c = o.default.createContext(null), l = o.default.createContext(new Set)
}, 708182, (e, t, r) => {
  "use strict"; Object.defineProperty(r, "__esModule", {
    value: !0
  }), Object.defineProperty(r, "ReadonlyURLSearchParams", {
    enumerable: !0, get: function() {
      return i
    }
  }); class n extends Error {
    constructor() {
      super("Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams")
    }
  }
  class i extends URLSearchParams {
    append() {
      throw new n
    }
    delete() {
      throw new n
    }
    set() {
      throw new n
    }
    sort() {
      throw new n
    }
  }
  ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", {
    value: !0
  }), Object.assign(r.default, r), t.exports = r.default)
}, 225601, (e, t, r) => {
  "use strict"; Object.defineProperty(r, "__esModule", {
    value: !0
  }); var n = {
    NavigationPromisesContext: function() {
      return l
    }, PathParamsContext: function() {
      return c
    }, PathnameContext: function() {
      return u
    }, ReadonlyURLSearchParams: function() {
      return a.ReadonlyURLSearchParams
    }, SearchParamsContext: function() {
      return s
    }, createDevToolsInstrumentedPromise: function() {
      return d
    }
  }; for(var i in n)Object.defineProperty(r, i, {
    enumerable: !0, get: n[i]
  }); let o = e.r(389959), a = e.r(708182), s = (0, o.createContext)(null), u = (0, o.createContext)(null), c = (0, o.createContext)(null), l = (0, o.createContext)(null); function d(e, t) {
    let r = Promise.resolve(t); return r.status = "fulfilled", r.value = t, r.displayName = `${e} (SSR)`, r
  }
}, 6203, (e, t, r) => {
  "use strict"; Object.defineProperty(r, "__esModule", {
    value: !0
  }); var n = {
    BailoutToCSRError: function() {
      return a
    }, isBailoutToCSRError: function() {
      return s
    }
  }; for(var i in n)Object.defineProperty(r, i, {
    enumerable: !0, get: n[i]
  }); let o = "BAILOUT_TO_CLIENT_SIDE_RENDERING"; class a extends Error {
    constructor(e) {
      super(`Bail out to client-side rendering: ${e}`), this.reason = e, this.digest = o
    }
  }
  function s(e) {
    return"object" == typeof e && null !== e && "digest"in e && e.digest === o
  }
}, 422094, (e, t, r) => {
  "use strict"; Object.defineProperty(r, "__esModule", {
    value: !0
  }); var n = {
    HTTPAccessErrorStatus: function() {
      return o
    }, HTTP_ERROR_FALLBACK_ERROR_CODE: function() {
      return s
    }, getAccessFallbackErrorTypeByStatus: function() {
      return l
    }, getAccessFallbackHTTPStatus: function() {
      return c
    }, isHTTPAccessFallbackError: function() {
      return u
    }
  }; for(var i in n)Object.defineProperty(r, i, {
    enumerable: !0, get: n[i]
  }); let o = {
    NOT_FOUND: 404, FORBIDDEN: 403, UNAUTHORIZED: 401
  }, a = new Set(Object.values(o)), s = "NEXT_HTTP_ERROR_FALLBACK"; function u(e) {
    if("object" != typeof e || null === e || !("digest"in e) || "string" != typeof e.digest)return!1; let[t, r] = e.digest.split(";"); return t === s && a.has(Number(r))
  }
  function c(e) {
    return Number(e.digest.split(";")[1])
  }
  function l(e) {
    switch(e) {
      case 401: return"unauthorized"; case 403: return"forbidden"; case 404: return"not-found"; default: return
    }
  }
  ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", {
    value: !0
  }), Object.assign(r.default, r), t.exports = r.default)
}, 868216, (e, t, r) => {
  "use strict"; Object.defineProperty(r, "__esModule", {
    value: !0
  }), Object.defineProperty(r, "RedirectStatusCode", {
    enumerable: !0, get: function() {
      return i
    }
  }); var n, i = ((n = {

  })[n.SeeOther = 303] = "SeeOther", n[n.TemporaryRedirect = 307] = "TemporaryRedirect", n[n.PermanentRedirect = 308] = "PermanentRedirect", n); ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", {
    value: !0
  }), Object.assign(r.default, r), t.exports = r.default)
}, 242137, (e, t, r) => {
  "use strict"; Object.defineProperty(r, "__esModule", {
    value: !0
  }); var n, i = {
    REDIRECT_ERROR_CODE: function() {
      return s
    }, RedirectType: function() {
      return u
    }, isRedirectError: function() {
      return c
    }
  }; for(var o in i)Object.defineProperty(r, o, {
    enumerable: !0, get: i[o]
  }); let a = e.r(868216), s = "NEXT_REDIRECT"; var u = ((n = {

  }).push = "push", n.replace = "replace", n); function c(e) {
    if("object" != typeof e || null === e || !("digest"in e) || "string" != typeof e.digest)return!1; let t = e.digest.split(";"), [r, n] = t, i = t.slice(2, -2).join(";"), o = Number(t.at(-2)); return r === s && ("replace" === n || "push" === n) && "string" == typeof i && !isNaN(o) && o in a.RedirectStatusCode
  }
  ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", {
    value: !0
  }), Object.assign(r.default, r), t.exports = r.default)
}, 870350, (e, t, r) => {
  "use strict"; Object.defineProperty(r, "__esModule", {
    value: !0
  }), Object.defineProperty(r, "isNextRouterError", {
    enumerable: !0, get: function() {
      return o
    }
  }); let n = e.r(422094), i = e.r(242137); function o(e) {
    return(0, i.isRedirectError)(e) || (0, n.isHTTPAccessFallbackError)(e)
  }
  ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", {
    value: !0
  }), Object.assign(r.default, r), t.exports = r.default)
}, 779405, e => {
  "use strict"; let t = {
    BLACKJACK: {
      CARD_SLIDE: {
        url: "../sounds/blackjackv2/card-slide-2.wav", speed: 2
      }, CARD_SLIDE_ALT: {
        url: "../sounds/blackjackv2/card-slide-1.wav", speed: 1.5
      }, CARD_FLIP: {
        url: "../sounds/blackjackv2/card-flip.wav"
      }, CLICK: {
        url: "../sounds/blackjackv2/click.wav", volume: 1, speed: .5
      }, COIN: {
        url: "../sounds/blackjackv2/coin-drop.wav", volume: .2
      }, COINS_SCATTER: {
        url: "../sounds/blackjackv2/coins-scatter.wav", delay: .4, volume: .7
      }, HINT: {
        url: "../sounds/blackjackv2/hint.mp3", volume: .5
      }, WIN: {
        url: "../sounds/blackjackv2/win.mp3", speed: 1.2
      }
    }, DICE: {
      ROLL: {
        url: "../sounds/dice-roll.wav"
      }, WIN: {
        url: "../sounds/dice-win.mp3"
      }
    }, UPGRADER: {
      UPGRADE: {
        url: "../sounds/upgrader-sound.mp3", volume: .4
      }
    }, CASES: {
      TICK: {
        url: "../sounds/wheel_tick.mp3", volume: .4
      }, WIN: {
        url: "../sounds/wheel_win.mp3"
      }
    }, MINES: {
      SUSPENSE: {
        url: "../sounds/suspense.mp3", volume: .15
      }, EXPLOSION: {
        url: "../sounds/explosion.mp3", volume: .4
      }, GOOD: {
        url: "../sounds/good.mp3", volume: .3
      }, BIG_CASHOUT: {
        url: "../sounds/big_cashout.mp3", volume: .2
      }
    }, TOWERS: {
      BREAK: {
        url: "../sounds/break.mp3", volume: .2
      }, STOMP: {
        url: "../sounds/stomp.mp3", volume: .2
      }, BIG_CASHOUT: {
        url: "../sounds/big_cashout.mp3", volume: .2
      }
    }
  }; e.s(["SOUNDS", 0, t, "playSoundEffect", 0, e => {
    let t = new Audio(e.url); if(t.currentTime = e.start || 0, t.volume = e.volume || 1, t.playbackRate = e.speed || 1, setTimeout(() => {
      t.play().catch(e => console.warn("Sound Effect Error:", e))
    }, 1e3*(e.delay || 0)), e.end) {
      let r = setTimeout(() => {
        t.pause(), t.currentTime = 0, clearTimeout(r)
      }, 1e3*e.end)
    }
    return t
  }, "preloadAllSounds", 0, () => {
    let e = {

    }; for(let r in t) {
      let n = t[r]; for(let t in e[r] = {

      }, n) {
        let i = new Audio(n[t].url); i.preload = "auto", i.load(), e[r][t] = i
      }
    }
  }])
}, 481280, (e, t, r) => {
  e.e, t.exports = function() {
    var e = {
      17: function(e, t, r) {
        "use strict"; t.__esModule = !0, t.default = void 0; var n = r(18); t.default = function() {
          function e() {

          }
          return e.getFirstMatch = function(e, t) {
            var r = t.match(e); return r && r.length>0 && r[1] || ""
          }, e.getSecondMatch = function(e, t) {
            var r = t.match(e); return r && r.length>1 && r[2] || ""
          }, e.matchAndReturnConst = function(e, t, r) {
            if(e.test(t))return r
          }, e.getWindowsVersionName = function(e) {
            switch(e) {
              case"NT": return"NT"; case"XP": case"NT 5.1": return"XP"; case"NT 5.0": return"2000"; case"NT 5.2": return"2003"; case"NT 6.0": return"Vista"; case"NT 6.1": return"7"; case"NT 6.2": return"8"; case"NT 6.3": return"8.1"; case"NT 10.0": return"10"; default: return
            }
          }, e.getMacOSVersionName = function(e) {
            var t = e.split(".").splice(0, 2).map(function(e) {
              return parseInt(e, 10) || 0
            }); t.push(0); var r = t[0], n = t[1]; if(10 === r)switch(n) {
              case 5: return"Leopard"; case 6: return"Snow Leopard"; case 7: return"Lion"; case 8: return"Mountain Lion"; case 9: return"Mavericks"; case 10: return"Yosemite"; case 11: return"El Capitan"; case 12: return"Sierra"; case 13: return"High Sierra"; case 14: return"Mojave"; case 15: return"Catalina"; default: return
            }
            switch(r) {
              case 11: return"Big Sur"; case 12: return"Monterey"; case 13: return"Ventura"; case 14: return"Sonoma"; case 15: return"Sequoia"; default: return
            }
          }, e.getAndroidVersionName = function(e) {
            var t = e.split(".").splice(0, 2).map(function(e) {
              return parseInt(e, 10) || 0
            }); if(t.push(0), !(1 === t[0] && t[1]<5))return 1 === t[0] && t[1]<6?"Cupcake": 1 === t[0] && t[1] >= 6?"Donut": 2 === t[0] && t[1]<2?"Eclair": 2 === t[0] && 2 === t[1]?"Froyo": 2 === t[0] && t[1]>2?"Gingerbread": 3 === t[0]?"Honeycomb": 4 === t[0] && t[1]<1?"Ice Cream Sandwich": 4 === t[0] && t[1]<4?"Jelly Bean": 4 === t[0] && t[1] >= 4?"KitKat": 5 === t[0]?"Lollipop": 6 === t[0]?"Marshmallow": 7 === t[0]?"Nougat": 8 === t[0]?"Oreo": 9 === t[0]?"Pie": void 0
          }, e.getVersionPrecision = function(e) {
            return e.split(".").length
          }, e.compareVersions = function(t, r, n) {
            void 0 === n && (n = !1); var i = e.getVersionPrecision(t), o = e.getVersionPrecision(r), a = Math.max(i, o), s = 0, u = e.map([t, r], function(t) {
              var r = a - e.getVersionPrecision(t), n = t + Array(r + 1).join(".0"); return e.map(n.split("."), function(e) {
                return Array(20 - e.length).join("0") + e
              }).reverse()
            }); for(n && (s = a - Math.min(i, o)), a -= 1; a >= s; ) {
              if(u[0][a]>u[1][a])return 1; if(u[0][a] === u[1][a]) {
                if(a === s)return 0; a -= 1
              }else if(u[0][a]<u[1][a])return - 1
            }
          }, e.map = function(e, t) {
            var r, n = []; if(Array.prototype.map)return Array.prototype.map.call(e, t); for(r = 0; r<e.length; r += 1)n.push(t(e[r])); return n
          }, e.find = function(e, t) {
            var r, n; if(Array.prototype.find)return Array.prototype.find.call(e, t); for(r = 0, n = e.length; r<n; r += 1) {
              var i = e[r]; if(t(i, r))return i
            }
          }, e.assign = function(e) {
            for(var t = arguments.length, r = Array(t>1?t - 1: 0), n = 1; n<t; n++)r[n - 1] = arguments[n]; return Object.assign.apply(Object, [e].concat(r))
          }, e.getBrowserAlias = function(e) {
            return n.BROWSER_ALIASES_MAP[e]
          }, e.getBrowserTypeByAlias = function(e) {
            return n.BROWSER_MAP[e] || ""
          }, e
        }
        (), e.exports = t.default
      }, 18: function(e, t, r) {
        "use strict"; t.__esModule = !0, t.ENGINE_MAP = t.OS_MAP = t.PLATFORMS_MAP = t.BROWSER_MAP = t.BROWSER_ALIASES_MAP = void 0, t.BROWSER_ALIASES_MAP = {
          AmazonBot: "amazonbot", "Amazon Silk": "amazon_silk", "Android Browser": "android", BaiduSpider: "baiduspider", Bada: "bada", BingCrawler: "bingcrawler", Brave: "brave", BlackBerry: "blackberry", "ChatGPT-User": "chatgpt_user", Chrome: "chrome", ClaudeBot: "claudebot", Chromium: "chromium", Diffbot: "diffbot", DuckDuckBot: "duckduckbot", DuckDuckGo: "duckduckgo", Electron: "electron", Epiphany: "epiphany", FacebookExternalHit: "facebookexternalhit", Firefox: "firefox", Focus: "focus", Generic: "generic", "Google Search": "google_search", Googlebot: "googlebot", GPTBot: "gptbot", "Internet Explorer": "ie", InternetArchiveCrawler: "internetarchivecrawler", "K-Meleon": "k_meleon", LibreWolf: "librewolf", Linespider: "linespider", Maxthon: "maxthon", "Meta-ExternalAds": "meta_externalads", "Meta-ExternalAgent": "meta_externalagent", "Meta-ExternalFetcher": "meta_externalfetcher", "Meta-WebIndexer": "meta_webindexer", "Microsoft Edge": "edge", "MZ Browser": "mz", "NAVER Whale Browser": "naver", "OAI-SearchBot": "oai_searchbot", Omgilibot: "omgilibot", Opera: "opera", "Opera Coast": "opera_coast", "Pale Moon": "pale_moon", PerplexityBot: "perplexitybot", "Perplexity-User": "perplexity_user", PhantomJS: "phantomjs", PingdomBot: "pingdombot", Puffin: "puffin", QQ: "qq", QQLite: "qqlite", QupZilla: "qupzilla", Roku: "roku", Safari: "safari", Sailfish: "sailfish", "Samsung Internet for Android": "samsung_internet", SlackBot: "slackbot", SeaMonkey: "seamonkey", Sleipnir: "sleipnir", "Sogou Browser": "sogou", Swing: "swing", Tizen: "tizen", "UC Browser": "uc", Vivaldi: "vivaldi", "WebOS Browser": "webos", WeChat: "wechat", YahooSlurp: "yahooslurp", "Yandex Browser": "yandex", YandexBot: "yandexbot", YouBot: "youbot"
        }, t.BROWSER_MAP = {
          amazonbot: "AmazonBot", amazon_silk: "Amazon Silk", android: "Android Browser", baiduspider: "BaiduSpider", bada: "Bada", bingcrawler: "BingCrawler", blackberry: "BlackBerry", brave: "Brave", chatgpt_user: "ChatGPT-User", chrome: "Chrome", claudebot: "ClaudeBot", chromium: "Chromium", diffbot: "Diffbot", duckduckbot: "DuckDuckBot", duckduckgo: "DuckDuckGo", edge: "Microsoft Edge", electron: "Electron", epiphany: "Epiphany", facebookexternalhit: "FacebookExternalHit", firefox: "Firefox", focus: "Focus", generic: "Generic", google_search: "Google Search", googlebot: "Googlebot", gptbot: "GPTBot", ie: "Internet Explorer", internetarchivecrawler: "InternetArchiveCrawler", k_meleon: "K-Meleon", librewolf: "LibreWolf", linespider: "Linespider", maxthon: "Maxthon", meta_externalads: "Meta-ExternalAds", meta_externalagent: "Meta-ExternalAgent", meta_externalfetcher: "Meta-ExternalFetcher", meta_webindexer: "Meta-WebIndexer", mz: "MZ Browser", naver: "NAVER Whale Browser", oai_searchbot: "OAI-SearchBot", omgilibot: "Omgilibot", opera: "Opera", opera_coast: "Opera Coast", pale_moon: "Pale Moon", perplexitybot: "PerplexityBot", perplexity_user: "Perplexity-User", phantomjs: "PhantomJS", pingdombot: "PingdomBot", puffin: "Puffin", qq: "QQ Browser", qqlite: "QQ Browser Lite", qupzilla: "QupZilla", roku: "Roku", safari: "Safari", sailfish: "Sailfish", samsung_internet: "Samsung Internet for Android", seamonkey: "SeaMonkey", slackbot: "SlackBot", sleipnir: "Sleipnir", sogou: "Sogou Browser", swing: "Swing", tizen: "Tizen", uc: "UC Browser", vivaldi: "Vivaldi", webos: "WebOS Browser", wechat: "WeChat", yahooslurp: "YahooSlurp", yandex: "Yandex Browser", yandexbot: "YandexBot", youbot: "YouBot"
        }, t.PLATFORMS_MAP = {
          bot: "bot", desktop: "desktop", mobile: "mobile", tablet: "tablet", tv: "tv"
        }, t.OS_MAP = {
          Android: "Android", Bada: "Bada", BlackBerry: "BlackBerry", ChromeOS: "Chrome OS", HarmonyOS: "HarmonyOS", iOS: "iOS", Linux: "Linux", MacOS: "macOS", PlayStation4: "PlayStation 4", Roku: "Roku", Tizen: "Tizen", WebOS: "WebOS", Windows: "Windows", WindowsPhone: "Windows Phone"
        }, t.ENGINE_MAP = {
          Blink: "Blink", EdgeHTML: "EdgeHTML", Gecko: "Gecko", Presto: "Presto", Trident: "Trident", WebKit: "WebKit"
        }
      }, 90: function(e, t, r) {
        "use strict"; t.__esModule = !0, t.default = void 0; var n, i = (n = r(91)) && n.__esModule?n: {
          default: n
        }, o = r(18); t.default = function() {
          function e() {

          }
          return e.getParser = function(e, t, r) {
            if(void 0 === t && (t = !1), void 0 === r && (r = null), "string" != typeof e)throw Error("UserAgent should be a string"); return new i.default(e, t, r)
          }, e.parse = function(e, t) {
            return void 0 === t && (t = null), new i.default(e, t).getResult()
          }, function(e, t) {
            for(var r = 0; r<t.length; r++) {
              var n = t[r]; n.enumerable = n.enumerable || !1, n.configurable = !0, "value"in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
          }
          (e, [ {
            key: "BROWSER_MAP", get: function() {
              return o.BROWSER_MAP
            }
          }, {
            key: "ENGINE_MAP", get: function() {
              return o.ENGINE_MAP
            }
          }, {
            key: "OS_MAP", get: function() {
              return o.OS_MAP
            }
          }, {
            key: "PLATFORMS_MAP", get: function() {
              return o.PLATFORMS_MAP
            }
          }]), e
        }
        (), e.exports = t.default
      }, 91: function(e, t, r) {
        "use strict"; t.__esModule = !0, t.default = void 0; var n = u(r(92)), i = u(r(93)), o = u(r(94)), a = u(r(95)), s = u(r(17)); function u(e) {
          return e && e.__esModule?e: {
            default: e
          }
        }
        t.default = function() {
          function e(e, t, r) {
            if(void 0 === t && (t = !1), void 0 === r && (r = null), null == e || "" === e)throw Error("UserAgent parameter can't be empty"); this._ua = e; var n = !1; "boolean" == typeof t?(n = t, this._hints = r): this._hints = null != t && "object" == typeof t?t: null, this.parsedResult = {

            }, !0 !== n && this.parse()
          }
          var t = e.prototype; return t.getHints = function() {
            return this._hints
          }, t.hasBrand = function(e) {
            if(!this._hints || !Array.isArray(this._hints.brands))return!1; var t = e.toLowerCase(); return this._hints.brands.some(function(e) {
              return e.brand && e.brand.toLowerCase() === t
            })
          }, t.getBrandVersion = function(e) {
            if(this._hints && Array.isArray(this._hints.brands)) {
              var t = e.toLowerCase(), r = this._hints.brands.find(function(e) {
                return e.brand && e.brand.toLowerCase() === t
              }); return r?r.version: void 0
            }
          }, t.getUA = function() {
            return this._ua
          }, t.test = function(e) {
            return e.test(this._ua)
          }, t.parseBrowser = function() {
            var e = this; this.parsedResult.browser = {

            }; var t = s.default.find(n.default, function(t) {
              if("function" == typeof t.test)return t.test(e); if(Array.isArray(t.test))return t.test.some(function(t) {
                return e.test(t)
              }); throw Error("Browser's test function is not valid")
            }); return t && (this.parsedResult.browser = t.describe(this.getUA(), this)), this.parsedResult.browser
          }, t.getBrowser = function() {
            return this.parsedResult.browser?this.parsedResult.browser: this.parseBrowser()
          }, t.getBrowserName = function(e) {
            return e?String(this.getBrowser().name).toLowerCase() || "": this.getBrowser().name || ""
          }, t.getBrowserVersion = function() {
            return this.getBrowser().version
          }, t.getOS = function() {
            return this.parsedResult.os?this.parsedResult.os: this.parseOS()
          }, t.parseOS = function() {
            var e = this; this.parsedResult.os = {

            }; var t = s.default.find(i.default, function(t) {
              if("function" == typeof t.test)return t.test(e); if(Array.isArray(t.test))return t.test.some(function(t) {
                return e.test(t)
              }); throw Error("Browser's test function is not valid")
            }); return t && (this.parsedResult.os = t.describe(this.getUA())), this.parsedResult.os
          }, t.getOSName = function(e) {
            var t = this.getOS().name; return e?String(t).toLowerCase() || "": t || ""
          }, t.getOSVersion = function() {
            return this.getOS().version
          }, t.getPlatform = function() {
            return this.parsedResult.platform?this.parsedResult.platform: this.parsePlatform()
          }, t.getPlatformType = function(e) {
            void 0 === e && (e = !1); var t = this.getPlatform().type; return e?String(t).toLowerCase() || "": t || ""
          }, t.parsePlatform = function() {
            var e = this; this.parsedResult.platform = {

            }; var t = s.default.find(o.default, function(t) {
              if("function" == typeof t.test)return t.test(e); if(Array.isArray(t.test))return t.test.some(function(t) {
                return e.test(t)
              }); throw Error("Browser's test function is not valid")
            }); return t && (this.parsedResult.platform = t.describe(this.getUA())), this.parsedResult.platform
          }, t.getEngine = function() {
            return this.parsedResult.engine?this.parsedResult.engine: this.parseEngine()
          }, t.getEngineName = function(e) {
            return e?String(this.getEngine().name).toLowerCase() || "": this.getEngine().name || ""
          }, t.parseEngine = function() {
            var e = this; this.parsedResult.engine = {

            }; var t = s.default.find(a.default, function(t) {
              if("function" == typeof t.test)return t.test(e); if(Array.isArray(t.test))return t.test.some(function(t) {
                return e.test(t)
              }); throw Error("Browser's test function is not valid")
            }); return t && (this.parsedResult.engine = t.describe(this.getUA())), this.parsedResult.engine
          }, t.parse = function() {
            return this.parseBrowser(), this.parseOS(), this.parsePlatform(), this.parseEngine(), this
          }, t.getResult = function() {
            return s.default.assign( {

            }, this.parsedResult)
          }, t.satisfies = function(e) {
            var t = this, r = {

            }, n = 0, i = {

            }, o = 0; if(Object.keys(e).forEach(function(t) {
              var a = e[t]; "string" == typeof a?(i[t] = a, o += 1): "object" == typeof a && (r[t] = a, n += 1)
            }), n>0) {
              var a = Object.keys(r), u = s.default.find(a, function(e) {
                return t.isOS(e)
              }); if(u) {
                var c = this.satisfies(r[u]); if(void 0 !== c)return c
              }
              var l = s.default.find(a, function(e) {
                return t.isPlatform(e)
              }); if(l) {
                var d = this.satisfies(r[l]); if(void 0 !== d)return d
              }
            }
            if(o>0) {
              var f = Object.keys(i), m = s.default.find(f, function(e) {
                return t.isBrowser(e, !0)
              }); if(void 0 !== m)return this.compareVersion(i[m])
            }
          }, t.isBrowser = function(e, t) {
            void 0 === t && (t = !1); var r = this.getBrowserName().toLowerCase(), n = e.toLowerCase(), i = s.default.getBrowserTypeByAlias(n); return t && i && (n = i.toLowerCase()), n === r
          }, t.compareVersion = function(e) {
            var t = [0], r = e, n = !1, i = this.getBrowserVersion(); if("string" == typeof i)return">" === e[0] || "<" === e[0]?(r = e.substr(1), "=" === e[1]?(n = !0, r = e.substr(2)): t = [], ">" === e[0]?t.push(1): t.push(-1)): "=" === e[0]?r = e.substr(1): "~" === e[0] && (n = !0, r = e.substr(1)), t.indexOf(s.default.compareVersions(i, r, n))>-1
          }, t.isOS = function(e) {
            return this.getOSName(!0) === String(e).toLowerCase()
          }, t.isPlatform = function(e) {
            return this.getPlatformType(!0) === String(e).toLowerCase()
          }, t.isEngine = function(e) {
            return this.getEngineName(!0) === String(e).toLowerCase()
          }, t.is = function(e, t) {
            return void 0 === t && (t = !1), this.isBrowser(e, t) || this.isOS(e) || this.isPlatform(e)
          }, t.some = function(e) {
            var t = this; return void 0 === e && (e = []), e.some(function(e) {
              return t.is(e)
            })
          }, e
        }
        (), e.exports = t.default
      }, 92: function(e, t, r) {
        "use strict"; t.__esModule = !0, t.default = void 0; var n, i = (n = r(17)) && n.__esModule?n: {
          default: n
        }, o = /version\/(\d+(\.?_?\d+)+)/i; t.default = [ {
          test: [/gptbot/i], describe: function(e) {
            var t = {
              name: "GPTBot"
            }, r = i.default.getFirstMatch(/gptbot\/(\d+(\.\d+)+)/i, e) || i.default.getFirstMatch(o, e); return r && (t.version = r), t
          }
        }, {
          test: [/chatgpt-user/i], describe: function(e) {
            var t = {
              name: "ChatGPT-User"
            }, r = i.default.getFirstMatch(/chatgpt-user\/(\d+(\.\d+)+)/i, e) || i.default.getFirstMatch(o, e); return r && (t.version = r), t
          }
        }, {
          test: [/oai-searchbot/i], describe: function(e) {
            var t = {
              name: "OAI-SearchBot"
            }, r = i.default.getFirstMatch(/oai-searchbot\/(\d+(\.\d+)+)/i, e) || i.default.getFirstMatch(o, e); return r && (t.version = r), t
          }
        }, {
          test: [/claudebot/i, /claude-web/i, /claude-user/i, /claude-searchbot/i], describe: function(e) {
            var t = {
              name: "ClaudeBot"
            }, r = i.default.getFirstMatch(/(?:claudebot|claude-web|claude-user|claude-searchbot)\/(\d+(\.\d+)+)/i, e) || i.default.getFirstMatch(o, e); return r && (t.version = r), t
          }
        }, {
          test: [/omgilibot/i, /webzio-extended/i], describe: function(e) {
            var t = {
              name: "Omgilibot"
            }, r = i.default.getFirstMatch(/(?:omgilibot|webzio-extended)\/(\d+(\.\d+)+)/i, e) || i.default.getFirstMatch(o, e); return r && (t.version = r), t
          }
        }, {
          test: [/diffbot/i], describe: function(e) {
            var t = {
              name: "Diffbot"
            }, r = i.default.getFirstMatch(/diffbot\/(\d+(\.\d+)+)/i, e) || i.default.getFirstMatch(o, e); return r && (t.version = r), t
          }
        }, {
          test: [/perplexitybot/i], describe: function(e) {
            var t = {
              name: "PerplexityBot"
            }, r = i.default.getFirstMatch(/perplexitybot\/(\d+(\.\d+)+)/i, e) || i.default.getFirstMatch(o, e); return r && (t.version = r), t
          }
        }, {
          test: [/perplexity-user/i], describe: function(e) {
            var t = {
              name: "Perplexity-User"
            }, r = i.default.getFirstMatch(/perplexity-user\/(\d+(\.\d+)+)/i, e) || i.default.getFirstMatch(o, e); return r && (t.version = r), t
          }
        }, {
          test: [/youbot/i], describe: function(e) {
            var t = {
              name: "YouBot"
            }, r = i.default.getFirstMatch(/youbot\/(\d+(\.\d+)+)/i, e) || i.default.getFirstMatch(o, e); return r && (t.version = r), t
          }
        }, {
          test: [/meta-webindexer/i], describe: function(e) {
            var t = {
              name: "Meta-WebIndexer"
            }, r = i.default.getFirstMatch(/meta-webindexer\/(\d+(\.\d+)+)/i, e) || i.default.getFirstMatch(o, e); return r && (t.version = r), t
          }
        }, {
          test: [/meta-externalads/i], describe: function(e) {
            var t = {
              name: "Meta-ExternalAds"
            }, r = i.default.getFirstMatch(/meta-externalads\/(\d+(\.\d+)+)/i, e) || i.default.getFirstMatch(o, e); return r && (t.version = r), t
          }
        }, {
          test: [/meta-externalagent/i], describe: function(e) {
            var t = {
              name: "Meta-ExternalAgent"
            }, r = i.default.getFirstMatch(/meta-externalagent\/(\d+(\.\d+)+)/i, e) || i.default.getFirstMatch(o, e); return r && (t.version = r), t
          }
        }, {
          test: [/meta-externalfetcher/i], describe: function(e) {
            var t = {
              name: "Meta-ExternalFetcher"
            }, r = i.default.getFirstMatch(/meta-externalfetcher\/(\d+(\.\d+)+)/i, e) || i.default.getFirstMatch(o, e); return r && (t.version = r), t
          }
        }, {
          test: [/googlebot/i], describe: function(e) {
            var t = {
              name: "Googlebot"
            }, r = i.default.getFirstMatch(/googlebot\/(\d+(\.\d+))/i, e) || i.default.getFirstMatch(o, e); return r && (t.version = r), t
          }
        }, {
          test: [/linespider/i], describe: function(e) {
            var t = {
              name: "Linespider"
            }, r = i.default.getFirstMatch(/(?:linespider)(?:-[-\w]+)?[\s/](\d + (\.\d + ) + )/i, e) || i.default.getFirstMatch(o, e); return r && (t.version = r), t
          }
        }, {
          test: [/amazonbot/i], describe: function(e) {
            var t = {
              name: "AmazonBot"
            }, r = i.default.getFirstMatch(/amazonbot\/(\d+(\.\d+)+)/i, e) || i.default.getFirstMatch(o, e); return r && (t.version = r), t
          }
        }, {
          test: [/bingbot/i], describe: function(e) {
            var t = {
              name: "BingCrawler"
            }, r = i.default.getFirstMatch(/bingbot\/(\d+(\.\d+)+)/i, e) || i.default.getFirstMatch(o, e); return r && (t.version = r), t
          }
        }, {
          test: [/baiduspider/i], describe: function(e) {
            var t = {
              name: "BaiduSpider"
            }, r = i.default.getFirstMatch(/baiduspider\/(\d+(\.\d+)+)/i, e) || i.default.getFirstMatch(o, e); return r && (t.version = r), t
          }
        }, {
          test: [/duckduckbot/i], describe: function(e) {
            var t = {
              name: "DuckDuckBot"
            }, r = i.default.getFirstMatch(/duckduckbot\/(\d+(\.\d+)+)/i, e) || i.default.getFirstMatch(o, e); return r && (t.version = r), t
          }
        }, {
          test: [/ia_archiver/i], describe: function(e) {
            var t = {
              name: "InternetArchiveCrawler"
            }, r = i.default.getFirstMatch(/ia_archiver\/(\d+(\.\d+)+)/i, e) || i.default.getFirstMatch(o, e); return r && (t.version = r), t
          }
        }, {
          test: [/facebookexternalhit/i, /facebookcatalog/i], describe: function() {
            return {
              name: "FacebookExternalHit"
            }
          }
        }, {
          test: [/slackbot/i, /slack-imgProxy/i], describe: function(e) {
            var t = {
              name: "SlackBot"
            }, r = i.default.getFirstMatch(/(?:slackbot|slack-imgproxy)(?:-[-\w]+)?[\s/](\d + (\.\d + ) + )/i, e) || i.default.getFirstMatch(o, e); return r && (t.version = r), t
          }
        }, {
          test: [/yahoo!?[\s/]*slurp/i], describe: function() {
            return {
              name: "YahooSlurp"
            }
          }
        }, {
          test: [/yandexbot/i, /yandexmobilebot/i], describe: function() {
            return {
              name: "YandexBot"
            }
          }
        }, {
          test: [/pingdom/i], describe: function() {
            return {
              name: "PingdomBot"
            }
          }
        }, {
          test: [/opera/i], describe: function(e) {
            var t = {
              name: "Opera"
            }, r = i.default.getFirstMatch(o, e) || i.default.getFirstMatch(/(?:opera)[\s/](\d + (\.?_?\d + ) + )/i, e); return r && (t.version = r), t
          }
        }, {
          test: [/opr\/|opios/i], describe: function(e) {
            var t = {
              name: "Opera"
            }, r = i.default.getFirstMatch(/(?:opr|opios)[\s/](\S + )/i, e) || i.default.getFirstMatch(o, e); return r && (t.version = r), t
          }
        }, {
          test: [/SamsungBrowser/i], describe: function(e) {
            var t = {
              name: "Samsung Internet for Android"
            }, r = i.default.getFirstMatch(o, e) || i.default.getFirstMatch(/(?:SamsungBrowser)[\s/](\d + (\.?_?\d + ) + )/i, e); return r && (t.version = r), t
          }
        }, {
          test: [/Whale/i], describe: function(e) {
            var t = {
              name: "NAVER Whale Browser"
            }, r = i.default.getFirstMatch(o, e) || i.default.getFirstMatch(/(?:whale)[\s/](\d + (?: \.\d + ) + )/i, e); return r && (t.version = r), t
          }
        }, {
          test: [/PaleMoon/i], describe: function(e) {
            var t = {
              name: "Pale Moon"
            }, r = i.default.getFirstMatch(o, e) || i.default.getFirstMatch(/(?:PaleMoon)[\s/](\d + (?: \.\d + ) + )/i, e); return r && (t.version = r), t
          }
        }, {
          test: [/MZBrowser/i], describe: function(e) {
            var t = {
              name: "MZ Browser"
            }, r = i.default.getFirstMatch(/(?:MZBrowser)[\s/](\d + (?: \.\d + ) + )/i, e) || i.default.getFirstMatch(o, e); return r && (t.version = r), t
          }
        }, {
          test: [/focus/i], describe: function(e) {
            var t = {
              name: "Focus"
            }, r = i.default.getFirstMatch(/(?:focus)[\s/](\d + (?: \.\d + ) + )/i, e) || i.default.getFirstMatch(o, e); return r && (t.version = r), t
          }
        }, {
          test: [/swing/i], describe: function(e) {
            var t = {
              name: "Swing"
            }, r = i.default.getFirstMatch(/(?:swing)[\s/](\d + (?: \.\d + ) + )/i, e) || i.default.getFirstMatch(o, e); return r && (t.version = r), t
          }
        }, {
          test: [/coast/i], describe: function(e) {
            var t = {
              name: "Opera Coast"
            }, r = i.default.getFirstMatch(o, e) || i.default.getFirstMatch(/(?:coast)[\s/](\d + (\.?_?\d + ) + )/i, e); return r && (t.version = r), t
          }
        }, {
          test: [/opt\/\d+(?:.?_?\d+)+/i], describe: function(e) {
            var t = {
              name: "Opera Touch"
            }, r = i.default.getFirstMatch(/(?:opt)[\s/](\d + (\.?_?\d + ) + )/i, e) || i.default.getFirstMatch(o, e); return r && (t.version = r), t
          }
        }, {
          test: [/yabrowser/i], describe: function(e) {
            var t = {
              name: "Yandex Browser"
            }, r = i.default.getFirstMatch(/(?:yabrowser)[\s/](\d + (\.?_?\d + ) + )/i, e) || i.default.getFirstMatch(o, e); return r && (t.version = r), t
          }
        }, {
          test: [/ucbrowser/i], describe: function(e) {
            var t = {
              name: "UC Browser"
            }, r = i.default.getFirstMatch(o, e) || i.default.getFirstMatch(/(?:ucbrowser)[\s/](\d + (\.?_?\d + ) + )/i, e); return r && (t.version = r), t
          }
        }, {
          test: [/Maxthon|mxios/i], describe: function(e) {
            var t = {
              name: "Maxthon"
            }, r = i.default.getFirstMatch(o, e) || i.default.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d + (\.?_?\d + ) + )/i, e); return r && (t.version = r), t
          }
        }, {
          test: [/epiphany/i], describe: function(e) {
            var t = {
              name: "Epiphany"
            }, r = i.default.getFirstMatch(o, e) || i.default.getFirstMatch(/(?:epiphany)[\s/](\d + (\.?_?\d + ) + )/i, e); return r && (t.version = r), t
          }
        }, {
          test: [/puffin/i], describe: function(e) {
            var t = {
              name: "Puffin"
            }, r = i.default.getFirstMatch(o, e) || i.default.getFirstMatch(/(?:puffin)[\s/](\d + (\.?_?\d + ) + )/i, e); return r && (t.version = r), t
          }
        }, {
          test: [/sleipnir/i], describe: function(e) {
            var t = {
              name: "Sleipnir"
            }, r = i.default.getFirstMatch(o, e) || i.default.getFirstMatch(/(?:sleipnir)[\s/](\d + (\.?_?\d + ) + )/i, e); return r && (t.version = r), t
          }
        }, {
          test: [/k-meleon/i], describe: function(e) {
            var t = {
              name: "K-Meleon"
            }, r = i.default.getFirstMatch(o, e) || i.default.getFirstMatch(/(?:k-meleon)[\s/](\d + (\.?_?\d + ) + )/i, e); return r && (t.version = r), t
          }
        }, {
          test: [/micromessenger/i], describe: function(e) {
            var t = {
              name: "WeChat"
            }, r = i.default.getFirstMatch(/(?:micromessenger)[\s/](\d + (\.?_?\d + ) + )/i, e) || i.default.getFirstMatch(o, e); return r && (t.version = r), t
          }
        }, {
          test: [/qqbrowser/i], describe: function(e) {
            var t = {
              name: /qqbrowserlite/i.test(e)?"QQ Browser Lite": "QQ Browser"
            }, r = i.default.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d + (\.?_?\d + ) + )/i, e) || i.default.getFirstMatch(o, e); return r && (t.version = r), t
          }
        }, {
          test: [/msie|trident/i], describe: function(e) {
            var t = {
              name: "Internet Explorer"
            }, r = i.default.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, e); return r && (t.version = r), t
          }
        }, {
          test: [/\sedg\//i], describe: function(e) {
            var t = {
              name: "Microsoft Edge"
            }, r = i.default.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i, e); return r && (t.version = r), t
          }
        }, {
          test: [/edg([ea]|ios)/i], describe: function(e) {
            var t = {
              name: "Microsoft Edge"
            }, r = i.default.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, e); return r && (t.version = r), t
          }
        }, {
          test: [/vivaldi/i], describe: function(e) {
            var t = {
              name: "Vivaldi"
            }, r = i.default.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, e); return r && (t.version = r), t
          }
        }, {
          test: [/seamonkey/i], describe: function(e) {
            var t = {
              name: "SeaMonkey"
            }, r = i.default.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i, e); return r && (t.version = r), t
          }
        }, {
          test: [/sailfish/i], describe: function(e) {
            var t = {
              name: "Sailfish"
            }, r = i.default.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i, e); return r && (t.version = r), t
          }
        }, {
          test: [/silk/i], describe: function(e) {
            var t = {
              name: "Amazon Silk"
            }, r = i.default.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, e); return r && (t.version = r), t
          }
        }, {
          test: [/phantom/i], describe: function(e) {
            var t = {
              name: "PhantomJS"
            }, r = i.default.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i, e); return r && (t.version = r), t
          }
        }, {
          test: [/slimerjs/i], describe: function(e) {
            var t = {
              name: "SlimerJS"
            }, r = i.default.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, e); return r && (t.version = r), t
          }
        }, {
          test: [/blackberry|\bbb\d+/i, /rim\stablet/i], describe: function(e) {
            var t = {
              name: "BlackBerry"
            }, r = i.default.getFirstMatch(o, e) || i.default.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, e); return r && (t.version = r), t
          }
        }, {
          test: [/(web|hpw)[o0]s/i], describe: function(e) {
            var t = {
              name: "WebOS Browser"
            }, r = i.default.getFirstMatch(o, e) || i.default.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, e); return r && (t.version = r), t
          }
        }, {
          test: [/bada/i], describe: function(e) {
            var t = {
              name: "Bada"
            }, r = i.default.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, e); return r && (t.version = r), t
          }
        }, {
          test: [/tizen/i], describe: function(e) {
            var t = {
              name: "Tizen"
            }, r = i.default.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, e) || i.default.getFirstMatch(o, e); return r && (t.version = r), t
          }
        }, {
          test: [/qupzilla/i], describe: function(e) {
            var t = {
              name: "QupZilla"
            }, r = i.default.getFirstMatch(/(?:qupzilla)[\s/](\d + (\.?_?\d + ) + )/i, e) || i.default.getFirstMatch(o, e); return r && (t.version = r), t
          }
        }, {
          test: [/librewolf/i], describe: function(e) {
            var t = {
              name: "LibreWolf"
            }, r = i.default.getFirstMatch(/(?:librewolf)[\s/](\d + (\.?_?\d + ) + )/i, e); return r && (t.version = r), t
          }
        }, {
          test: [/firefox|iceweasel|fxios/i], describe: function(e) {
            var t = {
              name: "Firefox"
            }, r = i.default.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d + (\.?_?\d + ) + )/i, e); return r && (t.version = r), t
          }
        }, {
          test: [/electron/i], describe: function(e) {
            var t = {
              name: "Electron"
            }, r = i.default.getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i, e); return r && (t.version = r), t
          }
        }, {
          test: [/sogoumobilebrowser/i, /metasr/i, /se 2\.[x]/i], describe: function(e) {
            var t = {
              name: "Sogou Browser"
            }, r = i.default.getFirstMatch(/(?:sogoumobilebrowser)[\s/](\d + (\.?_?\d + ) + )/i, e), n = i.default.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, e), o = i.default.getFirstMatch(/se ([\d.]+)x/i, e), a = r || n || o; return a && (t.version = a), t
          }
        }, {
          test: [/MiuiBrowser/i], describe: function(e) {
            var t = {
              name: "Miui"
            }, r = i.default.getFirstMatch(/(?:MiuiBrowser)[\s/](\d + (\.?_?\d + ) + )/i, e); return r && (t.version = r), t
          }
        }, {
          test: function(e) {
            return!!e.hasBrand("DuckDuckGo") || e.test(/\sDdg\/[\d.]+$/i)
          }, describe: function(e, t) {
            var r = {
              name: "DuckDuckGo"
            }; if(t) {
              var n = t.getBrandVersion("DuckDuckGo"); if(n)return r.version = n, r
            }
            var o = i.default.getFirstMatch(/\sDdg\/([\d.]+)$/i, e); return o && (r.version = o), r
          }
        }, {
          test: function(e) {
            return e.hasBrand("Brave")
          }, describe: function(e, t) {
            var r = {
              name: "Brave"
            }; if(t) {
              var n = t.getBrandVersion("Brave"); if(n)return r.version = n, r
            }
            return r
          }
        }, {
          test: [/chromium/i], describe: function(e) {
            var t = {
              name: "Chromium"
            }, r = i.default.getFirstMatch(/(?:chromium)[\s/](\d + (\.?_?\d + ) + )/i, e) || i.default.getFirstMatch(o, e); return r && (t.version = r), t
          }
        }, {
          test: [/chrome|crios|crmo/i], describe: function(e) {
            var t = {
              name: "Chrome"
            }, r = i.default.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, e); return r && (t.version = r), t
          }
        }, {
          test: [/GSA/i], describe: function(e) {
            var t = {
              name: "Google Search"
            }, r = i.default.getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i, e); return r && (t.version = r), t
          }
        }, {
          test: function(e) {
            var t = !e.test(/like android/i), r = e.test(/android/i); return t && r
          }, describe: function(e) {
            var t = {
              name: "Android Browser"
            }, r = i.default.getFirstMatch(o, e); return r && (t.version = r), t
          }
        }, {
          test: [/playstation 4/i], describe: function(e) {
            var t = {
              name: "PlayStation 4"
            }, r = i.default.getFirstMatch(o, e); return r && (t.version = r), t
          }
        }, {
          test: [/safari|applewebkit/i], describe: function(e) {
            var t = {
              name: "Safari"
            }, r = i.default.getFirstMatch(o, e); return r && (t.version = r), t
          }
        }, {
          test: [/.*/i], describe: function(e) {
            var t = -1 !== e.search("\\(")?/^(.*)\/(.*)[ \t]\((.*)/: /^(.*)\/(.*) /; return {
              name: i.default.getFirstMatch(t, e), version: i.default.getSecondMatch(t, e)
            }
          }
        }], e.exports = t.default
      }, 93: function(e, t, r) {
        "use strict"; t.__esModule = !0, t.default = void 0; var n, i = (n = r(17)) && n.__esModule?n: {
          default: n
        }, o = r(18); t.default = [ {
          test: [/Roku\/DVP/], describe: function(e) {
            var t = i.default.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i, e); return {
              name: o.OS_MAP.Roku, version: t
            }
          }
        }, {
          test: [/windows phone/i], describe: function(e) {
            var t = i.default.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i, e); return {
              name: o.OS_MAP.WindowsPhone, version: t
            }
          }
        }, {
          test: [/windows /i], describe: function(e) {
            var t = i.default.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, e), r = i.default.getWindowsVersionName(t); return {
              name: o.OS_MAP.Windows, version: t, versionName: r
            }
          }
        }, {
          test: [/Macintosh(.*?) FxiOS(.*?)\//], describe: function(e) {
            var t = {
              name: o.OS_MAP.iOS
            }, r = i.default.getSecondMatch(/(Version\/)(\d[\d.]+)/, e); return r && (t.version = r), t
          }
        }, {
          test: [/macintosh/i], describe: function(e) {
            var t = i.default.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, e).replace(/[_\s]/g, "."), r = i.default.getMacOSVersionName(t), n = {
              name: o.OS_MAP.MacOS, version: t
            }; return r && (n.versionName = r), n
          }
        }, {
          test: [/(ipod|iphone|ipad)/i], describe: function(e) {
            var t = i.default.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, e).replace(/[_\s]/g, "."); return {
              name: o.OS_MAP.iOS, version: t
            }
          }
        }, {
          test: [/OpenHarmony/i], describe: function(e) {
            var t = i.default.getFirstMatch(/OpenHarmony\s+(\d+(\.\d+)*)/i, e); return {
              name: o.OS_MAP.HarmonyOS, version: t
            }
          }
        }, {
          test: function(e) {
            var t = !e.test(/like android/i), r = e.test(/android/i); return t && r
          }, describe: function(e) {
            var t = i.default.getFirstMatch(/android[\s/-](\d + (\.\d + )*)/i, e), r = i.default.getAndroidVersionName(t), n = {
              name: o.OS_MAP.Android, version: t
            }; return r && (n.versionName = r), n
          }
        }, {
          test: [/(web|hpw)[o0]s/i], describe: function(e) {
            var t = i.default.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i, e), r = {
              name: o.OS_MAP.WebOS
            }; return t && t.length && (r.version = t), r
          }
        }, {
          test: [/blackberry|\bbb\d+/i, /rim\stablet/i], describe: function(e) {
            var t = i.default.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i, e) || i.default.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i, e) || i.default.getFirstMatch(/\bbb(\d+)/i, e); return {
              name: o.OS_MAP.BlackBerry, version: t
            }
          }
        }, {
          test: [/bada/i], describe: function(e) {
            var t = i.default.getFirstMatch(/bada\/(\d+(\.\d+)*)/i, e); return {
              name: o.OS_MAP.Bada, version: t
            }
          }
        }, {
          test: [/tizen/i], describe: function(e) {
            var t = i.default.getFirstMatch(/tizen[/\s](\d + (\.\d + )*)/i, e); return {
              name: o.OS_MAP.Tizen, version: t
            }
          }
        }, {
          test: [/linux/i], describe: function() {
            return {
              name: o.OS_MAP.Linux
            }
          }
        }, {
          test: [/CrOS/], describe: function() {
            return {
              name: o.OS_MAP.ChromeOS
            }
          }
        }, {
          test: [/PlayStation 4/], describe: function(e) {
            var t = i.default.getFirstMatch(/PlayStation 4[/\s](\d + (\.\d + )*)/i, e); return {
              name: o.OS_MAP.PlayStation4, version: t
            }
          }
        }], e.exports = t.default
      }, 94: function(e, t, r) {
        "use strict"; t.__esModule = !0, t.default = void 0; var n, i = (n = r(17)) && n.__esModule?n: {
          default: n
        }, o = r(18); t.default = [ {
          test: [/googlebot/i], describe: function() {
            return {
              type: o.PLATFORMS_MAP.bot, vendor: "Google"
            }
          }
        }, {
          test: [/linespider/i], describe: function() {
            return {
              type: o.PLATFORMS_MAP.bot, vendor: "Line"
            }
          }
        }, {
          test: [/amazonbot/i], describe: function() {
            return {
              type: o.PLATFORMS_MAP.bot, vendor: "Amazon"
            }
          }
        }, {
          test: [/gptbot/i], describe: function() {
            return {
              type: o.PLATFORMS_MAP.bot, vendor: "OpenAI"
            }
          }
        }, {
          test: [/chatgpt-user/i], describe: function() {
            return {
              type: o.PLATFORMS_MAP.bot, vendor: "OpenAI"
            }
          }
        }, {
          test: [/oai-searchbot/i], describe: function() {
            return {
              type: o.PLATFORMS_MAP.bot, vendor: "OpenAI"
            }
          }
        }, {
          test: [/baiduspider/i], describe: function() {
            return {
              type: o.PLATFORMS_MAP.bot, vendor: "Baidu"
            }
          }
        }, {
          test: [/bingbot/i], describe: function() {
            return {
              type: o.PLATFORMS_MAP.bot, vendor: "Bing"
            }
          }
        }, {
          test: [/duckduckbot/i], describe: function() {
            return {
              type: o.PLATFORMS_MAP.bot, vendor: "DuckDuckGo"
            }
          }
        }, {
          test: [/claudebot/i, /claude-web/i, /claude-user/i, /claude-searchbot/i], describe: function() {
            return {
              type: o.PLATFORMS_MAP.bot, vendor: "Anthropic"
            }
          }
        }, {
          test: [/omgilibot/i, /webzio-extended/i], describe: function() {
            return {
              type: o.PLATFORMS_MAP.bot, vendor: "Webz.io"
            }
          }
        }, {
          test: [/diffbot/i], describe: function() {
            return {
              type: o.PLATFORMS_MAP.bot, vendor: "Diffbot"
            }
          }
        }, {
          test: [/perplexitybot/i], describe: function() {
            return {
              type: o.PLATFORMS_MAP.bot, vendor: "Perplexity AI"
            }
          }
        }, {
          test: [/perplexity-user/i], describe: function() {
            return {
              type: o.PLATFORMS_MAP.bot, vendor: "Perplexity AI"
            }
          }
        }, {
          test: [/youbot/i], describe: function() {
            return {
              type: o.PLATFORMS_MAP.bot, vendor: "You.com"
            }
          }
        }, {
          test: [/ia_archiver/i], describe: function() {
            return {
              type: o.PLATFORMS_MAP.bot, vendor: "Internet Archive"
            }
          }
        }, {
          test: [/meta-webindexer/i], describe: function() {
            return {
              type: o.PLATFORMS_MAP.bot, vendor: "Meta"
            }
          }
        }, {
          test: [/meta-externalads/i], describe: function() {
            return {
              type: o.PLATFORMS_MAP.bot, vendor: "Meta"
            }
          }
        }, {
          test: [/meta-externalagent/i], describe: function() {
            return {
              type: o.PLATFORMS_MAP.bot, vendor: "Meta"
            }
          }
        }, {
          test: [/meta-externalfetcher/i], describe: function() {
            return {
              type: o.PLATFORMS_MAP.bot, vendor: "Meta"
            }
          }
        }, {
          test: [/facebookexternalhit/i, /facebookcatalog/i], describe: function() {
            return {
              type: o.PLATFORMS_MAP.bot, vendor: "Meta"
            }
          }
        }, {
          test: [/slackbot/i, /slack-imgProxy/i], describe: function() {
            return {
              type: o.PLATFORMS_MAP.bot, vendor: "Slack"
            }
          }
        }, {
          test: [/yahoo/i], describe: function() {
            return {
              type: o.PLATFORMS_MAP.bot, vendor: "Yahoo"
            }
          }
        }, {
          test: [/yandexbot/i, /yandexmobilebot/i], describe: function() {
            return {
              type: o.PLATFORMS_MAP.bot, vendor: "Yandex"
            }
          }
        }, {
          test: [/pingdom/i], describe: function() {
            return {
              type: o.PLATFORMS_MAP.bot, vendor: "Pingdom"
            }
          }
        }, {
          test: [/huawei/i], describe: function(e) {
            var t = i.default.getFirstMatch(/(can-l01)/i, e) && "Nova", r = {
              type: o.PLATFORMS_MAP.mobile, vendor: "Huawei"
            }; return t && (r.model = t), r
          }
        }, {
          test: [/nexus\s*(?:7|8|9|10).*/i], describe: function() {
            return {
              type: o.PLATFORMS_MAP.tablet, vendor: "Nexus"
            }
          }
        }, {
          test: [/ipad/i], describe: function() {
            return {
              type: o.PLATFORMS_MAP.tablet, vendor: "Apple", model: "iPad"
            }
          }
        }, {
          test: [/Macintosh(.*?) FxiOS(.*?)\//], describe: function() {
            return {
              type: o.PLATFORMS_MAP.tablet, vendor: "Apple", model: "iPad"
            }
          }
        }, {
          test: [/kftt build/i], describe: function() {
            return {
              type: o.PLATFORMS_MAP.tablet, vendor: "Amazon", model: "Kindle Fire HD 7"
            }
          }
        }, {
          test: [/silk/i], describe: function() {
            return {
              type: o.PLATFORMS_MAP.tablet, vendor: "Amazon"
            }
          }
        }, {
          test: [/tablet(?! pc)/i], describe: function() {
            return {
              type: o.PLATFORMS_MAP.tablet
            }
          }
        }, {
          test: function(e) {
            var t = e.test(/ipod|iphone/i), r = e.test(/like (ipod|iphone)/i); return t && !r
          }, describe: function(e) {
            var t = i.default.getFirstMatch(/(ipod|iphone)/i, e); return {
              type: o.PLATFORMS_MAP.mobile, vendor: "Apple", model: t
            }
          }
        }, {
          test: [/nexus\s*[0-6].*/i, /galaxy nexus/i], describe: function() {
            return {
              type: o.PLATFORMS_MAP.mobile, vendor: "Nexus"
            }
          }
        }, {
          test: [/Nokia/i], describe: function(e) {
            var t = i.default.getFirstMatch(/Nokia\s+([0-9]+(\.[0-9]+)?)/i, e), r = {
              type: o.PLATFORMS_MAP.mobile, vendor: "Nokia"
            }; return t && (r.model = t), r
          }
        }, {
          test: [/[^-]mobi/i], describe: function() {
            return {
              type: o.PLATFORMS_MAP.mobile
            }
          }
        }, {
          test: function(e) {
            return"blackberry" === e.getBrowserName(!0)
          }, describe: function() {
            return {
              type: o.PLATFORMS_MAP.mobile, vendor: "BlackBerry"
            }
          }
        }, {
          test: function(e) {
            return"bada" === e.getBrowserName(!0)
          }, describe: function() {
            return {
              type: o.PLATFORMS_MAP.mobile
            }
          }
        }, {
          test: function(e) {
            return"windows phone" === e.getBrowserName()
          }, describe: function() {
            return {
              type: o.PLATFORMS_MAP.mobile, vendor: "Microsoft"
            }
          }
        }, {
          test: function(e) {
            var t = Number(String(e.getOSVersion()).split(".")[0]); return"android" === e.getOSName(!0) && t >= 3
          }, describe: function() {
            return {
              type: o.PLATFORMS_MAP.tablet
            }
          }
        }, {
          test: function(e) {
            return"android" === e.getOSName(!0)
          }, describe: function() {
            return {
              type: o.PLATFORMS_MAP.mobile
            }
          }
        }, {
          test: [/smart-?tv|smarttv/i], describe: function() {
            return {
              type: o.PLATFORMS_MAP.tv
            }
          }
        }, {
          test: [/netcast/i], describe: function() {
            return {
              type: o.PLATFORMS_MAP.tv
            }
          }
        }, {
          test: function(e) {
            return"macos" === e.getOSName(!0)
          }, describe: function() {
            return {
              type: o.PLATFORMS_MAP.desktop, vendor: "Apple"
            }
          }
        }, {
          test: function(e) {
            return"windows" === e.getOSName(!0)
          }, describe: function() {
            return {
              type: o.PLATFORMS_MAP.desktop
            }
          }
        }, {
          test: function(e) {
            return"linux" === e.getOSName(!0)
          }, describe: function() {
            return {
              type: o.PLATFORMS_MAP.desktop
            }
          }
        }, {
          test: function(e) {
            return"playstation 4" === e.getOSName(!0)
          }, describe: function() {
            return {
              type: o.PLATFORMS_MAP.tv
            }
          }
        }, {
          test: function(e) {
            return"roku" === e.getOSName(!0)
          }, describe: function() {
            return {
              type: o.PLATFORMS_MAP.tv
            }
          }
        }], e.exports = t.default
      }, 95: function(e, t, r) {
        "use strict"; t.__esModule = !0, t.default = void 0; var n, i = (n = r(17)) && n.__esModule?n: {
          default: n
        }, o = r(18); t.default = [ {
          test: function(e) {
            return"microsoft edge" === e.getBrowserName(!0)
          }, describe: function(e) {
            if(/\sedg\//i.test(e))return {
              name: o.ENGINE_MAP.Blink
            }; var t = i.default.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, e); return {
              name: o.ENGINE_MAP.EdgeHTML, version: t
            }
          }
        }, {
          test: [/trident/i], describe: function(e) {
            var t = {
              name: o.ENGINE_MAP.Trident
            }, r = i.default.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i, e); return r && (t.version = r), t
          }
        }, {
          test: function(e) {
            return e.test(/presto/i)
          }, describe: function(e) {
            var t = {
              name: o.ENGINE_MAP.Presto
            }, r = i.default.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i, e); return r && (t.version = r), t
          }
        }, {
          test: function(e) {
            var t = e.test(/gecko/i), r = e.test(/like gecko/i); return t && !r
          }, describe: function(e) {
            var t = {
              name: o.ENGINE_MAP.Gecko
            }, r = i.default.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, e); return r && (t.version = r), t
          }
        }, {
          test: [/(apple)?webkit\/537\.36/i], describe: function() {
            return {
              name: o.ENGINE_MAP.Blink
            }
          }
        }, {
          test: [/(apple)?webkit/i], describe: function(e) {
            var t = {
              name: o.ENGINE_MAP.WebKit
            }, r = i.default.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, e); return r && (t.version = r), t
          }
        }], e.exports = t.default
      }
    }, t = {

    }; function r(n) {
      if(t[n])return t[n].exports; var i = t[n] = {
        i: n, l: !1, exports: {

        }
      }; return e[n].call(i.exports, i, i.exports, r), i.l = !0, i.exports
    }
    return r.m = e, r.c = t, r.d = function(e, t, n) {
      r.o(e, t) || Object.defineProperty(e, t, {
        enumerable: !0, get: n
      })
    }, r.r = function(e) {
      "u">typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(e, "__esModule", {
        value: !0
      })
    }, r.t = function(e, t) {
      if(1&t && (e = r(e)), 8&t || 4&t && "object" == typeof e && e && e.__esModule)return e; var n = Object.create(null); if(r.r(n), Object.defineProperty(n, "default", {
        enumerable: !0, value: e
      }), 2&t && "string" != typeof e)for(var i in e)r.d(n, i, (function(t) {
        return e[t]
      }).bind(null, i)); return n
    }, r.n = function(e) {
      var t = e && e.__esModule?function() {
        return e.default
      }
      : function() {
        return e
      }; return r.d(t, "a", t), t
    }, r.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }, r.p = "", r(r.s = 90)
  }
  ()
}, 963002, 216044, e => {
  "use strict"; var t, r, n = function(e) {
    var t = "function" == typeof Symbol && Symbol.iterator, r = t && e[t], n = 0; if(r)return r.call(e); if(e && "number" == typeof e.length)return {
      next: function() {
        return e && n >= e.length && (e = void 0), {
          value: e && e[n++], done: !e
        }
      }
    }; throw TypeError(t?"Object is not iterable.": "Symbol.iterator is not defined.")
  }, i = function(e, t) {
    var r = "function" == typeof Symbol && e[Symbol.iterator]; if(!r)return e; var n, i, o = r.call(e), a = []; try {
      for(; (void 0 === t || t-->0) && !(n = o.next()).done; )a.push(n.value)
    }catch(e) {
      i = {
        error: e
      }
    }finally {
      try {
        n && !n.done && (r = o.return) && r.call(o)
      }finally {
        if(i)throw i.error
      }
    }
    return a
  }, o = function(e, t, r) {
    if(r || 2 == arguments.length)for(var n, i = 0, o = t.length; i<o; i++)!n && i in t || (n || (n = Array.prototype.slice.call(t, 0, i)), n[i] = t[i]); return e.concat(n || Array.prototype.slice.call(t))
  }, a = {
    VERBOSE: 1, DEBUG: 2, INFO: 3, WARN: 4, ERROR: 5
  }; (r = t || (t = {

  })).DEBUG = "DEBUG", r.ERROR = "ERROR", r.INFO = "INFO", r.WARN = "WARN", r.VERBOSE = "VERBOSE"; var s = function() {
    function e(e, r) {
      void 0 === r && (r = t.WARN), this.name = e, this.level = r, this._pluggables = []
    }
    return e.prototype._padding = function(e) {
      return e<10?"0"+e: ""+e
    }, e.prototype._ts = function() {
      var e = new Date; return[this._padding(e.getMinutes()), this._padding(e.getSeconds())].join(":") + "."+e.getMilliseconds()
    }, e.prototype.configure = function(e) {
      return e && (this._config = e), this._config
    }, e.prototype._log = function(r) {
      for(var i, o, s = [], u = 1; u<arguments.length; u++)s[u - 1] = arguments[u]; var c = this.level; e.LOG_LEVEL && (c = e.LOG_LEVEL), "u">typeof window && window.LOG_LEVEL && (c = window.LOG_LEVEL); var l = a[c]; if(a[r] >= l) {
        var d = console.log.bind(console); r === t.ERROR && console.error && (d = console.error.bind(console)), r === t.WARN && console.warn && (d = console.warn.bind(console)); var f = "[".concat(r, "] ").concat(this._ts(), " ").concat(this.name), m = ""; if(1 === s.length && "string" == typeof s[0])d(m = "".concat(f, " - ").concat(s[0])); else if(1 === s.length)m = "".concat(f, " ").concat(s[0]), d(f, s[0]); else if("string" == typeof s[0]) {
          var p = s.slice(1); 1 === p.length && (p = p[0]), m = "".concat(f, " - ").concat(s[0], " ").concat(p), d("".concat(f, " - ").concat(s[0]), p)
        }else m = "".concat(f, " ").concat(s), d(f, s); try {
          for(var g = n(this._pluggables), h = g.next(); !h.done; h = g.next()) {
            var _ = h.value, b = {
              message: m, timestamp: Date.now()
            }; _.pushLogs([b])
          }
        }catch(e) {
          i = {
            error: e
          }
        }finally {
          try {
            h && !h.done && (o = g.return) && o.call(g)
          }finally {
            if(i)throw i.error
          }
        }
      }
    }, e.prototype.log = function() {
      for(var e = [], r = 0; r<arguments.length; r++)e[r] = arguments[r]; this._log.apply(this, o([t.INFO], i(e), !1))
    }, e.prototype.info = function() {
      for(var e = [], r = 0; r<arguments.length; r++)e[r] = arguments[r]; this._log.apply(this, o([t.INFO], i(e), !1))
    }, e.prototype.warn = function() {
      for(var e = [], r = 0; r<arguments.length; r++)e[r] = arguments[r]; this._log.apply(this, o([t.WARN], i(e), !1))
    }, e.prototype.error = function() {
      for(var e = [], r = 0; r<arguments.length; r++)e[r] = arguments[r]; this._log.apply(this, o([t.ERROR], i(e), !1))
    }, e.prototype.debug = function() {
      for(var e = [], r = 0; r<arguments.length; r++)e[r] = arguments[r]; this._log.apply(this, o([t.DEBUG], i(e), !1))
    }, e.prototype.verbose = function() {
      for(var e = [], r = 0; r<arguments.length; r++)e[r] = arguments[r]; this._log.apply(this, o([t.VERBOSE], i(e), !1))
    }, e.prototype.addPluggable = function(e) {
      e && "Logging" === e.getCategoryName() && (this._pluggables.push(e), e.configure(this._config))
    }, e.prototype.listPluggables = function() {
      return this._pluggables
    }, e.LOG_LEVEL = null, e
  }
  (); e.s(["ConsoleLogger", () => s], 216044); var u = function(e, t) {
    var r = "function" == typeof Symbol && e[Symbol.iterator]; if(!r)return e; var n, i, o = r.call(e), a = []; try {
      for(; (void 0 === t || t-->0) && !(n = o.next()).done; )a.push(n.value)
    }catch(e) {
      i = {
        error: e
      }
    }finally {
      try {
        n && !n.done && (r = o.return) && r.call(o)
      }finally {
        if(i)throw i.error
      }
    }
    return a
  }, c = new s("Amplify"), l = new(function() {
    function e() {
      this._components = [], this._config = {

      }, this._modules = {

      }, this.Auth = null, this.Analytics = null, this.API = null, this.Credentials = null, this.Storage = null, this.I18n = null, this.Cache = null, this.PubSub = null, this.Interactions = null, this.Pushnotification = null, this.UI = null, this.XR = null, this.Predictions = null, this.DataStore = null, this.Geo = null, this.Notifications = null, this.Logger = s, this.ServiceWorker = null
    }
    return e.prototype.register = function(e) {
      c.debug("component registered in amplify", e), this._components.push(e), "function" == typeof e.getModuleName?(this._modules[e.getModuleName()] = e, this[e.getModuleName()] = e): c.debug("no getModuleName method for component", e), e.configure(this._config)
    }, e.prototype.configure = function(e) {
      var t = this; return e && (this._config = Object.assign(this._config, e), c.debug("amplify config", this._config), (this._config.Analytics && (this._config.Analytics.AWSPinpoint || this._config.Analytics.appId) || this._config.Notifications && this._config.Notifications.InAppMessaging && this._config.Notifications.InAppMessaging.AWSPinpoint || this._config.Notifications && this._config.Notifications.Push && this._config.Notifications.Push.AWSPinpoint || this._config.PushNotification && this._config.PushNotification.appId) && console.warn("AWS will end support for Amazon Pinpoint on October 30, 2026. The guidance is to use AWS End User Messaging for push notifications and SMS, Amazon Simple Email Service for sending emails, Amazon Connect for campaigns, journeys, endpoints, and engagement analytics. Pinpoint recommends Amazon Kinesis for event collection and mobile analytics."), Object.entries(this._modules).forEach(function(e) {
        var r = u(e, 2), n = (r[0], r[1]); Object.keys(n).forEach(function(e) {
          t._modules[e] && (n[e] = t._modules[e])
        })
      }), this._components.map(function(e) {
        e.configure(t._config)
      })), this._config
    }, e.prototype.addPluggable = function(e) {
      e && e.getCategory && "function" == typeof e.getCategory && this._components.map(function(t) {
        t.addPluggable && "function" == typeof t.addPluggable && t.addPluggable(e)
      })
    }, e
  }
  ()); e.s(["Amplify", () => l], 963002)
}, 519442, e => {
  e.v( {
    controlBtn: "VoiceRoomView-module-scss-module__qmOzHa__controlBtn", controlBtnActive: "VoiceRoomView-module-scss-module__qmOzHa__controlBtnActive", controlBtnDanger: "VoiceRoomView-module-scss-module__qmOzHa__controlBtnDanger", controlsBar: "VoiceRoomView-module-scss-module__qmOzHa__controlsBar", handBadge: "VoiceRoomView-module-scss-module__qmOzHa__handBadge", listenerAvatarWrap: "VoiceRoomView-module-scss-module__qmOzHa__listenerAvatarWrap", listenerName: "VoiceRoomView-module-scss-module__qmOzHa__listenerName", listenerTile: "VoiceRoomView-module-scss-module__qmOzHa__listenerTile", listenersGrid: "VoiceRoomView-module-scss-module__qmOzHa__listenersGrid", micGuide: "VoiceRoomView-module-scss-module__qmOzHa__micGuide", micGuideDismiss: "VoiceRoomView-module-scss-module__qmOzHa__micGuideDismiss", micGuideHeader: "VoiceRoomView-module-scss-module__qmOzHa__micGuideHeader", micGuideStep: "VoiceRoomView-module-scss-module__qmOzHa__micGuideStep", micGuideStepNum: "VoiceRoomView-module-scss-module__qmOzHa__micGuideStepNum", micGuideSteps: "VoiceRoomView-module-scss-module__qmOzHa__micGuideSteps", miniPlayer: "VoiceRoomView-module-scss-module__qmOzHa__miniPlayer", miniPlayerBtn: "VoiceRoomView-module-scss-module__qmOzHa__miniPlayerBtn", miniPlayerBtnActive: "VoiceRoomView-module-scss-module__qmOzHa__miniPlayerBtnActive", miniPlayerBtnLeave: "VoiceRoomView-module-scss-module__qmOzHa__miniPlayerBtnLeave", miniPlayerControls: "VoiceRoomView-module-scss-module__qmOzHa__miniPlayerControls", miniPlayerInfo: "VoiceRoomView-module-scss-module__qmOzHa__miniPlayerInfo", miniPlayerLive: "VoiceRoomView-module-scss-module__qmOzHa__miniPlayerLive", miniPlayerSub: "VoiceRoomView-module-scss-module__qmOzHa__miniPlayerSub", miniPlayerTitle: "VoiceRoomView-module-scss-module__qmOzHa__miniPlayerTitle", miniPulse: "VoiceRoomView-module-scss-module__qmOzHa__miniPulse", pendingPulse: "VoiceRoomView-module-scss-module__qmOzHa__pendingPulse", raisedHandItem: "VoiceRoomView-module-scss-module__qmOzHa__raisedHandItem", raisedHandsList: "VoiceRoomView-module-scss-module__qmOzHa__raisedHandsList", raisedHandsSection: "VoiceRoomView-module-scss-module__qmOzHa__raisedHandsSection", roomHeader: "VoiceRoomView-module-scss-module__qmOzHa__roomHeader", roomLoading: "VoiceRoomView-module-scss-module__qmOzHa__roomLoading", roomView: "VoiceRoomView-module-scss-module__qmOzHa__roomView", section: "VoiceRoomView-module-scss-module__qmOzHa__section", sectionLabel: "VoiceRoomView-module-scss-module__qmOzHa__sectionLabel", stage: "VoiceRoomView-module-scss-module__qmOzHa__stage", stageControls: "VoiceRoomView-module-scss-module__qmOzHa__stageControls", stageGrid: "VoiceRoomView-module-scss-module__qmOzHa__stageGrid", stageLabel: "VoiceRoomView-module-scss-module__qmOzHa__stageLabel", stageRequestItem: "VoiceRoomView-module-scss-module__qmOzHa__stageRequestItem", stageRequests: "VoiceRoomView-module-scss-module__qmOzHa__stageRequests", stageSlot: "VoiceRoomView-module-scss-module__qmOzHa__stageSlot", stageSlotBadge: "VoiceRoomView-module-scss-module__qmOzHa__stageSlotBadge", stageSlotClickable: "VoiceRoomView-module-scss-module__qmOzHa__stageSlotClickable", stageSlotDemote: "VoiceRoomView-module-scss-module__qmOzHa__stageSlotDemote", stageSlotEmpty: "VoiceRoomView-module-scss-module__qmOzHa__stageSlotEmpty", stageSlotEmptyCircle: "VoiceRoomView-module-scss-module__qmOzHa__stageSlotEmptyCircle", stageSlotEmptyText: "VoiceRoomView-module-scss-module__qmOzHa__stageSlotEmptyText", stageSlotMicBadge: "VoiceRoomView-module-scss-module__qmOzHa__stageSlotMicBadge", stageSlotMicMuted: "VoiceRoomView-module-scss-module__qmOzHa__stageSlotMicMuted", stageSlotName: "VoiceRoomView-module-scss-module__qmOzHa__stageSlotName", stageSlotPending: "VoiceRoomView-module-scss-module__qmOzHa__stageSlotPending", transcriptBubble: "VoiceRoomView-module-scss-module__qmOzHa__transcriptBubble", transcriptBubblePartial: "VoiceRoomView-module-scss-module__qmOzHa__transcriptBubblePartial", transcriptContent: "VoiceRoomView-module-scss-module__qmOzHa__transcriptContent", transcriptFadeIn: "VoiceRoomView-module-scss-module__qmOzHa__transcriptFadeIn", transcriptName: "VoiceRoomView-module-scss-module__qmOzHa__transcriptName", transcriptText: "VoiceRoomView-module-scss-module__qmOzHa__transcriptText", transcriptsSection: "VoiceRoomView-module-scss-module__qmOzHa__transcriptsSection"
  })
}, 682906, e => {
  e.v( {
    errorPage: "error-module-scss-module__lwv-pa__errorPage"
  })
}, 670827, e => {
  e.v( {
    loaderScreen: "loader-module-scss-module__d205aq__loaderScreen", loaderScreenCenter: "loader-module-scss-module__d205aq__loaderScreenCenter", loaderScreenCenterLoader: "loader-module-scss-module__d205aq__loaderScreenCenterLoader", pulse: "loader-module-scss-module__d205aq__pulse"
  })
}, 303115, e => {
  "use strict"; var t = e.i(478902), r = e.i(389959), n = e.i(888264), i = e.i(177044), o = e.i(84203), a = e.i(56040), s = e.i(356535), u = e.i(4210), c = r, l = e.i(682906), d = e.i(907153); let f = ( {
    message: e, title: r
  }) => (0, t.jsxs)("div", {
    className: l.default.errorPage, children: [(0, t.jsx)("h1", {
      children: r ?? "Site under maintenance"
    }), (0, t.jsx)("p", {
      children: e ?? "We're sorry! Site under maintenance. We'll be back soon! Thank you for your patience."
    }), (0, t.jsx)("br", {

    }), (0, t.jsx)("br", {

    }), (0, t.jsx)(d.default, {
      variant: "primary", onClick: () => location.reload(), children: "Try again?"
    })]
  }); class m extends c.default.Component {
    constructor(e) {
      super(e), this.state = {
        hasError: !1
      }
    }
    static getDerivedStateFromError(e) {
      return {
        hasError: !0
      }
    }
    componentDidCatch(e, t) {
      console.log( {
        error: e, errorInfo: t
      })
    }
    render() {
      return this.state.hasError?(0, t.jsx)(f, {
        title: "Oops, something went wrong", message: "There are technical issues. Our team working on fix. Apologies for inconvenience."
      }): this.props.children
    }
  }
  var p = e.i(859271), g = e.i(964373); function h( {
    children: e
  }) {
    let n = (0, r.useRef)(void 0); return(0, r.useEffect)(() => {
      g.realtime.connect(); let e = u.default.subscribe(() => {
        let e = u.default.getState(), t = e.auth?.user, r = e.auth?.isAuthenticated, i = t?.id ?? null; if(i === n.current)return; n.current = i; let o = async() => {
          let e = await fetch("/api/centrifugo/connection_token", {
            credentials: "include"
          }); if(!e.ok)throw Error("Failed to fetch Centrifugo token"); return(await e.json()).token
        }; i && r?(g.realtime.disconnect(), g.realtime.authenticate(i, o).then(() => g.realtime.connect()).catch(e => console.error("[RealtimeProvider] Auth error", e))): void 0 !== n.current && (g.realtime.disconnect(), g.realtime.unauthenticate(), g.realtime.connect())
      }); return() => {
        e(), g.realtime.disconnect()
      }
    }, []), (0, t.jsx)(t.Fragment, {
      children: e
    })
  }
  var _ = e.i(670827), b = e.i(944967); let v = e => (0, t.jsx)("div", {
    ...e, className: (0, b.default)(_.default.loaderScreen, e.className ?? null), children: (0, t.jsx)("div", {
      className: _.default.loaderScreenCenter, children: (0, t.jsx)("img", {
        src: "/logotype.svg", alt: "bloxflip logo"
      })
    })
  }); var y = e.i(187742), M = e.i(278287), S = e.i(528378), P = e.i(205632), w = e.i(142349), O = e.i(963002), A = e.i(779405), R = e.i(1552), x = e.i(519442); function k() {
    let e = (0, i.useRouter)(), n = (0, R.useVoiceRoom)(), {
      width: o
    }
    = (0, y.default)(), [a, s] = (0, r.useState)(!1); if((0, r.useEffect)(() => {
      s(window.innerWidth>1170); let e = e => {
        s(e.detail?.open ?? !1)
      }; return window.addEventListener("chatToggled", e), () => window.removeEventListener("chatToggled", e)
    }, []), !n?.activeRoomId || !n?.room || e.asPath.startsWith(`/rooms/${n.activeRoomId}`))return null; let {
      room: u, isMuted: c, isSpeaker: l, toggleMute: d, leaveRoom: f
    }
    = n; return(0, t.jsxs)("div", {
      className: x.default.miniPlayer, style: o>1700 && a? {
        right: 400
      }
      : void 0, onClick: () => e.push(`/rooms/${n.activeRoomId}`), children: [(0, t.jsx)("span", {
        className: x.default.miniPlayerLive
      }), (0, t.jsxs)("div", {
        className: x.default.miniPlayerInfo, children: [(0, t.jsx)("div", {
          className: x.default.miniPlayerTitle, children: u.title
        }), (0, t.jsxs)("div", {
          className: x.default.miniPlayerSub, children: [u.speakerCount + u.listenerCount, " in room"]
        })]
      }), (0, t.jsxs)("div", {
        className: x.default.miniPlayerControls, onClick: e => e.stopPropagation(), children: [l && (0, t.jsx)("button", {
          className: (0, b.default)(x.default.miniPlayerBtn, !c && x.default.miniPlayerBtnActive), onClick: d, title: c?"Unmute": "Mute", children: c?(0, t.jsxs)("svg", {
            width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", children: [(0, t.jsx)("path", {
              d: "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round"
            }), (0, t.jsx)("path", {
              d: "M19 10v2a7 7 0 0 1-14 0v-2", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round"
            }), (0, t.jsx)("line", {
              x1: "12", y1: "19", x2: "12", y2: "23", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round"
            }), (0, t.jsx)("line", {
              x1: "2", y1: "2", x2: "22", y2: "22", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round"
            })]
          }): (0, t.jsxs)("svg", {
            width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", children: [(0, t.jsx)("path", {
              d: "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z", stroke: "currentColor", strokeWidth: "2"
            }), (0, t.jsx)("path", {
              d: "M19 10v2a7 7 0 0 1-14 0v-2", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round"
            }), (0, t.jsx)("line", {
              x1: "12", y1: "19", x2: "12", y2: "23", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round"
            })]
          })
        }), (0, t.jsx)("button", {
          className: (0, b.default)(x.default.miniPlayerBtn, x.default.miniPlayerBtnLeave), onClick: f, title: "Leave room", children: (0, t.jsxs)("svg", {
            width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", children: [(0, t.jsx)("path", {
              d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round"
            }), (0, t.jsx)("polyline", {
              points: "16 17 21 12 16 7", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round"
            }), (0, t.jsx)("line", {
              x1: "21", y1: "12", x2: "9", y2: "12", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round"
            })]
          })
        })]
      })]
    })
  }
  var F = e.i(94751), E = e.i(965783), B = e.i(372045), C = e.i(474861), T = e.i(75730), L = e.i(751473), V = e.i(107665), N = e.i(359566); function j() {
    let e = (0, i.useRouter)(), [n, o] = (0, r.useState)(!1); (0, r.useEffect)(() => {
      let e = () => o(!!u.default.getState().auth?.showCreateRoom); return e(), u.default.subscribe(e)
    }, []), (0, R.useVoiceRoom)(); let[a, c] = (0, r.useState)(!1), [l, f] = (0, r.useState)(""), [m, p] = (0, r.useState)(!1), [g, h] = (0, r.useState)(!0), [_, v] = (0, r.useState)(null), y = r.default.useMemo(() => (0, N.getGapWidth)("margin"), ["margin"]); (0, r.useEffect)(() => {
      n?(c(!0), f(""), v(null), p(!1), h(!0), setTimeout(() => {
        document.body.style.overflow = "hidden", document.body.style.paddingRight = y.gap + "px"
      }, 0)): (c(!1), document.body.style.overflow = "initial", document.body.style.paddingRight = "0px")
    }, [n]); let M = () => {
      u.default.dispatch( {
        type: s.HIDE_CREATE_ROOM
      })
    }, S = async() => {
      if(l.trim() && !m) {
        p(!0), v(null); try {
          let t = await (0, V.createVoiceRoom)(l.trim(), g); if(!1 === t.success || !t.roomId) {
            let e = t.message || t.error || t.msg || "Failed to create room"; v(e), p(!1); return
          }
          M(), sessionStorage.setItem(`voice-room-token:${t.roomId}`, t.cloudflareAuthToken), e.push(`/rooms/${t.roomId}`)
        }catch(e) {
          v(e?.response?.data?.message || e?.response?.data?.error || e?.response?.data?.msg || e?.message || "Failed to create room"), p(!1)
        }
      }
    }; return(0, t.jsxs)(F.default, {
      isOpen: a, onRequestClose: M, contentLabel: "Create Voice Room", className: (0, b.default)(E.default.defaultModal, E.default.modalDeposit), closeTimeoutMS: 200, children: [(0, t.jsx)(C.default, {
        element: "h2", className: E.default.modalDepositTitle, children: "Create a Voice Room"
      }), (0, t.jsx)(B.default, {
        element: "p", textType: "regular14", style: {
          color: "var(--color-grey-secondary)", marginBottom: "20px"
        }, children: "Give your room a title and start talking with the community."
      }), (0, t.jsxs)("div", {
        className: "customInput", children: [(0, t.jsx)(B.default, {
          element: "p", textType: "labelsRegular", className: "customInputLabel", children: "Room Title"
        }), (0, t.jsx)("div", {
          className: "customInputInner", children: (0, t.jsx)(T.default, {
            value: l, onChange: e => {
              f(e.currentTarget.value.slice(0, 50)), v(null)
            }, placeholder: "What do you want to talk about?", onKeyDown: e => "Enter" === e.key && S(), disabled: m, autoFocus: !0
          })
        })]
      }), (0, t.jsxs)(B.default, {
        element: "p", textType: "labelsRegular", style: {
          color: "var(--color-grey-secondary)", textAlign: "right", marginTop: "4px", fontSize: "11px"
        }, children: [l.length, "/50"]
      }), (0, t.jsxs)("label", {
        style: {
          display: "flex", alignItems: "center", gap: "10px", marginTop: "16px", cursor: "pointer"
        }, children: [(0, t.jsx)(L.default, {
          checked: g, onChange: e => h(e.target.checked)
        }), (0, t.jsx)(B.default, {
          element: "span", textType: "regular14", style: {
            color: "var(--color-grey-primary)"
          }, children: "Auto-accept speakers on stage"
        })]
      }), _ && (0, t.jsx)(B.default, {
        element: "p", textType: "regular14", className: E.default.errorText, style: {
          marginTop: "12px", textAlign: "center"
        }, children: _
      }), (0, t.jsx)(d.default, {
        variant: "primary", onClick: S, disabled: !l.trim() || m, style: {
          width: "100%", marginTop: "16px"
        }, children: m?"Creating...": "Create Room"
      }), (0, t.jsx)(d.default, {
        onClick: M, className: E.default.defaultModalClose, "aria-label": "Close"
      })]
    })
  }
  F.default.setAppElement("#__next"); var I = e.i(478385); let z = new S.GrowthBook( {
    apiHost: "https://gb-proxy.bloxflip.com", clientKey: "sdk-TCLa1o9NRYWDVVhk", trackingCallback: (e, t) => {
      console.log( {
        experimentId: e.key, variationId: t.variationId
      })
    }
  }); O.Amplify.configure(), e.s(["ACCESS_KEY_TIKTOK", 0, "ea70247f8e7befdbf58568f6594c556306c99618", "default", 0, function( {
    Component: e, pageProps: c
  }) {
    let l = (0, i.useRouter)(), d = (0, y.default)(), [f, g] = (0, r.useState)(!1), [_, b] = (0, r.useState)(!1), S = (0, r.useRef)(null), O = async() => {
      try {
        let e = await (0, a.getIpAddress)(); if(!e || !("ip"in e))throw Error("no ip address"); window.ipAddress = e.ip, u.default && u.default.dispatch( {
          type: s.SET_IP_ADDRESS, payload: e.ip
        })
      }catch(e) {
        console.log(e)
      }
    }, x = async() => {
      try {
        await z.loadFeatures(); let e = localStorage.getItem("visitorId"); e || (e = ((e = 21) => crypto.getRandomValues(new Uint8Array(e)).reduce((e, t) => ((t &= 63)<36?e += t.toString(36): t<62?e += (t - 26).toString(36).toUpperCase(): t>62?e += "-": e += "_", e), ""))(), localStorage.setItem("visitorId", e)); let t = !!u.default.getState().auth.user; z.setAttributes( {
          id: e, loggedIn: t, url: document.location.href
        })
      }catch(e) {
        console.log(e)
      }
    }; (0, r.useEffect)(() => {
      let e = e => {
        console.log("routing to "+e), z.getFeatures().fe_ga_enabled && n.default.send( {
          hitType: "pageview", page: location.pathname + location.search
        }), z.getFeatures().fe_mixpanel_enabled && P.default.track("pageview", {
          page: location.pathname + location.search
        }), (0, w.capturePageview)()
      }; return l.events.on("routeChangeComplete", e), () => {
        l.events.off("routeChangeComplete", e)
      }
    }, [l.events]), (0, r.useEffect)(() => {
      navigator.serviceWorker && navigator.serviceWorker.register(`${self.origin}/OneSignalSDKWorker.js`).then(e => console.log(e)).catch(e => console.log(e))
    }, []), (0, r.useEffect)(() => {
      (0, A.preloadAllSounds)(), location.hash.trim().includes("#giveaway") && u.default.dispatch( {
        type: s.SHOW_GIVEAWAY_MODAL
      }), x(), O(), o.default.init( {
        appId: "1380a21c-2da6-4adf-b7a1-8523f0f3198b"
      }).then(async() => {
        g(!0), (0, I.logOneSignalSyncEvent)("OneSignal SDK initialized", {
          reason: "app_init"
        }); try {
          await o.default.Slidedown.promptPush()
        }catch(e) {
          (0, I.logOneSignalSyncEvent)("OneSignal prompt failed", {
            reason: "app_init", errorMessage: e?.message ?? "Unknown OneSignal prompt error"
          }, "warn"), console.log("OneSignal prompt error:", e)
        }
      }); let e = () => {
        z.getFeatures().fe_ga_enabled && console.log("ga4 !!up")
      }; return l.events.on("routeChangeComplete", e), (0, a.changeSourceHeader)(), sessionStorage.setItem("timeJoined", new Date().getTime().toString()), P.default.init("0c9266b8cede669e4a7bd3bfb2c8e6e4"), (0, w.initPostHog)(), (0, w.capturePageview)(), n.default.initialize("G-7QWC8W9ECE"), n.default.ga(e => {
        window.ga4ClientId = e.get("clientId")
      }), () => {
        l.events.off("routeChangeComplete", e)
      }
    }, []), (0, r.useEffect)(() => {
      if(!f)return; let e = !1, t = async(t = "store_update", r = !1) => {
        let n = u.default.getState().auth ?? {

        }, i = n.user; if(!n.isAuthenticated || !i?.id) {
          null !== S.current && (0, I.logOneSignalSyncEvent)("Clearing cached OneSignal sync state", {
            reason: t
          }), S.current = null; return
        }
        let o = (0, I.getOneSignalUserSyncKey)(i); if(!o || !r && S.current === o)return; let a = await (0, I.syncOneSignalUserTags)(i, {
          reason: t, force: r
        }); !e && a && (S.current = o)
      }, r = async() => {
        (0, I.logOneSignalSyncEvent)("Push subscription changed", {
          reason: "subscription_change"
        }), S.current = null, await t("subscription_change", !0)
      }; t("app_init", !0), o.default?.User?.PushSubscription && "function" == typeof o.default.User.PushSubscription.addEventListener && o.default.User.PushSubscription.addEventListener("change", r); let n = u.default.subscribe(() => {
        t("store_update", !1)
      }); return() => {
        e = !0, n(), o.default?.User?.PushSubscription && "function" == typeof o.default.User.PushSubscription.removeEventListener && o.default.User.PushSubscription.removeEventListener("change", r)
      }
    }, [f]); let F = e.getLayout || (e => e); return(0, r.useEffect)(() => {
      let e = () => {
        try {
          let {
            firstLoaded: e
          }
          = u.default.getState().auth; if(e)return; b(!0)
        }catch(e) {
          console.log(e)
        }
      }, t = () => {
        b(!1)
      }; try {
        let {
          firstLoaded: e
        }
        = u.default.getState().auth; e || u.default.dispatch( {
          type: s.SET_FIRST_LOADED, payload: !0
        })
      }catch(e) {
        console.log(e)
      }
      return l.events.on("routeChangeStart", e), l.events.on("routeChangeComplete", t), l.events.on("routeChangeError", t), () => {
        l.events.off("routeChangeStart", e), l.events.off("routeChangeError", t), l.events.off("routeChangeComplete", t)
      }
    }, [l.events]), (0, t.jsx)(m, {
      children: (0, t.jsx)(p.default, {
        children: (0, t.jsxs)(h, {
          children: [(0, t.jsx)(v, {
            className: !_ && d.width>0?"fadeout": void 0
          }), (0, t.jsx)(R.VoiceRoomProvider, {
            children: (0, t.jsxs)(M.GrowthBookProvider, {
              growthbook: z, children: [F((0, t.jsx)(e, {
                ...c, oneSignalInitialized: f
              })), (0, t.jsx)(k, {

              }), (0, t.jsx)(j, {

              })]
            })
          })]
        })
      })
    })
  }, "growthbook", 0, z], 303115)
}, 468146, (e, t, r) => {
  let n = "/_app"; (window.__NEXT_P = window.__NEXT_P || []).push([n, () => e.r(303115)]), t.hot && t.hot.dispose(function() {
    window.__NEXT_P.push([n])
  })
}, 915468, e => {
  e.v(t => Promise.all(["static/chunks/3717bd91a00f9ddb.js"].map(t => e.l(t))).then(() => t(900070)))
}, 382497, e => {
  e.v(t => Promise.all(["static/chunks/2576771ba550fccd.js"].map(t => e.l(t))).then(() => t(158629)))
}]);